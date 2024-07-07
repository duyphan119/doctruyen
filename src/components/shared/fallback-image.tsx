"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}
export default function FallbackImage(props: ImageWithFallbackProps) {
  const { src, fallbackSrc, alt, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      onError={() => {
        console.log("first");
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
