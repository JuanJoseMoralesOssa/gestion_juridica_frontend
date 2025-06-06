import useJobAppStore from "../../../store";
import { DatosBasicosSchema } from "../../../validation.schema";
import { useState } from "react";

function DatosBasicos() {
  const { nextStep, formData, setDatosBasicos } = useJobAppStore();
  const [error, setError] = useState<string>("");

  const numberFields = [
    "id_tipo_documento", "id_lugar_expedicion", "rango_edad",
    "id_discapacidad", "id_sexo", "ciudad_domicilio", "id_area_derecho"
  ];

  const parseFieldValue = (name: string, value: string) => {
    if (numberFields.includes(name)) {
      return parseInt(value) || 0;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError("");
    const { name, value } = e.target;
    const parsedValue = parseFieldValue(name, value);
    setDatosBasicos({ [name]: parsedValue });
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
            <DynamicSelect
              name="id_tipo_documento"
              value={formData.datosBasicos.id_tipo_documento}
              onChange={handleChange}
              config={FIELD_CONFIGURATIONS.id_tipo_documento}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
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
            <DynamicSelect
              name="id_lugar_expedicion"
              value={formData.datosBasicos.id_lugar_expedicion}
              onChange={handleChange}
              config={{
                placeholder: "Seleccionar lugar de expedición",
                options: [
                  { value: 1, label: "Bogotá" },
                  { value: 2, label: "Medellín" },
                  { value: 3, label: "Cali" }
                  // Añadir más opciones según sea necesario
                ]
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="rango_edad"
            >
              Rango de Edad
            </label>
            <DynamicSelect
              name="rango_edad"
              value={formData.datosBasicos.rango_edad}
              onChange={handleChange}
              config={{
                placeholder: "Seleccionar rango de edad",
                options: [
                  { value: 1, label: "18-25" },
                  { value: 2, label: "26-35" },
                  { value: 3, label: "36-45" },
                  { value: 4, label: "46-60" },
                  { value: 5, label: "61+" }
                ]
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
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
            <DynamicSelect
              name="id_sexo"
              value={formData.datosBasicos.id_sexo}
              onChange={handleChange}
              config={FIELD_CONFIGURATIONS.id_sexo}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="id_discapacidad"
            >
              Discapacidad
            </label>
            <DynamicSelect
              name="id_discapacidad"
              value={formData.datosBasicos.id_discapacidad}
              onChange={handleChange}
              config={{
                placeholder: "Ninguna",
                options: [
                  { value: 1, label: "Visual" },
                  { value: 2, label: "Auditiva" },
                  { value: 3, label: "Física" },
                  { value: 4, label: "Cognitiva" },
                  { value: 5, label: "Otra" }
                ]
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
          </div>
          <div>
            <label
              className="text-lg font-medium text-gray-900"
              htmlFor="ciudad_domicilio"
            >
              Ciudad de Domicilio
            </label>
            <DynamicSelect
              name="ciudad_domicilio"
              value={formData.datosBasicos.ciudad_domicilio}
              onChange={handleChange}
              config={{
                placeholder: "Seleccionar ciudad",
                options: [
                  { value: 1, label: "Bogotá" },
                  { value: 2, label: "Medellín" },
                  { value: 3, label: "Cali" },
                  { value: 4, label: "Barranquilla" },
                  { value: 5, label: "Cartagena" }
                  // Añadir más opciones según sea necesario
                ]
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
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
            <DynamicSelect
              name="id_area_derecho"
              value={formData.datosBasicos.id_area_derecho}
              onChange={handleChange}
              config={{
                placeholder: "Seleccionar área",
                options: [
                  { value: 1, label: "Civil" },
                  { value: 2, label: "Penal" },
                  { value: 3, label: "Laboral" },
                  { value: 4, label: "Administrativo" },
                  { value: 5, label: "Constitucional" },
                  { value: 6, label: "Familiar" }
                  // Añadir más opciones según sea necesario
                ]
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
              rounded-lg block w-full p-2.5"
            />
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


interface SelectOption {
  value: number;
  label: string;
}

interface FieldConfig {
  options: SelectOption[];
  placeholder: string;
}

const FIELD_CONFIGURATIONS: Record<string, FieldConfig> = {
  id_tipo_documento: {
    placeholder: "Seleccionar tipo de documento",
    options: [
      { value: 1, label: "Cédula de Ciudadanía" },
      { value: 2, label: "Cédula de Extranjería" },
      { value: 3, label: "Pasaporte" }
    ]
  },
  id_sexo: {
    placeholder: "Seleccionar sexo",
    options: [
      { value: 1, label: "Masculino" },
      { value: 2, label: "Femenino" },
      { value: 3, label: "Otro" }
    ]
  }
};


interface DynamicSelectProps {
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  config: FieldConfig;
  className?: string;
}


const DynamicSelect: React.FC<DynamicSelectProps> = ({
  name, value,
  onChange, config,
  className
}) => (
  <select name={name} value={value} onChange={onChange} className={className}>
    <option value={0}>{config.placeholder}</option>
    {config.options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
