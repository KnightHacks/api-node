/* eslint-disable @typescript-eslint/ban-ts-comment */
import nodeFetch, { RequestInit, Response } from 'node-fetch';
import { KnightHacksAPIError } from './KnightHacksAPIError';
import { parseResponse } from './util/api';

let fetch: (url: string, info?: RequestInit) => Promise<Response>;
// @ts-ignore
if (typeof window != 'undefined') {
  // @ts-ignore
  fetch = window.fetch.bind(window);
} else {
  fetch = nodeFetch;
}

export interface APIErrorResponseData {
  code: number;
  description: string;
  name: string;
}

export class RestManager {
  private readonly baseURL = 'https://api.knighthacks.org/api';

  public async performRequest(
    path: string,
    init?: RequestInit
  ): Promise<unknown> {
    const response = await fetch(this.baseURL + path, init);

    if (!response.ok) {
      await this.handleAPIError(response, path);
    }

    return parseResponse(response);
  }

  private async handleAPIError(response: Response, path: string) {
    const json = (await response.json()) as APIErrorResponseData;

    if (!json) {
      throw new Error(`Error performing request for endpoint: ${response.url}`);
    }

    const error = new KnightHacksAPIError(json, response.url, path);
    throw error;
  }
}
