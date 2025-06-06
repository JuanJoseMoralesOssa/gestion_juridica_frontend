import { render, screen, fireEvent } from "@testing-library/react";
import ReviewSubmit from "../../../src/app/components/ReviewSubmit";

// Crea mocks de las funciones del store y un estado de prueba
const mockSubmitForm = jest.fn();
const mockPrevStep = jest.fn();

const mockFormData = {
  datosBasicos: {
    primer_nombre: "Juan",
    segundo_nombre: "Carlos",
    primer_apellido: "García",
    segundo_apellido: "Lopez",
    id_tipo_documento: 1,
    documento: "12345678",
    id_lugar_expedicion: 2,
    rango_edad: 3,
    celular: "3001112222",
    correo: "juan@correo.com",
    id_discapacidad: 0,
    id_sexo: 1,
    ciudad_domicilio: 5,
    direccion: "Calle 123",
    concepto: "Asesoría",
    id_area_derecho: 4,
  },
  caracterizacionSocioeconomica: {
    ocupacion: "Estudiante",
    id_promedio_ingresos_personales: 2,
    personas_laborando: 1,
    id_promedio_ingresos_familiares: 3,
    id_promedio_egresos: 1,
    personas_convive: 4,
    id_estrato: 2,
    dependientes: "Sí",
    numero_dependientes: 1,
    depende: "No",
    depende_abogado: "No",
    id_tipo_vivienda: 1,
    asesorado: "No",
    observaciones: "Ninguna",
  },
  casoJuridico: {
    descripcion_factica: "Descripción de prueba",
    concepto_juridico: "Concepto legal",
    id_area_derecho: 1,
    id_actividad: 2,
    id_estado_caso: 3,
    fecha_asignacion: "2024-06-06",
  },
  entrevistador: {}, // Puedes añadir estructura si tu resumen la muestra
};

// Mock global de useJobAppStore para todos los tests de este archivo
jest.mock("../../../store", () => ({
  __esModule: true,
  default: () => ({
    submitForm: mockSubmitForm,
    prevStep: mockPrevStep,
    formData: mockFormData,
  }),
}));

describe("ReviewSubmit Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza todos los datos de las tres secciones principales", () => {
    render(<ReviewSubmit />);
    // Títulos de sección
    expect(screen.getByText(/Revisión de la Información/i)).toBeInTheDocument();
    expect(screen.getByText(/Datos Básicos/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Caracterización Socioeconómica/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Caso Jurídico/i)).toBeInTheDocument();
    // Unos campos clave
    expect(screen.getByText(/Juan/)).toBeInTheDocument();
    expect(screen.getByText(/Estudiante/)).toBeInTheDocument();
    expect(screen.getByText(/Descripción de prueba/)).toBeInTheDocument();
    expect(screen.getByText(/Concepto legal/)).toBeInTheDocument();
    expect(screen.getByText(/2024-06-06/)).toBeInTheDocument();
  });

  it("renderiza y responde al botón Anterior", () => {
    render(<ReviewSubmit />);
    const prevButton = screen.getByRole("button", { name: /anterior/i });
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(mockPrevStep).toHaveBeenCalled();
  });

  it("renderiza y responde al botón Enviar", () => {
    render(<ReviewSubmit />);
    const submitButton = screen.getByRole("button", { name: /enviar/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(mockSubmitForm).toHaveBeenCalled();
  });

  it("debe mostrar correctamente todos los campos del store", () => {
    render(<ReviewSubmit />);
    // Verifica varios campos para cada sección (busca texto exacto para evitar duplicidad)
    expect(screen.getByText(/^Primer Nombre:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Segundo Nombre:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Primer Apellido:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Celular:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Ocupación:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Dependientes:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Número de Dependientes:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Descripción Fáctica:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Concepto Jurídico:$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Estado del Caso \(ID\):$/i)).toBeInTheDocument();
  });
});
