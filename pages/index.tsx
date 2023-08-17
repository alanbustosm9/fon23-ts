import Head from "next/head";

import { Box, Grid } from "@mui/material";

import ImageComponent from "../components/login/Image";
import LoginComponent from "../components/login/Login";

import type { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fon23</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Box>
        <Grid container spacing={0}>
          <LoginComponent />
          <ImageComponent />
        </Grid>
      </Box>
    </>
  );
};

export default LoginPage;
