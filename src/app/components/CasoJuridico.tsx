import useJobAppStore from "../../../store";
import { useState } from "react";
import { CasoJuridicoSchema } from "../../../validation.schema";

function CasoJuridicoForm() {
  const { nextStep, prevStep, formData, setCasoJuridico } = useJobAppStore();
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCasoJuridico({ [name]: value });
  };

  const validateAndNext = () => {
    try {
      CasoJuridicoSchema.parse(formData.casoJuridico);
      setError("");
      nextStep();
    } catch (error: any) {
      setError(
        error.errors?.[0]?.message || "Por favor completa correctamente el formulario de Caso Jurídico."
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Caso Jurídico</h2>
      <div className="mt-5">
        {error && <div className="font-bold text-red-600">*{error}</div>}

        <div className="grid gap-6 mb-6 mt-2 md:grid-cols-2 border-gray-300 rounded-lg">
          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="descripcion_factica">
              Descripción Fáctica
            </label>
            <textarea
              name="descripcion_factica"
              placeholder="Describe los hechos"
              value={formData.casoJuridico.descripcion_factica}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="concepto_juridico">
              Concepto Jurídico
            </label>
            <textarea
              name="concepto_juridico"
              placeholder="Concepto del caso"
              value={formData.casoJuridico.concepto_juridico}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              required
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="id_area_derecho">
              Área de Derecho
            </label>
            <input
              type="number"
              name="id_area_derecho"
              placeholder="ID área"
              value={formData.casoJuridico.id_area_derecho}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="id_actividad">
              Actividad
            </label>
            <input
              type="number"
              name="id_actividad"
              placeholder="ID actividad"
              value={formData.casoJuridico.id_actividad}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="id_estado_caso">
              Estado del Caso
            </label>
            <input
              type="number"
              name="id_estado_caso"
              placeholder="ID estado"
              value={formData.casoJuridico.id_estado_caso}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-900" htmlFor="fecha_asignacion">
              Fecha de Asignación
            </label>
            <input
              type="date"
              name="fecha_asignacion"
              value={formData.casoJuridico.fecha_asignacion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <button
          className="text--blue-500 text-lg sm:text-xl"
          onClick={prevStep}
        >
          {"\u2190"} Anterior
        </button>
        <button
          className="text-white bg-blue-500 px-3 py-1 rounded-lg text-lg sm:text-xl"
          onClick={validateAndNext}
        >
          Siguiente {"\u2192"}
        </button>
      </div>
    </div>
  );
}

export default CasoJuridicoForm;
