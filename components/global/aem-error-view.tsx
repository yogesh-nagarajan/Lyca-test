import type { AemErrorCode } from "../../lib/aem/errors";
import AemRetryButton from "./aem-retry-button";

export type AemErrorViewProps = {
  code: AemErrorCode;
  title: string;
  message: string;
  hint?: string;
  isRetryable?: boolean;
  details?: Record<string, unknown>;
  showTechnicalDetails?: boolean;
};

const WARNING_CODES: AemErrorCode[] = ["AEM_UNAVAILABLE", "FETCH_TIMEOUT", "FETCH_NETWORK"];

export default function AemErrorView({
  code,
  title,
  message,
  hint,
  isRetryable = false,
  details,
  showTechnicalDetails = false,
}: AemErrorViewProps) {
  const isWarning = WARNING_CODES.includes(code) || isRetryable;

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Lyca</h1>
      <div
        role="alert"
        className={
          isWarning
            ? "mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5"
            : "mt-6 rounded-lg border border-red-200 bg-red-50 p-5"
        }
      >
        <p
          className={
            isWarning
              ? "text-sm font-medium uppercase tracking-wide text-amber-800"
              : "text-sm font-medium uppercase tracking-wide text-red-800"
          }
        >
          {code.replace(/_/g, " ")}
        </p>
        <h2
          className={
            isWarning
              ? "mt-1 text-lg font-semibold text-amber-900"
              : "mt-1 text-lg font-semibold text-red-900"
          }
        >
          {title}
        </h2>
        <p className={isWarning ? "mt-2 text-amber-900" : "mt-2 text-red-800"}>
          {message}
        </p>
        {hint && (
          <p
            className={
              isWarning ? "mt-3 text-sm text-amber-800" : "mt-3 text-sm text-red-700"
            }
          >
            <span className="font-medium">What to check: </span>
            {hint}
          </p>
        )}
        {isRetryable && <AemRetryButton />}
      </div>
      {showTechnicalDetails && details && Object.keys(details).length > 0 && (
        <details className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            Technical details (development only)
          </summary>
          <pre className="mt-3 overflow-x-auto text-xs text-gray-800">
            {JSON.stringify(details, null, 2)}
          </pre>
        </details>
      )}
      <p className="mt-6 text-sm text-gray-500">
        Server logs are prefixed with{" "}
        <code className="rounded bg-gray-100 px-1">[AEM]</code> for easier filtering.
      </p>
    </main>
  );
}
