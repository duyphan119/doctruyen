"use client";

import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/truyen/${slug}`} className="block relative group">
      <AspectRatio ratio={3 / 4}>
        <Image
          alt="thumbnail"
          src={`https://otruyenapi.com/uploads/comics/${thumbnailUrl}`}
          fill
          sizes="(max-width: 1280px) 50vw, 100vw"
          className="object-cover"
        />
      </AspectRatio>

      <h2 className="mt-2 group-hover:text-primary">{name}</h2>
    </Link>
  );
}
