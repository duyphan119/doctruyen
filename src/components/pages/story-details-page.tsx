"use client";

import { StoryDetailsResponse } from "@/api/story.api";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Plus } from "lucide-react";
import { Fragment, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button, buttonVariants } from "../ui/button";

export default function StoryDetailsPage({
  response,
}: {
  response: StoryDetailsResponse;
}) {
  const [showMoreChaptersVisible, setShowMoreChaptersVisible] =
    useState<boolean>(true);

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-6 p-2.5">
        <div className="col-span-12 md:col-span-4">
          <AspectRatio ratio={3 / 4}>
            <Image
              alt="thumbnail"
              src={`https://otruyenapi.com/uploads/comics/${response.data.item.thumb_url}`}
              fill
              sizes="(max-width: 1280px) 50vw, 100vw"
            />
          </AspectRatio>
        </div>
        <div className="col-span-12 md:col-span-8 space-y-2">
          <h1 className="text-3xl font-semibold">{response.data.item.name}</h1>
          <p>
            Tác giả:{" "}
            {response.data.item.author.length > 0 &&
            response.data.item.author[0] !== ""
              ? response.data.item.author.join(", ")
              : "Đang cập nhật"}
          </p>
          <p>
            Thể loại:{" "}
            {response.data.item.category.map((item, index) => (
              <Fragment key={item.slug}>
                {index > 0 && <span>, </span>}
                <Link
                  href={`/the-loai/${item.slug}`}
                  className="hover:underline hover:underline-offset-2 text-primary"
                >
                  {item.name}
                </Link>
              </Fragment>
            ))}
          </p>
          <p>Trạng thái: {response.data.item.status}</p>
          <div className="flex gap-4">
            {(() => {
              const chapters = response.data.item.chapters;

              let comp = null;

              for (let i = 0; i < chapters.length; i++) {
                const server = chapters[i];

                if (server) {
                  const list = server.server_data;

                  comp = (
                    <>
                      <Link
                        href={`/truyen/${response.data.item.slug}/${list[0].chapter_name}`}
                        className={buttonVariants({})}
                      >
                        Đọc chương đầu
                      </Link>
                      {list.length > 1 && (
                        <Link
                          href={`/truyen/${response.data.item.slug}/${
                            list[list.length - 1].chapter_name
                          }`}
                          className={buttonVariants({})}
                        >
                          Đọc chương cuối
                        </Link>
                      )}
                    </>
                  );
                }

                break;
              }

              return comp;
            })()}
          </div>
        </div>
        <div className="col-span-12 space-y-2">
          <h2 className="text-xl font-semibold">Tóm tắt truyện</h2>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: response.data.item.content }}
          ></div>
        </div>
        {response.data.item.chapters.map(({ server_name, server_data }) => (
          <div key={server_name} className="col-span-12 space-y-2">
            <h2 className="text-xl font-semibold">
              Danh sách chương
              {response.data.item.chapters.length > 1
                ? ` (${server_name})`
                : ""}
            </h2>
            <div className="flex flex-col bg-neutral-100">
              {(showMoreChaptersVisible && server_data.length > 10
                ? [...server_data].splice(0, 10)
                : server_data
              ).map((item, index) => (
                <Link
                  key={item.chapter_name}
                  href={`/truyen/${response.data.item.slug}/${item.chapter_name}`}
                  className={buttonVariants({
                    variant: "link",
                    className: cn(
                      "!justify-start",
                      index > 0 && "border-t border-t-neutral-400 border-dashed"
                    ),
                  })}
                >
                  Chương {item.chapter_name}
                </Link>
              ))}
              {showMoreChaptersVisible && server_data.length > 10 && (
                <Button
                  onClick={() => {
                    setShowMoreChaptersVisible(false);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Xem thêm
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
