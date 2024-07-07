"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { Category } from "@/api/category.api";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export default function CategoriesNav({
  categories,
}: {
  categories: Category[];
}) {
  const [visible, setVisible] = useState<boolean>();

  const toggleVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={toggleVisible}
        className="!justify-between w-full"
      >
        Thể loại {visible ? <ChevronUp /> : <ChevronDown />}
      </Button>
      {visible && (
        <ScrollArea className="h-[50vw] w-[calc(100%-2rem)]  ml-4">
          <div className="bg-slate-700 grid grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/danh-sach/the-loai/${category.slug}`}
                className={buttonVariants({
                  variant: "ghost",
                  className: "col-span-1",
                })}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
}
