import type { ComplianceItem, ComplianceReportType } from '@/models/content'
import complianceItemsData from '@/data/complianceItems.json'
import complianceReportTypesData from '@/data/complianceReportTypes.json'
import { mockDelay } from '@/utils/delay'

export function getComplianceItems(): Promise<ComplianceItem[]> {
  return mockDelay(complianceItemsData as ComplianceItem[])
}

export function getComplianceReportTypes(): Promise<ComplianceReportType[]> {
  return mockDelay(complianceReportTypesData as ComplianceReportType[])
}
