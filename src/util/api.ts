import { AxiosError } from 'axios';

export function emptyCollectionHandler<T>(error: unknown): T[] {
  if ((error as AxiosError).code === '404') {
    return [];
  }

  throw error;
}
