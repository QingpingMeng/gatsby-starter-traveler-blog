import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

const header = props => {
  const { location } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header = undefined

  if (location.pathname === rootPath) {
    return (
      <StaticQuery
        query={headerImageQuery}
        render={data => {
          return <Image fluid={data.file.childImageSharp.fluid} />
        }}
      />
    )
  } else {
    return undefined
  }
}

const headerImageQuery = graphql`
  query CoverImageQuery {
    file(relativePath: { eq: "site-header.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default header
