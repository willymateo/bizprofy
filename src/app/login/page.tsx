"use client";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons/faMicrosoft";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUserSession } from "@/redux/states/userSession";
import { Button, Card } from "@mui/material";
import { useDispatch } from "react-redux";

import { Logo } from "../components/Logo";

import styles from "./page.module.css";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = () => dispatch(setUserSession({ token: "test-token" }));

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center gap-20 ${styles.main}`}>
      <Logo className="fixed top-5 left-5 md:top-7 md:left-7 z-0 rounded-2xl" href="/" />

      <Card className="flex flex-col gap-10 p-10 z-10 !rounded-2xl">
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl text-center">Sign in to Bizprofy</h4>

          <p>You can use the following social accounts</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            className="flex flex-row gap-3 !bg-red-500 !rounded-lg"
            onClick={handleLogin}
            variant="contained"
            size="large">
            <FontAwesomeIcon icon={faGoogle} />
            Google
          </Button>

          <Button
            className="flex flex-row gap-3 !rounded-lg"
            onClick={handleLogin}
            variant="contained"
            size="large">
            <FontAwesomeIcon icon={faMicrosoft} />
            Microsoft
          </Button>
        </div>
      </Card>
    </main>
  );
};

export default Login;
