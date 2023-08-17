import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import NextLink from "next/link";

//Components
import { DashboardLayout } from "../../components/layouts";
import { TableComponent } from "../../components/company";
import { Loader } from "../../components/ui";

//Service
import { companyApi, useGetCompanyQuery } from "../../services/company";

//Material
import { Box } from "@mui/material";
import { ColorButton } from "../../utils/customButtons";

const CompaniesPage: NextPage = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, isError, isFetching } = useGetCompanyQuery();

  const resetState = (): void => {
    dispatch(companyApi.util.resetApiState());
  };

  return (
    <DashboardLayout title={"Fon23 Empresas"}>
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
          <div>
            {data && (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"right"}
                  marginRight={"35px"}
                  marginTop={"15px"}
                >
                  <NextLink href="/dashboard/new-company">
                    <ColorButton
                      sx={{
                        fontSize: "14px",
                        color: "info.main",
                      }}
                    >
                      Crear Empresa
                    </ColorButton>
                  </NextLink>
                </Box>
                <Box overflow={"auto"} height="calc(100vh - 120px)">
                  <TableComponent isFetching={isFetching} data={data.data} />
                </Box>
              </>
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default CompaniesPage;
