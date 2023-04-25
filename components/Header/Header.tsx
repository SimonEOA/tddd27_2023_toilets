import {
  Button,
  Box,
  Flex,
  Center,
  Input,
  Text,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  return (
    <Grid
      shadow={"md"}
      templateColumns="1fr auto 1fr"
      alignItems="center"
      p={2}
      h="60px"
    >
      <Input
        placeholder="Search"
        justifySelf={"flex-start"}
        ml={10}
        width={"200px"}
      />
      <Heading justifySelf={"center"}>TOILETS</Heading>

      {!session ? (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signIn()}>
          Login
        </Button>
      ) : (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signOut()}>
          Logout
        </Button>
      )}
    </Grid>
  );
}
