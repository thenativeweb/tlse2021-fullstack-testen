import { flaschenpost } from 'flaschenpost';

const logger = flaschenpost.getLogger();

const handleUncaughtException = function (): void {
  logger.fatal('Unexpected exception occured.');

  /* eslint-disable unicorn/no-process-exit */
  process.exit(1);
  /* eslint-enable unicorn/no-process-exit */
};

const handleUnhandledRejection = function (): void {
  logger.fatal('Unexpected exception occured.');

  /* eslint-disable unicorn/no-process-exit */
  process.exit(1);
  /* eslint-enable unicorn/no-process-exit */
};

const registerExceptionHandler = function (): void {
  process.on('uncaughtException', handleUncaughtException);
  process.on('unhandledRejection', handleUnhandledRejection);
};

export { registerExceptionHandler };
