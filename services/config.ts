import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Origin", "*");
    return headers;
  },
});
