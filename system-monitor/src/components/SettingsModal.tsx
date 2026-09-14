type SettingsModalProps = {
  open: boolean
  onClose: () => void
  compactMode: boolean
  onCompactModeChange: (value: boolean) => void
}

export function SettingsModal({
  open,
  onClose,
  compactMode,
  onCompactModeChange,
}: SettingsModalProps) {
  if (!open) {
    return null
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>Dashboard Settings</h2>

          {/* Intentional benchmark defect: no accessible name */}
          <button type="button" className="icon-button" onClick={onClose}>
            ×
          </button>
        </div>

        <label className="setting-row">
          <span>Compact process table</span>
          <input
            type="checkbox"
            checked={compactMode}
            onChange={(event) => onCompactModeChange(event.target.checked)}
          />
        </label>

        <p className="hint">
          Changes apply locally to this mock dashboard.
        </p>
      </div>
    </div>
  )
}
