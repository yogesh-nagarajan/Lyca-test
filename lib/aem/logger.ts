type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_PREFIX = "[AEM]";

function shouldLog(level: LogLevel): boolean {
  if (process.env.AEM_LOG_LEVEL === "silent") return false;
  if (level === "error" || level === "warn") return true;
  if (process.env.NODE_ENV === "production" && level === "debug") return false;
  return true;
}

function formatMeta(meta?: Record<string, unknown>): string {
  if (!meta || Object.keys(meta).length === 0) return "";
  try {
    return ` ${JSON.stringify(redactSecrets(meta))}`;
  } catch {
    return " [meta serialization failed]";
  }
}

function redactSecrets(meta: Record<string, unknown>): Record<string, unknown> {
  const sensitiveKeys = [
    "token",
    "access_token",
    "accessToken",
    "jwt",
    "jwt_token",
    "client_secret",
    "privateKey",
    "authorization",
  ];

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    const lower = key.toLowerCase();
    if (sensitiveKeys.some((s) => lower.includes(s))) {
      out[key] = "[REDACTED]";
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = redactSecrets(value as Record<string, unknown>);
    } else {
      out[key] = value;
    }
  }
  return out;
}

function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  if (!shouldLog(level)) return;

  const line = `${LOG_PREFIX} ${message}${formatMeta(meta)}`;
  switch (level) {
    case "debug":
      console.debug(line);
      break;
    case "info":
      console.info(line);
      break;
    case "warn":
      console.warn(line);
      break;
    case "error":
      console.error(line);
      break;
  }
}

export const aemLog = {
  debug: (message: string, meta?: Record<string, unknown>) =>
    log("debug", message, meta),
  info: (message: string, meta?: Record<string, unknown>) =>
    log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) =>
    log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) =>
    log("error", message, meta),
};

/** Log URL without query secrets; path only for GraphQL */
export function sanitizeUrlForLog(url: string): string {
  try {
    const parsed = new URL(url);
    return `${parsed.origin}${parsed.pathname}${parsed.search ? "?…" : ""}`;
  } catch {
    return url.replace(/Bearer\s+\S+/gi, "Bearer [REDACTED]");
  }
}
