import { z } from "zod";

export const DatosBasicosSchema = z.object({
  id: z.number(),
  id_usuario_registra: z.number(),
  primer_nombre: z.string().min(1, "Primer nombre es requerido"),
  segundo_nombre: z.string().optional(),
  primer_apellido: z.string().min(1, "Primer apellido es requerido"),
  segundo_apellido: z.string().optional(),
  id_tipo_documento: z.number().min(1, "Tipo de documento es requerido"),
  documento: z.string().min(1, "Documento es requerido"),
  id_lugar_expedicion: z.number().min(1, "Lugar de expedición es requerido"),
  rango_edad: z.number().min(1, "Rango de edad es requerido"),
  celular: z.string().min(1, "Número de celular es requerido"),
  correo: z.string().email("Correo electrónico inválido"),
  id_discapacidad: z.number(),
  id_sexo: z.number(),
  ciudad_domicilio: z.number().min(1, "Ciudad de domicilio es requerida"),
  direccion: z.string().min(1, "Dirección es requerida"),
  concepto: z.string().optional(),
  id_area_derecho: z.number()
});

export const CaracterizacionSocioeconomicaSchema = z.object({
  id: z.number(),
  ocupacion: z.string().min(1, "Ocupación es requerida"),
  id_promedio_ingresos_personales: z.number().min(1, "Promedio de ingresos personales es requerido"),
  personas_laborando: z.number().min(0, "Número de personas laborando debe ser un número válido"),
  id_promedio_ingresos_familiares: z.number().min(1, "Promedio de ingresos familiares es requerido"),
  id_promedio_egresos: z.number().min(1, "Promedio de egresos es requerido"),
  personas_convive: z.number().min(0, "Número de personas con las que convive debe ser un número válido"),
  id_estrato: z.number().min(1, "Estrato es requerido"),
  dependientes: z.string(),
  numero_dependientes: z.number().min(0, "Número de dependientes debe ser un número válido"),
  depende: z.string(),
  depende_abogado: z.string(),
  id_tipo_vivienda: z.number().min(1, "Tipo de vivienda es requerido"),
  asesorado: z.string(),
  observaciones: z.string().optional()
});

export const CasoJuridicoSchema = z.object({
  id: z.number(),
  id_datos_basicos: z.number(),
  id_enfoque_diferencial: z.number(),
  id_caracterizacion_socioeconomica: z.number(),
  descripcion_factica: z.string().min(1, "Descripción fáctica es requerida"),
  id_area_derecho: z.number().min(1, "Área de derecho es requerida"),
  id_actividad: z.number().min(1, "Actividad es requerida"),
  concepto_juridico: z.string().min(1, "Concepto jurídico es requerido"),
  id_estado_caso: z.number(),
  id_usuario_registra: z.number(),
  id_usuario_asignado: z.number(),
  fecha_asignacion: z.string()
});

// Keep these for backward compatibility if needed
export const ExperienceSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export const EducationSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  schoolName: z.string().min(1, "School name is required"),
  yearOfCompletion: z.string().min(1, "Year of completion is required"),
});

export const EducationBackgroundSchema = z.object({
  educations: z.array(EducationSchema),
});

// Update the FormDataSchema to use the new CasoJuridico schema instead of educationBackground
export const FormDataSchema = z.object({
  datosBasicos: DatosBasicosSchema,
  caracterizacionSocioeconomica: CaracterizacionSocioeconomicaSchema,
  casoJuridico: CasoJuridicoSchema,
});

export type DatosBasicos = z.infer<typeof DatosBasicosSchema>;
export type CaracterizacionSocioeconomica = z.infer<typeof CaracterizacionSocioeconomicaSchema>;
export type CasoJuridico = z.infer<typeof CasoJuridicoSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type EducationBackground = z.infer<typeof EducationBackgroundSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type FormData = z.infer<typeof FormDataSchema>;