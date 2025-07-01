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
        url: "/books/get-all-books-of-user",
        method: "GET",
      }),
      providesTags: ["Userbooks"],
    }),
    deleteSpecificBook: builder.mutation({
      query: ({ ids }) => ({
        url: `/books/delete-user-book`,
        method: "DELETE",
        body: { bookId: ids },
      }),
      invalidatesTags: ["Userbooks"],
    }),
    addBookToUser: builder.mutation({
      query: ({ ids, email }) => ({
        url: `/books/add-book-to-user`,
        method: "POST",
        body: { bookIds: ids, email },
      }),
      invalidatesTags: ["Userbooks"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetYourBooksQuery,
  useDeleteSpecificBookMutation,
  useAddBookToUserMutation,
} = bookApiSlice;
