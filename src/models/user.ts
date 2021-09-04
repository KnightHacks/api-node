/* eslint-disable @typescript-eslint/no-non-null-assertion */
import humps from 'humps';

export interface APIHackerPayload {
  beginner?: boolean;
  can_share_info: boolean;
  edu_info?: {
    college?: string;
    graduation_date?: number;
    major?: string;
  };
  email: string;
  ethnicity?: string;
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
  what_learn?: string;
  why_attend?: string;
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
  > {
  canShareInfo?: boolean;
  eduInfo?: {
    college?: string;
    graduationDate?: Date;
    major?: string;
  };
  firstName: string;
  lastName: string;
  phoneNumber?: string;
}

function toUnixTime(time?: number) {
  if (!time) {
    return undefined;
  }

  return time / 1000;
}

export type APIHacker = Omit<APIHackerPayload, 'password'>;

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

export function transformHacker(payload: HackerData): APIHackerPayload {
  const transformedKeys = humps.decamelizeKeys(payload) as APIHackerPayload;
  return {
    ...transformedKeys,
    edu_info: {
      ...transformedKeys.edu_info,
      graduation_date: toUnixTime(payload.eduInfo?.graduationDate?.getTime()),
    },
  };
}

export function transformAPIHacker(data: APIHacker): HackerData {
  const tranformedKeys = humps.camelizeKeys(data) as HackerData;
  if (data.edu_info?.graduation_date) {
    tranformedKeys.eduInfo!.graduationDate = new Date(
      data.edu_info.graduation_date * 1000
    );
  }

  return tranformedKeys;
}

export function transformSponsor(sponsor: APISponsor): Sponsor {
  return humps.camelizeKeys(sponsor) as Sponsor;
}
