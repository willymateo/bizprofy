import { Metadata } from "next";

const metadata: Metadata = {
  description: "Auth error page for Bizprofy",
  title: "Auth error | Bizprofy",
};

const AuthError = () => {
  return (
    <div>
      <h1>Auth Error</h1>
      <p>There was an error with your authentication</p>
    </div>
  );
};

export default AuthError;
export { metadata };
