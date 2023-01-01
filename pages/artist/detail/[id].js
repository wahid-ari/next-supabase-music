import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Layout from "@components/layout/Layout";
import Title from "@components/systems/Title";
import Shimer from "@components/systems/Shimer";
import ReactTable from "@components/systems/ReactTable";
import Button from "@components/systems/Button";
import LabeledInput from "@components/systems/LabeledInput";
import Heading from "@components/systems/Heading";

const fetcher = url => axios.get(url).then(res => res.data)

export async function getServerSideProps(context) {
  const { id } = context.params
  return {
    props: {
      id: id
    }, // will be passed to the page component as props
  }
}

export default function Album({ id }) {
  const { data, error } = useSWR(`${process.env.API_ROUTE}/api/artist?id=${id}`, fetcher)
  const [isLoading, setLoading] = useState(true)

  const songColumn = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'songs.id',
        width: 300,
        Cell: (row) => {
          return (
            row.cell.row.index + 1
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`/song/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
              {values.name}
            </Link>
          )
        }
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row
          return (
            <div>
              <Button className="!py-[2px] !px-[6px] mr-2"
                onClick={() => handleShowEditModal(values.id, values.name, original.cover, original.artists.id)}>
                Edit
              </Button>
              <Button.danger className="!py-[2px] !px-[6px]"
                onClick={() => handleShowDeleteModal(values.id, values.name)}>
                Delete
              </Button.danger>
            </div>
          )
        },
        width: 200,
      },
    ],
    []
  );
  
  const albumColumn = useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'album.id',
        width: 300,
        Cell: (row) => {
          return (
            row.cell.row.index + 1
          )
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row;
          return (
            <Link href={`/album/detail/${original.id}`} className="text-emerald-500 hover:text-emerald-600 text-sm font-medium">
              {values.name}
            </Link>
          )
        }
      },
      {
        Header: 'Action',
        disableSortBy: true,
        width: 300,
        Cell: (row) => {
          const { values, original } = row.cell.row
          return (
            <div>
              <Button className="!py-[2px] !px-[6px] mr-2"
                onClick={() => handleShowEditModal(values.id, values.name, original.cover, original.artists.id)}>
                Edit
              </Button>
              <Button.danger className="!py-[2px] !px-[6px]"
                onClick={() => handleShowDeleteModal(values.id, values.name)}>
                Delete
              </Button.danger>
            </div>
          )
        },
        width: 200,
      },
    ],
    []
  );

  const songTableInstance = useRef(null);
  const albumTableInstance = useRef(null);

  if (error) {
    return (
      <Layout title="Artist Detail">
        <div className="flex h-[36rem] text-base items-center justify-center">Failed to load</div>
      </Layout>
    )
  }

  return (
    <Layout title={`${data ? data[0]?.name : 'Artist Detail'}`}>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-y-3">
        {data ?
          <Title>{data[0]?.name}</Title>
          :
          <Title>Artist Detail</Title>
        }
      </div>

      {data ?
        <div>
          <p className="text-lg">{data[0].genre.name}</p>
          {data[0]?.cover_url &&
            <div className="overflow-hidden">
              <Image
                alt={data[0]?.name}
                src={data[0]?.cover_url}
                width={300}
                height={300}
                className={`rounded my-4 ${isLoading ? 'blur-2xl' : 'blur-0'}`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          }
        </div>
        :
        <Shimer className="h-24" />
      }

      {data ?
        <div className="mt-4">
          <Heading>{data[0]?.name} Songs</Heading>
          <LabeledInput
            label="Search Song"
            id="searchsong"
            name="searchsong"
            placeholder="Song Name"
            className="max-w-xs !py-2"
            onChange={(e) => {
              songTableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={songColumn} data={data[0].songs} ref={songTableInstance} page_size={10} />
        </div>
        :
        <Shimer className="h-24" />
      }

      <hr className="mt-10 dark:border-neutral-700"/>
      
      {data ?
        <div className="mt-8">
          <Heading>{data[0]?.name} Albums</Heading>
          <LabeledInput
            label="Search Album"
            id="searchalbum"
            name="searchalbum"
            placeholder="Album Name"
            className="max-w-xs !py-2"
            onChange={(e) => {
              albumTableInstance.current.setGlobalFilter(e.target.value);
            }}
          />

          <ReactTable columns={albumColumn} data={data[0].album} ref={albumTableInstance} page_size={10} />
        </div>
        :
        <Shimer className="h-24" />
      }

    </Layout>
  );
}

