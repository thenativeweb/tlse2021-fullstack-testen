#!/usr/bin/env node

import { flaschenpost } from 'flaschenpost';
import { mongoDb } from '../shared/containers/mongoDb';

/* eslint-disable @typescript-eslint/no-floating-promises */
(async function (): Promise<void> {
  const logger = flaschenpost.getLogger();

  try {
    await mongoDb.stop();
  } catch (ex: unknown) {
    logger.fatal('An unexpected error occured.', { err: ex });
    process.exit(1);
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
