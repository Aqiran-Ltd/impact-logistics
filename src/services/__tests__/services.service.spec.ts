import { describe, it, expect } from 'vitest'
import { getServices, getServiceById } from '@/services/services.service'

describe('services.service', () => {
  it('returns the full mock service list with the expected shape', async () => {
    const services = await getServices()

    expect(services.length).toBeGreaterThan(0)
    for (const service of services) {
      expect(service).toMatchObject({
        id: expect.any(String),
        icon: expect.any(String),
        title: expect.any(String),
        summary: expect.any(String),
      })
      expect(Array.isArray(service.features)).toBe(true)
    }
  })

  it('resolves a single service by id', async () => {
    const service = await getServiceById('chain-of-custody')
    expect(service?.title).toBe('Chain-of-Custody Documentation')
  })

  it('resolves undefined for an unknown id', async () => {
    const service = await getServiceById('does-not-exist')
    expect(service).toBeUndefined()
  })
})
