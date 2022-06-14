import { gql } from "@apollo/client";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { getApolloClient } from "../apollo-client";
import styles from "../styles/Page.module.css";
import { Card } from "../components/Card";

const Repo: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ repo }) => {
  console.log("repoo", repo.defaultBranchRef.target.history);
  console.log("commits", repo.defaultBranchRef.target.history.edges[99].node);
  return (
    <main className={styles.main}>
      <Card>
        <h2>{repo.nameWithOwner}</h2>
        <p>Open issues: {repo.openIssues.totalCount}</p>
        <p>Open PRs: {repo.pullRequests.totalCount}</p>
        <p>
          Commits in last 30 days:{" "}
          {repo.defaultBranchRef.target.history.totalCount}
        </p>
      </Card>
    </main>
  );
};

export default Repo;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const client = getApolloClient();

  const { data } = await client.query({
    query: gql`
      {
        node(id: "${id}") {
          ... on Repository {
            id
            nameWithOwner
            openIssues: issues(states: OPEN) {
              totalCount
            }
            pullRequests(states: OPEN) {
              totalCount
            }
            defaultBranchRef {
              target {
                ... on Commit {
                  id
                  history(since: "2021-05-11T00:00:00Z") {
                    totalCount
                    edges {
                      node {
                        committedDate
                      }
                      cursor
                    }
                    pageInfo {
                      endCursor
                      hasNextPage
                    }
                  }
                }
              }
              name
            }
          }
        }
      }
    `,
  });

  console.log("data", data);

  return {
    props: {
      repo: data.node,
    },
  };
};

// organization(login: "ethereum") {
//   id
//   repository(name: "go-ethereum") {
//     nameWithOwner
//     openIssues: issues(states: OPEN) {
//       totalCount
//     }
//     defaultBranchRef {
//       target {
//         ... on Commit {
//           id
//           history(since: "2021-05-11T00:00:00Z") {
//             totalCount
//             edges {
//               node {
//                 committedDate
//               }
//               cursor
//             }
//             pageInfo {
//               endCursor
//               hasNextPage
//             }
//           }
//         }
//       }
//       name
//     }
//     pullRequests(states: OPEN) {
//       totalCount
//     }
//   }
// }

//
//
// // Octokit.js
// // https://github.com/octokit/core.js#readme
// const octokit = new Octokit({
//   auth: 'personal-access-token123'
// })

// await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
//   owner: 'OWNER',
//   repo: 'REPO'
// })
