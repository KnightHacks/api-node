export const ModelBases = {
  group: '/groups/',
  hacker: '/hackers/',
  sponsor: '/sponsors/',
  club: '/club/',
};

export const Endpoints = {
  login: '/auth/login/',

  categories: '/categories/',
  allCategories: '/categories/get_all_categories',
  specificCategory: (name: string, sponsor: string): string =>
    `/api/categories?name=${name}&sponsor=${sponsor}`,

  clubGetEvents: '/club/get_events',
  clubRefreshEvents: '/club/refresh_events',
  emailVerify: (identifier: string): string => `/email/verify/${identifier}/`,

  createEvent: '/events/create_event',
  getAllEvents: '/events/get_all_events',
  updateEvent: (eventName: string): string =>
    `/events/update_event/${eventName}/`,
  createGroup: ModelBases.group,

  specificGroup: (groupName: string): string =>
    ModelBases.group + `${groupName}/`,
  groupMember: (groupName: string, username: string): string =>
    ModelBases.group + `${groupName}/${username}/`,
  allGroups: ModelBases.group + 'get_all_groups/',

  createHacker: ModelBases.hacker,
  allHackers: ModelBases.hacker + 'get_all_hackers/',
  specificHacker: (username: string): string =>
    ModelBases.hacker + `${username}/`,
  acceptHacker: (username: string): string =>
    ModelBases.hacker + `${username}/accept/`,
  hackerSettings: (username: string): string =>
    ModelBases.hacker + `${username}/settings/`,
  hackerResume: (username: string): string =>
    ModelBases.hacker + `${username}/resume/`,

  createSponsor: ModelBases.sponsor,
  deleteSponsor: (sponsorName: string): string =>
    ModelBases.sponsor + `delete_sponsor/${sponsorName}`,
  allSponsors: ModelBases.sponsor + 'get_all_sponsors/',
  specificSponsor: (sponsorName: string): string =>
    ModelBases.sponsor + `${sponsorName}`,
  acceptSponsor: (username: string): string =>
    ModelBases.sponsor + `${username}/accept/`,

  clubEvents: `${ModelBases.club}get_events/`,
};
