
const ModelBases = {
  group: '/api/groups/',
  hacker: '/api/hacker/',
  sponsor: '/api/sponsors/',
};

export const Endpoints = {
  categories: '/api/categories/',
  clubGetEvents: '/api/club/get_events',
  clubRefreshEvents: '/api/club/refresh_events',
  emailVerify: (identifier: string): string => `/api/email/verify/${identifier}/`,

  createEvent: '/api/events/create_event',
  getAllEvents: '/api/events/get_all_events',
  updateEvent: (eventName: string): string => `/api/events/update_event/${eventName}/`,
  createGroup: ModelBases.group,

  specificGroup: (groupName: string): string => ModelBases.group + `${groupName}/`,
  groupMember: (groupName: string, username: string): string => ModelBases.group + `${groupName}/${username}/`,
  allGroups: ModelBases.group + 'get_all_groups/',

  createHacker: ModelBases.hacker,
  allHackers: ModelBases.group + 'get_all_hackers/',
  specificHacker: (username: string): string => ModelBases.group + `${username}/`,
  acceptHacker: (username: string): string => ModelBases.group + `${username}/accept/`,
  hackerSettings: (username: string): string => ModelBases.group + `${username}/settings/`,

  createSponsor: ModelBases.sponsor,
  deleteSponsor: (sponsorName: string): string => ModelBases.sponsor + `delete_sponsor/${sponsorName}`,
  allSponsors: ModelBases.sponsor + 'get_all_sponsors/',
  specificSponsor: (sponsorName: string): string => ModelBases.sponsor + `${sponsorName}`,
  acceptSponsor: (username: string): string => ModelBases.sponsor + `${username}/accept/`,

};
