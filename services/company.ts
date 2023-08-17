import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./config";

import { ICompany, IState, IMessage } from "../interfaces";

type Data = {
  message: IMessage;
  state: IState;
  data: ICompany;
};

type ParametersPostCompany = {
  rut: string;
  razon_social: string;
  giro: string;
  direccion: string;
  resolucion_timbre: string;
  nombre_fantasia: string;
  fecha_resolucion: string;
  numero_resolucion: number;
  telefono1: number;
  telefono2: number;
  habilitados: { id: string; fecha: string | null }[];
};

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: baseQuery,
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompany: builder.query<Data, void>({
      query: () => `company`,
      providesTags: ["Company"],
    }),
    postCompany: builder.mutation<Data, ParametersPostCompany>({
      query: (body) => ({
        url: `company`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const { useGetCompanyQuery, usePostCompanyMutation } = companyApi;
