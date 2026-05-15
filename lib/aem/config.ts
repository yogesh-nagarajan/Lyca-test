import { AemError } from "./errors";

const REQUIRED_ENV_VARS = [
  "AEM_PRIVATE_KEY",
  "AEM_ORG_ID",
  "AEM_TECH_ACCOUNT_ID",
  "AEM_IMS_ENDPOINT",
  "AEM_CLIENT_ID",
  "AEM_CLIENT_SECRET",
  "AEM_METASCOPES",
  "AEM_HOST",
] as const;

export type AemConfig = {
  privateKey: string;
  orgId: string;
  techAccountId: string;
  imsEndpoint: string;
  clientId: string;
  clientSecret: string;
  metascopes: string;
  host: string;
};

let cachedConfig: AemConfig | null = null;

function normalizePrivateKey(raw: string): string {
  return raw.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n").trim();
}

function normalizeImsEndpoint(endpoint: string): string {
  return endpoint.replace(/\/$/, "");
}

function normalizeHost(host: string): string {
  return host.replace(/\/$/, "");
}

export function getMissingEnvVars(): string[] {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key]?.trim());
}

export function getAemConfig(): AemConfig {
  if (cachedConfig) return cachedConfig;

  const missing = getMissingEnvVars();
  if (missing.length > 0) {
    throw new AemError(
      "CONFIG_MISSING",
      `Missing required environment variables: ${missing.join(", ")}`,
      { details: { missingEnvVars: missing } }
    );
  }

  const privateKey = normalizePrivateKey(process.env.AEM_PRIVATE_KEY!);
  if (
    !privateKey.includes("BEGIN") ||
    (!privateKey.includes("PRIVATE KEY") && !privateKey.includes("RSA PRIVATE KEY"))
  ) {
    throw new AemError(
      "CONFIG_INVALID",
      "AEM_PRIVATE_KEY does not look like a PEM-encoded private key",
      { details: { missingEnvVars: ["AEM_PRIVATE_KEY (invalid format)"] } }
    );
  }

  const imsEndpoint = normalizeImsEndpoint(process.env.AEM_IMS_ENDPOINT!);
  if (!imsEndpoint.startsWith("https://")) {
    throw new AemError(
      "CONFIG_INVALID",
      "AEM_IMS_ENDPOINT must be an HTTPS URL (e.g. https://ims-na1.adobelogin.com)",
      { details: { cause: process.env.AEM_IMS_ENDPOINT } }
    );
  }

  const host = normalizeHost(process.env.AEM_HOST!);
  if (!host.startsWith("http://") && !host.startsWith("https://")) {
    throw new AemError(
      "CONFIG_INVALID",
      "AEM_HOST must include protocol (https://your-aem-host)",
      { details: { cause: process.env.AEM_HOST } }
    );
  }

  cachedConfig = {
    privateKey,
    orgId: process.env.AEM_ORG_ID!.trim(),
    techAccountId: process.env.AEM_TECH_ACCOUNT_ID!.trim(),
    imsEndpoint,
    clientId: process.env.AEM_CLIENT_ID!.trim(),
    clientSecret: process.env.AEM_CLIENT_SECRET!.trim(),
    metascopes: process.env.AEM_METASCOPES!.trim(),
    host,
  };

  return cachedConfig;
}

/** GraphQL base URL — prefers AEM_PUBLISH_HOST when set (publish often stays up when author hibernates). */
export function getAemContentHost(): string {
  const publish = process.env.AEM_PUBLISH_HOST?.trim();
  if (publish) {
    return normalizeHost(publish);
  }
  return getAemConfig().host;
}

export function buildGraphqlUrl(
  persistentQueryPath: string,
  contentPath: string
): string {
  const host = getAemContentHost();
  const encodedPath = encodeURIComponent(contentPath);
  return `${host}${persistentQueryPath};path=${encodedPath}`;
}
