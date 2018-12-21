import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'


const ImageTile = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 5px;
  padding: 2rem;
  color: #ffffff;
  position: relative;
  background-image: ${props => `url(${props.backgroundImageUrl})`};
`

const Link = styled(GatsbyLink)`
  box-shadow: none;
  color: #000000;
`

const styles = theme => ({
  media: {
    maxHeight: 400,
  },
})

const Media = styled(CardMedia)`
    max-height: 400px;
`;

const articlePreview = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  return (
    <Card>
      <Media>
        <Image fluid={node.frontmatter.coverImage.childImageSharp.fluid} />
      </Media>

      <CardContent>
        <Link to={node.fields.slug}>{title}</Link>
      </CardContent>
    </Card>
  )
}

export default articlePreview
