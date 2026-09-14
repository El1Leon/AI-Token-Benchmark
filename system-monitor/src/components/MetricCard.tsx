type MetricCardProps = {
  label: string
  value: number
  suffix?: string
  warningAt: number
  criticalAt: number
}

export function MetricCard({
  label,
  value,
  suffix = '%',
  warningAt,
  criticalAt,
}: MetricCardProps) {
  let status = 'normal'

  // Intentional benchmark defect:
  // exactly warningAt is incorrectly treated as normal.
  if (value > criticalAt) {
    status = 'critical'
  } else if (value > warningAt) {
    status = 'warning'
  }

  return (
    <article className={`metric-card ${status}`}>
      <span>{label}</span>
      <strong>
        {value}
        {suffix}
      </strong>
      <small>{status}</small>
    </article>
  )
}
