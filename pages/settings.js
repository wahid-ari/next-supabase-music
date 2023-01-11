import Layout from "@components/layout/Layout";
import Text from "@components/systems/Text";
import Title from "@components/systems/Title";
import { useTheme } from 'next-themes';

export default function Settings() {
  const { theme, setTheme } = useTheme()

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark')
    } else setTheme('light')
  };

  return (
    <Layout title="Settings - MyMusic">
      <Title>Settings</Title>
      <Text className="mt-5 mb-2">Dark Mode</Text>
      <div onClick={handleDarkMode} className="transition-all cursor-pointer w-11 h-6 dark:bg-emerald-500 bg-neutral-300 rounded-full relative">
        <div className="h-4 w-4 bg-white rounded-full absolute top-1 transition-all dark:left-6 left-1"></div>
      </div>
    </Layout>
  );
}
