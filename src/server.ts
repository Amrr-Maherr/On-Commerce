import 'dotenv/config';
import { app } from './app.js';
import { connectDatabase } from './config/database.js';

async function start() {
  await connectDatabase();

  const port = process.env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

try {
  await start();
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
