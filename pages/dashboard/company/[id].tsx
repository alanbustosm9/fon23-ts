import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";

import { DashboardLayout } from "../../../components/layouts";
import { Loader } from "../../../components/ui";

import {
  companyDataApi,
  useGetCompanyDataQuery,
} from "../../../services/companyData";

import type { RootState } from "../../../store";

const CompanyValues = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { id } = router.query;

  const empresa_id = useSelector((state: RootState) => state.home.empresa_id);

  const { data, isLoading, error, isError, isFetching } =
    useGetCompanyDataQuery({ empresa_id: empresa_id });

  const resetState = (): void => {
    dispatch(companyDataApi.util.resetApiState());
  };

  return (
    <DashboardLayout title={"Fon23 Crear/Editar Empresa"}>
      {isLoading || isError ? (
        <Loader
          height="calc(100vh - 120px)"
          resetState={resetState}
          isError={isError}
          seeError={false}
          error={JSON.stringify(error)}
        />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "calc(100vh - 120px)",
            }}
          >
            <Typography variant="h3" component="h3">
              {id}
            </Typography>
          </Box>
        </>
      )}
    </DashboardLayout>
  );
};

export default CompanyValues;
