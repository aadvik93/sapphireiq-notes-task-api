import 'dotenv/config';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import mongoose from 'mongoose';

const port = Number(process.env.PORT || 5000);

try {
  await connectDatabase();
  const server = app.listen(port, () => console.log(`API listening on http://localhost:${port}`));

  const shutdown = (signal) => {
    console.log(`${signal} received. Closing server...`);
    server.close(async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
} catch (error) {
  console.error(`Unable to start API: ${error.message}`);
  process.exit(1);
}
