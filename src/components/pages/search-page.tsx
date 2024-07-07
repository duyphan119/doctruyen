"use client";

import { SearchResponse } from "@/api/story.api";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import Pagination from "../shared/pagination";
import StoryCard from "../shared/story-card";

export default function SearchPage({
  response,
  searchParams,
}: {
  response: SearchResponse;
  searchParams?: Record<string, any>;
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
            key={item.thumb_url}
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
              `/tim-kiem/${response.data.type_list}?keyword=${searchParams?.keyword}` +
              (page > 1 ? `&page=${page}` : "")
            }
          />
        </div>
      </div>
    </div>
  );
}
