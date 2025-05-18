import { create } from "zustand";
import {
  DatosBasicos,
  CaracterizacionSocioeconomica,
  CasoJuridico,
  FormData,
} from "./validation.schema";

interface JobAppState {
  step: number;
  formData: FormData;
  nextStep: () => void;
  prevStep: () => void;
  getTotalSteps: () => number;
  setDatosBasicos: (data: Partial<DatosBasicos>) => void;
  setCaracterizacionSocioeconomica: (data: Partial<CaracterizacionSocioeconomica>) => void;
  setCasoJuridico: (data: Partial<CasoJuridico>) => void;
  submitForm: () => void;
}

const useJobAppStore = create<JobAppState>((set, get) => ({
  step: 1,
  formData: {
    datosBasicos: {
      id: 0,
      id_usuario_registra: 0,
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      id_tipo_documento: 0,
      documento: "",
      id_lugar_expedicion: 0,
      rango_edad: 0,
      celular: "",
      correo: "",
      id_discapacidad: 0,
      id_sexo: 0,
      ciudad_domicilio: 0,
      direccion: "",
      concepto: "",
      id_area_derecho: 0
    },
    caracterizacionSocioeconomica: {
      id: 0,
      ocupacion: "",
      id_promedio_ingresos_personales: 0,
      personas_laborando: 0,
      id_promedio_ingresos_familiares: 0,
      id_promedio_egresos: 0,
      personas_convive: 0,
      id_estrato: 0,
      dependientes: "",
      numero_dependientes: 0,
      depende: "",
      depende_abogado: "",
      id_tipo_vivienda: 0,
      asesorado: "",
      observaciones: ""
    },
    casoJuridico: {
      id: 0,
      id_datos_basicos: 0,
      id_enfoque_diferencial: 0,
      id_caracterizacion_socioeconomica: 0,
      descripcion_factica: "",
      id_area_derecho: 0,
      id_actividad: 0,
      concepto_juridico: "",
      id_estado_caso: 0,
      id_usuario_registra: 0,
      id_usuario_asignado: 0,
      fecha_asignacion: ""
    },
  },
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  getTotalSteps: () => {
    return Object.keys(get().formData).length + 1;
  },
  setDatosBasicos: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        datosBasicos: {
          ...state.formData.datosBasicos,
          ...data,
        },
      },
    })),
  setCaracterizacionSocioeconomica: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        caracterizacionSocioeconomica: {
          ...state.formData.caracterizacionSocioeconomica,
          ...data,
        },
      },
    })),
  setCasoJuridico: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        casoJuridico: {
          ...state.formData.casoJuridico,
          ...data,
        },
      },
    })),
  submitForm: () => {
    set((state) => {
      console.log("Form submitted Successfully!");
      console.log("Submitted Data: ", state.formData);
      return {
        step: 1,
        formData: {
          datosBasicos: {
            id: 0,
            id_usuario_registra: 0,
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            id_tipo_documento: 0,
            documento: "",
            id_lugar_expedicion: 0,
            rango_edad: 0,
            celular: "",
            correo: "",
            id_discapacidad: 0,
            id_sexo: 0,
            ciudad_domicilio: 0,
            direccion: "",
            concepto: "",
            id_area_derecho: 0
          },
          caracterizacionSocioeconomica: {
            id: 0,
            ocupacion: "",
            id_promedio_ingresos_personales: 0,
            personas_laborando: 0,
            id_promedio_ingresos_familiares: 0,
            id_promedio_egresos: 0,
            personas_convive: 0,
            id_estrato: 0,
            dependientes: "",
            numero_dependientes: 0,
            depende: "",
            depende_abogado: "",
            id_tipo_vivienda: 0,
            asesorado: "",
            observaciones: ""
          },
          casoJuridico: {
            id: 0,
            id_datos_basicos: 0,
            id_enfoque_diferencial: 0,
            id_caracterizacion_socioeconomica: 0,
            descripcion_factica: "",
            id_area_derecho: 0,
            id_actividad: 0,
            concepto_juridico: "",
            id_estado_caso: 0,
            id_usuario_registra: 0,
            id_usuario_asignado: 0,
            fecha_asignacion: ""
          },
        },
      };
    });
  },
}));

export default useJobAppStore;