import { ref, watch, type Ref } from 'vue'

const easeOutQuad = (t: number) => t * (2 - t)

/**
 * Animates a number from 0 up to `target` over `duration` ms, starting the
 * first time `active` becomes true. Intended to be paired with a ref from
 * useScrollReveal so counters only animate once they're on screen.
 */
export function useCountUp(target: number, active: Ref<boolean>, duration = 1400) {
  const display = ref(0)
  let started = false

  watch(
    active,
    (isActive) => {
      if (!isActive || started) return
      started = true

      const startTime = performance.now()

      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / duration, 1)
        display.value = Math.round(target * easeOutQuad(progress) * 100) / 100
        if (progress < 1) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    },
    { immediate: true },
  )

  return display
}
