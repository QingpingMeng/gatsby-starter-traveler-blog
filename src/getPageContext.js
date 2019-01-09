/* eslint-disable no-underscore-dangle...*/

import { SheetsRegistry } from 'jss';
import {
    createMuiTheme,
    createGenerateClassName
} from '@material-ui/core/styles';

// Create a theme with Gatsby brand colors. You can choose your own
const theme = createMuiTheme({
    palette: {
      primary: {
        dark: '#0097a7',
        light: '#bdbdbd',
        main: '#2196f3',
      },
      secondary: {
        main: '#c62828'
      }
    },
    typography: {
      useNextVariants: true,
    },
  })

function createPageContext() {
    return {
        theme,
        // This is needed in order to deduplicate the injection of CSS in the page.
        sheetsManager: new Map(),
        // This is needed in order to inject the critical CSS.
        sheetsRegistry: new SheetsRegistry(),
        // The standard class name generator.
        generateClassName: createGenerateClassName()
    };
}

export default function getPageContext() {
    // Make sure to create a new context for every server-side request so that data
    // isn't shared between connections (which would be bad).
    if (!process.browser) {
        return createPageContext();
    }

    // Reuse context on the client-side.
    if (!global.__INIT_MATERIAL_UI__) {
        global.__INIT_MATERIAL_UI__ = createPageContext();
    }

    return global.__INIT_MATERIAL_UI__;
}