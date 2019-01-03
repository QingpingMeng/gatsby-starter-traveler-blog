import React from 'react'
import Header from './header'
import styled from 'styled-components'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#0097a7',
      light: '#bdbdbd',
      main: '#2196f3',
    },
  },
  typography: {
    useNextVariants: true,
  },
})

export const Section = styled.section`
  max-width: 960px;
  margin: 30px auto;
  padding: 0 30px;
`

class Layout extends React.Component {
  render() {
    const { children, location } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header location={location} />
        {children}
      </MuiThemeProvider>
    )
  }
}

export default Layout
