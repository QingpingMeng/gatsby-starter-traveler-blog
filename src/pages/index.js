import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArticlePreview from '../components/preview'
import { Section as LayoutSection } from '../components/layout'
import styled from 'styled-components'
import withRoot from '../withRoot';

const Section = styled(LayoutSection)`
  display: grid;
  grid-template-columns: minmax(250px, 1fr);
  grid-gap: 30px;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title="All posts"
          keywords={['blog', 'gatsby', 'javascript', 'react']}
        />
        {/* <Bio /> */}
        <Section>
          {posts.map(({ node }) => {
            return <ArticlePreview key={node.fields.slug} node={node} />
          })}
        </Section>
      </Layout>
    )
  }
}

export default withRoot(BlogIndex)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            coverImage {
              childImageSharp {
                fluid(maxWidth: 960, maxHeight: 400, quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
