<script setup lang="ts">
import { getStats } from '@/services/stats.service'
import { useAsyncData } from '@/composables/useAsyncData'
import StatCounter from '@/components/ui/StatCounter.vue'

const { data: stats } = useAsyncData(getStats)
</script>

<template>
  <section class="bg-ink-950">
    <div class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="grid grid-cols-2 gap-10 lg:grid-cols-4">
        <StatCounter v-for="stat in stats" :key="stat.id" :stat="stat" />
      </div>
    </div>
  </section>
</template>
