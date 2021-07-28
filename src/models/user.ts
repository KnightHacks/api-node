export interface Hacker {
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

export interface Sponsor {
  email: string;
  logo: string;
  password?: string;
  sponsorName: string;
  subscriptionTier: string;
  username: string;
}
