import { Endpoints } from '../Endpoints';
import fetch from 'cross-fetch';
import * as Sentry from '@sentry/node';

export const AuthenticationManager = {
  async login(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const transaction = Sentry.startTransaction({
      op: 'transaction',
      name: 'login',
    });

    Sentry.configureScope((scope: Sentry.Scope): void => {
      scope.setSpan(transaction);
    });

    const response = await fetch(
      'https://api.knighthacks.org/api' + Endpoints.login,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const token = response.headers.get('set-cookie');

    if (!token || !token[0] || response.status !== 200) {
      Sentry.captureException(new Error('Error fetching token for login.'));
    }

    Sentry.setUser({
      username: credentials.username,
    });

    transaction.setHttpStatus(response.status);

    transaction.finish();

    return token ?? '';
  },
};
