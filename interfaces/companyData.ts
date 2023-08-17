export interface ICompanyData {
  ejecucion: Ejecucion;
  datos: Datos;
}

interface Datos {
  id: number;
  rut: string;
  razon_social: string;
  giro: string;
  direccion: string;
  archivo_logo: string;
  resolucion_timbre: string;
  nombre_fantasia: string;
  fecha_resolucion: string;
  numero_resolucion: number;
  telefono2: string;
  telefono1: string;
  habilitados: Habilitados;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}

interface Habilitados {
  codigo: number;
  nombre: string;
  tipo_documento_id: number;
  habilitado: boolean;
  fecha_habilitacion: string;
}
