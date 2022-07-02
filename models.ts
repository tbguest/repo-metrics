export type DocumentHead = {
  title: string;
  description: string;
};

export interface AllRepos {
  nodes: Repo[];
}
export interface Repo {
  id: string;
  description: string;
  forkCount: number;
  name: string;
  nameWithOwner: string;
  stargazerCount: number;
  issues: {
    totalCount: number;
  };
  mentionableUsers: {
    totalCount: number;
  };
  assignableUsers: {
    totalCount: number;
  };
  openIssues: {
    totalCount: number;
  };
  pullRequests: {
    totalCount: number;
  };
}

export interface CommitFields {
  total: number;
  week: number;
  days: number[];
}

export interface Commits {
  [key: number]: CommitFields;
}
