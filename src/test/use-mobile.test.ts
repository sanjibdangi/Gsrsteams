import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useIsMobile } from '@/app/components/ui/use-mobile'

const MOBILE_BREAKPOINT = 768

function mockWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
}

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn((_, cb) => {
      // store so tests can trigger it
      ;(window as any).__mqlListeners = (window as any).__mqlListeners ?? []
      ;(window as any).__mqlListeners.push(cb)
    }),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

beforeEach(() => {
  ;(window as any).__mqlListeners = []
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useIsMobile', () => {
  it('returns false when window.innerWidth is at the breakpoint', () => {
    mockWindowWidth(MOBILE_BREAKPOINT)
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns false on a wide desktop viewport', () => {
    mockWindowWidth(1440)
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true on a narrow mobile viewport', () => {
    mockWindowWidth(375)
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns true when viewport is 1px below the breakpoint', () => {
    mockWindowWidth(MOBILE_BREAKPOINT - 1)
    mockMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('updates when the viewport crosses the breakpoint', () => {
    mockWindowWidth(1024)
    mockMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)

    // simulate resize to mobile
    act(() => {
      mockWindowWidth(375)
      ;(window as any).__mqlListeners.forEach((cb: () => void) => cb())
    })
    expect(result.current).toBe(true)
  })
})
