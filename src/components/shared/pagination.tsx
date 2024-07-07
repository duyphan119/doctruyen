"use client";

import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  generateHref,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  generateHref?: (page: number) => string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <PaginationItem
        disabled={currentPage === 1}
        href={generateHref?.(1)}
        onPageChange={() => onPageChange?.(1)}
      >
        <SkipBack className="h-4 w-4" />
      </PaginationItem>
      <PaginationItem
        disabled={currentPage === 1}
        href={generateHref?.(currentPage - 1)}
        onPageChange={() => onPageChange?.(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </PaginationItem>
      {currentPage > 2 && (
        <PaginationItem
          href={generateHref?.(currentPage - 2)}
          onPageChange={() => onPageChange?.(currentPage - 2)}
        >
          {currentPage - 2}
        </PaginationItem>
      )}
      {currentPage > 1 && (
        <PaginationItem
          href={generateHref?.(currentPage - 1)}
          onPageChange={() => onPageChange?.(currentPage - 1)}
        >
          {currentPage - 1}
        </PaginationItem>
      )}

      <Button size="icon" disabled>
        {currentPage}
      </Button>
      {currentPage + 1 <= totalPages && (
        <PaginationItem
          href={generateHref?.(currentPage + 1)}
          onPageChange={() => onPageChange?.(currentPage + 1)}
        >
          {currentPage + 1}
        </PaginationItem>
      )}
      {currentPage + 2 <= totalPages && (
        <PaginationItem
          href={generateHref?.(currentPage + 2)}
          onPageChange={() => onPageChange?.(currentPage + 2)}
        >
          {currentPage + 2}
        </PaginationItem>
      )}
      <PaginationItem
        disabled={currentPage === totalPages}
        href={generateHref?.(currentPage + 1)}
        onPageChange={() => onPageChange?.(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </PaginationItem>
      <PaginationItem
        disabled={currentPage === totalPages}
        href={generateHref?.(totalPages)}
        onPageChange={() => onPageChange?.(totalPages)}
      >
        <SkipForward className="h-4 w-4" />
      </PaginationItem>
    </div>
  );
}

function PaginationItem({
  children,
  onPageChange,
  disabled,
  href,
}: {
  children: React.ReactNode;
  onPageChange?: () => void;
  disabled?: boolean;
  href?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={buttonVariants({
          size: "icon",
          variant: "outline",
          className: cn(disabled && "pointer-events-none"),
        })}
      >
        {children}
      </Link>
    );
  }
  return (
    <Button disabled={disabled} onClick={onPageChange} size="icon">
      {children}
    </Button>
  );
}
