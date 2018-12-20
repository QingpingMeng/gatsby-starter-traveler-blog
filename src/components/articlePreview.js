import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

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
  color: #ffffff;
`

const articlePreview = ({ node }) => {
  const title = node.frontmatter.title || node.fields.slug
  const backgroundImageUrl =
    node.frontmatter.coverImage.childImageSharp.resize.src
  return (
    <div key={node.fields.slug}>
      <ImageTile backgroundImageUrl={backgroundImageUrl}>
        <h3>
          <Link to={node.fields.slug}>
            {title}
            {node.frontmatter.test}
          </Link>
        </h3>
      </ImageTile>
    </div>
  )
}

export default articlePreview
