import type { Faq } from '@/models/content'
import faqsData from '@/data/faqs.json'
import pricingFaqsData from '@/data/pricingFaqs.json'
import { mockDelay } from '@/utils/delay'

export function getFaqs(): Promise<Faq[]> {
  return mockDelay(faqsData as Faq[])
}

export function getPricingFaqs(): Promise<Faq[]> {
  return mockDelay(pricingFaqsData as Faq[])
}
