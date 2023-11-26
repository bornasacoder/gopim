import { useRouter } from "next/router";
function logout() {
  localStorage.removeItem("token");
  const router = useRouter();
  router.push("/login");
}
export default logout;
