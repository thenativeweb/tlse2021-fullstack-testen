#!/usr/bin/env node

import { flaschenpost } from 'flaschenpost';
import { mongoDb } from '../shared/containers/mongoDb';

const logger = flaschenpost.getLogger();

/* eslint-disable @typescript-eslint/no-floating-promises */
(async function (): Promise<void> {
  try {
    await mongoDb.start();
  } catch (ex: unknown) {
    logger.fatal('An unexpected error occured.', { err: ex });
    process.exit(1);
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
