import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

const wrapperClassName = {
  fontSize: 60,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'relative',
};

export default async function handler(req) {
  try {
    const { searchParams } = req.nextUrl;
    const hasTitle = searchParams.has('title');
    const titleLength = hasTitle ? searchParams.get('title')?.slice(0, 70) : 'MyMusic';
    let title = titleLength.length == 70 ? titleLength + '...' : titleLength;
    title = title || 'MyMusic';

    return new ImageResponse(
      (
        <div style={wrapperClassName}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt='bg'
            width='100%'
            height='100%'
            src={`${process.env.NEXT_PUBLIC_API_ROUTE}/ogs.png`}
            style={{
              position: 'absolute',
            }}
          />

          <div tw='flex items-center text-white absolute left-20'>
            <svg
              height='40'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5'
              />
            </svg>
            <p
              tw='text-3xl font-extrabold ml-2'
              style={{
                fontWeight: 700,
              }}
            >
              MyMusic
            </p>
          </div>

          <h1
            tw='mx-20 my-auto relative pr-4'
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              textShadow: '0 2px 30px #000',
              letterSpacing: -4,
              backgroundImage: 'linear-gradient(90deg, #fff 40%, #aaa)',
              backgroundClip: 'text',
              '-webkit-background-clip': 'text',
              color: 'transparent',
            }}
          >
            {title}
          </h1>

          <p
            style={{
              position: 'absolute',
              bottom: 70,
              left: 80,
              margin: 0,
              fontSize: 26,
              letterSpacing: -1,
              color: '#fff',
            }}
          >
            With MyMusic, its easy to find the right music for every moment.
          </p>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
