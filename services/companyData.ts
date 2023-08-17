import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

import { ICompanyData, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: ICompanyData;
};

type ParametersGetCompanyData = { empresa_id: string };

export const companyDataApi = createApi({
  reducerPath: "companyDataApi",
  baseQuery: baseQuery,
  tagTypes: ["CompanyData"],
  endpoints: (builder) => ({
    getCompanyData: builder.query<Data, ParametersGetCompanyData>({
      query: ({ empresa_id }) => ({
        url: `companyData`,
        params: { empresa_id: empresa_id },
      }),
      providesTags: ["CompanyData"],
    }),
  }),
});

export const { useGetCompanyDataQuery } = companyDataApi;
