import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { useTheme } from 'next-themes';
import Layout from "@components/layout/Layout";
import Shimer from "@components/systems/Shimer";
import Text from "@components/systems/Text";
import Title from "@components/systems/Title";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { populateData, options, optionsBarChart, optionsHorizontalBarChart } from '@utils/chartSetup'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { theme } = useTheme()
  const { data: genre, error: errorGenre } = useSWR(`${process.env.API_ROUTE}/api/statistics/genre`, fetcher)
  const { data: song, error: errorSong } = useSWR(`${process.env.API_ROUTE}/api/statistics/song`, fetcher)
  const { data: album, error: errorAlbum } = useSWR(`${process.env.API_ROUTE}/api/statistics/album`, fetcher)
  const { data: songByAlbum, error: errorSongByAlbum } = useSWR(`${process.env.API_ROUTE}/api/statistics/song-by-album`, fetcher)
  const [dataGenre, setDataGenre] = useState()
  const [dataSong, setDataSong] = useState()
  const [dataAlbum, setDataAlbum] = useState()
  const [dataSongByAlbum, setDataSongByAlbum] = useState()
  const [windowWidth, setWindowWidth] = useState()

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [windowWidth])

  useEffect(() => {
    if (genre !== undefined) setDataGenre(populateData(genre, "genre"))
    if (song !== undefined) setDataSong(populateData(song, "song"))
    if (album !== undefined) setDataAlbum(populateData(album, "album"))
    if (songByAlbum !== undefined) setDataSongByAlbum(populateData(songByAlbum, "song"))
  }, [genre, song, album, songByAlbum])

  if (errorGenre || errorSong || errorAlbum || errorSongByAlbum) {
    return (
      <Layout title="Statistics">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title="Statistics">
      <Title>Statistics</Title>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {dataGenre ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Artis by Genre</Text.medium>
            </div>
            <div className="py-3 m-auto w-72">
              <Pie
                options={options}
                data={dataGenre}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-60" />
        }

        {dataSong ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Album by Artist</Text.medium>
            </div>
            <div className="py-3 m-auto w-72">
              <Doughnut
                options={options}
                data={dataAlbum}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-60" />
        }
      </div>

      <div className="mt-5">
        {dataSongByAlbum ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Song by Album</Text.medium>
            </div>
            <div className="p-3">
              <Bar
                options={optionsBarChart(theme)}
                data={dataSongByAlbum}
                height={100}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-60" />
        }
      </div>

      <div className="mt-5">
        {dataAlbum ?
          <div className="rounded-md border dark:border-neutral-800 bg-white dark:bg-[#1F1F1F]">
            <div className="p-3 bg-neutral-100/80 dark:bg-neutral-800">
              <Text.medium className="!text-sm">Total Song by Artist</Text.medium>
            </div>
            <div className="p-3">
              <Bar
                options={optionsHorizontalBarChart(theme, windowWidth)}
                data={dataSong}
                height={100}
              />
            </div>
          </div>
          :
          <Shimer className="w-full !h-60" />
        }
      </div>
    </Layout>
  );
}