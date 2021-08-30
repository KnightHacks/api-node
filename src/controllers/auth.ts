import axios from 'axios';
import { Endpoints } from '../Endpoints';

export const AuthenticationManager = {
  async login(credentials: {
    username: string;
    password: string;
  }): Promise<string> {
    const response = await axios.post(Endpoints.login, credentials);
    const token = response.headers['set-cookie'] as string[] | undefined;

    if (!token || !token[0]) {
      throw new Error('Error fetching token for login.');
    }

    return token[0];
  },
};
