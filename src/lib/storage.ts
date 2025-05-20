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
  image?: string;
  participants: string[];
  comments: Comment[];
}

export const loadUser = () =>
  typeof window !== 'undefined' ? localStorage.getItem('username') || '' : '';

export const saveUser = (name: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('username', name);
  }
};

export const loadEvents = (): Event[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('events') || '[]') as Event[];
  } catch {
    return [];
  }
};

export const saveEvents = (events: Event[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('events', JSON.stringify(events));
  }
};
