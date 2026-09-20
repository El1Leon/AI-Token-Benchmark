import { spawnSync } from 'node:child_process'

const result = spawnSync('npm', ['test'], {
  cwd: new URL('../system-monitor/', import.meta.url),
  encoding: 'utf8',
})

const output = `${result.stdout}\n${result.stderr}`
const expectedFailures = [
  'should search process names without case sensitivity',
  'should treat the warning threshold itself as warning',
]

if (result.status === 0 || !expectedFailures.every((failure) => output.includes(failure))) {
  console.error('System Monitor baseline no longer has the documented seeded test failures.')
  process.exit(1)
}

console.log('Verified: System Monitor baseline reports the two documented seeded test failures.')
