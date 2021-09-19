/* eslint-disable @typescript-eslint/no-non-null-assertion */
import humps from 'humps';

export interface APIHackerPayload {
  beginner?: boolean;
  can_share_info: boolean;
  edu_info?: {
    college?: string;
    graduation_date?: string;
    major?: string;
  };
  email: string;
  ethnicity?: string;
  isaccepted?: boolean;
  rsvp_status?: boolean;
  first_name: string;
  last_name: string;
  password: string;
  phone_number?: string;
  pronouns?: string;
  socials?: {
    github: string;
    linkedin: string;
  };
  username: string;
  what_learn?: string[];
  why_attend?: string;
  in_person?: boolean;
}

export interface HackerData
  extends Omit<
    APIHackerPayload,
    | 'can_share_info'
    | 'edu_info'
    | 'first_name'
    | 'last_name'
    | 'phone_number'
    | 'what_learn'
    | 'why_attend'
    | 'phone_number'
    | 'isaccepted'
    | 'rsvp_status'
    | 'in_person'
  > {
  canShareInfo?: boolean;
  eduInfo?: {
    college?: string;
    graduationDate?: string;
    major?: string;
  };
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  rsvpStatus?: boolean;
  isAccepted?: boolean;
  whatLearn?: string;
  whyAttend?: string;
  inPerson?: boolean;
}

export type APIHacker = Omit<APIHackerPayload, 'password'>;

export interface APISponsorData {
  email: string;
  logo: string;
  password?: string;
  sponsor_name: string;
  subscription_tier: string;
  username: string;
}

export interface SponsorData
  extends Omit<APISponsorData, 'sponsor_name' | 'subscription_tier'> {
  sponsorName: string;
  subscriptionTier: string;
}

export function transformSponsor(data: SponsorData): APISponsorData {
  return humps.decamelizeKeys(data) as APISponsorData;
}

export function transformHacker(
  payload: Partial<HackerData>
): APIHackerPayload {
  const transformedKeys = humps.decamelizeKeys(payload) as APIHackerPayload;
  return {
    ...transformedKeys,
  };
}

export function transformAPIHacker(data: APIHacker): HackerData {
  const tranformedKeys = humps.camelizeKeys(data) as HackerData;
  if (data.isaccepted) {
    tranformedKeys.isAccepted = data.isaccepted;
  }

  return tranformedKeys;
}

export function transformAPISponsor(sponsor: APISponsorData): SponsorData {
  return humps.camelizeKeys(sponsor) as SponsorData;
}
