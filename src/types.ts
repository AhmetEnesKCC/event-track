export interface Comment {
  user: string;
  text: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string[];
  comments: Comment[];
}
