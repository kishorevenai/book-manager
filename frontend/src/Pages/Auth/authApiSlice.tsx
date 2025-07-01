import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials } from "../../Pages/Auth/authSlice";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({ email, password, username }) => ({
        url: "/auth/create",
        method: "POST",
        body: { email, password, username },
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "/books/your-books",
        method: "GET",
      }),
    }),
    refresh: builder.mutation({
      query: (id) => ({
        url: `/auth/refresh`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutQuery,
  useRefreshMutation,
  useRegisterMutation,
} = bookApiSlice;
