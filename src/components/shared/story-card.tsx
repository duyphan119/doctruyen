"use client";

import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import FallbackImage from "./fallback-image";

export default function StoryCard({
  name,
  slug,
  thumbnailUrl,
}: {
  thumbnailUrl: string;
  name: string;
  slug: string;
}) {
  return (
    <div className="card">
      <Link href={`/truyen/${slug}`} className="block relative">
        <AspectRatio ratio={3 / 4}>
          <FallbackImage
            alt="thumbnail"
            src={`https://otruyenapi.com/uploads/comics/${thumbnailUrl}`}
            fill
            sizes="(max-width: 1280px) 50vw, 100vw"
            className="object-cover"
            fallbackSrc="/images/placeholder-image-vertical.png"
          />
        </AspectRatio>
      </Link>

      <Link
        href={`/truyen/${slug}`}
        title={name}
        className="mt-2 hover:text-primary line-clamp-2"
      >
        {name}
      </Link>
    </div>
  );
}
