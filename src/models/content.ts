export interface Service {
  id: string
  icon: string
  title: string
  summary: string
  features: string[]
}

export interface ProcessStep {
  id: string
  order: number
  icon: string
  title: string
  description: string
}

export interface PlatformFeature {
  icon: string
  title: string
  description: string
}

export interface PlatformSection {
  id: 'driver-app' | 'rep-portal'
  title: string
  tagline: string
  features: PlatformFeature[]
}

export interface ComplianceItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface ComplianceReportType {
  id: string
  title: string
  description: string
}

export interface Stat {
  id: string
  value: number
  prefix?: string
  suffix?: string
  label: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  facilityType: string
  initials: string
}

export interface Faq {
  id: string
  question: string
  answer: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  initials: string
}

export interface Milestone {
  id: string
  year: string
  title: string
  description: string
}

export interface CoverageRegion {
  id: string
  region: string
  states: string[]
  dispatchHub: string
  description: string
}

export interface CompanyInfo {
  name: string
  legalName: string
  founded: string
  hqAddress: {
    line1: string
    city: string
    state: string
    zip: string
  }
  phone: string
  email: string
  supportHours: string
}

export interface ContactFormPayload {
  name: string
  organization: string
  email: string
  phone: string
  serviceInterest: string
  message: string
}

export interface ContactSubmissionResult {
  success: boolean
  referenceId: string
  submittedAt: string
}

export interface RateTier {
  id: string
  label: string
  description: string
  multiplier: number
}

export interface RateConfig {
  trayRate: number
  binRate: number
  minimumCharge: number
  currency: string
  serviceTiers: RateTier[]
  distanceTiers: RateTier[]
}
