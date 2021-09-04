import { RestManager } from '..';

export abstract class BaseManager {
  protected readonly rest: RestManager;

  constructor(rest: RestManager) {
    this.rest = rest;
  }
}
