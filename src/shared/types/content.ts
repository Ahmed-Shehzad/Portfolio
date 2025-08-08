// Content-related type definitions

export interface Hobby {
  title: string;
  emoji: string;
}

export interface Project {
  company: string;
  year: string;
  title: string;
  results: Array<{ title: string }>;
  link: string;
  image: string;
}

export interface Testimonial {
  name: string;
  position: string;
  text: string;
  avatar: string;
}
