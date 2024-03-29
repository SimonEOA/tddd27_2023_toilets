import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { theme } from "../themes/theme";

// chakra theme that changes .leaflet-popup-content-wrapper background color
// also import chakra theme in _app.tsx

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
