import { Button, Grid, HStack, Heading, Text } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

interface HeaderProps {}

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <Grid shadow={"md"} templateColumns="1fr auto 1fr" alignItems="center">
      <Heading gridColumnStart={2} justifySelf={"center"}>
        TOILETS
      </Heading>

      {!session ? (
        <Button justifySelf={"flex-end"} mr={10} onClick={() => signIn()}>
          Login
        </Button>
      ) : (
        <HStack justifySelf={"flex-end"} mr={10}>
          <Text>{session.user.name}</Text>
          <Button onClick={() => signOut()}>Logout</Button>
        </HStack>
      )}
    </Grid>
  );
}
