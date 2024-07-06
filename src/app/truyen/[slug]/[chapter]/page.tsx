import { StoryChapterDetailsResponse, storyApi } from "@/api/story.api";
import StoryChapterDetailsPage from "@/components/pages/story-chapter-details-page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
    chapter: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await storyApi.getBySlug(params.slug);
  let title = response.data.seoOnPage.titleHead;
  const chapter = response.data.item.chapters?.[0]?.server_data.find(
    (item) => item.chapter_name === params.chapter
  );
  if (chapter) {
    title = `Chương ${chapter.chapter_title} - ${response.data.seoOnPage.titleHead}`;
  }
  return {
    title,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function StoryChapterDetails({ params }: Props) {
  const response = await storyApi.getBySlug(params.slug);

  const chapter = response.data.item.chapters?.[0]?.server_data.find(
    (item) => item.chapter_name === params.chapter
  );

  if (chapter) {
    const chapterResponse = await fetch(chapter.chapter_api_data);

    const jsonData: StoryChapterDetailsResponse = await chapterResponse.json();
    return (
      <StoryChapterDetailsPage
        chapters={response.data.item.chapters?.[0]?.server_data || []}
        response={jsonData}
        slug={params.slug}
      />
    );
  }

  return notFound();
}
