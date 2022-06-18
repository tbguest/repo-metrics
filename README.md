# GitHub Repo Statistics

## Compare repositories by interest and development effort metrics

Built with React, TypeScript, and Next.js, using:

- Apollo Client to query repository data via GitHub GraphQL API on the server side
- `useSWR` hook for fetching additional summary statistics client-side via the GitHub REST API
- D3 for visuals

I started this project to explore Apollo Client and GraphQL. I had intended to use dynamic routing to make repo-specific requests to the GraphQL API, but it quickly became clear that fetching summary commit data from GitHub's REST API would save a lot of effort, hence the use of both APIs.
