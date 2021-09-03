import { Endpoints } from '../Endpoints';
import fetch from 'node-fetch';

export const AuthenticationManager = {
  async login(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const response = await fetch(Endpoints.login, {
      body: JSON.stringify(credentials),
    });

    const token = response.headers.get('set-cookie');

    if (!token || !token[0]) {
      throw new Error('Error fetching token for login.');
    }

    return token;
  },
};
