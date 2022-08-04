import { gql } from "@apollo/client";

export const repoQuery = gql`
  query InputRepos($id: [ID!]!) {
    nodes(ids: $id) {
      ... on Repository {
        id
        description
        forkCount
        name
        nameWithOwner
        stargazerCount
        issues {
          totalCount
        }
        mentionableUsers {
          totalCount
        }
        assignableUsers {
          totalCount
        }
        openIssues: issues(states: OPEN) {
          totalCount
        }
        pullRequests(states: OPEN) {
          totalCount
        }
      }
    }
  }
`;
