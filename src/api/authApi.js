import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authLog = createApi({
  reducerPath: 'authLog',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ logindata }) => (
        {
          url: `/login`,
          method: 'POST',
          body: logindata
        }),
    }),
    logout: builder.mutation({
      query: (authToken) => (
        {
          url: '/logout',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authLog;
