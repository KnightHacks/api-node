import { KnightHacksAPIError } from '../KnightHacksAPIError';

export function emptyCollectionHandler(
  e: KnightHacksAPIError
): Promise<unknown> {
  if (e.code === 404) {
    return [] as unknown as Promise<unknown>;
  }

  console.log('uh oh');
  throw e;
}

export function parseResponse(response: Response): Promise<unknown> {
  if (response.headers.get('Content-Type')?.startsWith('application/json')) {
    return response.json();
  }

  return response.arrayBuffer();
}
