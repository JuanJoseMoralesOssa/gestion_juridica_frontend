import { render, screen, fireEvent } from "@testing-library/react";
import CasoJuridicoForm from "../../../src/app/components/CasoJuridico";

// Mock de funciones del store y estado de prueba
const mockNextStep = jest.fn();
const mockPrevStep = jest.fn();
const mockSetCasoJuridico = jest.fn();
const mockFormData = {
  casoJuridico: {
    descripcion_factica: "",
    concepto_juridico: "",
    id_area_derecho: 0,
    id_actividad: 0,
    id_estado_caso: 0,
    fecha_asignacion: "",
  },
};

// Mock global de useJobAppStore
jest.mock("../../../store", () => ({
  __esModule: true,
  default: () => ({
    nextStep: mockNextStep,
    prevStep: mockPrevStep,
    formData: mockFormData,
    setCasoJuridico: mockSetCasoJuridico,
  }),
}));

// Mock del esquema de validación
jest.mock("../../../validation.schema", () => ({
  CasoJuridicoSchema: {
    parse: jest.fn(),
  },
}));

describe("CasoJuridicoForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el título y todos los campos", () => {
    render(<CasoJuridicoForm />);
    expect(screen.getByText(/Caso Jurídico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción Fáctica/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Concepto Jurídico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Área de Derecho/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Actividad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado del Caso/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de Asignación/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Siguiente/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Anterior/i })
    ).toBeInTheDocument();
  });

  it("muestra error al intentar enviar vacío", () => {
    // Lanzamos error en el schema de validación
    const { CasoJuridicoSchema } = require("../../../validation.schema");
    CasoJuridicoSchema.parse.mockImplementation(() => {
      throw { errors: [{ message: "Descripción Fáctica es requerida" }] };
    });
    render(<CasoJuridicoForm />);
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }));
    expect(
      screen.getByText(/\*Descripción Fáctica es requerida/i)
    ).toBeInTheDocument();
    expect(mockNextStep).not.toHaveBeenCalled();
  });

  it("llama a nextStep cuando el formulario es válido", () => {
    const { CasoJuridicoSchema } = require("../../../validation.schema");
    CasoJuridicoSchema.parse.mockReturnValue(true);

    render(<CasoJuridicoForm />);
    fireEvent.change(screen.getByLabelText(/Descripción Fáctica/i), {
      target: { value: "Hecho relevante" },
    });
    fireEvent.change(screen.getByLabelText(/Concepto Jurídico/i), {
      target: { value: "Concepto legal" },
    });
    fireEvent.change(screen.getByLabelText(/Área de Derecho/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/Actividad/i), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText(/Estado del Caso/i), {
      target: { value: "3" },
    });
    fireEvent.change(screen.getByLabelText(/Fecha de Asignación/i), {
      target: { value: "2024-06-06" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }));

    expect(CasoJuridicoSchema.parse).toHaveBeenCalled();
    expect(mockNextStep).toHaveBeenCalled();
  });

  it("todos los campos tienen label y required", () => {
    render(<CasoJuridicoForm />);
    expect(screen.getByLabelText(/Descripción Fáctica/i)).toHaveAttribute(
      "required"
    );
    expect(screen.getByLabelText(/Concepto Jurídico/i)).toHaveAttribute(
      "required"
    );
    // Los campos numéricos y de fecha no son required en el JSX, pero si lo agregas también testéalos
  });

  it("actualiza el valor al escribir en los campos", () => {
    render(<CasoJuridicoForm />);
    const descInput = screen.getByLabelText(
      /Descripción Fáctica/i
    ) as HTMLTextAreaElement;
    fireEvent.change(descInput, { target: { value: "Test de cambio" } });
    expect(mockSetCasoJuridico).toHaveBeenCalledWith({
      descripcion_factica: "Test de cambio",
    });

    const areaInput = screen.getByLabelText(
      /Área de Derecho/i
    ) as HTMLInputElement;
    fireEvent.change(areaInput, { target: { value: "4" } });
    expect(mockSetCasoJuridico).toHaveBeenCalledWith({ id_area_derecho: 4 });
  });

  it("responde al botón Anterior", () => {
    render(<CasoJuridicoForm />);
    const prevButton = screen.getByRole("button", { name: /Anterior/i });
    fireEvent.click(prevButton);
    expect(mockPrevStep).toHaveBeenCalled();
  });
});
