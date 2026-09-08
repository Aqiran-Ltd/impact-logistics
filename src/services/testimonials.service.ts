import type { Testimonial } from '@/models/content'
import testimonialsData from '@/data/testimonials.json'
import { mockDelay } from '@/utils/delay'

export function getTestimonials(): Promise<Testimonial[]> {
  return mockDelay(testimonialsData as Testimonial[])
}
