import React from 'react'
import { rhythm } from '../utils/typography'
import Header from './header';
import styled from 'styled-components';

const Main = styled.section`
  max-width: 960px;
  margin: 30px auto;
`

class Layout extends React.Component {
  render() {
    const { children, location } = this.props
    return (
      <>
      <Header location={location}/>
      <Main>
        {children}
      </Main>
      </>
    )
  }
}

export default Layout
