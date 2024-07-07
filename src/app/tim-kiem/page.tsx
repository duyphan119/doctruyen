import { storyApi } from "@/api/story.api";
import SearchPage from "@/components/pages/search-page";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: Record<string, string>;
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  if (!searchParams || !searchParams.keyword) {
    return {
      title: "Tìm kiếm",
    };
  }
  const response = await storyApi.search(searchParams.keyword);
  return {
    title: response.data.seoOnPage.titleHead,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function Search({ searchParams }: Props) {
  if (!searchParams || !searchParams.keyword) {
    return redirect("/");
  }

  const { keyword, ...query } = searchParams;

  const response = await storyApi.search(keyword, query);

  return <SearchPage response={response} searchParams={searchParams} />;
}
