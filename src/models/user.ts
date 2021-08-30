export interface HackerPayload {
  currentStatus: boolean;
  date: Date;
  email: string;
  firstName: string;
  lastName: string;
  gradYear: number;
  password?: string;
  phoneNumber: string;
  resume: string;
  schoolName: string;
  socials: string[];
  tracks: string[];
  username: string;
}

export interface Hacker extends Omit<HackerPayload, 'gradYear' | 'password'> {
  emailTokenHash: number[];
  emailVerification: boolean;
  hackerProfile: {
    gradYear: number;
    resume: string;
    schoolName: string;
    socials: string[];
  };
  isaccepted: boolean;
  password: number[];
  roles: number;
  tracks: string[];
}

export interface APISponsor {
  email: string;
  logo: string;
  password?: string;
  sponsor_name: string;
  subscription_tier: string;
  username: string;
}

export interface Sponsor
  extends Omit<APISponsor, 'sponsor_name' | 'subscription_tier'> {
  sponsorName: string;
  subscriptionTier: string;
}
