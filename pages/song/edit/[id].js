import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import useToast from '@utils/useToast';
import Layout from '@components/layout/Layout';
import Title from '@components/systems/Title';
import Shimer from '@components/systems/Shimer';
import LabeledInput from '@components/systems/LabeledInput';
import { Combobox, Transition } from '@headlessui/react';
import Label from '@components/systems/Label';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/outline';
import Button from '@components/systems/Button';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const cookies = nookies.get(context);
  if (!cookies.token) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Song({ id }) {
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${id}`, fetcher);
  const { data: artist, error: errorArtist } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/artist`, fetcher);
  const { data: album, error: errorAlbum } = useSWR(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/album`, fetcher);
  const { updateToast, pushToast, dismissToast } = useToast();
  const [editItem, setEditItem] = useState({
    name: '',
    cover_url: '',
    preview_url: '',
    youtube_url: '',
    artist_id: null,
    album_id: null,
  });
  const [selectedArtist, setSelectedArtist] = useState();
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [queryArtist, setQueryArtist] = useState('');
  const [queryAlbum, setQueryAlbum] = useState('');
  const router = useRouter();

  const filteredArtist =
    queryArtist === ''
      ? artist
      : artist.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryArtist.toLowerCase().replace(/\s+/g, ''))
        );

  const filteredAlbum =
    queryAlbum === ''
      ? album
      : album.filter((item) =>
          item.name.toLowerCase().replace(/\s+/g, '').includes(queryAlbum.toLowerCase().replace(/\s+/g, ''))
        );

  useEffect(() => {
    if (data) {
      setEditItem({
        name: data[0].name,
        cover_url: data[0].cover_url,
        preview_url: data[0].preview_url,
        youtube_url: data[0].youtube_url,
        artist_id: data[0].artists?.id,
        album_id: data[0].album?.id,
      });
      setSelectedArtist({ id: data[0].artists.id, name: data[0].artists.name });
      setSelectedAlbum({ id: data[0].album?.id, name: data[0].album?.name });
    }
  }, [data]);

  useEffect(() => {
    if (selectedArtist) setEditItem({ ...editItem, artist_id: selectedArtist.id });
  }, [selectedArtist]);

  useEffect(() => {
    if (selectedAlbum) setEditItem({ ...editItem, album_id: selectedAlbum.id });
  }, [selectedAlbum]);

  async function handleEdit() {
    const toastId = pushToast({
      message: 'Saving Song...',
      isLoading: true,
    });
    try {
      const res = await axios.put(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song?id=${id}`, editItem);
      if (res.status == 201) {
        setEditItem({ name: '', cover_url: '', preview_url: '', youtube_url: '', artist_id: null, album_id: null });
        updateToast({ toastId, message: res.data.message, isError: false });
        router.push('/song');
      }
    } catch (error) {
      console.error(error);
      updateToast({ toastId, message: error.response.data.error, isError: true });
    } finally {
      mutate(`${process.env.NEXT_PUBLIC_API_ROUTE}/api/song`);
    }
  }

  if (error) {
    return (
      <Layout title='Edit Song - MyMusic'>
        <div className='flex h-[36rem] items-center justify-center text-base'>Failed to load</div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit ${data ? data[0]?.name + ' - MyMusic' : 'Edit Song - MyMusic'}`}>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-y-3'>
        {data ? <Title>Edit {data[0]?.name}</Title> : <Title>Edit Song</Title>}
      </div>

      {data ? (
        <div className='max-w-lg rounded'>
          <LabeledInput
            label='Name'
            type='text'
            name='name'
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
            placeholder='Song Name'
          />

          {filteredArtist ? (
            <Combobox value={selectedArtist} onChange={setSelectedArtist}>
              <div className='relative mt-1 pb-1'>
                <Label>Artist</Label>
                <div className='relative my-2 w-full cursor-default overflow-hidden rounded-md border border-neutral-300 text-left text-sm dark:border-neutral-600'>
                  <Combobox.Input
                    className='w-full rounded-md border border-transparent py-2 pl-3 pr-10 text-sm font-medium text-neutral-900 focus:border-emerald-500 dark:bg-neutral-900 dark:text-white'
                    displayValue={(artist) => artist?.name}
                    placeholder='Search Artist'
                    onChange={(e) => setQueryArtist(e.target.value)}
                  />
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  afterLeave={() => setQueryArtist('')}
                >
                  <Combobox.Options className='absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg dark:bg-neutral-800'>
                    {filteredArtist.length === 0 && queryArtist !== '' ? (
                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white'>
                        Nothing found.
                      </div>
                    ) : (
                      filteredArtist.map((item) => (
                        <Combobox.Option
                          key={item.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white'
                            }`
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {item.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          ) : (
            <Shimer className='h-8' />
          )}

          {filteredAlbum ? (
            <Combobox value={selectedAlbum} onChange={setSelectedAlbum}>
              <div className='relative mt-1 pb-3'>
                <Label>Album (Optional)</Label>
                <div className='relative my-2 w-full cursor-default overflow-hidden rounded-md border border-neutral-300 text-left text-sm dark:border-neutral-600'>
                  <Combobox.Input
                    className='w-full rounded-md border border-transparent py-2 pl-3 pr-10 text-sm font-medium text-neutral-900 focus:border-emerald-500 dark:bg-neutral-900 dark:text-white'
                    displayValue={(album) => album?.name}
                    placeholder='Search Album'
                    onChange={(e) => setQueryAlbum(e.target.value)}
                  />
                  <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                    <ChevronDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                  afterLeave={() => setQueryAlbum('')}
                >
                  <Combobox.Options className='absolute z-10 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg dark:bg-neutral-800'>
                    {filteredAlbum.length === 0 && queryAlbum !== '' ? (
                      <div className='relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-white'>
                        Nothing found.
                      </div>
                    ) : (
                      filteredAlbum.map((item) => (
                        <Combobox.Option
                          key={item.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-emerald-600 text-white' : 'text-gray-900 dark:text-white'
                            }`
                          }
                          value={item}
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                {item.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-teal-600'
                                  }`}
                                >
                                  <CheckIcon className='h-5 w-5' aria-hidden='true' />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          ) : (
            <Shimer className='h-8' />
          )}

          <LabeledInput
            label='Cover URL (Optional)'
            type='text'
            name='cover'
            value={editItem.cover_url}
            onChange={(e) => setEditItem({ ...editItem, cover_url: e.target.value })}
            placeholder='https://i.scdn.co/image/ab67616d00001e02b151437d4adc97ce6c828d4a'
          />

          <LabeledInput
            label='Preview URL (Optional)'
            type='text'
            name='preview'
            value={editItem.preview_url}
            onChange={(e) => setEditItem({ ...editItem, preview_url: e.target.value })}
            placeholder='https://p.scdn.co/mp3-preview/09474fc657c15038cb699afa4a52b4fac9383d62'
          />

          <LabeledInput
            label='Youtube URL (Optional)'
            type='text'
            name='youtube'
            value={editItem.youtube_url}
            onChange={(e) => setEditItem({ ...editItem, youtube_url: e.target.value })}
            placeholder='1G4isv_Fylg'
          />

          <Button onClick={handleEdit} className='w-full'>
            Update
          </Button>
        </div>
      ) : (
        <Shimer className='!h-60' />
      )}
    </Layout>
  );
}
