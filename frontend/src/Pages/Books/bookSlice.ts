import { apiSlice } from "../../app/api/apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
    }),
    getYourBooks: builder.query({
      query: () => ({
        url: "/books/your-books",
        method: "GET",
      }),
    }),
    deleteSpecificBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetYourBooksQuery,
  useDeleteSpecificBookMutation,
} = bookApiSlice;
