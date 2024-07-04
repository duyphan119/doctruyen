export type HomeResponse = {
  status: string;
  message: string;
  data: {
    seoOnPage: {
      titleHead: string;
      descriptionHead: string;
      og_type: string;
      og_image: string[];
    };
    items: {
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
    }[];
    params: {
      type_SLUG: string;
      filterCategory: any[];
      sortField: string;
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        pageRanges: number;
      };
      itemsUpdateInDay: number;
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

export const homeApi = {
  get: async (): Promise<HomeResponse> => {
    const response = await fetch("https://otruyenapi.com/v1/api/home");

    return await response.json();
  },
};
