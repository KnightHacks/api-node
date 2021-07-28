export interface ClubEvent {
  date: Date;
  description: string;
  location: string;
  name: string;
  presenter: string;
  tags: string[];
}

export interface Event {
  attendeesCount: number;
  dateTime: Date;
  endDateTime: Date;
  status: string;
  image: string;
  link: string;
  name: string;
  user: string;
}
