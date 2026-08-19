// Error capture and reporting for SSR errors

let lastCapturedError: Error | null = null;

/**
 * Capture an error for later retrieval.
 * This is used in error boundaries to store errors that can be accessed
 * by server.ts to render proper error pages.
 */
export function captureError(error: Error): void {
  lastCapturedError = error;
}

/**
 * Consume and return the last captured error.
 * After calling this, the error is cleared.
 */
export function consumeLastCapturedError(): Error | null {
  const error = lastCapturedError;
  lastCapturedError = null;
  return error;
}
