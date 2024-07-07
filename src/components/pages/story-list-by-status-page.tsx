"use client";

import { StoryListByStatusResponse } from "@/api/story.api";
import Pagination from "@/components/shared/pagination";
import StoryCard from "@/components/shared/story-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

export default function StoryListByStatusPage({
  response,
  searchParams,
}: {
  response: StoryListByStatusResponse;
  searchParams?: Record<string, string>;
}) {
  return (
    <div className="container">
      <div className="bg-white grid grid-cols-12 gap-8 py-8">
        <div className="col-span-12">
          <Breadcrumb>
            <BreadcrumbList>
              {response.data.breadCrumb.map((item) => {
                return (
                  <Fragment key={item.name}>
                    <BreadcrumbItem>
                      {item.slug ? (
                        <BreadcrumbLink href={item.slug}>
                          {item.name}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {item.isCurrent ? null : <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {response.data.items.map((item) => (
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
        <div className="col-span-12">
          <Pagination
            currentPage={Number(searchParams?.page) || 1}
            totalPages={Math.ceil(
              response.data.params.pagination.totalItems /
                response.data.params.pagination.totalItemsPerPage
            )}
            generateHref={(page) =>
              `/danh-sach/${response.data.type_list}` +
              (page > 1 ? `?page=${page}` : "")
            }
          />
        </div>
      </div>
    </div>
  );
}
