import { useEffect } from "react";
import { useRouter } from "next/router";

function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "email",
      });

      auth2.attachClickHandler("#google-sign-in-button", {}, (googleUser) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // Send the token to your Flask backend for verification
      });
    });
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <button id="google-sign-in-button">Sign in with Google</button>
    </div>
  );
}

export default LoginPage;
