import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', () => {
  const isMobileNavOpen = ref(false)

  function openMobileNav() {
    isMobileNavOpen.value = true
  }

  function closeMobileNav() {
    isMobileNavOpen.value = false
  }

  function toggleMobileNav() {
    isMobileNavOpen.value = !isMobileNavOpen.value
  }

  return { isMobileNavOpen, openMobileNav, closeMobileNav, toggleMobileNav }
})
