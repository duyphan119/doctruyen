import { ArrowDown, ChevronDown, Menu, MoveDown, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HomeResponse } from "@/api/home.api";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button, buttonVariants } from "../ui/button";
import Header from "../shared/header";
import StoryCard from "../shared/story-card";

const statuses = [
  {
    name: "Truyện mới",
    slug: "truyen-moi",
  },
  {
    name: "Sắp ra mắt",
    slug: "sap-ra-mat",
  },
  {
    name: "Đang phát hành",
    slug: "dang-phat-hanh",
  },
  {
    name: "Đã hoàn thành",
    slug: "hoan-thanh",
  },
];

export default function HomePage({ data: { data } }: { data: HomeResponse }) {
  return (
    <>
      <div className="container">
        <div className="bg-white grid grid-cols-12 gap-8">
          {data.items.map((item) => (
            <div
              key={item._id}
              className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2"
            >
              <StoryCard
                name={item.name}
                slug={item.slug}
                thumbnailUrl={item.thumb_url}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
