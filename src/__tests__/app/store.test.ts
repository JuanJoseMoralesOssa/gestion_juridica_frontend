import useJobAppStore from '../../../store'

jest.mock('../../../validation.schema', () => ({
  DatosBasicosSchema: {
    parse: jest.fn()
  }
}));

describe('useJobAppStore', () => {
  beforeEach(() => {
    useJobAppStore.setState({
      step: 1,
      formData: {
        datosBasicos: {
          id: 0,
          id_usuario_registra: 0,
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          id_tipo_documento: 0,
          documento: '',
          id_lugar_expedicion: 0,
          rango_edad: 0,
          celular: '',
          correo: '',
          id_discapacidad: 0,
          id_sexo: 0,
          ciudad_domicilio: 0,
          direccion: '',
          concepto: '',
          id_area_derecho: 0,
        },
        caracterizacionSocioeconomica: {
          id: 0,
          ocupacion: '',
          id_promedio_ingresos_personales: 0,
          personas_laborando: 0,
          id_promedio_ingresos_familiares: 0,
          id_promedio_egresos: 0,
          personas_convive: 0,
          id_estrato: 0,
          dependientes: '',
          numero_dependientes: 0,
          depende: '',
          depende_abogado: '',
          id_tipo_vivienda: 0,
          asesorado: '',
          observaciones: '',
        },
        casoJuridico: {
          id: 0,
          id_datos_basicos: 0,
          id_enfoque_diferencial: 0,
          id_caracterizacion_socioeconomica: 0,
          descripcion_factica: '',
          id_area_derecho: 0,
          id_actividad: 0,
          concepto_juridico: '',
          id_estado_caso: 0,
          id_usuario_registra: 0,
          id_usuario_asignado: 0,
          fecha_asignacion: '',
        },
        entrevistador: {
          id: 0,
          primer_nombre: '',
          segundo_nombre: '',
          primer_apellido: '',
          segundo_apellido: '',
          codigo_estudiante: 0,
          id_usuario: 0,
          hoja_vida: 0,
          fecha_entrevista: '',
          observacion: '',
        },
      },
    })
  })

  describe('Step Navigation Edge Cases', () => {
    it('should handle multiple consecutive nextStep calls', () => {
      const { nextStep } = useJobAppStore.getState()

      for (let i = 0; i < 10; i++) {
        nextStep()
      }

      expect(useJobAppStore.getState().step).toBe(11)
    })

    it('should handle multiple consecutive prevStep calls', () => {
      useJobAppStore.setState({ step: 5 })
      const { prevStep } = useJobAppStore.getState()

      for (let i = 0; i < 8; i++) {
        prevStep()
      }

      expect(useJobAppStore.getState().step).toBe(-3)
    })

    it('should maintain step state across multiple operations', () => {
      const { nextStep, prevStep } = useJobAppStore.getState()
      nextStep() // step = 2
      nextStep() // step = 3
      prevStep() // step = 2
      nextStep() // step = 3
      expect(useJobAppStore.getState().step).toBe(3)
    })
  })

  describe('Form Data Validation and Edge Cases', () => {
    it('should handle empty string updates for datosBasicos', () => {
      const { setDatosBasicos } = useJobAppStore.getState()

      setDatosBasicos({ primer_nombre: '' })

      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('')
    })

    it('should handle zero values for numeric fields', () => {
      const { setCaracterizacionSocioeconomica } = useJobAppStore.getState()
      setCaracterizacionSocioeconomica({
        personas_laborando: 0,
        numero_dependientes: 0,
        personas_convive: 0,
      })
      const { formData } = useJobAppStore.getState()
      expect(formData.caracterizacionSocioeconomica.personas_laborando).toBe(0)
      expect(formData.caracterizacionSocioeconomica.numero_dependientes).toBe(0)
      expect(formData.caracterizacionSocioeconomica.personas_convive).toBe(0)
    })

    it('should handle undefined values gracefully', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      setDatosBasicos({ segundo_nombre: undefined })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.segundo_nombre).toBeUndefined()
    })

    it('should handle large numeric values', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      setDatosBasicos({
        id: 999999999,
        rango_edad: 999,
      })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.id).toBe(999999999)
      expect(formData.datosBasicos.rango_edad).toBe(999)
    })
  })

  describe('Multiple Form Sections Updates', () => {
    it('should handle simultaneous updates to all form sections', () => {
      const {
        setDatosBasicos,
        setCaracterizacionSocioeconomica,
        setCasoJuridico,
        setDatosEntrevista,
      } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      setCaracterizacionSocioeconomica({ ocupacion: 'Estudiante' })
      setCasoJuridico({ descripcion_factica: 'Caso importante' })
      setDatosEntrevista({ primer_nombre: 'Carlos' })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('Juan')
      expect(formData.caracterizacionSocioeconomica.ocupacion).toBe('Estudiante')
      expect(formData.casoJuridico.descripcion_factica).toBe('Caso importante')
      expect(formData.entrevistador.primer_nombre).toBe('Carlos')
    })

    it('should maintain independence between form sections', () => {
      const { setDatosBasicos, setCaracterizacionSocioeconomica } =
        useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      setCaracterizacionSocioeconomica({ ocupacion: 'Estudiante' })
      setDatosBasicos({ primer_apellido: 'Pérez' })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('Juan')
      expect(formData.datosBasicos.primer_apellido).toBe('Pérez')
      expect(formData.caracterizacionSocioeconomica.ocupacion).toBe('Estudiante')
    })
  })

  describe('Store State Consistency', () => {
    it('should maintain formData structure integrity', () => {
      const { formData } = useJobAppStore.getState()
      expect(formData).toHaveProperty('datosBasicos')
      expect(formData).toHaveProperty('caracterizacionSocioeconomica')
      expect(formData).toHaveProperty('casoJuridico')
      expect(formData).toHaveProperty('entrevistador')
      expect(Object.keys(formData)).toHaveLength(4)
    })

    it('should preserve all required fields after partial updates', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Test' })
      const { formData } = useJobAppStore.getState()
      const requiredFields = [
        'id',
        'id_usuario_registra',
        'primer_nombre',
        'segundo_nombre',
        'primer_apellido',
        'segundo_apellido',
        'id_tipo_documento',
        'documento',
        'id_lugar_expedicion',
        'rango_edad',
        'celular',
        'correo',
        'id_discapacidad',
        'id_sexo',
        'ciudad_domicilio',
        'direccion',
        'concepto',
        'id_area_derecho',
      ]
      requiredFields.forEach((field) => {
        expect(formData.datosBasicos).toHaveProperty(field)
      })
    })
  })

  describe('Complex Data Updates', () => {
    it('should handle date string updates correctly', () => {
      const { setCasoJuridico, setDatosEntrevista } = useJobAppStore.getState()
      const fechaAsignacion = '2024-01-15T10:30:00'
      const fechaEntrevista = '2024-01-16'
      setCasoJuridico({ fecha_asignacion: fechaAsignacion })
      setDatosEntrevista({ fecha_entrevista: fechaEntrevista })
      const { formData } = useJobAppStore.getState()
      expect(formData.casoJuridico.fecha_asignacion).toBe(fechaAsignacion)
      expect(formData.entrevistador.fecha_entrevista).toBe(fechaEntrevista)
    })

    it('should handle special characters in text fields', () => {
      const { setDatosBasicos, setCasoJuridico } = useJobAppStore.getState()
      const specialText = 'Nombre con ñ, acentos á é í ó ú y símbolos @#$%'
      const descripcion =
        'Descripción con múltiples líneas\ny caracteres especiales: ¿¡°'
      setDatosBasicos({ primer_nombre: specialText })
      setCasoJuridico({ descripcion_factica: descripcion })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe(specialText)
      expect(formData.casoJuridico.descripcion_factica).toBe(descripcion)
    })
  })

  describe('submitForm Advanced Scenarios', () => {
    beforeEach(() => {
      jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('should preserve exact initial state structure after submit', () => {
      const initialState = useJobAppStore.getState()
      const { setDatosBasicos, submitForm } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan', documento: '12345' })
      useJobAppStore.setState({ step: 4 })
      submitForm()
      const finalState = useJobAppStore.getState()
      expect(finalState.step).toBe(initialState.step)
      expect(finalState.formData).toEqual(initialState.formData)
    })

    it('should log complete form data structure', () => {
      const { setDatosBasicos, setCaracterizacionSocioeconomica, submitForm } =
        useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      setCaracterizacionSocioeconomica({ ocupacion: 'Test' })
      submitForm()
      expect(console.log).toHaveBeenCalledWith('Form submitted Successfully!')
      expect(console.log).toHaveBeenCalledWith(
        'Submitted Data: ',
        expect.objectContaining({
          datosBasicos: expect.any(Object),
          caracterizacionSocioeconomica: expect.any(Object),
          casoJuridico: expect.any(Object),
          entrevistador: expect.any(Object),
        })
      )
    })

    it('should handle submit with all form sections populated', () => {
      const {
        setDatosBasicos,
        setCaracterizacionSocioeconomica,
        setCasoJuridico,
        setDatosEntrevista,
        submitForm,
      } = useJobAppStore.getState()
      setDatosBasicos({
        primer_nombre: 'Juan',
        primer_apellido: 'Pérez',
        documento: '12345678',
        correo: 'juan@test.com',
      })
      setCaracterizacionSocioeconomica({
        ocupacion: 'Estudiante',
        personas_laborando: 2,
        id_estrato: 3,
      })
      setCasoJuridico({
        descripcion_factica: 'Caso complejo',
        concepto_juridico: 'Análisis legal',
        id_area_derecho: 1,
      })
      setDatosEntrevista({
        primer_nombre: 'Carlos',
        fecha_entrevista: '2024-01-15',
        codigo_estudiante: 123456,
      })
      submitForm()
      const { formData, step } = useJobAppStore.getState()
      expect(step).toBe(1)
      expect(formData.datosBasicos.primer_nombre).toBe('')
      expect(formData.caracterizacionSocioeconomica.ocupacion).toBe('')
      expect(formData.casoJuridico.descripcion_factica).toBe('')
      expect(formData.entrevistador.primer_nombre).toBe('')
    })
  })

  describe('Store Performance and Memory', () => {
    it('should handle rapid successive updates efficiently', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      for (let i = 0; i < 100; i++) {
        setDatosBasicos({ primer_nombre: `Name${i}` })
      }
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('Name99')
    })

    it('should maintain consistent state with concurrent-like updates', () => {
      const {
        setDatosBasicos,
        setCaracterizacionSocioeconomica,
        nextStep,
        prevStep,
      } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      nextStep()
      setCaracterizacionSocioeconomica({ ocupacion: 'Test' })
      prevStep()
      setDatosBasicos({ primer_apellido: 'Pérez' })
      nextStep()
      const state = useJobAppStore.getState()
      expect(state.step).toBe(2)
      expect(state.formData.datosBasicos.primer_nombre).toBe('Juan')
      expect(state.formData.datosBasicos.primer_apellido).toBe('Pérez')
      expect(state.formData.caracterizacionSocioeconomica.ocupacion).toBe('Test')
    })
  })

  describe('Initial State', () => {
    it('should have initial step as 1', () => {
      expect(useJobAppStore.getState().step).toBe(1)
    })
    it('should have initial form data with empty values', () => {
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('')
      expect(formData.datosBasicos.id).toBe(0)
      expect(formData.caracterizacionSocioeconomica.ocupacion).toBe('')
      expect(formData.casoJuridico.descripcion_factica).toBe('')
      expect(formData.entrevistador.primer_nombre).toBe('')
    })
  })

  describe('Step Navigation', () => {
    it('should increment step when calling nextStep', () => {
      const { nextStep } = useJobAppStore.getState()
      nextStep()
      expect(useJobAppStore.getState().step).toBe(2)
      nextStep()
      expect(useJobAppStore.getState().step).toBe(3)
    })

    it('should decrement step when calling prevStep', () => {
      useJobAppStore.setState({ step: 3 })
      const { prevStep } = useJobAppStore.getState()
      prevStep()
      expect(useJobAppStore.getState().step).toBe(2)
      prevStep()
      expect(useJobAppStore.getState().step).toBe(1)
    })

    it('should allow step to go below 1', () => {
      const { prevStep } = useJobAppStore.getState()
      prevStep()
      expect(useJobAppStore.getState().step).toBe(0)
    })
  })

  describe('getTotalSteps', () => {
    it('should return correct total steps count', () => {
      const { getTotalSteps } = useJobAppStore.getState()
      const totalSteps = getTotalSteps()
      expect(totalSteps).toBe(5) // 4 form sections + 1
    })
  })

  describe('Form Data Setters', () => {
    it('should update datosBasicos data', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      const testData = {
        primer_nombre: 'Juan',
        primer_apellido: 'Pérez',
        documento: '12345678',
      }
      setDatosBasicos(testData)
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('Juan')
      expect(formData.datosBasicos.primer_apellido).toBe('Pérez')
      expect(formData.datosBasicos.documento).toBe('12345678')
      expect(formData.datosBasicos.id).toBe(0) // Should preserve other fields
    })

    it('should update caracterizacionSocioeconomica data', () => {
      const { setCaracterizacionSocioeconomica } = useJobAppStore.getState()
      const testData = {
        ocupacion: 'Estudiante',
        id_promedio_ingresos_personales: 1,
        personas_laborando: 2,
      }
      setCaracterizacionSocioeconomica(testData)
      const { formData } = useJobAppStore.getState()
      expect(formData.caracterizacionSocioeconomica.ocupacion).toBe('Estudiante')
      expect(
        formData.caracterizacionSocioeconomica.id_promedio_ingresos_personales
      ).toBe(1)
      expect(formData.caracterizacionSocioeconomica.personas_laborando).toBe(2)
      expect(formData.caracterizacionSocioeconomica.id).toBe(0) // Should preserve other fields
    })

    it('should update casoJuridico data', () => {
      const { setCasoJuridico } = useJobAppStore.getState()
      const testData = {
        descripcion_factica: 'Descripción del caso',
        id_area_derecho: 1,
        concepto_juridico: 'Concepto legal',
      }
      setCasoJuridico(testData)
      const { formData } = useJobAppStore.getState()
      expect(formData.casoJuridico.descripcion_factica).toBe('Descripción del caso')
      expect(formData.casoJuridico.id_area_derecho).toBe(1)
      expect(formData.casoJuridico.concepto_juridico).toBe('Concepto legal')
      expect(formData.casoJuridico.id).toBe(0) // Should preserve other fields
    })

    it('should update entrevistador data', () => {
      const { setDatosEntrevista } = useJobAppStore.getState()
      const testData = {
        primer_nombre: 'Carlos',
        codigo_estudiante: 123456,
        fecha_entrevista: '2024-01-15',
      }
      setDatosEntrevista(testData)
      const { formData } = useJobAppStore.getState()
      expect(formData.entrevistador.primer_nombre).toBe('Carlos')
      expect(formData.entrevistador.codigo_estudiante).toBe(123456)
      expect(formData.entrevistador.fecha_entrevista).toBe('2024-01-15')
      expect(formData.entrevistador.id).toBe(0) // Should preserve other fields
    })

    it('should partially update form data without affecting other fields', () => {
      const { setDatosBasicos } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan', primer_apellido: 'Pérez' })
      setDatosBasicos({ primer_nombre: 'Carlos' })
      const { formData } = useJobAppStore.getState()
      expect(formData.datosBasicos.primer_nombre).toBe('Carlos')
      expect(formData.datosBasicos.primer_apellido).toBe('Pérez') // Should remain unchanged
    })
  })

  describe('submitForm', () => {
    beforeEach(() => {
      // Mock console.log to verify it's called
      jest.spyOn(console, 'log').mockImplementation(() => {})
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })
    it('should reset form to initial state when submitted', () => {
      const { setDatosBasicos, setCasoJuridico, submitForm } =
        useJobAppStore.getState()
      useJobAppStore.setState({ step: 3 })
      setDatosBasicos({ primer_nombre: 'Juan' })
      setCasoJuridico({ descripcion_factica: 'Test case' })
      submitForm()
      const state = useJobAppStore.getState()
      expect(state.step).toBe(1)
      expect(state.formData.datosBasicos.primer_nombre).toBe('')
      expect(state.formData.casoJuridico.descripcion_factica).toBe('')
    })

    it('should log success message and submitted data', () => {
      const { setDatosBasicos, submitForm } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      submitForm()
      expect(console.log).toHaveBeenCalledWith('Form submitted Successfully!')
      expect(console.log).toHaveBeenCalledWith('Submitted Data: ', expect.any(Object))
    })
  })

  describe('State Immutability', () => {
    it('should not mutate original form data when updating', () => {
      const originalFormData = useJobAppStore.getState().formData
      const { setDatosBasicos } = useJobAppStore.getState()
      setDatosBasicos({ primer_nombre: 'Juan' })
      const newFormData = useJobAppStore.getState().formData
      expect(newFormData).not.toBe(originalFormData)
      expect(newFormData.datosBasicos).not.toBe(originalFormData.datosBasicos)
    })
  })

})
