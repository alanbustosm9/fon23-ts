import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { DashboardLayout } from "../../components/layouts";
import { BasicModal, LoaderComponent } from "../../components/ui";

import { useForm, SubmitHandler } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ColorButton } from "../../utils/customButtons";
import { usePostCompanyMutation } from "../../services/company";
import { habilitados } from "./../../utils/staticCheckbox";
import dayjs, { Dayjs } from "dayjs";

dayjs.locale("en");

type FormData = {
  rut: string;
  razon_social: string;
  giro: string;
  direccion: string;
  resolucion_timbre: string;
  nombre_fantasia: string;
  numero_resolucion: number;
  fecha_resolucion: string;
  telefono1: number;
  telefono2: number;
  habilitados: { id: string; fecha: string | null }[];
};

const NewCompanyPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => setShowModal(true);

  const [createCompany, result] = usePostCompanyMutation();

  const [dateResolucion, setDateResolucion] = useState<Dayjs | null>(dayjs());

  const [selectedCheckboxes, setSelectedCheckboxes] = useState<{
    [key: number]: boolean;
  }>({});
  const [dateMap, setDateMap] = useState<{ [key: number]: Dayjs | null }>({});

  const { push } = useRouter();

  const handleCheckboxChange = (tipoDocumentoId: number) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [tipoDocumentoId]: !prevSelectedCheckboxes[tipoDocumentoId],
    }));
  };

  const handleDateChange = (
    tipoDocumentoId: number,
    newValue: Dayjs | null
  ) => {
    setDateMap((prevDateMap) => ({
      ...prevDateMap,
      [tipoDocumentoId]: newValue,
    }));
  };

  const renderCheckbox = () => {
    return habilitados.map((item) => {
      const tipoDocumentoId = item.tipo_documento_id;
      const isChecked = selectedCheckboxes[tipoDocumentoId] || false;
      const dateDocumento = isChecked ? dateMap[tipoDocumentoId] || null : null;

      return (
        <FormGroup
          key={item.tipo_documento_id}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                {...register("habilitados")}
                value={item.tipo_documento_id}
                color="secondary"
                checked={isChecked}
                onChange={() => handleCheckboxChange(tipoDocumentoId)}
              />
            }
            label={item.glosa}
            sx={{
              color: "black",
              marginTop: "10px",
            }}
          />
          <DatePicker
            label="Fecha"
            onChange={(newValue) => {
              handleDateChange(tipoDocumentoId, newValue);
            }}
            value={dateDocumento}
            format="DD-MM-YYYY"
          />
        </FormGroup>
      );
    });
  };

  const mergeSelectedData = () => {
    const mergedData = [];

    for (const tipoDocumentoId in selectedCheckboxes) {
      if (selectedCheckboxes[tipoDocumentoId]) {
        mergedData.push({
          id: tipoDocumentoId,
          fecha: dateMap[tipoDocumentoId]?.format("DD-MM-YYYY") || null,
        });
      }
    }

    return mergedData;
  };

  const selectedData = mergeSelectedData();

  const createNewCompany: SubmitHandler<FormData> = async ({
    rut,
    giro,
    direccion,
    razon_social,
    resolucion_timbre,
    nombre_fantasia,
    numero_resolucion,
    telefono1,
    telefono2,
  }) => {
    const formattedDateResolucion = dateResolucion?.format("DD-MM-YYYY") ?? "";

    createCompany({
      rut: rut,
      razon_social: razon_social,
      giro: giro,
      direccion: direccion,
      resolucion_timbre: resolucion_timbre,
      nombre_fantasia: nombre_fantasia,
      fecha_resolucion: formattedDateResolucion,
      numero_resolucion: numero_resolucion,
      telefono1: telefono1,
      telefono2: telefono2,
      habilitados: selectedData,
    });
  };


  return (
    <DashboardLayout title={"Fon23 Crear Empresa"}>
      <form onSubmit={handleSubmit(createNewCompany)} noValidate>
        <Box display={"flex"}>
          <Box marginLeft={15} display={"flex"} flexDirection={"column"}>
            <TextField
              {...register("rut", { required: "Este campo es requerido" })}
              id="bootstrap-input"
              placeholder="12345678-9"
              error={!!errors.rut}
              label="RUT"
              style={{ marginTop: 15 }}
            />

            <TextField
              {...register("razon_social", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba razón social"
              error={!!errors.razon_social}
              label="Razón Social"
              style={{ marginTop: 15 }}
            />

            <TextField
              {...register("giro", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba giro"
              error={!!errors.giro}
              label="Giro"
              style={{ marginTop: 15 }}
            />

            <TextField
              {...register("direccion", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba dirección de la empresa"
              error={!!errors.direccion}
              label="Dirección"
              style={{ marginTop: 15 }}
            />

            <TextField
              {...register("resolucion_timbre", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba resolución timbre"
              error={!!errors.resolucion_timbre}
              label="Resolución Timbre"
              style={{ marginTop: 15 }}
            />

            <TextField
              {...register("nombre_fantasia", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba nombre fantasía"
              error={!!errors.nombre_fantasia}
              label="Nombre Fantasía"
              style={{ marginTop: 15, marginBottom: 15 }}
            />

            <DatePicker
              label="Fecha Resolución"
              value={dateResolucion}
              onChange={(newValue) => {
                setDateResolucion(newValue);
              }}
              format="DD-MM-YYYY"
            />

            <TextField
              {...register("numero_resolucion", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba número de resolución"
              error={!!errors.numero_resolucion}
              label={"Número Resolución"}
              style={{ marginTop: 15 }}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />

            <TextField
              {...register("telefono1", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba teléfono 1"
              error={!!errors.telefono1}
              label="Teléfono 1"
              style={{ marginTop: 15 }}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />

            <TextField
              {...register("telefono2", {
                required: "Este campo es requerido",
              })}
              id="bootstrap-input"
              placeholder="Escriba teléfono 2"
              error={!!errors.telefono2}
              label="Teléfono 2"
              style={{ marginTop: 15 }}
              onKeyDown={(e) => {
                if (!/[0-9.]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          </Box>

          {/* DERECHA */}
          <Box marginLeft={15}>
            <Typography
              fontSize={16}
              fontWeight={700}
              sx={{
                color: "#ddddd",
                marginTop: "10px",
              }}
            >
              Seleccione los documentos
            </Typography>
            <Box
              marginTop={2}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                minWidth: "300px",
                flexDirection: "column",
              }}
            >
              {renderCheckbox()}
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginTop={5}>
          <ColorButton
            type="submit"
            variant="contained"
            onClick={() => {
              onShowModal();
              handleSubmit(createNewCompany);
            }}
            disabled={result.isLoading ? true : false}
          >
            {result.isLoading ? "Cargando" : "Guardar"}
          </ColorButton>
        </Box>

        <BasicModal
          show={showModal}
          setShow={setShowModal}
          title={"Crear Empresa"}
        >
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            {result.isLoading ? (
              <LoaderComponent borderRadius={0} />
            ) : (
              <Typography
                fontSize={16}
                fontWeight={700}
                sx={{
                  color: "#ddddd",
                  marginTop: "10px",
                }}
              >
                {result.data?.data.ejecucion.estado ? (
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{
                      color: "#ddddd",
                      marginTop: "10px",
                    }}
                  >
                    Empresa creada correctamente
                  </Typography>
                ) : (
                  <Typography
                    fontSize={16}
                    fontWeight={700}
                    sx={{
                      color: "#ddddd",
                      marginTop: "10px",
                    }}
                  >
                    {result.data?.data.ejecucion.mensaje}
                  </Typography>
                )}
              </Typography>
            )}
          </Box>
        </BasicModal>
      </form>
    </DashboardLayout>
  );
};

export default NewCompanyPage;
