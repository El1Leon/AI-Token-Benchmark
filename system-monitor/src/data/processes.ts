export type ProcessRow = {
  pid: number
  name: string
  cpu: number
  memory: number
  user: string
  status: 'running' | 'sleeping' | 'warning'
}

export const processes: ProcessRow[] = [
  { pid: 101, name: 'WindowServer', cpu: 12.4, memory: 824, user: 'system', status: 'running' },
  { pid: 203, name: 'Safari', cpu: 18.7, memory: 1320, user: 'demo-user', status: 'running' },
  { pid: 284, name: 'Code Helper', cpu: 9.2, memory: 740, user: 'demo-user', status: 'running' },
  { pid: 330, name: 'kernel_task', cpu: 7.3, memory: 380, user: 'system', status: 'running' },
  { pid: 417, name: 'node', cpu: 22.1, memory: 512, user: 'demo-user', status: 'warning' },
  { pid: 522, name: 'ChatGPT', cpu: 4.8, memory: 690, user: 'demo-user', status: 'running' },
  { pid: 614, name: 'Finder', cpu: 1.9, memory: 245, user: 'demo-user', status: 'sleeping' },
  { pid: 777, name: 'Docker Desktop', cpu: 16.4, memory: 1850, user: 'demo-user', status: 'warning' },
  { pid: 811, name: 'Spotlight', cpu: 2.1, memory: 188, user: 'demo-user', status: 'running' },
  { pid: 905, name: 'Terminal', cpu: 3.5, memory: 224, user: 'demo-user', status: 'running' },
  { pid: 1022, name: 'Claude', cpu: 5.6, memory: 612, user: 'demo-user', status: 'running' },
  { pid: 1104, name: 'Codex', cpu: 11.7, memory: 540, user: 'demo-user', status: 'running' },
  { pid: 1298, name: 'mds_stores', cpu: 6.2, memory: 322, user: 'system', status: 'running' },
  { pid: 1410, name: 'Activity Monitor', cpu: 2.8, memory: 174, user: 'demo-user', status: 'sleeping' },
  { pid: 1555, name: 'backupd', cpu: 13.3, memory: 286, user: 'system', status: 'warning' },
]
