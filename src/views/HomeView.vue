<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import TrustBar from '@/components/sections/TrustBar.vue'
import ServicesOverview from '@/components/sections/ServicesOverview.vue'
import ProcessSteps from '@/components/sections/ProcessSteps.vue'
import PlatformTeaser from '@/components/sections/PlatformTeaser.vue'
import StatsSection from '@/components/sections/StatsSection.vue'
import ComplianceTeaser from '@/components/sections/ComplianceTeaser.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import FaqSection from '@/components/sections/FaqSection.vue'
import RateCalculator from '@/components/sections/RateCalculator.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
</script>

<template>
  <div>
    <HeroSection />
    <TrustBar />
    <ServicesOverview />
    <ProcessSteps />
    <PlatformTeaser />
    <StatsSection />
    <ComplianceTeaser />
    <TestimonialsSection />
    <FaqSection :limit="5" />
    <div class="bg-ink-50/60">
      <RateCalculator compact />
    </div>
    <CtaBanner />
  </div>
</template>
