
import useJobAppStore from "../../../store";
import { CaracterizacionSocioeconomicaSchema } from "../../../validation.schema";
import { useState } from "react";

function CaracterizacionSocioeconomica() {
  const { nextStep, prevStep, formData, setCaracterizacionSocioeconomica } = useJobAppStore();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setError("");
    const { name, value } = e.target;
    
    // Determine if this field should be treated as a number
    const isNumberField = name === "id_promedio_ingresos_personales" || 
                         name === "personas_laborando" || 
                         name === "id_promedio_ingresos_familiares" || 
                         name === "id_promedio_egresos" || 
                         name === "personas_convive" || 
                         name === "id_estrato" || 
                         name === "numero_dependientes" || 
                         name === "id_tipo_vivienda";
    
    const processedValue = isNumberField ? parseInt(value) || 0 : value;
    
    setCaracterizacionSocioeconomica({ [name]: processedValue });
  };

  const handleCheckboxChange = (name: string) => {
    setError("");
    const currentValue = formData.caracterizacionSocioeconomica[name as keyof typeof formData.caracterizacionSocioeconomica];
    setCaracterizacionSocioeconomica({ [name]: currentValue === "S" ? "N" : "S" });
  };

  const validateAndNext = () => {
    try {
      CaracterizacionSocioeconomicaSchema.parse(formData.caracterizacionSocioeconomica);
      setError("");
      nextStep();
    } catch (error: any) {
      setError(
        error.errors[0]?.message ||
          "Por favor complete todos los campos correctamente."
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Caracterización Socioeconómica</h2>
      <div className="mt-5">
        {error && <div className="font-bold text-red-600">*{error}</div>}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="ocupacion"
            >
              Ocupación
            </label>
            <input
              type="text"
              name="ocupacion"
              placeholder="Ingrese su ocupación"
              value={formData.caracterizacionSocioeconomica.ocupacion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_promedio_ingresos_personales"
            >
              Promedio de Ingresos Personales
            </label>
            <select
              name="id_promedio_ingresos_personales"
              value={formData.caracterizacionSocioeconomica.id_promedio_ingresos_personales}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccione rango de ingresos</option>
              <option value={1}>Menos de 1 SMMLV</option>
              <option value={2}>Entre 1 y 2 SMMLV</option>
              <option value={3}>Entre 2 y 3 SMMLV</option>
              <option value={4}>Entre 3 y 4 SMMLV</option>
              <option value={5}>Más de 4 SMMLV</option>
            </select>
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="personas_laborando"
            >
              Número de Personas que Laboran
            </label>
            <input
              type="number"
              min="0"
              name="personas_laborando"
              placeholder="Cantidad de personas que laboran"
              value={formData.caracterizacionSocioeconomica.personas_laborando}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_promedio_ingresos_familiares"
            >
              Promedio de Ingresos Familiares
            </label>
            <select
              name="id_promedio_ingresos_familiares"
              value={formData.caracterizacionSocioeconomica.id_promedio_ingresos_familiares}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccione rango de ingresos familiares</option>
              <option value={1}>Menos de 1 SMMLV</option>
              <option value={2}>Entre 1 y 2 SMMLV</option>
              <option value={3}>Entre 2 y 4 SMMLV</option>
              <option value={4}>Entre 4 y 6 SMMLV</option>
              <option value={5}>Más de 6 SMMLV</option>
            </select>
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_promedio_egresos"
            >
              Promedio de Egresos
            </label>
            <select
              name="id_promedio_egresos"
              value={formData.caracterizacionSocioeconomica.id_promedio_egresos}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccione rango de egresos</option>
              <option value={1}>Menos de 1 SMMLV</option>
              <option value={2}>Entre 1 y 2 SMMLV</option>
              <option value={3}>Entre 2 y 4 SMMLV</option>
              <option value={4}>Entre 4 y 6 SMMLV</option>
              <option value={5}>Más de 6 SMMLV</option>
            </select>
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="personas_convive"
            >
              Número de Personas con las que Convive
            </label>
            <input
              type="number"
              min="0"
              name="personas_convive"
              placeholder="Cantidad de personas con las que convive"
              value={formData.caracterizacionSocioeconomica.personas_convive}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_estrato"
            >
              Estrato
            </label>
            <select
              name="id_estrato"
              value={formData.caracterizacionSocioeconomica.id_estrato}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccione su estrato</option>
              <option value={1}>Estrato 1</option>
              <option value={2}>Estrato 2</option>
              <option value={3}>Estrato 3</option>
              <option value={4}>Estrato 4</option>
              <option value={5}>Estrato 5</option>
              <option value={6}>Estrato 6</option>
            </select>
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="dependientes"
            >
              ¿Tiene Dependientes?
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="dependientes"
                checked={formData.caracterizacionSocioeconomica.dependientes === "S"}
                onChange={() => handleCheckboxChange("dependientes")}
                className="h-4 w-4 text-blue-600 bg-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Sí</span>
            </div>
          </div>
          
          {formData.caracterizacionSocioeconomica.dependientes === "S" && (
            <div>
              <label
                className="text-lg font-medium text-gray-900"
                htmlFor="numero_dependientes"
              >
                Número de Dependientes
              </label>
              <input
                type="number"
                min="0"
                name="numero_dependientes"
                placeholder="Cantidad de dependientes"
                value={formData.caracterizacionSocioeconomica.numero_dependientes}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                rounded-lg block w-full p-2.5"
                required
              />
            </div>
          )}
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="depende"
            >
              ¿Depende de Alguien?
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="depende"
                checked={formData.caracterizacionSocioeconomica.depende === "S"}
                onChange={() => handleCheckboxChange("depende")}
                className="h-4 w-4 text-blue-600 bg-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Sí</span>
            </div>
          </div>
          
          {formData.caracterizacionSocioeconomica.depende === "S" && (
            <div>
              <label
                className="text-lg font-medium text-gray-900"
                htmlFor="depende_abogado"
              >
                ¿Depende de un Abogado?
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="depende_abogado"
                  checked={formData.caracterizacionSocioeconomica.depende_abogado === "S"}
                  onChange={() => handleCheckboxChange("depende_abogado")}
                  className="h-4 w-4 text-blue-600 bg-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Sí</span>
              </div>
            </div>
          )}
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_tipo_vivienda"
            >
              Tipo de Vivienda
            </label>
            <select
              name="id_tipo_vivienda"
              value={formData.caracterizacionSocioeconomica.id_tipo_vivienda}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccione tipo de vivienda</option>
              <option value={1}>Propia</option>
              <option value={2}>Arrendada</option>
              <option value={3}>Familiar</option>
              <option value={4}>Compartida</option>
            </select>
          </div>
          
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="asesorado"
            >
              ¿Ha Sido Asesorado Anteriormente?
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="asesorado"
                checked={formData.caracterizacionSocioeconomica.asesorado === "S"}
                onChange={() => handleCheckboxChange("asesorado")}
                className="h-4 w-4 text-blue-600 bg-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Sí</span>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="observaciones"
            >
              Observaciones
            </label>
            <textarea
              name="observaciones"
              placeholder="Observaciones adicionales"
              value={formData.caracterizacionSocioeconomica.observaciones}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              rows={4}
            />
          </div>
        </div>
      </div>
      
      {/* buttons */}
      <div className="flex justify-between mt-5">
        <button className="text-blue-500 text-lg sm:text-xl" onClick={prevStep}>
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

export default CaracterizacionSocioeconomica;