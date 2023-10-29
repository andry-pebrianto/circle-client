import { useEffect, useState, ReactNode } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import Main from "@/layout/Main";
import HomePage from "@/pages/HomePage";
import SearchPage from "@/pages/SearchPage";
import FollowPage from "@/pages/FollowPage";
import ProfilePage from "@/pages/ProfilePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import { API } from "@/utils/api";

export default function Router() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function authCheck() {
    try {
      await API.get("/api/v1/check");
      setIsLoading(false);
    } catch (error) {
      localStorage.clear();
      navigate("/login");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  function IsLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      return children;
    }
    navigate("/login");
  }

  function IsNotLogged({ children }: { children: ReactNode }) {
    const jwtToken = localStorage.getItem("jwtToken");

    if (!jwtToken) {
      return children;
    }
    navigate("/");
  }

  return (
    <>
      {isLoading && (
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          width={"100vw"}
          height={"100vh"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            width={"70px"}
            height={"70px"}
          />
        </Flex>
      )}

      {!isLoading && (
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <IsLogged>
                  <Main>
                    <HomePage />
                  </Main>
                </IsLogged>
              }
            />
          </Route>
          <Route path="/search">
            <Route
              index
              element={
                <IsLogged>
                  <Main>
                    <SearchPage />
                  </Main>
                </IsLogged>
              }
            />
          </Route>
          <Route path="/follow">
            <Route
              index
              element={
                <IsLogged>
                  <Main>
                    <FollowPage />
                  </Main>
                </IsLogged>
              }
            />
          </Route>
          <Route path="/profile">
            <Route
              index
              element={
                <IsLogged>
                  <Main>
                    <ProfilePage />
                  </Main>
                </IsLogged>
              }
            />
          </Route>
          <Route path="/register">
            <Route
              index
              element={
                <IsNotLogged>
                  <RegisterPage />
                </IsNotLogged>
              }
            />
          </Route>
          <Route path="/login">
            <Route
              index
              element={
                <IsNotLogged>
                  <LoginPage />
                </IsNotLogged>
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}
