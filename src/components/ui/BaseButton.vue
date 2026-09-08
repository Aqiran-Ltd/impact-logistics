<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'md' | 'lg'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
  },
)

const tag = computed(() => (props.to ? RouterLink : props.href ? 'a' : 'button'))

// Bound via v-bind rather than individual :to/:href attrs so an unused prop's
// `undefined` value can't fall through and clobber the element's real attribute
// (e.g. RouterLink's own generated href) when the other variant is in use.
const linkBindings = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return {}
})

const sizeClasses = computed(() =>
  props.size === 'lg' ? 'px-6 py-3.5 text-sm' : 'px-5 py-2.5 text-xs',
)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-white'
    case 'ghost':
      return 'text-ink-700 hover:text-brand-700 hover:bg-brand-50'
    default:
      return 'bg-ink-900 text-white hover:bg-brand-700'
  }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="linkBindings"
    :type="tag === 'button' ? type : undefined"
    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md font-semibold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    :class="[sizeClasses, variantClasses]"
  >
    <slot />
  </component>
</template>
