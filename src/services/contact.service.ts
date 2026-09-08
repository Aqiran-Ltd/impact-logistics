import type { ContactFormPayload, ContactSubmissionResult } from '@/models/content'
import { mockDelay } from '@/utils/delay'

/**
 * Stands in for a real API call. Swap the body of this function for a fetch()
 * to the backend once it exists — every view already goes through this file,
 * not the JSON directly, so nothing else needs to change.
 */
export function submitContactForm(payload: ContactFormPayload): Promise<ContactSubmissionResult> {
  if (!payload.name || !payload.email || !payload.message) {
    return Promise.reject(new Error('Name, email, and message are required.'))
  }

  const result: ContactSubmissionResult = {
    success: true,
    referenceId: `IML-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
  }

  return mockDelay(result, 600)
}
