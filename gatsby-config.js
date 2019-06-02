'use strict'

module.exports = {
  siteMetadata: {
    title: 'gatsby-github-starter',
    description: '.',
    siteUrl: 'https://lukesecomb.digital',
    author: {
      name: 'Luke Secomb',
      url: 'https://lukesecomb.digital',
      email: 'hello@lukesecomb.digital',
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-github-starter`,
        short_name: `gatsby-github-starter`,
        start_url: `/`,
        background_color: `#141414`,
        theme_color: `#FFC87F`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        // token: required by the GitHub API
        token: '696ff89484f54b051c6505f72ec00e7a9e206ae9',

        variables: {},

        // Github GraphQL explorer - https://developer.github.com/v4/explorer
        // * pinnedRepositories will need to be changed to pinnedItems on 2019/07/01 *
        graphQLQuery: `
          query {
            viewer {
              login
              bio
              name
              company
              avatarUrl
              url
              status {
                id
                emoji
                message
              }
              organizations(first: 6) {
                edges {
                  node {
                    name
                  }
                }
              }
              pinnedRepositories(first:6) {
                edges {
                  node {
                    id
                    name
                    description
                    id
                    url
                    createdAt
                    primaryLanguage {
                      id
                      name
                      color
                    }
                  }
                }
              }
              repositories(first: 9, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
                edges {
                  node {
                    id
                    name
                    description
                    forkCount
                    createdAt
                    pushedAt
                    updatedAt
                    isFork
                    url
                    primaryLanguage {
                      id
                      name
                      color
                    }
                  }
                }
              }
              repositoriesContributedTo(first: 6) {
                edges {
                  node {
                    id
                    name
                    description
                    forkCount
                    createdAt
                    pushedAt
                    updatedAt
                    isFork
                    url
                    owner {
                      url
                      login
                    }
                    primaryLanguage {
                      id
                      name
                      color
                    }
                  }
                }
              }
              starredRepositories(first: 240, orderBy: {field: STARRED_AT, direction: DESC}) {
                edges {
                  node {
                    id
                    name
                    url
                    createdAt
                    forkCount
                    owner {
                      url
                      login
                    }
                  }
                }
              }
            }
          }
        `,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'content',
    //     path: `${__dirname}/src/content`,
    //   },
    // },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_CODE,
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
  ],
}
