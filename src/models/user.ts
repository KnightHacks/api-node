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

export interface Sponsor {
  email: string;
  logo: string;
  password?: string;
  sponsorName: string;
  subscriptionTier: string;
  username: string;
}
