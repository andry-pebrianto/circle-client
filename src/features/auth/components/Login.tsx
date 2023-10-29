import { Fragment, useEffect } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function Login() {
  const navigate = useNavigate();
  const {
    form,
    handleChange,
    handleLogin,
    isLoading,
    isError,
    error,
    isLoginSuccess,
  } = useLogin();

  useEffect(() => {
    if (isLoginSuccess) {
      navigate("/");
    }
  }, [isLoginSuccess]);

  return (
    <Fragment>
      <Flex justifyContent={"center"} alignItems={"center"} height={"100vh"}>
        <Box width={"100%"} maxWidth={"450px"} p={4} color={"white"}>
          <Heading as="h2" size="3xl" noOfLines={1} color={"green.400"} mb={3}>
            circle
          </Heading>
          <Text fontSize={"xl"} mb={3}>
            Login to Circle
          </Text>
          {isError && (
            <Alert status="error" bg={"#FF6969"} mb={3} borderRadius={5}>
              <AlertIcon color={"white"} />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <FormControl mb={4}>
            <Input
              type="text"
              placeholder="Email/Username *"
              name="emailOrUsername"
              value={form.emailOrUsername}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <Input
              type="password"
              placeholder="Password *"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </FormControl>
          {isLoading ? (
            <Button
              isLoading
              colorScheme="green"
              variant="solid"
              borderRadius={"full"}
              width={"100%"}
              mb={3}
            >
              Loading
            </Button>
          ) : (
            <Button
              type="submit"
              borderRadius={"full"}
              colorScheme="green"
              width={"100%"}
              mb={3}
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
          <Text>
            Have no account yet?{" "}
            <Link style={{ color: "#48bb78" }} to={"/register"}>
              Register
            </Link>
          </Text>
        </Box>
      </Flex>
    </Fragment>
  );
}
