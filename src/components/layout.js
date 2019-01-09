import React from 'react'
import Header from './header'
import styled from 'styled-components'

export const Section = styled.section`
  max-width: 960px;
  margin: 30px auto;
  padding: 0 30px;
`

class Layout extends React.Component {
  render() {
    const { children, location } = this.props
    return (
      <React.Fragment>
        <Header location={location} />
        {children}
      </React.Fragment>
    )
  }
}

export default Layout
