export type DocumentHead = {
  title: string;
  description: string;
};

export interface Repo {
  [key: string]: RepoFields;
}

export interface RepoFields {
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
  pullRequests: {
    totalCount: number;
  };
  object: {
    __typename: string;
    id: string;
    history: {
      __typename: string;
      totalCount: number;
    };
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
