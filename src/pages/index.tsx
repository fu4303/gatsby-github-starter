import * as React from 'react'
import styled from '@emotion/styled'
import { StaticQuery, graphql } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import RepoContainer from '../components/RepoContainer'
import StarredReposContainer from '../components/StarredReposContainer'

import { widths, breakpoints } from '../styles/variables'
import { getEmSize } from '../styles/mixins'
import { H1 } from '../components/Titles'

const IndexPage: React.SFC<any> = () => (
  <StaticQuery
    query={graphql`
      query IndexQuery {
        githubData {
          data {
            viewer {
              pinnedRepositories {
                edges {
                  node {
                    id
                    name
                    description
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
              repositories {
                edges {
                  node {
                    id
                    name
                    description
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
              repositoriesContributedTo {
                edges {
                  node {
                    id
                    name
                    description
                    forkCount
                    createdAt
                    pushedAt
                    updatedAt
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
              starredRepositories {
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
        }
      }
    `}
    render={(data: any) => (
      <IndexLayout>
        <Page>
          <Container>
            <ContainerChild>
              {data.githubData.data.viewer.pinnedRepositories.edges.length > 0 ? (
                <>
                  <H1>Pinned Repos</H1>
                  <RepoContainer data={data.githubData.data.viewer.pinnedRepositories.edges} />
                </>
              ) : null}
              {data.githubData.data.viewer.repositories.edges.length > 0 ? (
                <>
                  <H1>Recently Updated</H1>
                  <RepoContainer data={data.githubData.data.viewer.repositories.edges} />
                </>
              ) : null}
              {data.githubData.data.viewer.repositoriesContributedTo.edges.length > 0 ? (
                <>
                  <H1>Contributions</H1>
                  <RepoContainer data={data.githubData.data.viewer.repositoriesContributedTo.edges} />
                </>
              ) : null}

              {data.githubData.data.viewer.starredRepositories.edges.length > 0 ? (
                <>
                  <H1>Starred Repos ({data.githubData.data.viewer.starredRepositories.edges.length})</H1>
                  <StarredReposContainer data={data.githubData.data.viewer.starredRepositories.edges} />
                </>
              ) : null}
            </ContainerChild>
          </Container>
        </Page>
      </IndexLayout>
    )}
  />
)

export default IndexPage

const ContainerChild = styled.div`
  max-width: 100%;
  width: 100%;
  margin: 0;
  @media (min-width: ${breakpoints.xl}px) {
    max-width: ${getEmSize(widths.lg - 308)}em;
    margin: 0 0 0 auto;
  }
`
