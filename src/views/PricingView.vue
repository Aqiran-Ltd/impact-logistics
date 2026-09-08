<script setup lang="ts">
import PageIntro from '@/components/sections/PageIntro.vue'
import RateCalculator from '@/components/sections/RateCalculator.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import { pricingHeroImage } from '@/data/stockImages'
import { getPricingFaqs } from '@/services/faqs.service'
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Pricing"
      title="One formula, no surprises."
      subtitle="Trays and bins, service speed, and distance — the same three inputs dispatch uses to build every quote."
      :image="pricingHeroImage"
    />

    <RateCalculator />

    <div class="bg-ink-50/60">
      <FaqSection title="Pricing questions" :loader="getPricingFaqs" />
    </div>

    <CtaBanner
      title="Ready to lock in a rate for your facility?"
      subtitle="Tell us your typical volume and route pattern — most quotes are confirmed within one business day."
    />
  </div>
</template>
