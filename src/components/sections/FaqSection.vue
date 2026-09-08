<script setup lang="ts">
import { computed } from 'vue'
import type { Faq } from '@/models/content'
import { getFaqs } from '@/services/faqs.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FaqAccordionItem from '@/components/ui/FaqAccordionItem.vue'

const props = withDefaults(
  defineProps<{
    limit?: number
    title?: string
    loader?: () => Promise<Faq[]>
  }>(),
  {
    title: 'Frequently asked questions',
    loader: getFaqs,
  },
)

const { data: faqs } = useAsyncData(props.loader)
const visible = computed(() => (props.limit ? faqs.value?.slice(0, props.limit) : faqs.value) ?? [])
</script>

<template>
  <section class="mx-auto max-w-3xl px-6 py-24 lg:px-8">
    <SectionHeading eyebrow="Questions" :title="title" align="center" />
    <div class="mt-10">
      <FaqAccordionItem v-for="faq in visible" :key="faq.id" :faq="faq" />
    </div>
  </section>
</template>
