"use client";

export default function AemRetryButton() {
  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="mt-4 rounded-md bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 transition"
    >
      Retry after AEM is awake
    </button>
  );
}
