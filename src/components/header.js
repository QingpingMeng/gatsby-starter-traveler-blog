import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const header = props => {
  const { location } = props
  const rootPath = `${__PATH_PREFIX__}/`
  let header = undefined

  const components = [
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>,
  ]

  if (location.pathname === rootPath) {
    components.push(
      <StaticQuery
        query={headerImageQuery}
        render={data => {
          return <Image fluid={data.file.childImageSharp.fluid} />
        }}
      />
    )
  }
  return components
}

const headerImageQuery = graphql`
  query CoverImageQuery {
    file(relativePath: { eq: "leading.png" }) {
      childImageSharp {
        fluid(maxWidth: 1920, maxHeight: 500) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`

export default header
