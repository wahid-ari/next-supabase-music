import Link from 'next/link';
import Badge from './Badge';
import Heading from './Heading';
export default function Wrapper({ id, name, props, variant, noClassName, noChildren, noProps, noWrap, children }) {
  return (
    <section id={id} className='pt-8'>
      <Heading className='group transition-all duration-500'>
        <span className='text-neutral-500 transition-all duration-500 group-hover:text-black dark:group-hover:text-white'>
          #
        </span>{' '}
        <Link href={`#${id}`}>{name}</Link>
      </Heading>
      {noWrap ? (
        <div className='mb-2'>{children}</div>
      ) : (
        <div className='relative mb-2 rounded-md border p-8 dark:border-neutral-800'>{children}</div>
      )}
      {variant && variant.length > 0 ? (
        <div className='mb-2 flex flex-wrap items-center gap-y-2'>
          {variant.map((v, i) => {
            return <Badge.yellow key={i}>.{v}</Badge.yellow>;
          })}
        </div>
      ) : (
        ''
      )}
      <div className='flex flex-wrap items-center gap-y-2'>
        {!noClassName && <Badge.green>className</Badge.green>}
        {props &&
          props.length > 0 &&
          props.map((p, i) => {
            return <Badge key={i}>{p}</Badge>;
          })}
        {!noChildren && <Badge.green>children</Badge.green>}
        {!noProps && <Badge.green>...props</Badge.green>}
      </div>
    </section>
  );
}
