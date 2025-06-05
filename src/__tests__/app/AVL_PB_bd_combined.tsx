import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatosBasicos from '../../../src/app/components/DatosBasicos';

// Mock del store
const mockNextStep = jest.fn();
const mockSetDatosBasicos = jest.fn();
const mockFormData = {
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
    id_area_derecho: 0
  }
};

jest.mock('../../../store', () => ({
  __esModule: true,
  default: () => ({
    nextStep: mockNextStep,
    formData: mockFormData,
    setDatosBasicos: mockSetDatosBasicos
  })
}));

// Mock del schema de validación
const mockValidationSchema = {
  parse: jest.fn()
};
jest.mock('../../../validation.schema', () => ({
  DatosBasicosSchema: {
    parse: jest.fn()
  }
}));

describe('DatosBasicos - Partición Equivalente y AVL Combinados', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('CASOS COMBINADOS - Formulario Completo', () => {
    test('CC002: Formulario con múltiples errores', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      jest.spyOn(DatosBasicosSchema, 'parse').mockImplementation(() => {
        throw { errors: [{ message: 'Error de validación' }] };
      });
      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);
      expect(mockNextStep).not.toHaveBeenCalled();
    });

    test('CC001: Formulario válido completo', async () => {
      mockValidationSchema.parse.mockReturnValue(true);
      const mockFormDataWithValues = {
        datosBasicos: {
          primer_nombre: 'Juan',
          primer_apellido: 'Pérez',
          id_tipo_documento: 1,
          documento: '12345678',
          id_lugar_expedicion: 1,
          rango_edad: 2,
          celular: '3001234567',
          correo: 'juan@ejemplo.com',
          id_sexo: 1,
          id_discapacidad: 0,
          ciudad_domicilio: 1,
          direccion: 'Calle 123 #45-67'
        }
      };

      jest.doMock('../../../store', () => ({
        __esModule: true,
        default: () => ({
          nextStep: mockNextStep,
          formData: mockFormDataWithValues,
          setDatosBasicos: mockSetDatosBasicos
        })
      }));
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse = jest.fn().mockReturnValue(true);
      const { formData } = require('../../../store').default();
      formData.datosBasicos = mockFormDataWithValues.datosBasicos;

      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);
      expect(mockNextStep).toHaveBeenCalled();
    });
  });
});
