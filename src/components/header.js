import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import Typography from '@material-ui/core/Typography'

const Banner = styled.div`
  color: #fff;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
  text-align: center;
  padding: 2rem;
`

const StyledToolbar = styled(Toolbar)`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`

const header = props => {
  const { location } = props
  const rootPath = `${__PATH_PREFIX__}/`
  const GatsbyLink = props => <Link to="/" {...props} />;

  const components = [
    <AppBar position="sticky" color="default">
      <StyledToolbar>
        <Button color="inherit" component={GatsbyLink}>主页</Button>
        <Button color="inherit">关于</Button>
      </StyledToolbar>
    </AppBar>,
  ]

  if (location.pathname === rootPath) {
    components.push(
      <Banner>
        <Typography
          variant="h2"
          color="inherit"
          gutterBottom={true}
          align="center"
        >
          世界这么大
        </Typography>
        <Typography
          gutterBottom={true}
          color="inherit"
          variant="h4"
          align="center"
        >
          我想去看看
        </Typography>
      </Banner>
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
