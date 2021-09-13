import humps from 'humps';

export interface APIClubEvent {
  description: string;
  end: string;
  location: string;
  name: string;
  presenter: string;
  start: string;
  tags: string[];
}

export interface ClubEvent extends Omit<APIClubEvent, 'start' | 'end'> {
  start: Date;
  end: Date;
}

export interface APIEventData {
  attendees_count: number;
  date_time: string;
  end_date_time: string;
  event_status: string;
  event_type: string;
  description: string;
  image: string;
  link: string;
  loc: string;
  name: string;
  user: string;
}

export interface EventData
  extends Omit<
    APIEventData,
    | 'attendees_count'
    | 'date_time'
    | 'end_date_time'
    | 'event_type'
    | 'event_status'
  > {
  attendeesCount: number;
  dateTime: Date;
  endDateTime: Date;
  eventStatus: string;
  eventType: string;
}

export function transformClubEvent(event: APIClubEvent): ClubEvent {
  const renamedKeys = humps.camelizeKeys(event) as ClubEvent;

  renamedKeys.start = new Date(event.start);
  renamedKeys.end = new Date(event.end);

  return renamedKeys;
}

export function transformAPIEvent(event: APIEventData): EventData {
  const renamedKeys = humps.camelizeKeys(event) as EventData;

  renamedKeys.dateTime = new Date(event.date_time);
  renamedKeys.endDateTime = new Date(event.end_date_time);
  return renamedKeys;
}
