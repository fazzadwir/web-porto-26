/**
 * Config for the `sanity` CLI (`npx sanity deploy`, `npx sanity documents ...`).
 * https://www.sanity.io/docs/cli
 **/
import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './sanity/env'

export default defineCliConfig({
  api: { projectId, dataset },
  // Hosted Studio: https://fazzadwr.sanity.studio
  studioHost: 'fazzadwr',
  deployment: { appId: 'ztywlnsrh49241a8sfs4kk6p' },
})
