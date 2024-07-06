"use client";

import { StoryChapterDetailsResponse } from "@/api/story.api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { buttonVariants } from "../ui/button";

export default function StoryChapterDetailsPage({
  response,
  chapters,
  slug,
}: {
  response: StoryChapterDetailsResponse;
  chapters: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }[];
  slug: string;
}) {
  const [chaptersNavVisible, setChaptersNavVisible] = useState<boolean>(false);

  const router = useRouter();

  const handleValueChange = (chapterName: string) => {
    router.push(`/truyen/${slug}/${chapterName}`);
  };

  const data = useMemo(() => {
    const index = chapters.findIndex(
      (chapter) => chapter.chapter_name === response.data.item.chapter_name
    );
    let prevIndex = -1;
    let nextIndex = chapters.length;
    if (index !== -1) {
      prevIndex = index - 1;
      nextIndex = index + 1;
    }
    return {
      prevChapter: prevIndex >= 0 ? chapters[prevIndex] : null,
      currentChapter: chapters[index],
      nextChapter: nextIndex < chapters.length ? chapters[nextIndex] : null,
    };
  }, [chapters, response]);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setChaptersNavVisible(true);
      } else {
        setChaptersNavVisible(false);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        if (data.prevChapter) {
          router.push(`/truyen/${slug}/${data.prevChapter.chapter_name}`);
        }
      } else if (event.key === "ArrowRight") {
        if (data.nextChapter) {
          router.push(`/truyen/${slug}/${data.nextChapter.chapter_name}`);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative">
      {response.data.item.chapter_image.map((item, index) => {
        const imageUrl = `${response.data.domain_cdn}/${response.data.item.chapter_path}/${item.image_file}`;

        return (
          <AspectRatio
            ratio={
              index === 0 ||
              index === response.data.item.chapter_image.length - 1
                ? 16 / 9
                : 9 / 16
            }
            key={imageUrl}
            className="w-full"
          >
            <Image
              alt={item.image_page.toString()}
              src={imageUrl}
              fill
              sizes="100vw"
              // className="object-contain"
            />
          </AspectRatio>
        );
      })}
      {chaptersNavVisible && (
        <div
          className="fixed inset-x-0 bottom-0 bg-neutral-500/90 text-neutral-200 p-4 flex items-center
       justify-center gap-4"
        >
          {data.prevChapter && (
            <Link
              href={`/truyen/${slug}/${data.prevChapter.chapter_name}`}
              className={buttonVariants({ size: "icon", variant: "secondary" })}
            >
              <ChevronLeft />
            </Link>
          )}

          <Select
            value={data.currentChapter.chapter_name}
            onValueChange={handleValueChange}
          >
            <SelectTrigger className="w-full md:w-40 text-black">
              <SelectValue className="text-black" placeholder="Chọn chương" />
            </SelectTrigger>
            <SelectContent className="text-black">
              <SelectGroup>
                <SelectLabel>Danh sách chương</SelectLabel>
                {chapters.map((chapter) => (
                  <SelectItem
                    key={chapter.chapter_name}
                    value={chapter.chapter_name}
                  >
                    Chương {chapter.chapter_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {data.nextChapter && (
            <Link
              href={`/truyen/${slug}/${data.nextChapter.chapter_name}`}
              className={buttonVariants({ size: "icon", variant: "secondary" })}
            >
              <ChevronRight />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
