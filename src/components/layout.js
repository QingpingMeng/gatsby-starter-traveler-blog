import React from 'react'
import { rhythm } from '../utils/typography'
import Header from './header';

class Layout extends React.Component {
  render() {
    const { children, location } = this.props
    return (
      <>
      <Header location={location}/>
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(30),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {children}
      </div>
      </>
    )
  }
}

export default Layout
