import { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useTheme } from 'next-themes';
import Layout from '@components/layout/Layout';
import Shimer from '@components/systems/Shimer';
import Text from '@components/systems/Text';
import Titles from '@components/systems/Title';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { populateData, options, optionsLineChart, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Filler,
  Legend
);

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
  const { theme } = useTheme();
  const { data: artistByGenre, error: errorArtistByGenre } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/artist-by-genre`,
    fetcher
  );
  const { data: albumByArtist, error: errorAlbumByArtist } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/album-by-artist`,
    fetcher
  );
  const { data: songByAlbum, error: errorSongByAlbum } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/song-by-album`,
    fetcher
  );
  const { data: songByArtist, error: errorSongByArtist } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/song-by-artist`,
    fetcher
  );
  const { data: songByPlaylist, error: errorSongByPlaylist } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ROUTE}/api/statistics/song-by-playlist`,
    fetcher
  );

  const [dataArtistByGenre, setDataArtistByGenre] = useState();
  const [dataAlbumByArtist, setDataAlbumByArtist] = useState();
  const [dataSongByAlbum, setDataSongByAlbum] = useState();
  const [dataSongByArtist, setDataSongByArtist] = useState();
  const [dataSongByPlaylist, setDataSongByPlaylist] = useState();

  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, [windowWidth]);

  useEffect(() => {
    if (artistByGenre !== undefined) setDataArtistByGenre(populateData(artistByGenre, 'genre'));
    if (albumByArtist !== undefined) setDataAlbumByArtist(populateData(albumByArtist, 'album'));
    if (songByAlbum !== undefined) setDataSongByAlbum(populateData(songByAlbum, 'song'));
    if (songByArtist !== undefined) setDataSongByArtist(populateData(songByArtist, 'song'));
    if (songByPlaylist !== undefined) setDataSongByPlaylist(populateData(songByPlaylist, 'song'));
  }, [artistByGenre, albumByArtist, songByAlbum, songByArtist, songByPlaylist]);

  if (errorArtistByGenre || errorAlbumByArtist || errorSongByAlbum || errorSongByArtist || errorSongByPlaylist) {
    return (
      <Layout title='Statistics'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title='Statistics - MyMusic'>
      <Titles>Statistics</Titles>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2'>
        {dataArtistByGenre ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Artis by Genre</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Pie options={options} data={dataArtistByGenre} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}

        {dataAlbumByArtist ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Album by Artist</Text.medium>
            </div>
            <div className='m-auto w-72 py-3'>
              <Doughnut options={options} data={dataAlbumByArtist} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-[350px] w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataSongByAlbum ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Song by Album</Text.medium>
            </div>
            <div className='p-3'>
              <Bar options={optionsBarChart(theme)} data={dataSongByAlbum} height={windowWidth > 500 ? 100 : 250} />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataSongByArtist ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Song by Artist</Text.medium>
            </div>
            <div className='p-3'>
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataSongByArtist}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>

      <div className='mt-5'>
        {dataSongByPlaylist ? (
          <div className='rounded-md border bg-white dark:border-neutral-800 dark:bg-[#1F1F1F]'>
            <div className='bg-neutral-100/80 p-3 dark:bg-neutral-800'>
              <Text.medium className='!text-sm'>Total Song by Playlist</Text.medium>
            </div>
            <div className='p-3'>
              {/* <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataSongByPlaylist}
                height={100}
              /> */}

              <Line
                options={optionsLineChart(theme)}
                data={dataSongByPlaylist}
                height={windowWidth > 500 ? 100 : 250}
              />
            </div>
          </div>
        ) : (
          <Shimer className='!h-96 w-full' />
        )}
      </div>
    </Layout>
  );
}
