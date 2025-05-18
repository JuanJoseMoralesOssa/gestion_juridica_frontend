import useJobAppStore from "../../../store";

function ReviewSubmit() {
  const { submitForm, prevStep, formData } = useJobAppStore();

  const { datosBasicos, caracterizacionSocioeconomica, casoJuridico } = formData;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Revisión de la Información</h2>

      {/* DATOS BÁSICOS */}
      <div>
        <h3 className="text-lg font-semibold">Datos Básicos</h3>
        <div className="grid gap-3 md:grid-cols-2 border p-3 border-gray-300 rounded-lg">
          <p><span className="font-semibold">Primer Nombre:</span> {datosBasicos.primer_nombre}</p>
          <p><span className="font-semibold">Segundo Nombre:</span> {datosBasicos.segundo_nombre}</p>
          <p><span className="font-semibold">Primer Apellido:</span> {datosBasicos.primer_apellido}</p>
          <p><span className="font-semibold">Segundo Apellido:</span> {datosBasicos.segundo_apellido}</p>
          <p><span className="font-semibold">Tipo de Documento (ID):</span> {datosBasicos.id_tipo_documento}</p>
          <p><span className="font-semibold">Número de Documento:</span> {datosBasicos.documento}</p>
          <p><span className="font-semibold">Lugar de Expedición (ID):</span> {datosBasicos.id_lugar_expedicion}</p>
          <p><span className="font-semibold">Rango de Edad:</span> {datosBasicos.rango_edad}</p>
          <p><span className="font-semibold">Celular:</span> {datosBasicos.celular}</p>
          <p><span className="font-semibold">Correo:</span> {datosBasicos.correo}</p>
          <p><span className="font-semibold">Discapacidad (ID):</span> {datosBasicos.id_discapacidad}</p>
          <p><span className="font-semibold">Sexo (ID):</span> {datosBasicos.id_sexo}</p>
          <p><span className="font-semibold">Ciudad de Domicilio (ID):</span> {datosBasicos.ciudad_domicilio}</p>
          <p><span className="font-semibold">Dirección:</span> {datosBasicos.direccion}</p>
          <p className="md:col-span-2"><span className="font-semibold">Concepto:</span> {datosBasicos.concepto}</p>
          <p><span className="font-semibold">Área del Derecho (ID):</span> {datosBasicos.id_area_derecho}</p>
        </div>
      </div>

      {/* CARACTERIZACIÓN SOCIOECONÓMICA */}
      <div>
        <h3 className="text-lg font-semibold">Caracterización Socioeconómica</h3>
        <div className="grid gap-3 md:grid-cols-2 border p-3 border-gray-300 rounded-lg">
          <p><span className="font-semibold">Ocupación:</span> {caracterizacionSocioeconomica.ocupacion}</p>
          <p><span className="font-semibold">Promedio Ingresos Personales (ID):</span> {caracterizacionSocioeconomica.id_promedio_ingresos_personales}</p>
          <p><span className="font-semibold">Personas Laborando:</span> {caracterizacionSocioeconomica.personas_laborando}</p>
          <p><span className="font-semibold">Promedio Ingresos Familiares (ID):</span> {caracterizacionSocioeconomica.id_promedio_ingresos_familiares}</p>
          <p><span className="font-semibold">Promedio Egresos (ID):</span> {caracterizacionSocioeconomica.id_promedio_egresos}</p>
          <p><span className="font-semibold">Personas con las que Convive:</span> {caracterizacionSocioeconomica.personas_convive}</p>
          <p><span className="font-semibold">Estrato (ID):</span> {caracterizacionSocioeconomica.id_estrato}</p>
          <p><span className="font-semibold">Dependientes:</span> {caracterizacionSocioeconomica.dependientes}</p>
          <p><span className="font-semibold">Número de Dependientes:</span> {caracterizacionSocioeconomica.numero_dependientes}</p>
          <p><span className="font-semibold">Depende:</span> {caracterizacionSocioeconomica.depende}</p>
          <p><span className="font-semibold">Depende del Abogado:</span> {caracterizacionSocioeconomica.depende_abogado}</p>
          <p><span className="font-semibold">Tipo de Vivienda (ID):</span> {caracterizacionSocioeconomica.id_tipo_vivienda}</p>
          <p><span className="font-semibold">Asesorado:</span> {caracterizacionSocioeconomica.asesorado}</p>
          <p className="md:col-span-2"><span className="font-semibold">Observaciones:</span> {caracterizacionSocioeconomica.observaciones}</p>
        </div>
      </div>

      {/* CASO JURÍDICO */}
      <div>
        <h3 className="text-lg font-semibold">Caso Jurídico</h3>
        <div className="grid gap-3 md:grid-cols-2 border p-3 border-gray-300 rounded-lg">
          <p className="md:col-span-2"><span className="font-semibold">Descripción Fáctica:</span> {casoJuridico.descripcion_factica}</p>
          <p className="md:col-span-2"><span className="font-semibold">Concepto Jurídico:</span> {casoJuridico.concepto_juridico}</p>
          <p><span className="font-semibold">Área del Derecho (ID):</span> {casoJuridico.id_area_derecho}</p>
          <p><span className="font-semibold">Actividad (ID):</span> {casoJuridico.id_actividad}</p>
          <p><span className="font-semibold">Estado del Caso (ID):</span> {casoJuridico.id_estado_caso}</p>
          <p><span className="font-semibold">Fecha de Asignación:</span> {casoJuridico.fecha_asignacion}</p>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-between mt-5">
        <button
          className="text-blue-500 text-lg sm:text-xl"
          onClick={prevStep}
        >
          {"←"} Anterior
        </button>
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-lg text-lg sm:text-xl"
          onClick={submitForm}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ReviewSubmit;
