import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders map title', () => {
    render(<App />)
    expect(screen.getByText(/地图旅行记录/i)).toBeInTheDocument()
  })
})