import { ref, useTemplateRef } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

/**
 * Returns a template ref to attach to an element, plus a boolean ref that
 * flips to true the first time the element scrolls into view.
 */
export function useScrollReveal(threshold = 0.2) {
  const target = useTemplateRef<HTMLElement>('revealTarget')
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold },
  )

  return { target, isVisible }
}
