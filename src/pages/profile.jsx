import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../pages/_app";
import { useSelector } from "react-redux";
import { selectAuthUser, selectAuthState } from "../store/slices/authSlice";
function ProfilePage() {
  const router = useRouter();
  const authStatus = useSelector(selectAuthState);
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!authStatus) {
    router.push("/login");
  }

  return (
    <div>
      <h1>Welcome, {"user.name"}!</h1>
      <p>Your email address is {"user.email"}.</p>
    </div>
  );
}

export default ProfilePage;
