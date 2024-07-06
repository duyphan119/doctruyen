import { storyApi } from "@/api/story.api";
import StoryDetailsPage from "@/components/pages/story-details-page";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const response = await storyApi.getBySlug(params.slug);

  return {
    title: response.data.seoOnPage.titleHead,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function StoryDetails({ params }: Props) {
  const response = await storyApi.getBySlug(params.slug);

  return <StoryDetailsPage response={response} />;
}
