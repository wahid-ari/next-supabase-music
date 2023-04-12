import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
  }, []);

  return (
    <Layout title='Loading...'>
      <Title>Loading...</Title>
    </Layout>
  );
}
