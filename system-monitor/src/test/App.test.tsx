import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { MetricCard } from '../components/MetricCard'

describe('System Monitor benchmark fixture', () => {
  it('renders the dashboard', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'System Monitor' }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Processes' }),
    ).toBeInTheDocument()
  })

  it('should search process names without case sensitivity', () => {
    render(<App />)

    fireEvent.change(
      screen.getByPlaceholderText('Search processes'),
      { target: { value: 'safari' } },
    )

    expect(screen.getByText('Safari')).toBeInTheDocument()
  })

  it('should treat the warning threshold itself as warning', () => {
    const { container } = render(
      <MetricCard
        label="CPU"
        value={75}
        warningAt={75}
        criticalAt={90}
      />,
    )

    expect(container.querySelector('.metric-card')).toHaveClass('warning')
  })
})
