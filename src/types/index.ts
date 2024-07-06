export type Story = {
  _id: string;
  name: string;
  slug: string;
  origin_name: string[];
  status: string;
  thumb_url: string;
  sub_docquyen: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  chaptersLatest: {
    filename: string;
    chapter_name: string;
    chapter_title: string;
    chapter_api_data: string;
  }[];
};
