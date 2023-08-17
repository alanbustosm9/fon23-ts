// import { createApi } from "@reduxjs/toolkit/dist/query";
// import { baseQuery } from "./config";

// import { IState, IMessage } from "../interfaces";

// type Data = {
//   message: IMessage;
//   state: IState;
//   data: {
//     // TODO: Agregar la data aca dentro
//   };
// };

// type ParametersGetHome = { desde: string; hasta: string };

// export const homeApi = createApi({
//   reducerPath: "homeApi",
//   baseQuery: baseQuery,
//   tagTypes: ["Home"],
//   endpoints: (builder) => ({
//     getHome: builder.query<Data, void>({
//       query: () => ({
//         url: "/home",
//         // params: void,
//       }),
//       providesTags: () => ["Home"],
//     }),
//   }),
// });

// // export const { useGetHomeQuery } = homeApi;
