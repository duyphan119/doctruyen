import { storyApi } from "@/api/story.api";
import StoryListByCategoryPage from "@/components/pages/story-list-by-status-page";
import { Metadata } from "next";

type Props = {
  params: {
    categorySlug: string;
  };
  searchParams?: Record<string, string>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const response = await storyApi.getByCategory(params.categorySlug);
  let title = response.data.seoOnPage.titleHead;
  if (Number(searchParams?.page) > 1) {
    title = `Trang ${searchParams?.page} - ${response.data.seoOnPage.titleHead}`;
  }
  return {
    title,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function StoryListByCategory({
  params,
  searchParams,
}: Props) {
  const response = await storyApi.getByCategory(
    params.categorySlug,
    searchParams
  );

  return (
    <StoryListByCategoryPage response={response} searchParams={searchParams} />
  );
}
