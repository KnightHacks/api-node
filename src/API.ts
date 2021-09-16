import { AuthenticationManager } from './controllers/auth';
import { CategoryManager } from './controllers/category';
import { ClubManager } from './controllers/club';
import { EventManager } from './controllers/event';
import { HackerManager } from './controllers/hacker';
import { SponsorManager } from './controllers/sponsor';
import { RestManager } from './RestManager';
import { setupSentry, SentryConfig } from './sentry';

export class API {
  constructor(sentryConfig?: SentryConfig) {
    if (sentryConfig) {
      setupSentry(sentryConfig);
    }
  }

  private readonly rest: RestManager = new RestManager();
  public readonly categories = new CategoryManager(this, this.rest);
  public readonly events = new EventManager(this.rest);
  public readonly sponsors = new SponsorManager(this.rest);
  public readonly hackers = new HackerManager(this.rest);
  public readonly club = new ClubManager(this.rest);

  public token: string | undefined;

  public async login(username: string, password: string): Promise<string> {
    this.token = await AuthenticationManager.login({ username, password });

    return this.token;
  }
}
