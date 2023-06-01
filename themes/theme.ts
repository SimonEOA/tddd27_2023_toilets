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
      "*::-webkit-scrollbar": {
        width: "7px",
        height: "7px",
      },

      "*::-webkit-scrollbar-thumb": {
        borderRadius: "20px",
        border: "5px solid lightgrey",
      },

      "*::-webkit-scrollbar-thumb:hover": {
        borderColor: "darkgrey" /* Replace 'red' with your desired color */,
      },

      /* Change color on active */
      "*::-webkit-scrollbar-thumb:active": {
        borderColor: "grey" /* Replace 'blue' with your desired color */,
      },

      /* Firefox */
      "*": {
        scrollbarWidth: "thin",
      },
    },
  },
});
