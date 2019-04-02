import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Image from 'gatsby-image'
import 'github-markdown-css'
import styled from 'styled-components'
import TableOfContents from '../components/toc'
import throttle from 'lodash.throttle'
import Fab from '@material-ui/core/Fab'
import ViewListIcon from '@material-ui/icons/ViewList'
import { SwipeableDrawer } from '@material-ui/core'

const MarkdownBody = styled.section`
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px 45px 6rem 45px;

  @media (max-width: 767px) {
    padding: 15px 15px 6rem 15px;
  }
`

const FloatingFab = styled(Fab)`
  &&& {
    position: fixed;
    right: 2rem;
    bottom: 2rem;
  }
`

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headlines: [],
      showDrawer: false,
    }

    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  toggleDrawer(open) {
    return () => this.setState({
      showDrawer: open,
    })
  }

  componentDidMount() {
    this.setState({
      headlines: document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    })
  }

  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <Image fluid={post.frontmatter.coverImage.childImageSharp.fluid} />
        <MarkdownBody className="markdown-body">
          <h1>{post.frontmatter.title}</h1>
          <p
            style={{
              // ...scale(-1 / 5),
              display: 'block',
              // marginBottom: rhythm(1),
              // marginTop: rhythm(-1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              listStyle: 'none',
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </MarkdownBody>
        <FloatingFab onClick={this.toggleDrawer(true)} color="secondary" aria-label="Edit">
          <ViewListIcon />
        </FloatingFab>
        <SwipeableDrawer
          open={this.state.showDrawer}
          onOpen={this.toggleDrawer(true)}
          onClose={this.toggleDrawer(false)}
        >
          <TableOfContents closeTable={this.toggleDrawer(false)} headlines={this.state.headlines} />
        </SwipeableDrawer>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        coverImage {
          childImageSharp {
            fluid(
              maxHeight: 800
              maxWidth: 1920
              cropFocus: CENTER
              quality: 100
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
