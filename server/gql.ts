export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `{
      repository(name: "Alchemauss", owner: "namkieudoan") {
        discussions(first: 100, categoryId:"${ghDiscussionCategoryId}") {
          nodes {
            title
            url
            number
            bodyHTML
            bodyText
            createdAt
            lastEditedAt
            author {
              avatarUrl
              login
              url
            }
            labels(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
    }`
}

// Single post
export function discussionDetailGql(postId: number | undefined) {
  return `{
    repository(owner: "namkieudoan", name: "Alchemauss") {
      discussion(number:${postId}) {
        id
        title
        bodyHTML
        createdAt
        author {
          login
          url
          avatarUrl
        }
      }
    }
  }`
}
