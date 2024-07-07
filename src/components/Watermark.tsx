import { Box, Card, CardBody, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaSquareFacebook,
  FaSquareInstagram,
} from "react-icons/fa6";

export default function Watermark() {
  return (
    <Fragment>
      <Card bg={"#3a3a3a"} color={"white"}>
        <CardBody py={4} px={5}>
          <Box fontSize={"md"}>
            Created By Andry Pebrianto - {""}
            <FaGithub style={{ display: "inline", marginRight: "5px" }} />
            <FaLinkedin style={{ display: "inline", marginRight: "5px" }} />
            <FaSquareFacebook
              style={{ display: "inline", marginRight: "5px" }}
            />
            <FaSquareInstagram
              style={{ display: "inline", marginRight: "5px" }}
            />
          </Box>
          <Text fontSize={"xs"} marginTop={"20px"} textAlign={"end"} color={"gray.400"}>
            Copyright &copy; {new Date().getFullYear()}
          </Text>
        </CardBody>
      </Card>
    </Fragment>
  );
}
