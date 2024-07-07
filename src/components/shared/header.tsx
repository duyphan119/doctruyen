import { Menu } from "lucide-react";
import Link from "next/link";

import { categoryApi } from "@/api/category.api";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "../ui/button";
import ButtonSearch from "./button-search";
import CategoriesNav from "./categories-nav";

export const statuses = [
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
export default async function Header() {
  const {
    data: { items: categories },
  } = await categoryApi.getAll();
  return (
    <header className="sticky top-0 z-10 bg-white">
      <div className="container relative flex justify-between h-16">
        <div className="h-full lg:hidden flex items-center ">
          <Drawer direction="left">
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost" className="">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-[75vw] bg-slate-800 text-slate-200">
              <DrawerHeader>
                <DrawerTitle>DOCTRUYEN</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col flex-1 h-full">
                {statuses.map(({ name, slug }) => {
                  return (
                    <Link
                      key={slug}
                      href={`/danh-sach/${slug}`}
                      className={buttonVariants({
                        variant: "ghost",
                        className: "!justify-start",
                      })}
                    >
                      {name}
                    </Link>
                  );
                })}
                <CategoriesNav categories={categories} />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        <div className="logo h-full flex items-center">
          <Link href="/" className="text-2xl font-bold">
            DOC<span className="text-primary">TRUYEN</span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center justify-center gap-4 flex-1 h-full absolute inset-0">
          {statuses.map(({ name, slug }) => {
            return (
              <Link key={slug} href={`/danh-sach/${slug}`} className="">
                {name}
              </Link>
            );
          })}
          <div className="">Thể loại</div>
        </div>
        <div className="search h-full flex items-center">
          <ButtonSearch />
        </div>
      </div>
    </header>
  );
}
