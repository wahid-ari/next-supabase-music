import { useEffect } from "react";
import { useRouter } from "next/router";
import nookies from "nookies";

export default function Logout() {
  const router = useRouter();
  nookies.destroy(null, "username");
  nookies.destroy(null, "name");
  nookies.destroy(null, "token");
  // so try this, seems work
  useEffect(() => {
    document.cookie = 'username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push("/login");
  }, [])

  return "";
}
