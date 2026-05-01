import { describe, it, expect } from 'vitest'
import { cn } from '@/app/components/ui/utils'

describe('cn()', () => {
  it('returns a single class unchanged', () => {
    expect(cn('px-4')).toBe('px-4')
  })

  it('merges multiple classes', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('resolves tailwind conflicts — last value wins', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('filters out falsy values', () => {
    expect(cn('px-4', false, null, undefined, '')).toBe('px-4')
  })

  it('handles conditional classes', () => {
    const active = true
    const disabled = false
    expect(cn('base', active && 'active', disabled && 'disabled')).toBe('base active')
  })

  it('returns empty string when given only falsy inputs', () => {
    expect(cn(false, null, undefined)).toBe('')
  })

  it('handles array inputs', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2')
  })

  it('handles object inputs', () => {
    expect(cn({ 'px-4': true, 'py-2': false })).toBe('px-4')
  })
})
