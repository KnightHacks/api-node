import { APIErrorResponseData } from './RestManager';

export class KnightHacksAPIError extends Error {
  public readonly code: number;
  public override readonly name: string;
  public readonly description: string;
  public readonly path: string;
  public readonly url: string;

  constructor(data: APIErrorResponseData, url: string, path: string) {
    super(data.name);
    this.code = data.code;
    this.name = data.name;
    this.description = data.description;
    this.url = url;
    this.path = path;
  }
}
