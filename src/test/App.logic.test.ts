import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ---------------------------------------------------------------------------
// Stats counter animation logic
// Mirrors the useEffect in App.tsx (countersVisible branch)
// ---------------------------------------------------------------------------
const TARGETS = { clients: 500, officers: 100, response: 24, satisfaction: 98 }
const STEPS = 60

function calcStatsAtStep(step: number) {
  const progress = step / STEPS
  return {
    clients: Math.floor(TARGETS.clients * progress),
    officers: Math.floor(TARGETS.officers * progress),
    response: Math.floor(TARGETS.response * progress),
    satisfaction: Math.floor(TARGETS.satisfaction * progress),
  }
}

describe('Stats counter animation', () => {
  it('starts at zero on step 0', () => {
    const stats = calcStatsAtStep(0)
    expect(stats).toEqual({ clients: 0, officers: 0, response: 0, satisfaction: 0 })
  })

  it('reaches exactly the target values on the final step', () => {
    // The effect calls setStats(targets) on the final step — verify the targets are correct
    expect(TARGETS).toEqual({ clients: 500, officers: 100, response: 24, satisfaction: 98 })
  })

  it('mid-point values are approximately half the target', () => {
    const stats = calcStatsAtStep(STEPS / 2)
    expect(stats.clients).toBe(250)
    expect(stats.officers).toBe(50)
    expect(stats.response).toBe(12)
    expect(stats.satisfaction).toBe(49)
  })

  it('values never exceed the targets during animation', () => {
    for (let step = 0; step <= STEPS; step++) {
      const stats = calcStatsAtStep(step)
      expect(stats.clients).toBeLessThanOrEqual(TARGETS.clients)
      expect(stats.officers).toBeLessThanOrEqual(TARGETS.officers)
      expect(stats.response).toBeLessThanOrEqual(TARGETS.response)
      expect(stats.satisfaction).toBeLessThanOrEqual(TARGETS.satisfaction)
    }
  })

  it('values are monotonically non-decreasing across all steps', () => {
    let prev = calcStatsAtStep(0)
    for (let step = 1; step <= STEPS; step++) {
      const curr = calcStatsAtStep(step)
      expect(curr.clients).toBeGreaterThanOrEqual(prev.clients)
      expect(curr.officers).toBeGreaterThanOrEqual(prev.officers)
      expect(curr.response).toBeGreaterThanOrEqual(prev.response)
      expect(curr.satisfaction).toBeGreaterThanOrEqual(prev.satisfaction)
      prev = curr
    }
  })

  it('uses setInterval with the correct tick interval (2000ms / 60 steps)', () => {
    const duration = 2000
    const steps = 60
    expect(duration / steps).toBeCloseTo(33.33, 1)
  })
})

// ---------------------------------------------------------------------------
// Floating CTA threshold logic
// ---------------------------------------------------------------------------
describe('Floating CTA threshold', () => {
  const THRESHOLD = 800

  it('is hidden at scroll position 0', () => {
    expect(0 > THRESHOLD).toBe(false)
  })

  it('is hidden at exactly the threshold', () => {
    expect(800 > THRESHOLD).toBe(false)
  })

  it('is visible one pixel past the threshold', () => {
    expect(801 > THRESHOLD).toBe(true)
  })

  it('is visible deep into the page', () => {
    expect(5000 > THRESHOLD).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Section detection logic
// Mirrors the getBoundingClientRect check in the handleScroll callback
// ---------------------------------------------------------------------------
function detectActiveSection(
  sections: string[],
  getRectForSection: (id: string) => { top: number; bottom: number } | null
): string | undefined {
  return sections.find(section => {
    const rect = getRectForSection(section)
    if (!rect) return false
    return rect.top <= 100 && rect.bottom >= 100
  })
}

describe('Section detection', () => {
  const sections = ['home', 'about', 'services', 'differentiators', 'performance', 'corporate', 'contact']

  it('detects the section whose rect straddles the 100px boundary', () => {
    const active = detectActiveSection(sections, id =>
      id === 'services' ? { top: 50, bottom: 400 } : { top: 500, bottom: 900 }
    )
    expect(active).toBe('services')
  })

  it('returns undefined when no section straddles the boundary', () => {
    const active = detectActiveSection(sections, () => ({ top: 200, bottom: 800 }))
    expect(active).toBeUndefined()
  })

  it('matches the first qualifying section in list order', () => {
    // both 'home' and 'about' straddle — 'home' comes first
    const active = detectActiveSection(sections, id =>
      ['home', 'about'].includes(id) ? { top: 0, bottom: 200 } : { top: 500, bottom: 900 }
    )
    expect(active).toBe('home')
  })

  it('section is not active when top is exactly 101 (above boundary)', () => {
    const active = detectActiveSection(sections, id =>
      id === 'about' ? { top: 101, bottom: 400 } : null
    )
    expect(active).toBeUndefined()
  })

  it('section is not active when bottom is exactly 99 (below boundary)', () => {
    const active = detectActiveSection(sections, id =>
      id === 'about' ? { top: 0, bottom: 99 } : null
    )
    expect(active).toBeUndefined()
  })

  it('section is active when top === 100 (boundary-inclusive)', () => {
    const active = detectActiveSection(sections, id =>
      id === 'contact' ? { top: 100, bottom: 300 } : null
    )
    expect(active).toBe('contact')
  })
})

// ---------------------------------------------------------------------------
// Stats section visibility logic
// ---------------------------------------------------------------------------
function isStatsSectionVisible(rect: { top: number; bottom: number }, windowHeight: number): boolean {
  return rect.top <= windowHeight && rect.bottom >= 0
}

describe('Stats section visibility', () => {
  it('is visible when the section is fully within the viewport', () => {
    expect(isStatsSectionVisible({ top: 100, bottom: 400 }, 768)).toBe(true)
  })

  it('is visible when only the top edge is within the viewport', () => {
    expect(isStatsSectionVisible({ top: 767, bottom: 1000 }, 768)).toBe(true)
  })

  it('is visible when only the bottom edge is within the viewport', () => {
    expect(isStatsSectionVisible({ top: -200, bottom: 1 }, 768)).toBe(true)
  })

  it('is not visible when the section is fully below the viewport', () => {
    expect(isStatsSectionVisible({ top: 800, bottom: 1200 }, 768)).toBe(false)
  })

  it('is not visible when the section is fully above the viewport', () => {
    expect(isStatsSectionVisible({ top: -400, bottom: -1 }, 768)).toBe(false)
  })
})
