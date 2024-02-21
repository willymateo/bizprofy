import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Logo } from "./components/Logo";
import Image from "next/image";

const NotFound = () => (
  <>
    <header className="fixed top-5 left-5 md:top-7 md:left-7 z-0">
      <Logo href="/" className="rounded-2xl" />
    </header>

    <main className="min-h-screen py-20 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 items-center justify-center max-w-[480px]">
        <h3 className="text-center text-3xl font-bold">Sorry, page not found!</h3>

        <Typography sx={{ color: "text.secondary" }} className="text-center">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
          sure to check your spelling.
        </Typography>

        <Image
          className="object-contain object-center h-auto"
          src="/images/404.svg"
          alt="404 error page"
          height={150}
          width={350}
        />

        <Button href="/" size="large" variant="contained" className="!normal-case !rounded-lg">
          Go to Home
        </Button>
      </div>
    </main>
  </>
);

export default NotFound;
