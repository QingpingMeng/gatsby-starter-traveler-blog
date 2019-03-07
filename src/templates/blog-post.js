import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Image from 'gatsby-image'
import 'github-markdown-css'
import styled from 'styled-components'
import TableOfContents from '../components/toc'
import throttle from 'lodash.throttle'

const MarkdownBody = styled.section`
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;

  @media (max-width: 767px) {
    padding: 15px;
  }
`

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sticky: window.scrollY >= 800,
      headlines: [],
    }
    this.scrollThrottle = null
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll() {
    this.setState({
      sticky: window.scrollY >= 900,
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(this.handleScroll, 100))
    this.setState({
      headlines: document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.scrollThrottle) {
      this.scrollThrottle.cancel()
    }
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
        <TableOfContents
          sticky={this.state.sticky}
          headlines={this.state.headlines}
        />
        )
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
