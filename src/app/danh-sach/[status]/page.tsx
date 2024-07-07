import { storyApi } from "@/api/story.api";
import StoryListByStatusPage from "@/components/pages/story-list-by-status-page";
import { Metadata } from "next";

type Props = {
  params: {
    status: string;
  };
  searchParams?: Record<string, string>;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const response = await storyApi.getByStatus(params.status);
  let title = response.data.seoOnPage.titleHead;
  if (Number(searchParams?.page) > 1) {
    title = `Trang ${searchParams?.page} - ${response.data.seoOnPage.titleHead}`;
  }
  return {
    title,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function StoryListByStatus({
  params,
  searchParams,
}: Props) {
  const response = await storyApi.getByStatus(params.status, searchParams);

  return (
    <StoryListByStatusPage response={response} searchParams={searchParams} />
  );
}
