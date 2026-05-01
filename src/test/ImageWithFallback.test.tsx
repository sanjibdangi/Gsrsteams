import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback'

const ERROR_SVG_PREFIX = 'data:image/svg+xml;base64,'

describe('ImageWithFallback', () => {
  it('renders a normal img with the given src and alt', () => {
    render(<ImageWithFallback src="https://example.com/photo.jpg" alt="A photo" />)
    const img = screen.getByRole('img', { name: 'A photo' })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('applies className and style to the img when no error', () => {
    render(
      <ImageWithFallback
        src="https://example.com/photo.jpg"
        alt="photo"
        className="rounded"
        style={{ width: 100 }}
      />
    )
    const img = screen.getByRole('img')
    expect(img).toHaveClass('rounded')
    expect(img).toHaveStyle({ width: '100px' })
  })

  it('shows SVG fallback wrapper on image load error', () => {
    render(<ImageWithFallback src="https://example.com/broken.jpg" alt="broken" />)
    const img = screen.getByAltText('broken')
    fireEvent.error(img)

    const fallback = screen.getByAltText('Error loading image')
    expect(fallback).toBeInTheDocument()
    expect(fallback.getAttribute('src')).toMatch(ERROR_SVG_PREFIX)
  })

  it('stores the original src in data-original-url after error', () => {
    render(<ImageWithFallback src="https://example.com/broken.jpg" alt="broken" />)
    fireEvent.error(screen.getByAltText('broken'))

    const fallback = screen.getByAltText('Error loading image')
    expect(fallback).toHaveAttribute('data-original-url', 'https://example.com/broken.jpg')
  })

  it('applies className and style to the wrapper div after error', () => {
    render(
      <ImageWithFallback
        src="https://example.com/broken.jpg"
        alt="broken"
        className="my-img"
        style={{ height: 200 }}
      />
    )
    fireEvent.error(screen.getByAltText('broken'))

    const wrapper = screen.getByAltText('Error loading image').closest('.my-img')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveStyle({ height: '200px' })
  })

  it('does not show the fallback before an error occurs', () => {
    render(<ImageWithFallback src="https://example.com/photo.jpg" alt="photo" />)
    expect(screen.queryByAltText('Error loading image')).not.toBeInTheDocument()
  })
})
