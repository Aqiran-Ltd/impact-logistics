/**
 * Simulates network latency for the mock data layer so loading states are
 * exercised the same way they will be once real API calls replace these.
 */
export function mockDelay<T>(value: T, ms = 250): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}
