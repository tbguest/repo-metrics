import { JSX } from "react";

export type DocumentHead = {
  title: string;
  description: string;
};

export interface RepoDoc {
  owner: string | JSX.Element;
  repo: string | JSX.Element;
  id: string;
}

export interface RepoData {
  repo: string;
  owner: string;
  description: string;
  starGazers: string;
  watchers: number;
  issues: number;
  forks: number;
  id: string;
}

export interface CommitFields {
  total: number;
  week: number;
  days: number[];
}

export interface Commits {
  [key: number]: CommitFields;
}
