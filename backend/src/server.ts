import app from './app';
import { PORT } from './config/env';
import { initLocalStore } from './config/localStore';
import { initMongoDB } from './config/mongo';

async function startServer() {
  // Initialize persistence (embedded store always ready; Mongo attempted if configured)
  initLocalStore();
  await initMongoDB();

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 WonderKids API server running on http://0.0.0.0:${PORT}`);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
    // Force-exit if close hangs
    setTimeout(() => process.exit(1), 10000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
  });
}

startServer();
