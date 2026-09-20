import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const expectedSuite = 'System Monitor benchmark fixture'
const expectedFailures = new Set([
  `${expectedSuite} should search process names without case sensitivity`,
  `${expectedSuite} should treat the warning threshold itself as warning`,
])

function fail(message) {
  throw new Error(`System Monitor baseline verification failed: ${message}`)
}

export function validateBaselineReport(report, run) {
  if (run.error || run.signal || run.status !== 1) {
    fail('Vitest did not terminate with the expected test-failure exit status.')
  }

  if (
    report?.success !== false ||
    report.numTotalTests !== 3 ||
    report.numPassedTests !== 1 ||
    report.numFailedTests !== 2 ||
    report.numPendingTests !== 0 ||
    report.numTodoTests !== 0
  ) {
    fail('Vitest summary does not match the documented 3-test, 1-pass, 2-fail baseline.')
  }

  if (!Array.isArray(report.testResults) || report.testResults.length !== 1) {
    fail('The expected test suite did not execute exactly once.')
  }

  const [suite] = report.testResults
  if (!suite.name?.endsWith('/src/test/App.test.tsx')) {
    fail('Vitest did not report the expected App.test.tsx suite.')
  }

  const assertions = suite.assertionResults
  if (!Array.isArray(assertions) || assertions.length !== 3) {
    fail('The expected suite did not report exactly three test assertions.')
  }

  const failed = assertions.filter((assertion) => assertion.status === 'failed')
  const passed = assertions.filter((assertion) => assertion.status === 'passed')
  if (failed.length !== 2 || passed.length !== 1 || assertions.length !== failed.length + passed.length) {
    fail('The suite contains an unexpected assertion status or failure count.')
  }

  const failedNames = new Set(failed.map((assertion) => assertion.fullName))
  if (
    failedNames.size !== expectedFailures.size ||
    ![...expectedFailures].every((name) => failedNames.has(name)) ||
    !failed.every((assertion) => assertion.ancestorTitles?.join(' ') === expectedSuite)
  ) {
    fail('The failed tests are not exactly the two documented seeded failures.')
  }
}

function createValidReport() {
  const assertions = [
    ['renders the dashboard', 'passed'],
    ['should search process names without case sensitivity', 'failed'],
    ['should treat the warning threshold itself as warning', 'failed'],
  ].map(([title, status]) => ({
    ancestorTitles: [expectedSuite],
    fullName: `${expectedSuite} ${title}`,
    status,
    title,
  }))

  return {
    success: false,
    status: 'failed',
    message: '',
    numTotalTests: 3,
    numPassedTests: 1,
    numFailedTests: 2,
    numPendingTests: 0,
    numTodoTests: 0,
    testResults: [{ name: '/fixture/src/test/App.test.tsx', assertionResults: assertions }],
  }
}

function runAdversarialSelfTest() {
  const normalRun = { status: 1, signal: null, error: undefined }
  const valid = createValidReport()
  validateBaselineReport(valid, normalRun)

  const thirdFailure = structuredClone(valid)
  thirdFailure.numTotalTests = 4
  thirdFailure.numFailedTests = 3
  thirdFailure.testResults[0].assertionResults.push({
    ancestorTitles: [expectedSuite],
    fullName: `${expectedSuite} unexpected failure`,
    status: 'failed',
    title: 'unexpected failure',
  })
  assert.throws(() => validateBaselineReport(thirdFailure, normalRun))

  const missingExpectedFailure = structuredClone(valid)
  missingExpectedFailure.testResults[0].assertionResults[2].fullName = `${expectedSuite} unrelated failure`
  assert.throws(() => validateBaselineReport(missingExpectedFailure, normalRun))

  assert.throws(() => validateBaselineReport(valid, { status: null, signal: 'SIGTERM', error: undefined }))

  const zeroTests = structuredClone(valid)
  zeroTests.numTotalTests = 0
  zeroTests.numPassedTests = 0
  zeroTests.numFailedTests = 0
  zeroTests.testResults = []
  assert.throws(() => validateBaselineReport(zeroTests, normalRun))

  const namesOnlyInMessage = structuredClone(valid)
  namesOnlyInMessage.message = [...expectedFailures].join('\n')
  namesOnlyInMessage.testResults[0].assertionResults[1].fullName = `${expectedSuite} unrelated failure one`
  namesOnlyInMessage.testResults[0].assertionResults[2].fullName = `${expectedSuite} unrelated failure two`
  assert.throws(() => validateBaselineReport(namesOnlyInMessage, normalRun))

  console.log('Verifier adversarial self-test passed: expected baseline accepted; five invalid scenarios rejected.')
}

function verifyFixture(fixturePath) {
  const temporaryDirectory = mkdtempSync(join(tmpdir(), 'ai-benchmark-vitest-'))
  const reportPath = join(temporaryDirectory, 'report.json')

  try {
    const result = execFileSync(
      'npm',
      ['test', '--', '--reporter=json', `--outputFile=${reportPath}`],
      { cwd: fixturePath, encoding: 'utf8', stdio: 'pipe' },
    )
    fail(`Vitest unexpectedly passed: ${result}`)
  } catch (error) {
    const run = {
      status: error.status,
      signal: error.signal,
      error: error.code === 'ENOENT' ? error : undefined,
    }

    let report
    try {
      report = JSON.parse(readFileSync(reportPath, 'utf8'))
    } catch {
      fail('Vitest did not produce a readable JSON report.')
    }

    validateBaselineReport(report, run)
  } finally {
    rmSync(temporaryDirectory, { recursive: true, force: true })
  }

  console.log(`Verified strict System Monitor baseline in ${basename(resolve(fixturePath))}.`)
}

if (process.argv.includes('--self-test')) {
  runAdversarialSelfTest()
} else {
  const fixtureFlag = process.argv.indexOf('--fixture')
  const fixturePath = fixtureFlag >= 0
    ? resolve(process.argv[fixtureFlag + 1] ?? '')
    : resolve(scriptDirectory, '../system-monitor')
  verifyFixture(fixturePath)
}
