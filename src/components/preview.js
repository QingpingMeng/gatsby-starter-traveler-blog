import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

const Link = styled(GatsbyLink)`
  box-shadow: none;
  color: #ffffff;
  text-decoration: none;
`

const styles = theme => ({
  media: {
    maxHeight: 400,
  },
})

const Media = styled(CardMedia)`
  max-height: 400px;
`

const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.54);
  bottom: 0;
  position: absolute;
  width: 100%;
  z-index: 1;
`
const articlePreview = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card>
      <Media style={{ position: 'relative' }}>
        <Image fluid={node.frontmatter.coverImage.childImageSharp.fluid} />
        <Overlay>
          <CardContent
            style={{ display: 'flex', zIndex: 2, padding: '1.5rem', color: "#ffffff" }}
          >
            <Typography style={{ flex: 1 }} variant="h6" color="inherit">
              <b>{title}</b>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              to={node.fields.slug}
              component={GatsbyLink}
            >
              Read
            </Button>
          </CardContent>
        </Overlay>
      </Media>

      {/*       
      <CardContent>
        <Typography variant="h6" color="default">
         <b> <Link to={node.fields.slug}>{title}</Link></b>
        </Typography>
      </CardContent> */}
    </Card>
  )
}

export default articlePreview
