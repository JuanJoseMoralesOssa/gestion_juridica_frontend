import { render, screen} from '@testing-library/react';
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
jest.mock('../../../validation.schema', () => ({
  DatosBasicosSchema: {
    parse: jest.fn()
  }
}));

describe('DatosBasicos - Partición Equivalente y AVL', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('PARTICIÓN EQUIVALENTE - Casos de Prueba', () => {
    test('PE001: Primer nombre válido (partición válida)', async () => {
      render(<DatosBasicos />);
      const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
      expect(firstNameDiv).not.toBeNull();
      if (!firstNameDiv) return;
      const input = firstNameDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const firstName = 'Juan';
      await user.type(input, firstName);
      firstName.split('').forEach((char) => {
        expect(mockSetDatosBasicos).toHaveBeenCalledWith({
          primer_nombre: char
        });
      });
    });

    test('PE002: Primer nombre vacío (partición inválida)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Primer nombre es requerido' }] };
      });

      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Primer nombre es requerido')).toBeInTheDocument();
    });

    test('PE003: Email válido (partición válida)', async () => {
      render(<DatosBasicos />);
      const emailDiv = screen.getByText('Correo Electrónico').parentElement;
      expect(emailDiv).not.toBeNull();
      if (!emailDiv) return;
      const input = emailDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const email = 'juan@ejemplo.com';
      await user.type(input, email);
      email.split('').forEach((char) => {
        expect(mockSetDatosBasicos).toHaveBeenCalledWith({
          correo: char
        });
      });
    });

    test('PE004: Email inválido (partición inválida)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Correo electrónico inválido' }] };
      });

      render(<DatosBasicos />);
      const emailDiv = screen.getByText('Correo Electrónico').parentElement;
      expect(emailDiv).not.toBeNull();
      if (!emailDiv) return;
      const input = emailDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      await user.type(input, 'email-invalido');

      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Correo electrónico inválido')).toBeInTheDocument();
    });

    test('PE005: Tipo documento válido (partición válida)', async () => {
      render(<DatosBasicos />);
      const typeDocumentDiv = screen.getByText('Tipo de Documento').parentElement;
      expect(typeDocumentDiv).not.toBeNull();
      if (!typeDocumentDiv) return;
      const select = typeDocumentDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '1');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_tipo_documento: 1
      });
    });

    test('PE006: Tipo documento inválido (partición inválida)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Tipo de documento es requerido' }] };
      });

      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Tipo de documento es requerido')).toBeInTheDocument();
    });

    test('PE007: Rango edad válido (partición válida)', async () => {
      render(<DatosBasicos />);
      const ageRangeDiv = screen.getByText('Rango de Edad').parentElement;
      expect(ageRangeDiv).not.toBeNull();
      if (!ageRangeDiv) return;
      const select = ageRangeDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '2');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        rango_edad: 2
      });
    });

    test('PE008: Rango edad inválido (partición inválida)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Rango de edad es requerido' }] };
      });

      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Rango de edad es requerido')).toBeInTheDocument();
    });

    test('PE009: Sexo válido (partición válida)', async () => {
      render(<DatosBasicos />);
      const sexDiv = screen.getByText('Sexo').parentElement;
      expect(sexDiv).not.toBeNull();
      if (!sexDiv) return;
      const select = sexDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '1');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_sexo: 1
      });
    });

    test('PE010: Discapacidad válida (partición válida)', async () => {
      render(<DatosBasicos />);
      const disabilityDiv = screen.getByText('Discapacidad').parentElement;
      expect(disabilityDiv).not.toBeNull();
      if (!disabilityDiv) return;
      const select = disabilityDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '0');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_discapacidad: 0
      });
    });
  });

  describe('ANÁLISIS DE VALORES LÍMITE - Casos de Prueba', () => {
    test('AVL001: Primer nombre longitud mínima válida (1 carácter)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
      expect(firstNameDiv).not.toBeNull();
      if (!firstNameDiv) return;
      const input = firstNameDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const firstName = 'A';
      await user.type(input, firstName);
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        primer_nombre: firstName
      });
    });

    test('AVL002: Primer nombre longitud máxima válida (50 caracteres)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
      expect(firstNameDiv).not.toBeNull();
      if (!firstNameDiv) return;
      const input = firstNameDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const nombreLargo = 'A'.repeat(50);
      await user.type(input, nombreLargo);
      // Verificar que se llamó para cada carácter
      expect(mockSetDatosBasicos).toHaveBeenCalledTimes(50);
    });

    test('AVL003: Primer nombre longitud excesiva (51 caracteres)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Primer nombre demasiado largo' }] };
      });

      render(<DatosBasicos />);
      const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
      expect(firstNameDiv).not.toBeNull();
      if (!firstNameDiv) return;
      const input = firstNameDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const nombreMuyLargo = 'A'.repeat(51);
      await user.type(input, nombreMuyLargo);

      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Primer nombre demasiado largo')).toBeInTheDocument();
    });

    test('AVL004: Documento mínimo válido (1 carácter)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const documentDiv = screen.getByText('Número de Documento').parentElement;
      expect(documentDiv).not.toBeNull();
      if (!documentDiv) return;
      const input = documentDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const documento = '1';
      await user.type(input, documento);
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        documento: documento
      });
    });

    test('AVL005: Documento máximo válido (20 caracteres)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const documentDiv = screen.getByText('Número de Documento').parentElement;
      expect(documentDiv).not.toBeNull();
      if (!documentDiv) return;
      const input = documentDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const documentoLargo = '1'.repeat(20);
      await user.type(input, documentoLargo);
      expect(mockSetDatosBasicos).toHaveBeenCalledTimes(20);
    });

    test('AVL006: ID tipo documento límite inferior válido (1)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const typeDocumentDiv = screen.getByText('Tipo de Documento').parentElement;
      expect(typeDocumentDiv).not.toBeNull();
      if (!typeDocumentDiv) return;
      const select = typeDocumentDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '1');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_tipo_documento: 1
      });
    });

    test('AVL007: ID tipo documento límite superior válido (3)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const typeDocumentDiv = screen.getByText('Tipo de Documento').parentElement;
      expect(typeDocumentDiv).not.toBeNull();
      if (!typeDocumentDiv) return;
      const select = typeDocumentDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '3');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_tipo_documento: 3
      });
    });

    test('AVL008: ID tipo documento límite inferior inválido (0)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockImplementation(() => {
        throw { errors: [{ message: 'Tipo de documento es requerido' }] };
      });

      render(<DatosBasicos />);
      const submitButton = screen.getByRole('button', { name: /siguiente/i });
      await user.click(submitButton);

      expect(screen.getByText('*Tipo de documento es requerido')).toBeInTheDocument();
    });

    test('AVL009: Rango edad límite inferior válido (1)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const ageRangeDiv = screen.getByText('Rango de Edad').parentElement;
      expect(ageRangeDiv).not.toBeNull();
      if (!ageRangeDiv) return;
      const select = ageRangeDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '1');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        rango_edad: 1
      });
    });

    test('AVL010: Rango edad límite superior válido (5)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const ageRangeDiv = screen.getByText('Rango de Edad').parentElement;
      expect(ageRangeDiv).not.toBeNull();
      if (!ageRangeDiv) return;
      const select = ageRangeDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '5');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        rango_edad: 5
      });
    });

    test('AVL011: ID sexo límite inferior válido (1)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const sexDiv = screen.getByText('Sexo').parentElement;
      expect(sexDiv).not.toBeNull();
      if (!sexDiv) return;
      const select = sexDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '1');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_sexo: 1
      });
    });

    test('AVL012: ID sexo límite superior válido (3)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const sexDiv = screen.getByText('Sexo').parentElement;
      expect(sexDiv).not.toBeNull();
      if (!sexDiv) return;
      const select = sexDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '3');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_sexo: 3
      });
    });

    test('AVL013: ID discapacidad límite inferior válido (0)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const disabilityDiv = screen.getByText('Discapacidad').parentElement;
      expect(disabilityDiv).not.toBeNull();
      if (!disabilityDiv) return;
      const select = disabilityDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '0');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_discapacidad: 0
      });
    });

    test('AVL014: ID discapacidad límite superior válido (5)', async () => {
      const { DatosBasicosSchema } = require('../../../validation.schema');
      DatosBasicosSchema.parse.mockReturnValue(true);

      render(<DatosBasicos />);
      const disabilityDiv = screen.getByText('Discapacidad').parentElement;
      expect(disabilityDiv).not.toBeNull();
      if (!disabilityDiv) return;
      const select = disabilityDiv.querySelector('select');
      expect(select).not.toBeNull();
      if (!select) return;
      await user.selectOptions(select, '5');
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        id_discapacidad: 5
      });
    });

    test('AVL015: Email longitud mínima válida', async () => {
      render(<DatosBasicos />);
      const emailDiv = screen.getByText('Correo Electrónico').parentElement;
      expect(emailDiv).not.toBeNull();
      if (!emailDiv) return;
      const input = emailDiv.querySelector('input');
      expect(input).not.toBeNull();
      if (!input) return;
      const email = 'a@b.c';
      await user.type(input, email);
      email.split('').forEach((char) => {
        expect(mockSetDatosBasicos).toHaveBeenCalledWith({
          correo: char
        });
      });
    });
  });
});
