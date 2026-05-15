import { AemError } from "./errors";
import { aemLog } from "./logger";

type HtmlAemState = "hibernated" | "maintenance" | "unavailable" | "unknown";

function detectHtmlAemState(html: string): HtmlAemState {
  if (/healthy\s*=\s*["']hibernated["']/i.test(html)) return "hibernated";
  if (/status\s*=\s*["']503["']/i.test(html)) return "unavailable";
  if (/errors\.adobeaemcloud\.com/i.test(html)) return "maintenance";
  return "unknown";
}

function isHtmlPayload(data: unknown): data is string {
  if (typeof data !== "string") return false;
  const trimmed = data.trimStart();
  return (
    trimmed.startsWith("<!DOCTYPE") ||
    trimmed.startsWith("<html") ||
    trimmed.includes("errors.adobeaemcloud.com")
  );
}

export function assertJsonGraphqlResponse(
  data: unknown,
  meta: { url: string; contentType?: string }
): asserts data is Record<string, unknown> {
  const { url, contentType } = meta;

  if (isHtmlPayload(data)) {
    const aemState = detectHtmlAemState(data);
    aemLog.error("AEM returned HTML instead of JSON", {
      url,
      contentType,
      aemState,
    });

    const messages: Record<HtmlAemState, string> = {
      hibernated:
        "The AEM Cloud environment is hibernated (asleep). It must be woken before GraphQL requests will work.",
      maintenance:
        "AEM Cloud is serving a maintenance/status page instead of API content.",
      unavailable: "AEM Cloud returned a 503 status page.",
      unknown: "AEM returned HTML instead of the expected JSON GraphQL response.",
    };

    throw new AemError("AEM_UNAVAILABLE", messages[aemState], {
      details: { url, cause: aemState, status: 503 },
      isRetryable: true,
    });
  }

  if (typeof data !== "object" || data === null) {
    aemLog.error("AEM response is not a JSON object", {
      url,
      contentType,
      typeofData: typeof data,
    });
    throw new AemError(
      "RESPONSE_PARSE",
      "AEM returned a non-JSON response. Expected a GraphQL JSON object.",
      { details: { url, cause: typeof data } }
    );
  }
}
