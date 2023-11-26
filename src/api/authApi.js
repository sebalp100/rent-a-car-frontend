import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authLog = createApi({
  reducerPath: 'authLog',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: (authToken) => (
        {
          url: '/brands',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
      providesTags: ['Brands'],
    }),
    getCars: builder.query({
      query: (authToken) => (
        {
          url: '/cars',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
      providesTags: ['Cars'],
    }),
    getFeatured: builder.query({
      query: (authToken) => (
        {
          url: '/cars?featured=true',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
      providesTags: ['Featured'],
    }),
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
    deleteCar: builder.mutation({
      query: (user) => (
        {
          url: `/cars/${user.id}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }),
      invalidatesTags: ['Cars'],
    }),
  }),
});

export const { useGetBrandsQuery, useGetCarsQuery, useGetFeaturedQuery, useLoginMutation, useLogoutMutation, useDeleteCarMutation } = authLog;
