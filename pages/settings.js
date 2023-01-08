import Layout from "@components/layout/Layout";
import Text from "@components/systems/Text";
import Title from "@components/systems/Title";
import { useTheme } from 'next-themes';
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

export default function Settings() {
  const { theme, setTheme } = useTheme()

  const handleDarkMode = () => {
    if (theme == 'light') {
      setTheme('dark')
    } else setTheme('light')
  };

  return (
    <Layout title="Settings">
      <Title>Settings</Title>
      <Splide aria-label="My Favorite Images"
        options={{
          // type: 'loop',
          perPage: 1,
          gap: '1rem',
          pagination: false,
        }}
        hasTrack={false}
      >
        <div>
          <SplideTrack>
            <SplideSlide>
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="bg-purple-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 1</h1>
                    <h2 className="text-white text-lg">Text 1</h2>
                  </div>
                </div>
                <div className="bg-red-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 2</h1>
                    <h2 className="text-white text-lg">Text 2</h2>
                  </div>
                </div>
                <div className="bg-blue-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 3</h1>
                    <h2 className="text-white text-lg">Text 3</h2>
                  </div>
                </div>
                <div className="bg-emerald-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 4</h1>
                    <h2 className="text-white text-lg">Text 4</h2>
                  </div>
                </div>
                <div className="bg-orange-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 5</h1>
                    <h2 className="text-white text-lg">Text 5</h2>
                  </div>
                </div>
              </div>
            </SplideSlide>
            <SplideSlide>
              <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="bg-purple-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 6</h1>
                    <h2 className="text-white text-lg">Text 6</h2>
                  </div>
                </div>
                <div className="bg-red-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 7</h1>
                    <h2 className="text-white text-lg">Text 7</h2>
                  </div>
                </div>
                <div className="bg-blue-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 8</h1>
                    <h2 className="text-white text-lg">Text 8</h2>
                  </div>
                </div>
                <div className="bg-emerald-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 9</h1>
                    <h2 className="text-white text-lg">Text 9</h2>
                  </div>
                </div>
                <div className="bg-orange-500 h-40 text-center flex justify-center items-center rounded-lg">
                  <div>
                    <h1 className="text-white font-medium text-2xl">Text 10</h1>
                    <h2 className="text-white text-lg">Text 10</h2>
                  </div>
                </div>
              </div>
            </SplideSlide>
          </SplideTrack>
          <div className="splide__arrows">
            <button className="splide__arrow splide__arrow--prev">Prev</button>
            <button className="splide__arrow splide__arrow--next">Next</button>
          </div>
        </div>
      </Splide>
      <Text className="mt-5 mb-2">Dark Mode</Text>
      <div onClick={handleDarkMode} className="transition-all cursor-pointer w-11 h-6 dark:bg-emerald-500 bg-neutral-300 rounded-full relative">
        <div className="h-4 w-4 bg-white rounded-full absolute top-1 transition-all dark:left-6 left-1"></div>
      </div>
    </Layout>
  );
}
