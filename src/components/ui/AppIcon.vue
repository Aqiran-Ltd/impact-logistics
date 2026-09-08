<script setup lang="ts">
import { computed } from 'vue'
import {
  Truck,
  Camera,
  Route,
  FileCheck2,
  Siren,
  Building2,
  AlertTriangle,
  Warehouse,
  PackageCheck,
  ShieldCheck,
  MapPinCheck,
  BadgeCheck,
  LogIn,
  PackageSearch,
  ImagePlus,
  TriangleAlert,
  LayoutDashboard,
  Activity,
  FileSearch,
  Hand,
  History,
  ClipboardList,
  Lock,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
} from '@lucide/vue'

const registry = {
  Truck,
  Camera,
  Route,
  FileCheck2,
  Siren,
  Building2,
  AlertTriangle,
  Warehouse,
  PackageCheck,
  ShieldCheck,
  MapPinCheck,
  BadgeCheck,
  LogIn,
  PackageSearch,
  ImagePlus,
  TriangleAlert,
  LayoutDashboard,
  Activity,
  FileSearch,
  Hand,
  History,
  ClipboardList,
  Lock,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
} as const

export type IconName = keyof typeof registry

const props = defineProps<{ name: string; strokeWidth?: number }>()

const icon = computed(() => registry[props.name as IconName] ?? CheckCircle2)
</script>

<template>
  <component :is="icon" :stroke-width="strokeWidth ?? 1.75" />
</template>
