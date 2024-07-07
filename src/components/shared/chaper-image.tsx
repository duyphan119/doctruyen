"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";

export default function ChapterImage({
  url,
  alt,
}: {
  url: string;
  alt: string;
}) {
  const [dimensions, setDimensions] = useState<any>();

  function resizeImage({ width, height, image, url }: any) {
    try {
      const screenWidth = window.innerWidth;
      const scale = screenWidth / width;
      const newWidth = screenWidth;
      const newHeight = height * scale;

      // Tạo canvas để vẽ lại hình ảnh với kích thước mới
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Vẽ lại hình ảnh lên canvas với kích thước mới
        ctx.drawImage(image, 0, 0, newWidth, newHeight);

        // Trả về dữ liệu hình ảnh mới dưới dạng URL
        return canvas.toDataURL();
      }
    } catch (error) {
      console.error("Error resizing image:", error);
    }

    return url;
  }

  useEffect(() => {
    const image = new Image();

    image.src = url;

    image.onload = () => {
      const data = {
        width: image.width,
        height: image.height,
        image,
        url,
      };

      const newUrl = resizeImage(data);
      if (newUrl) {
        console.log(newUrl);
        setDimensions({
          ...data,
          url: newUrl,
        });
      }
    };
  }, [url]);

  if (!dimensions) {
    return null;
  }

  return (
    <NextImage
      alt={alt}
      src={dimensions.url}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
}
