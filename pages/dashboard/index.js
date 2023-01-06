import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";

export default function Settings() {
  const router = useRouter()

  useEffect(() => {
    router.push("/")
  }, [])

  return (
    <Layout title="Dashboard">
      <Title></Title>
    </Layout>
  );
}
