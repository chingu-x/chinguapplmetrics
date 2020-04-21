# Application Notes

## GitHub V4 API - GraphQL Queries

### Useful Commands
```
node chuseok env -envpath /Users/jdmedlock/Development/chuseok-cli --password <pw> --discordtoken <bot-token> --githubtoken <gh-token> 

node chuseok env --envpath /Users/jdmedlock/Development/chuseok-cli --password <thepassword> --githubtoken <github-token> --repoinclude v8-[a-z]+-team-\d{2}

node chuseok extract --source github --password <thepassword> --envpath /Users/jdmedlock/Development/chuseok-cli --output /Users/jdmedlock/Downloads
```

### Repos for an Organization
```
{
  organization(login: "chingu-voyages") {
    id
    repositories(first: 100) {
      edges {
        node {
          id
          name
          url
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
```

### Team Repo Information - Commits, PR’s, and Issues
```
{
  repository(owner: "chingu-voyages", name: "v8-geckos-team-04") {
    id
    name
    collaborators(first: 10) {
      edges {
        permission
        node {
          login
          email
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    refs(refPrefix: "refs/heads/", orderBy: {direction: DESC, field: TAG_COMMIT_DATE}, first: 100) {
      edges {
        node {
          ... on Ref {
            name
            target {
              ... on Commit {
                history(first: 100) {
                  edges {
                    node {
                      ... on Commit {
                        author {
                          user {
                            login
                            email
                          }
                        }
                        committedDate
                      }
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
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    pullRequests(first: 100) {
      edges {
        node {
          number
          title
          author {
            login
          }
          state
          createdAt
          closed
          closedAt
          reviews(first: 100) {
            edges {
              node {
                author {
                  login
                }
                createdAt
                state
              }
              cursor
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    issues(first: 100) {
      edges {
        node {
          author {
            login
          }
          title
          createdAt
          closed
          closedAt
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
```
