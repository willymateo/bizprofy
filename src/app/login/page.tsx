"use client";

import { faMicrosoft } from "@fortawesome/free-brands-svg-icons/faMicrosoft";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Card from "@mui/material/Card";
import Link from "next/link";

import { setUserSession } from "@/redux/states/userSession";
import { useActive } from "@/hooks/useActive";
import { Logo } from "../components/Logo";

import styles from "./page.module.css";

const Login = () => {
  const { isActive: isPasswordVisible = false, toggle: togglePasswordVisibility } = useActive();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();

  const handleLogin = handleSubmit(async (data = {}) => {
    await signIn("credentials", data);
    dispatch(setUserSession({ token: "test-token" }));
  });

  return (
    <>
      <header className="fixed top-5 left-5 md:top-7 md:left-7 z-0">
        <Logo href="/" className="rounded-2xl" />
      </header>

      <main
        className={`min-h-screen flex flex-col items-center justify-center gap-20 ${styles.main}`}>
        <Card className="flex flex-col gap-10 p-10 z-10 !rounded-2xl">
          <div className="flex flex-col gap-3">
            <h4 className="text-2xl text-center">Sign in to Bizprofy</h4>

            <p>
              Don't have an account? <Link href="/signUp">Get started</Link>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="flex flex-row gap-3 !bg-red-500 !rounded-lg !normal-case"
              onClick={handleLogin}
              variant="contained"
              size="large">
              <FontAwesomeIcon icon={faGoogle} />
              Google
            </Button>

            <Button
              className="flex flex-row gap-3 !rounded-lg !normal-case"
              onClick={handleLogin}
              variant="contained"
              size="large">
              <FontAwesomeIcon icon={faMicrosoft} />
              Microsoft
            </Button>
          </div>

          <Divider>Or</Divider>

          <div className="flex flex-col gap-3">
            <div>
              <TextField name="email" label="Email address" />

              <TextField
                name="password"
                label="Password"
                type={isPasswordVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => togglePasswordVisibility()}>
                        {isPasswordVisible ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Link href="/recovery">Forgot password?</Link>

            <Button onClick={handleLogin}>Login</Button>
          </div>
        </Card>
      </main>
    </>
  );
};

export default Login;
