export type CategoryResponse = {
  status: string;
  message: string;
  data: {
    items: Category[];
  };
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
};

export const categoryApi = {
  getAll: async (): Promise<CategoryResponse> => {
    const response = await fetch("https://otruyenapi.com/v1/api/the-loai");

    return await response.json();
  },
};
