<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useUiStore } from '@/stores/ui.store'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const ui = useUiStore()
const route = useRoute()
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 12)

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/platform', label: 'Platform' },
  { to: '/compliance', label: 'Compliance' },
  { to: '/about', label: 'About' },
]

function isActive(to: string) {
  return route.path === to
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b-2 border-ink-900 bg-white transition-shadow duration-300"
    :class="isScrolled && 'shadow-[0_4px_12px_-4px_rgba(15,23,42,0.15)]'"
  >
    <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
      <RouterLink to="/" class="flex items-center gap-2.5" @click="ui.closeMobileNav">
        <span
          class="flex h-9 w-9 items-center justify-center rounded-md bg-ink-900 font-mono text-sm font-semibold text-brand-400"
        >
          IM
        </span>
        <span class="font-display text-base font-extrabold tracking-tight text-ink-900">
          Impact Medical Logistics
        </span>
      </RouterLink>

      <nav class="hidden items-center gap-1 lg:flex">
        <RouterLink
          v-for="(link, index) in navLinks"
          :key="link.to"
          :to="link.to"
          class="group flex items-center gap-2 border-b-2 px-2.5 py-2 transition-colors"
          :class="isActive(link.to) ? 'border-brand-600' : 'border-transparent'"
        >
          <span
            class="flex h-5 w-5 items-center justify-center rounded-sm border-2 font-mono text-[10px] font-semibold transition-colors"
            :class="
              isActive(link.to)
                ? 'border-ink-900 bg-ink-900 text-brand-400'
                : 'border-ink-200 text-ink-400 group-hover:border-ink-400 group-hover:text-ink-600'
            "
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <span
            class="text-sm transition-colors"
            :class="
              isActive(link.to)
                ? 'font-bold text-ink-900'
                : 'font-medium text-ink-500 group-hover:text-ink-900'
            "
          >
            {{ link.label }}
          </span>
        </RouterLink>
      </nav>

      <div class="hidden lg:block">
        <BaseButton to="/contact">Request a Quote</BaseButton>
      </div>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 lg:hidden"
        aria-label="Toggle navigation menu"
        @click="ui.toggleMobileNav"
      >
        <AppIcon :name="ui.isMobileNavOpen ? 'X' : 'Menu'" class="h-6 w-6" />
      </button>
    </div>

    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="ui.isMobileNavOpen"
        class="border-t-2 border-ink-900 bg-white px-6 py-6 lg:hidden"
      >
        <ul class="flex flex-col gap-1">
          <li v-for="(link, index) in navLinks" :key="link.to">
            <RouterLink
              :to="link.to"
              class="flex items-center gap-3 rounded-md px-3 py-2.5 text-base transition-colors"
              :class="
                isActive(link.to)
                  ? 'bg-brand-50 font-bold text-brand-700'
                  : 'font-medium text-ink-700 hover:bg-ink-50'
              "
              @click="ui.closeMobileNav"
            >
              <span
                class="flex h-5 w-5 items-center justify-center rounded-sm border-2 font-mono text-[10px] font-semibold"
                :class="
                  isActive(link.to)
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-ink-200 text-ink-400'
                "
              >
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
        <BaseButton to="/contact" class="mt-4 w-full" @click="ui.closeMobileNav">
          Request a Quote
        </BaseButton>
      </nav>
    </Transition>
  </header>
</template>
