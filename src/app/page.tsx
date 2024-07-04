import { homeApi } from "@/api/home.api";
import HomePage from "@/components/pages/home-page";

export const generateMetadata = async () => {
  const response = await homeApi.get();

  return {
    title: response.data.seoOnPage.titleHead,
    description: response.data.seoOnPage.descriptionHead,
  };
};

export default async function Home() {
  const response = await homeApi.get();

  return <HomePage data={response} />;
}
