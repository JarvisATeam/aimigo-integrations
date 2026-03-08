import { logger } from './utils/logger.js';
import { getConfiguredIntegrations } from './config/env.js';

const log = logger;

log.info('🤖 AImigo Integration Platform starting...');

const config = getConfiguredIntegrations();
const configured = Object.entries(config).filter(([, v]) => v).map(([k]) => k);
const missing = Object.entries(config).filter(([, v]) => !v).map(([k]) => k);

log.info({ configured }, 'Active integrations');
if (missing.length) log.warn({ missing }, 'Unconfigured integrations (will be skipped)');

// Start webhook server
import('./webhooks/server.js');
