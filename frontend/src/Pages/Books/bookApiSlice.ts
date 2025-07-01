import { apiSlice } from "../../app/api/apiSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => ({
        url: "/books",
        method: "GET",
      }),
      providesTags: ["adminUpdate"],
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
    updateBook: builder.mutation({
      query: ({ book_id, author, title }) => ({
        url: `/books/update/${book_id}`,
        method: "PUT",
        body: {
          bookId: book_id,
          author,
          title,
        },
      }),
      invalidatesTags: ["adminUpdate"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetYourBooksQuery,
  useDeleteSpecificBookMutation,
  useAddBookToUserMutation,
  useUpdateBookMutation,
} = bookApiSlice;
