import { useState } from 'react'
import './App.css'
import { MetricCard } from './components/MetricCard'
import { ProcessTable } from './components/ProcessTable'
import { SettingsModal } from './components/SettingsModal'
import { processes } from './data/processes'

function App() {
  const [query, setQuery] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [compactMode, setCompactMode] = useState(false)

  // Intentional benchmark defect:
  // search is case-sensitive and repeated unnecessarily.
  const visibleProcesses = processes.filter((process) =>
    process.name.includes(query),
  )

  const processCount = processes.filter((process) =>
    process.name.includes(query),
  ).length

  return (
    <main className={darkMode ? 'app dark' : 'app light'}>
      <header className="topbar">
        <div>
          <p className="eyebrow">LOCAL MOCK TELEMETRY</p>
          <h1>System Monitor</h1>
        </div>

        <div className="header-actions">
          <button
            type="button"
            onClick={() => setDarkMode((value) => !value)}
          >
            {darkMode ? 'Light mode' : 'Dark mode'}
          </button>

          <button type="button" onClick={() => setSettingsOpen(true)}>
            Settings
          </button>
        </div>
      </header>

      <section className="metrics-grid" aria-label="System metrics">
        <MetricCard
          label="CPU"
          value={75}
          warningAt={75}
          criticalAt={90}
        />
        <MetricCard
          label="Memory"
          value={68}
          warningAt={70}
          criticalAt={90}
        />
        <MetricCard
          label="Disk"
          value={82}
          warningAt={80}
          criticalAt={95}
        />
        <MetricCard
          label="Network"
          value={412}
          suffix=" Mbps"
          warningAt={700}
          criticalAt={900}
        />
      </section>

      <section className="process-panel">
        <div className="panel-heading">
          <div>
            <h2>Processes</h2>
            <p>{processCount} visible processes</p>
          </div>

          <input
            type="search"
            placeholder="Search processes"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <ProcessTable rows={visibleProcesses} compact={compactMode} />
      </section>

      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        compactMode={compactMode}
        onCompactModeChange={setCompactMode}
      />
    </main>
  )
}

export default App
