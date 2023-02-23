import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useTheme } from 'next-themes';

export default function Shimer({ className }) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme == 'dark' ? (
    <Skeleton className={`${className ? className + ' ' : ''}h-10 mb-2`} baseColor='#262626' highlightColor='#404040' />
  ) : (
    <Skeleton className={`${className ? className + ' ' : ''}h-10 mb-2`} />
  );
}
