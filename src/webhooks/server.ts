import express from 'express';
import { logger } from '../utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'aimigo-integrations',
    timestamp: new Date().toISOString()
  });
});

app.post('/webhooks/linear', (req, res) => {
  logger.info({ body: req.body }, 'Linear webhook received');
  res.json({ received: true });
});

app.post('/webhooks/stripe', (req, res) => {
  logger.info({ body: req.body }, 'Stripe webhook received');
  res.json({ received: true });
});

app.post('/webhooks/whatsapp', (req, res) => {
  logger.info({ body: req.body }, 'WhatsApp webhook received');
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log('Server running on port', PORT);
});
