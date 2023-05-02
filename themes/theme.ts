import {  extendTheme } from "@chakra-ui/react";

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
       
      },
      ".leaflet-bar": {
        backgroundColor: "white",
      },
     
    ".glass": {
      appearance: "none",
      border: "none",
      backgroundSolor: "transparent",
      fontSize: 16,
      lineHeight: 1.5,
      padding: "0.5rem",
      width: "100%",
      boxSizing: "border-box",
      borderBottom: "2px solid #CBD5E0",
      transition: "all 0.2s ease-in-out",

    },
    ".results.active > *": {
      backgroundColor: "white",
      fontWeight: "700",
      '&:hover': {
        border: 1 + "px solid #CBD5E0",
        cursor: "pointer",
      },

    },
    ".reset": {
      display: "none",
      
    },
    ".leaflet-touch .leaflet-bar a ": {
      display: "none",
    },
  },
  },

});
