import Layout from '@components/layout/Layout';
import Text from '@components/systems/Text';
import Title from '@components/systems/Title';
import { useTheme } from 'next-themes';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else setTheme('light');
  };

  return (
    <Layout title='Settings - MyMusic'>
      <Title>Settings</Title>
      <Text className='mt-5 mb-2'>Dark Mode</Text>
      <div
        onClick={handleDarkMode}
        className='relative h-6 w-11 cursor-pointer rounded-full bg-neutral-300 transition-all dark:bg-emerald-500'
      >
        <div className='absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-all dark:left-6'></div>
      </div>
    </Layout>
  );
}
