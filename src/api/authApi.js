import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authLog = createApi({
  reducerPath: 'authLog',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rent-a-car-backend-production-d292.up.railway.app' }),
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
    getAvailableCars: builder.query({
      query: (authToken) => (
        {
          url: '/cars?reserved=false',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
    }),
    getReservations: builder.query({
      query: (authToken) => (
        {
          url: '/rentals',
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
      providesTags: ['Reservations'],
    }),
    getCarsByBrand: builder.query({
      query: (brand) => (
        {
          url: `/cars?brand_id=${brand.brandId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${brand.token}`,
          },
        }),
    }),
    getCarsDetails: builder.query({
      query: (brand) => (
        {
          url: `/cars/${brand.carId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${brand.token}`,
          },
        }),
      providesTags: ['Details'],
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
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        }),
      invalidatesTags: ['Reservations'],
    }),
    addReservation: builder.mutation({
      query: (reservation) => (
        {
          url: `/rentals`,
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${reservation.token}`,
          },
          body: reservation.rental,
        }),
      invalidatesTags: ['Reservations'],
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
    deleteBrand: builder.mutation({
      query: (user) => (
        {
          url: `/brands/${user.id}`,
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        }),
      invalidatesTags: ['Brands'],
    }),
  }),
});

export const { useGetBrandsQuery, useGetCarsQuery, useGetReservationsQuery, useGetFeaturedQuery, useGetCarsByBrandQuery, useGetCarsDetailsQuery, useGetAvailableCarsQuery, useLoginMutation, useLogoutMutation, useAddReservationMutation, useDeleteCarMutation, useDeleteBrandMutation } = authLog;
