export type StoryDetailsResponse = {
  status: string;
  message: string;
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      seoSchema: {
        "@context": string;
        "@type": string;
        name: string;
        url: string;
        image: string;
        director: string;
      };
      descriptionHead: string;
      og_image: string[];
      updated_time: number;
      og_url: string;
    };
    breadCrumb: {
      name: string;
      slug: string;
      position: number;
    }[];
    params: {
      slug: string;
      crawl_check_url: string;
    };
    item: {
      _id: string;
      name: string;
      slug: string;
      origin_name: string[];
      content: string;
      status: string;
      thumb_url: string;
      sub_docquyen: boolean;
      author: string[];
      category: {
        id: string;
        name: string;
        slug: string;
      }[];
      chapters: {
        server_name: string;
        server_data: {
          filename: string;
          chapter_name: string;
          chapter_title: string;
          chapter_api_data: string;
        }[];
      }[];
      updatedAt: string;
    };
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

export type StoryChapterDetailsResponse = {
  status: string;
  message: string;
  data: {
    domain_cdn: string;
    item: {
      _id: string;
      comic_name: string;
      chapter_name: string;
      chapter_title: string;
      chapter_path: string;
      chapter_image: {
        image_page: number;
        image_file: string;
      }[];
    };
  };
};

export type SearchResponse = {
  status: string;
  message: string;
  data: {
    seoOnPage: {
      og_type: string;
      titleHead: string;
      descriptionHead: string;
      og_image: string[];
      og_url: string;
    };
    breadCrumb: {
      name: string;
      isCurrent: boolean;
      position: number;
    }[];
    titlePage: string;
    items: {
      name: string;
      slug: string;
      origin_name: string[];
      status: string;
      thumb_url: string;
      sub_docquyen: boolean;
      author: string[];
      category: {
        id: string;
        name: string;
        slug: string;
      }[];
      chapters: {
        server_name: string;
        server_data: {
          filename: string;
          chapter_name: string;
          chapter_title: string;
          chapter_api_data: string;
        }[];
      }[];
      updatedAt: string;
      chaptersLatest: {
        filename: string;
        chapter_name: string;
        chapter_title: string;
        chapter_api_data: string;
      }[];
    }[];
    params: {
      type_slug: string;
      keyword: string;
      filterCategory: string[];
      sortField: string;
      sortType: string;
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        pageRanges: number;
      };
    };
    type_list: string;
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
};

export const storyApi = {
  getBySlug: async (slug: string): Promise<StoryDetailsResponse> => {
    const response = await fetch(
      `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
    );

    return await response.json();
  },
  search: async (keyword: string): Promise<SearchResponse> => {
    const response = await fetch(
      `https://otruyenapi.com/v1/api/tim-kiem?keyword=${keyword}`
    );

    return await response.json();
  },
};
