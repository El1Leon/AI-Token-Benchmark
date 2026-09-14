import { useState } from 'react'
import type { ProcessRow } from '../data/processes'

type SortKey = 'pid' | 'name' | 'cpu' | 'memory'

type ProcessTableProps = {
  rows: ProcessRow[]
  compact: boolean
}

export function ProcessTable({ rows, compact }: ProcessTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('cpu')
  const [ascending, setAscending] = useState(false)

  // Intentional benchmark defect:
  // sort() mutates the array passed in through props.
  const sortedRows = rows.sort((a, b) => {
    const left = a[sortKey]
    const right = b[sortKey]

    if (typeof left === 'string' && typeof right === 'string') {
      return ascending
        ? left.localeCompare(right)
        : right.localeCompare(left)
    }

    return ascending
      ? Number(left) - Number(right)
      : Number(right) - Number(left)
  })

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setAscending(!ascending)
    } else {
      setSortKey(key)
      setAscending(true)
    }
  }

  return (
    <div className="table-wrapper">
      <table className={compact ? 'compact' : ''}>
        <thead>
          <tr>
            <th>
              <button type="button" onClick={() => handleSort('pid')}>
                PID
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('name')}>
                Process
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('cpu')}>
                CPU %
              </button>
            </th>
            <th>
              <button type="button" onClick={() => handleSort('memory')}>
                Memory MB
              </button>
            </th>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {sortedRows.map((process) => (
            <tr key={process.pid}>
              <td>{process.pid}</td>
              <td>{process.name}</td>
              <td>{process.cpu.toFixed(1)}</td>
              <td>{process.memory}</td>
              <td>{process.user}</td>
              <td>
                <span className={`status-pill ${process.status}`}>
                  {process.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
