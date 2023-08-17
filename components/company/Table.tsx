import { NextPage } from "next";

//Material
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Components
import { LoaderComponent } from "../ui";

//types
import { ICompany } from "../../interfaces";
import NextLink from "next/link";

interface Props {
  data: ICompany;
  isFetching: boolean;
}

export const TableComponent: NextPage<Props> = ({ data, isFetching }) => {
  let arr = data?.datos && data.ejecucion.estado ? [...data.datos] : [];

  return (
    <Box margin={2} position={"relative"}>
      <TableContainer component={Paper}>
        {isFetching && <LoaderComponent borderRadius={1} />}
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                ID
              </TableCell>
              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Rut
              </TableCell>
              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Razón Social
              </TableCell>

              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Giro
              </TableCell>

              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Dirección
              </TableCell>

              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Resolución timbre
              </TableCell>

              <TableCell
                sx={{ background: "#8EB4D4", color: "#fff" }}
                align="left"
              >
                Nombre Fantasía
              </TableCell>

              <TableCell sx={{ background: "#8EB4D4", color: "#fff" }}>
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {arr.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="item">
                  {item.id}
                </TableCell>
                <TableCell align="left">{item.rut}</TableCell>
                <TableCell align="left">{item.razon_social}</TableCell>

                <TableCell>{item.giro}</TableCell>
                <TableCell>{item.direccion}</TableCell>
                <TableCell>{item.resolucion_timbre}</TableCell>
                <TableCell>{item.nombre_fantasia}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <NextLink href={`/dashboard/company/${item.id}`}>
                      <IconButton
                        size="small"
                        onClick={() => {}}
                        sx={{
                          "&:hover": {
                            color: "secondary.light",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </NextLink>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton
                      size="small"
                      onClick={() => {}}
                      sx={{
                        "&:hover": {
                          color: "secondary.light",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
