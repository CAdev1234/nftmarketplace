import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic'
import Image from 'next/image';

type MyImageProps = {
  loading?: "lazy" | "eager" | undefined,
  priority?: any,
  src?: StaticImageData,
  className?: string,
  layout?: string,
  placeholder?: string
}

const MyImage:FC<MyImageProps> = (props) => {
  const [loading, setLoading] = useState(props.loading);

  useEffect(() => {
    // Skip if image is already eager or has priority (disables lazy loading)
    if (props.loading === 'eager' || props.priority) {
      return;
    }

    if (!isMobileConnection()) {
      let clearDefer:any;
      // Set loading to eager if all resources of document are loaded, but defer it a bit
      const onLoad = () => {
        clearDefer = defer(() => setLoading('eager'));
      };
      window.addEventListener('load', onLoad);
      return () => {
        // Clean up the load event listener and an eventual defer
        window.removeEventListener('load', onLoad);
        if (clearDefer) {
          clearDefer();
        }
      };
    }
  }, [props.loading, props.priority]);

  return <Image loading={loading} {...props} />;
};

const isMobileConnection = () => {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return (
    connection?.type === 'cellular' ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g' ||
    connection?.effectiveType === '3g' ||
    connection?.saveData === true
  );
};

const defer = (callback: any) => {
  // Check if we can use requestIdleCallback
  if (window.requestIdleCallback) {
    const handle = window.requestIdleCallback(callback);
    return () => window.cancelIdleCallback(handle);
  }
  // Just defer using setTimeout with some random delay otherwise
  const handle = setTimeout(callback, 2345 + Math.random() * 1000);
  return () => clearTimeout(handle);
};

export default MyImage;