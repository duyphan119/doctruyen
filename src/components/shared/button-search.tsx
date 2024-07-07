"use client";

import { Search } from "lucide-react";

import { SearchResponse, storyApi } from "@/api/story.api";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import StoryCard from "./story-card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ButtonSearch() {
  const router = useRouter();

  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [text, setText] = useState<string>("");
  const [modalSearchVisible, setModalSearchVisible] = useState<boolean>(false);

  const handleOpenModalSearch = () => {
    setModalSearchVisible(true);
  };

  const handleCloseModalSearch = () => {
    setModalSearchVisible(false);
  };

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/tim-kiem?keyword=${text}`);
    handleCloseModalSearch();
  };

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (text) {
        const res = await storyApi.search(text);

        setResponse(res);
      }
    }, 456);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <Button size="icon" variant="ghost" onClick={handleOpenModalSearch}>
        <Search />
      </Button>
      {modalSearchVisible && (
        <div className="fixed inset-0 flex items-center justify-center md:p-10 p-4">
          <div
            onClick={handleCloseModalSearch}
            className="overlay absolute inset-0 bg-neutral-700/50 z-10"
          />
          <form
            onSubmit={handleSubmitForm}
            className="flex-1 bg-white rounded-md z-20"
          >
            <Input
              value={text}
              onChange={handleChangeText}
              placeholder="Tìm kiếm truyện"
              className="w-full"
            />
            <ScrollArea className="h-[calc(480px+1.5rem)]">
              {response &&
                response.data &&
                (response.data.items.length > 0 ? (
                  response.data.items.map((item, index) => (
                    <Link
                      key={item.slug}
                      href={`/truyen/${item.slug}`}
                      className={cn(
                        "flex relative group gap-x-2",
                        index !== 0 && "mt-2"
                      )}
                    >
                      <Image
                        alt="thumbnail"
                        src={`https://otruyenapi.com/uploads/comics/${item.thumb_url}`}
                        width={90}
                        height={120}
                        className="object-cover"
                      />

                      <h2 className="mt-2 group-hover:text-primary">
                        {item.name}
                      </h2>
                    </Link>
                  ))
                ) : (
                  <div className="p-4">Không tìm thấy kết quả</div>
                ))}
            </ScrollArea>
            {response &&
              response.data &&
              response.data.params.pagination.totalItems >
                response.data.params.pagination.totalItemsPerPage && (
                <Link
                  href={`/tim-kiem?keyword=${text}`}
                  className={buttonVariants({
                    variant: "link",
                    className: "w-full",
                  })}
                >
                  Xem tất cả
                </Link>
              )}
          </form>
        </div>
      )}
    </>
  );
}
