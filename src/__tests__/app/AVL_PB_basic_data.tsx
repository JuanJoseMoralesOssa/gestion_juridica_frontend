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



describe('DatosBasicos - Partición Equivalente y AVL', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const completarFormulario = async (datos: Partial<typeof mockFormData.datosBasicos>) => {
    render(<DatosBasicos />);

    if (datos.primer_nombre !== undefined) {
      await user.type(screen.getByLabelText('Primer Nombre'), datos.primer_nombre);
    }
    if (datos.primer_apellido !== undefined) {
      await user.type(screen.getByLabelText('Primer Apellido'), datos.primer_apellido);
    }
    if (datos.documento !== undefined) {
      await user.type(screen.getByLabelText('Número de Documento'), datos.documento);
    }
    if (datos.celular !== undefined) {
      await user.type(screen.getByLabelText('Número de Celular'), datos.celular);
    }
    if (datos.correo !== undefined) {
      await user.type(screen.getByLabelText('Correo Electrónico'), datos.correo);
    }
    if (datos.direccion !== undefined) {
      await user.type(screen.getByLabelText('Dirección'), datos.direccion);
    }
    if (datos.id_tipo_documento !== undefined) {
      await user.selectOptions(screen.getByLabelText('Tipo de Documento'), datos.id_tipo_documento.toString());
    }
    if (datos.id_lugar_expedicion !== undefined) {
      await user.selectOptions(screen.getByLabelText('Lugar de Expedición'), datos.id_lugar_expedicion.toString());
    }
    if (datos.rango_edad !== undefined) {
      await user.selectOptions(screen.getByLabelText('Rango de Edad'), datos.rango_edad.toString());
    }
    if (datos.ciudad_domicilio !== undefined) {
      await user.selectOptions(screen.getByLabelText('Ciudad de Domicilio'), datos.ciudad_domicilio.toString());
    }
    if (datos.id_sexo !== undefined) {
      await user.selectOptions(screen.getByLabelText('Sexo'), datos.id_sexo.toString());
    }
    if (datos.id_discapacidad !== undefined) {
      await user.selectOptions(screen.getByLabelText('Discapacidad'), datos.id_discapacidad.toString());
    }
  };

  // describe('PARTICIÓN EQUIVALENTE - Casos de Prueba', () => {
  //   test('PE001: Primer nombre válido (partición válida)', async () => {
  //     await completarFormulario({ primer_nombre: 'Juan' });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ primer_nombre: 'Juan' });
  //   });

  //   test('PE002: Primer nombre vacío (partición inválida)', async () => {
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Primer nombre es requerido' }] };
  //     });

  //     render(<DatosBasicos />);
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Primer nombre es requerido')).toBeInTheDocument();
  //   });

  //   test('PE003: Email válido (partición válida)', async () => {
  //     await completarFormulario({ correo: 'juan@ejemplo.com' });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ correo: 'juan@ejemplo.com' });
  //   });

  //   test('PE004: Email inválido (partición inválida)', async () => {
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Correo electrónico inválido' }] };
  //     });

  //     await completarFormulario({ correo: 'email-invalido' });
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Correo electrónico inválido')).toBeInTheDocument();
  //   });

  //   test('PE005: Tipo documento válido (partición válida)', async () => {
  //     await completarFormulario({ id_tipo_documento: 1 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_tipo_documento: 1 });
  //   });

  //   test('PE006: Tipo documento inválido (partición inválida)', async () => {
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Tipo de documento es requerido' }] };
  //     });

  //     await completarFormulario({ id_tipo_documento: 0 });
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Tipo de documento es requerido')).toBeInTheDocument();
  //   });

  //   test('PE007: Rango edad válido (partición válida)', async () => {
  //     await completarFormulario({ rango_edad: 2 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ rango_edad: 2 });
  //   });

  //   test('PE008: Rango edad inválido (partición inválida)', async () => {
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Rango de edad es requerido' }] };
  //     });

  //     await completarFormulario({ rango_edad: 0 });
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Rango de edad es requerido')).toBeInTheDocument();
  //   });

  //   test('PE009: Sexo válido (partición válida)', async () => {
  //     await completarFormulario({ id_sexo: 1 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_sexo: 1 });
  //   });

  //   test('PE010: Discapacidad válida (partición válida)', async () => {
  //     await completarFormulario({ id_discapacidad: 0 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_discapacidad: 0 });
  //   });
  // });

  // describe('ANÁLISIS DE VALORES LÍMITE - Casos de Prueba', () => {
  //   test('AVL001: Primer nombre longitud mínima válida (1 carácter)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ primer_nombre: 'A' });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ primer_nombre: 'A' });
  //   });

  //   test('AVL002: Primer nombre longitud máxima válida (50 caracteres)', async () => {
  //     const nombreLargo = 'A'.repeat(50);
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ primer_nombre: nombreLargo });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ primer_nombre: nombreLargo });
  //   });

  //   test('AVL003: Primer nombre longitud excesiva (51 caracteres)', async () => {
  //     const nombreMuyLargo = 'A'.repeat(51);
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Primer nombre demasiado largo' }] };
  //     });

  //     await completarFormulario({ primer_nombre: nombreMuyLargo });
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Primer nombre demasiado largo')).toBeInTheDocument();
  //   });

  //   test('AVL004: Documento mínimo válido (1 carácter)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ documento: '1' });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ documento: '1' });
  //   });

  //   test('AVL005: Documento máximo válido (20 caracteres)', async () => {
  //     const documentoLargo = '1'.repeat(20);
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ documento: documentoLargo });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ documento: documentoLargo });
  //   });

  //   test('AVL006: ID tipo documento límite inferior válido (1)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_tipo_documento: 1 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_tipo_documento: 1 });
  //   });

  //   test('AVL007: ID tipo documento límite superior válido (3)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_tipo_documento: 3 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_tipo_documento: 3 });
  //   });

  //   test('AVL008: ID tipo documento límite inferior inválido (0)', async () => {
  //     mockValidationSchema.parse.mockImplementation(() => {
  //       throw { errors: [{ message: 'Tipo de documento es requerido' }] };
  //     });

  //     await completarFormulario({ id_tipo_documento: 0 });
  //     const submitButton = screen.getByRole('button', { name: /siguiente/i });
  //     await user.click(submitButton);

  //     expect(screen.getByText('*Tipo de documento es requerido')).toBeInTheDocument();
  //   });

  //   test('AVL009: Rango edad límite inferior válido (1)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ rango_edad: 1 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ rango_edad: 1 });
  //   });

  //   test('AVL010: Rango edad límite superior válido (5)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ rango_edad: 5 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ rango_edad: 5 });
  //   });

  //   test('AVL011: ID sexo límite inferior válido (1)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_sexo: 1 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_sexo: 1 });
  //   });

  //   test('AVL012: ID sexo límite superior válido (3)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_sexo: 3 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_sexo: 3 });
  //   });

  //   test('AVL013: ID discapacidad límite inferior válido (0)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_discapacidad: 0 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_discapacidad: 0 });
  //   });

  //   test('AVL014: ID discapacidad límite superior válido (5)', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ id_discapacidad: 5 });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ id_discapacidad: 5 });
  //   });

  //   test('AVL015: Email longitud mínima válida', async () => {
  //     mockValidationSchema.parse.mockReturnValue(true);
  //     await completarFormulario({ correo: 'a@b.c' });
  //     expect(mockSetDatosBasicos).toHaveBeenCalledWith({ correo: 'a@b.c' });
  //   });
  // });

  describe('CASOS COMBINADOS - Formulario Completo', () => {
    // test('CC001: Formulario válido completo', async () => {
    //   mockValidationSchema.parse.mockReturnValue(true);

    //   await completarFormulario({
    //     primer_nombre: 'Juan',
    //     primer_apellido: 'Pérez',
    //     id_tipo_documento: 1,
    //     documento: '12345678',
    //     id_lugar_expedicion: 1,
    //     rango_edad: 2,
    //     celular: '3001234567',
    //     correo: 'juan@ejemplo.com',
    //     id_sexo: 1,
    //     id_discapacidad: 0,
    //     ciudad_domicilio: 1,
    //     direccion: 'Calle 123 #45-67'
    //   });

    //   const submitButton = screen.getByRole('button', { name: /siguiente/i });
    //   await user.click(submitButton);

    //   expect(mockNextStep).toHaveBeenCalled();
    // });

    test('CC002: Formulario con múltiples errores', async () => {
      render(<DatosBasicos />);

      const submitButton = screen.getByText(/siguiente →/i);
      await user.click(submitButton);

      // expect(mockNextStep).not.toHaveBeenCalled();
    });
  });
});
