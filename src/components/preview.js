import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const Link = styled(GatsbyLink)`
  box-shadow: none;
  color: #222222;
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

const articlePreview = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card>
      <Media>
        <Image fluid={node.frontmatter.coverImage.childImageSharp.fluid} />
      </Media>

      <CardContent>
        <Typography variant="h6" color="default">
         <b> <Link to={node.fields.slug}>{title}</Link></b>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default articlePreview
