import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";

// chakra theme that changes .leaflet-popup-content-wrapper background color
// also import chakra theme in _app.tsx

const theme = extendTheme({
  styles: {
    global: {
      ".leaflet-popup-content": {
        margin: 0,
      },
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
