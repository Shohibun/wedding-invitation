export const RetryPolicy = {
  calculateNextAttempt(retryCount: number): Date {
    // Exponential backoff: 1min, 2min, 4min, 8min...
    const delayMinutes = Math.pow(2, retryCount);
    const nextAttempt = new Date();
    nextAttempt.setMinutes(nextAttempt.getMinutes() + delayMinutes);
    return nextAttempt;
  },

  hasExceededMaxRetries(retryCount: number, maxRetries: number = 5): boolean {
    return retryCount >= maxRetries;
  },
};
