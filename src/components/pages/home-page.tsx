"use client";

import { HomeResponse } from "@/api/home.api";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { Search } from "lucide-react";

export default function HomePage({ data: { data } }: { data: HomeResponse }) {
  return (
    <>
      <header>
        <div className="container flex h-16">
          <div className="logo h-full flex items-center">DOCTRUYEN</div>
          <div className="flex items-center justify-center gap-4 flex-1 h-full">
            <div className="">Thể loại</div>
            <div className="">Trạng thái</div>
          </div>
          <div className="search h-full flex items-center">
            <Search />
          </div>
        </div>
      </header>
      <main className="container">
        <div className="grid grid-cols-12 gap-8">
          {data.items.map((item) => (
            <div
              key={item._id}
              className="col-span-12 sm:col-span-6 md:col-span-4"
            >
              <div className="card">
                <AspectRatio ratio={3 / 4}>
                  <Image
                    alt="thumbnail"
                    src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                    fill
                    sizes="(max-width: 1280px) 50vw, 100vw"
                  />
                </AspectRatio>

                <h2 className="mt-2">{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer>Footer</footer>
    </>
  );
}
