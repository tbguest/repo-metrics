# GitHub Repo Statistics

## Compare repositories by interest and development effort metrics

This is a for-fun project built with React, TypeScript, and Next.js, using:

- Apollo Client to query repository data via GitHub GraphQL API on the server side
- `useSWR` hook for fetching additional summary statistics client-side via the GitHub REST API
- Data persistence with MongoDB

I started this project to explore Apollo Client and GraphQL. In the project's current form, there's no particular benefit to having used GraphQL to fetch the repositories' data. The information used is readily available via the GitHub REST API.
