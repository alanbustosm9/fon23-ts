import React, { useState } from "react";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";

//Components
import { DashboardLayout } from "../../components/layouts";

// import { Loader } from "../../components/ui";

//Service
// import {
//   homeApi,
//   // useGetHomeQuery
// } from "../../services/home";

//Material
import { Box, Grid } from "@mui/material";

const HomePage: NextPage = () => {
  const dispatch = useDispatch();

  // const { isLoading, error , isError} = useGetHomeQuery();

  // const resetState = (): void => {
  //   dispatch(homeApi.util.resetApiState());
  // };

  return (
    <DashboardLayout title={"Fon23 Dashboard"}>
      {/* {isLoading || isError ? (
        <Loader
          height="calc(100vh - 130px)"
          resetState={resetState}
          isError={isError}
          seeError={false}
          error={JSON.stringify(error)}
        />
      ) : (
        <>
          <div>
            {data && (
              <Box overflow={"auto"} height="calc(100vh - 120px)">
                <Grid container spacing={0} marginTop={2}>
                 
                </Grid>
              </Box>
            )}
          </div>
        </>
      )} */}
      <h1>Inicio prueba</h1>
    </DashboardLayout>
  );
};

export default HomePage;
