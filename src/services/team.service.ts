import type { TeamMember, Milestone } from '@/models/content'
import teamData from '@/data/team.json'
import milestonesData from '@/data/milestones.json'
import { mockDelay } from '@/utils/delay'

export function getTeamMembers(): Promise<TeamMember[]> {
  return mockDelay(teamData as TeamMember[])
}

export function getMilestones(): Promise<Milestone[]> {
  return mockDelay(milestonesData as Milestone[])
}
