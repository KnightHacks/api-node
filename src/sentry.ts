/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as Sentry from '@sentry/node';
import { RewriteFrames } from '@sentry/integrations';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as Tracing from '@sentry/tracing';

// This allows TypeScript to detect our global value
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}

// @ts-ignore
global.__rootdir__ = __dirname || process.cwd();

export interface SentryConfig {
  dsn: string;
  environment: string;
  release: string;
}

export const setupSentry = ({
  dsn,
  environment,
  release,
}: SentryConfig): void => {
  Sentry.init({
    dsn: dsn,
    environment: environment,
    release: release,
    integrations: [
      new RewriteFrames({
        // @ts-ignore
        root: global.__rootdir__,
      }),
      new Sentry.Integrations.Http({ tracing: true }),
    ],
    enabled: true,
    sampleRate: 1,
    tracesSampleRate: 1,
  });
};
