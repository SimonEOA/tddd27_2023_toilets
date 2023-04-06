import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {},
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  semanticTokens: {
    colors: {},
  },
  styles: {
    global: {
      ".leaflet-popup-content": {
        margin: 0,
      },
    },
  },
});
