export type AemErrorCode =
  | "CONFIG_MISSING"
  | "CONFIG_INVALID"
  | "AUTH_JWT_SIGN_FAILED"
  | "AUTH_IMS_EXCHANGE_FAILED"
  | "AUTH_TOKEN_UNAVAILABLE"
  | "FETCH_NETWORK"
  | "FETCH_HTTP"
  | "FETCH_TIMEOUT"
  | "RESPONSE_EMPTY"
  | "RESPONSE_PARSE"
  | "AEM_UNAVAILABLE"
  | "CONTENT_NOT_FOUND"
  | "UNKNOWN";

export type AemErrorDetails = {
  status?: number;
  statusText?: string;
  imsError?: string;
  imsErrorDescription?: string;
  missingEnvVars?: string[];
  url?: string;
  path?: string;
  cause?: string;
};

export class AemError extends Error {
  readonly code: AemErrorCode;
  readonly details: AemErrorDetails;
  readonly isRetryable: boolean;
  readonly timestamp: string;

  constructor(
    code: AemErrorCode,
    message: string,
    options?: {
      details?: AemErrorDetails;
      isRetryable?: boolean;
      cause?: unknown;
    }
  ) {
    super(message);
    this.name = "AemError";
    this.code = code;
    this.details = options?.details ?? {};
    this.isRetryable = options?.isRetryable ?? false;
    this.timestamp = new Date().toISOString();

    if (options?.cause instanceof Error) {
      this.cause = options.cause;
    }
  }

  toLogPayload(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
      isRetryable: this.isRetryable,
      timestamp: this.timestamp,
      details: this.details,
    };
  }

  /** Safe for client UI — no secrets */
  toPublicView(isDev: boolean): {
    code: AemErrorCode;
    title: string;
    message: string;
    hint?: string;
    isRetryable: boolean;
    details?: AemErrorDetails;
  } {
    const { title, message, hint } = getPublicErrorCopy(this);
    return {
      code: this.code,
      title,
      message,
      hint,
      isRetryable: this.isRetryable,
      ...(isDev ? { details: this.details } : {}),
    };
  }
}

function getPublicErrorCopy(error: AemError): {
  title: string;
  message: string;
  hint?: string;
} {
  switch (error.code) {
    case "CONFIG_MISSING":
    case "CONFIG_INVALID":
      return {
        title: "Configuration error",
        message: error.message,
        hint: "Verify AEM_* environment variables in .env.local and restart the dev server.",
      };
    case "AUTH_JWT_SIGN_FAILED":
    case "AUTH_IMS_EXCHANGE_FAILED":
    case "AUTH_TOKEN_UNAVAILABLE":
      return {
        title: "Authentication failed",
        message: "Could not obtain an Adobe IMS access token for AEM.",
        hint: "Check AEM_PRIVATE_KEY format, technical account ID, metascopes, and client credentials in Adobe Developer Console.",
      };
    case "FETCH_TIMEOUT":
      return {
        title: "Request timed out",
        message: "AEM did not respond in time.",
        hint: "Confirm AEM_HOST is reachable and the publish tier is up.",
      };
    case "FETCH_NETWORK":
      return {
        title: "Network error",
        message: "Unable to reach the AEM server.",
        hint: "Check AEM_HOST URL, VPN, and firewall rules.",
      };
    case "FETCH_HTTP":
      return {
        title: "AEM request failed",
        message: error.message,
        hint:
          error.details.status === 401 || error.details.status === 403
            ? "Token may be invalid or the technical account lacks access to this endpoint."
            : "Verify the GraphQL persistent query path and content path exist in AEM.",
      };
    case "AEM_UNAVAILABLE":
      return {
        title: "AEM environment unavailable",
        message: error.message,
        hint:
          error.details.cause === "hibernated"
            ? "Open Adobe Experience Cloud → AEM → your program → Environment, wake the author/publish tier, then retry. Or point AEM_HOST at an active publish URL."
            : "Check AEM Cloud Manager environment status; the tier may be down or scaling.",
      };
    case "CONTENT_NOT_FOUND":
      return {
        title: "Content not found",
        message: "AEM responded but no page content was returned for this path.",
        hint: "Confirm the content fragment path exists and is published.",
      };
    case "RESPONSE_EMPTY":
    case "RESPONSE_PARSE":
      return {
        title: "Unexpected AEM response",
        message: error.message,
        hint: "Inspect AEM GraphQL response shape against the HomePage query.",
      };
    default:
      return {
        title: "Something went wrong",
        message: error.message,
        hint: "Check server logs for [AEM] entries.",
      };
  }
}

export function isAemError(error: unknown): error is AemError {
  return error instanceof AemError;
}

export function normalizeToAemError(error: unknown, context?: string): AemError {
  if (isAemError(error)) {
    return error;
  }

  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  return new AemError("UNKNOWN", context ? `${context}: ${message}` : message, {
    details: { cause: message },
    cause: error,
  });
}
