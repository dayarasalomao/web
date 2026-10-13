import { formatSeoAuditReport, runSeoContentAudit } from '../src/lib/seo-audit.ts'

const issues = runSeoContentAudit()
console.log(formatSeoAuditReport(issues))

if (issues.some((issue) => issue.severity === 'error')) {
  process.exitCode = 1
}
