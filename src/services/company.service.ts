import type { CompanyInfo } from '@/models/content'
import companyData from '@/data/company.json'
import { mockDelay } from '@/utils/delay'

export function getCompanyInfo(): Promise<CompanyInfo> {
  return mockDelay(companyData as CompanyInfo)
}
