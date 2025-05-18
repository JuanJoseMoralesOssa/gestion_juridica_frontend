import useJobAppStore from "../../../store";
import { DatosBasicosSchema } from "../../../validation.schema";
import { useState } from "react";

function DatosBasicos() {
  const { nextStep, formData, setDatosBasicos } = useJobAppStore();
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError("");
    const value = e.target.type === "number" || e.target.name === "id_tipo_documento" || 
                 e.target.name === "id_lugar_expedicion" || e.target.name === "rango_edad" || 
                 e.target.name === "id_discapacidad" || e.target.name === "id_sexo" || 
                 e.target.name === "ciudad_domicilio" || e.target.name === "id_area_derecho" 
                 ? parseInt(e.target.value) || 0 
                 : e.target.value;
    
    setDatosBasicos({ [e.target.name]: value });
  };

  const validateAndNext = () => {
    try {
      DatosBasicosSchema.parse(formData.datosBasicos);
      setError("");
      nextStep();
    } catch (error: any) {
      setError(
        error.errors[0]?.message || "Por favor complete todos los campos correctamente."
      );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Datos Básicos</h2>
      <div className="mt-5">
        {error && <div className="font-bold text-red-600">*{error}</div>}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="primer_nombre"
            >
              Primer Nombre
            </label>
            <input
              type="text"
              name="primer_nombre"
              placeholder="Primer Nombre"
              value={formData.datosBasicos.primer_nombre}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="segundo_nombre"
            >
              Segundo Nombre
            </label>
            <input
              type="text"
              name="segundo_nombre"
              placeholder="Segundo Nombre"
              value={formData.datosBasicos.segundo_nombre}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="primer_apellido"
            >
              Primer Apellido
            </label>
            <input
              type="text"
              name="primer_apellido"
              placeholder="Primer Apellido"
              value={formData.datosBasicos.primer_apellido}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="segundo_apellido"
            >
              Segundo Apellido
            </label>
            <input
              type="text"
              name="segundo_apellido"
              placeholder="Segundo Apellido"
              value={formData.datosBasicos.segundo_apellido}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_tipo_documento"
            >
              Tipo de Documento
            </label>
            <select
              name="id_tipo_documento"
              value={formData.datosBasicos.id_tipo_documento}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccionar tipo de documento</option>
              <option value={1}>Cédula de Ciudadanía</option>
              <option value={2}>Cédula de Extranjería</option>
              <option value={3}>Pasaporte</option>
              {/* Añadir más opciones según sea necesario */}
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="documento"
            >
              Número de Documento
            </label>
            <input
              type="text"
              name="documento"
              placeholder="Número de Documento"
              value={formData.datosBasicos.documento}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_lugar_expedicion"
            >
              Lugar de Expedición
            </label>
            <select
              name="id_lugar_expedicion"
              value={formData.datosBasicos.id_lugar_expedicion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccionar lugar de expedición</option>
              <option value={1}>Bogotá</option>
              <option value={2}>Medellín</option>
              <option value={3}>Cali</option>
              {/* Añadir más opciones según sea necesario */}
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="rango_edad"
            >
              Rango de Edad
            </label>
            <select
              name="rango_edad"
              value={formData.datosBasicos.rango_edad}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccionar rango de edad</option>
              <option value={1}>18-25</option>
              <option value={2}>26-35</option>
              <option value={3}>36-45</option>
              <option value={4}>46-60</option>
              <option value={5}>61+</option>
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="celular"
            >
              Número de Celular
            </label>
            <input
              type="text"
              name="celular"
              placeholder="Número de Celular"
              value={formData.datosBasicos.celular}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="correo"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              name="correo"
              placeholder="ejemplo@correo.com"
              value={formData.datosBasicos.correo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_sexo"
            >
              Sexo
            </label>
            <select
              name="id_sexo"
              value={formData.datosBasicos.id_sexo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccionar sexo</option>
              <option value={1}>Masculino</option>
              <option value={2}>Femenino</option>
              <option value={3}>Otro</option>
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_discapacidad"
            >
              Discapacidad
            </label>
            <select
              name="id_discapacidad"
              value={formData.datosBasicos.id_discapacidad}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            >
              <option value={0}>Ninguna</option>
              <option value={1}>Visual</option>
              <option value={2}>Auditiva</option>
              <option value={3}>Física</option>
              <option value={4}>Cognitiva</option>
              <option value={5}>Otra</option>
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="ciudad_domicilio"
            >
              Ciudad de Domicilio
            </label>
            <select
              name="ciudad_domicilio"
              value={formData.datosBasicos.ciudad_domicilio}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            >
              <option value={0}>Seleccionar ciudad</option>
              <option value={1}>Bogotá</option>
              <option value={2}>Medellín</option>
              <option value={3}>Cali</option>
              <option value={4}>Barranquilla</option>
              <option value={5}>Cartagena</option>
              {/* Añadir más opciones según sea necesario */}
            </select>
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="direccion"
            >
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              placeholder="Dirección de domicilio"
              value={formData.datosBasicos.direccion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_area_derecho"
            >
              Área de Derecho
            </label>
            <select
              name="id_area_derecho"
              value={formData.datosBasicos.id_area_derecho}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            >
              <option value={0}>Seleccionar área</option>
              <option value={1}>Civil</option>
              <option value={2}>Penal</option>
              <option value={3}>Laboral</option>
              <option value={4}>Administrativo</option>
              <option value={5}>Constitucional</option>
              <option value={6}>Familiar</option>
              {/* Añadir más opciones según sea necesario */}
            </select>
          </div>
          <div className="md:col-span-2">
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="concepto"
            >
              Concepto
            </label>
            <input
              type="text"
              name="concepto"
              placeholder="Concepto"
              value={formData.datosBasicos.concepto}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="flex justify-end mt-5">
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

export default DatosBasicos;