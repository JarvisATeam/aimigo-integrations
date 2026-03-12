#!/usr/bin/env node
import { getConfiguredIntegrations } from '../config/env.js';

const args = process.argv.slice(2);
const command = args[0] || 'help';

switch (command) {
  case 'config':
    const config = getConfiguredIntegrations();
    console.log('🔧 Configuration Status:');
    console.log('========================');
    Object.entries(config).forEach(([key, value]) => {
      const status = value ? '✅' : '❌';
      console.log(`${status} ${key}`);
    });
    break;

  case 'health':
    console.log('🏥 Health Check:');
    console.log('================');
    console.log('✅ Node.js:', process.version);
    console.log('✅ Platform:', process.platform);
    console.log('✅ Uptime:', Math.floor(process.uptime()), 'seconds');
    break;

  case 'help':
  default:
    console.log('AImigo CLI');
    console.log('==========');
    console.log('Usage: npx tsx src/cli/aimigo.ts <command>');
    console.log('');
    console.log('Commands:');
    console.log('  config  - Show configuration status');
    console.log('  health  - System health check');
    console.log('  help    - Show this help message');
    break;
}
