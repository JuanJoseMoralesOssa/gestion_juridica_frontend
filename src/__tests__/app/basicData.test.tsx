import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatosBasicos from '../../../src/app/components/DatosBasicos';

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
const user = userEvent.setup();

describe('DatosBasicos Component', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the component with title', () => {
      render(<DatosBasicos />);
      expect(screen.getByText('Datos Básicos')).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(<DatosBasicos />);

      expect(screen.getByText('Primer Nombre')).toBeInTheDocument();
      expect(screen.getByText('Segundo Nombre')).toBeInTheDocument();
      expect(screen.getByText('Primer Apellido')).toBeInTheDocument();
      expect(screen.getByText('Segundo Apellido')).toBeInTheDocument();
      expect(screen.getByText('Número de Documento')).toBeInTheDocument();
      expect(screen.getByText('Número de Celular')).toBeInTheDocument();
      expect(screen.getByText('Correo Electrónico')).toBeInTheDocument();
      expect(screen.getByText('Dirección')).toBeInTheDocument();
      expect(screen.getByText('Concepto')).toBeInTheDocument();

      expect(screen.getByText('Tipo de Documento')).toBeInTheDocument();
      expect(screen.getByText('Lugar de Expedición')).toBeInTheDocument();
      expect(screen.getByText('Rango de Edad')).toBeInTheDocument();
      expect(screen.getByText('Sexo')).toBeInTheDocument();
      expect(screen.getByText('Discapacidad')).toBeInTheDocument();
      expect(screen.getByText('Ciudad de Domicilio')).toBeInTheDocument();
      expect(screen.getByText('Área de Derecho')).toBeInTheDocument();
    });

    it('should render all form fields with a good use of label', () => {
      render(<DatosBasicos />);

      expect(screen.getByLabelText('Primer Nombre')).toBeInTheDocument();
      expect(screen.getByLabelText('Segundo Nombre')).toBeInTheDocument();
      expect(screen.getByLabelText('Primer Apellido')).toBeInTheDocument();
      expect(screen.getByLabelText('Segundo Apellido')).toBeInTheDocument();
      expect(screen.getByLabelText('Número de Documento')).toBeInTheDocument();
      expect(screen.getByLabelText('Número de Celular')).toBeInTheDocument();
      expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
      expect(screen.getByLabelText('Dirección')).toBeInTheDocument();
      expect(screen.getByLabelText('Concepto')).toBeInTheDocument();

      expect(screen.getByLabelText('Tipo de Documento')).toBeInTheDocument();
      expect(screen.getByLabelText('Lugar de Expedición')).toBeInTheDocument();
      expect(screen.getByLabelText('Rango de Edad')).toBeInTheDocument();
      expect(screen.getByLabelText('Sexo')).toBeInTheDocument();
      expect(screen.getByLabelText('Discapacidad')).toBeInTheDocument();
      expect(screen.getByLabelText('Ciudad de Domicilio')).toBeInTheDocument();
      expect(screen.getByLabelText('Área de Derecho')).toBeInTheDocument();
    });

    it('should render the submit button', () => {
      render(<DatosBasicos />);
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    });

    it('should not show error message initially', () => {
      render(<DatosBasicos />);
      expect(screen.queryByText(/\*/)).not.toBeInTheDocument();
    });
  });
});

describe('Form Interaction', () => {
  it('should call setDatosBasicos when text input changes', async () => {
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

  it('should call setDatosBasicos when select input changes', async () => {
    render(<DatosBasicos />);
    const typeDocumentDiv = screen.getByText('Tipo de Documento').parentElement;
    expect(typeDocumentDiv).not.toBeNull();
    if (!typeDocumentDiv) return;
    expect(typeDocumentDiv.querySelector('select')).not.toBeNull();
    const select = typeDocumentDiv.querySelector('select');
    expect(select).not.toBeNull();
    if (!select) return;
    await user.selectOptions(select, '1');
    expect(mockSetDatosBasicos).toHaveBeenCalledWith({
      id_tipo_documento: 1
    });
  });

  it('should handle email input correctly', async () => {
    render(<DatosBasicos />);
    const emailDiv = screen.getByText('Correo Electrónico').parentElement;
    expect(emailDiv).not.toBeNull();
    if (!emailDiv) return;
    const input = emailDiv.querySelector('input');
    expect(input).not.toBeNull();
    if (!input) return;
    const email = 'test@example.com'
    await user.type(input, email);
    email.split('').forEach((char) => {
      expect(mockSetDatosBasicos).toHaveBeenCalledWith({
        correo: char
      });
    });
  });

  it('should parse numeric values for number fields', async () => {
    render(<DatosBasicos />);
    const ageRangeDiv = screen.getByText('Rango de Edad').parentElement;
    expect(ageRangeDiv).not.toBeNull();
    if (!ageRangeDiv) return;
    expect(ageRangeDiv.querySelector('select')).not.toBeNull();
    const select = ageRangeDiv.querySelector('select');
    expect(select).not.toBeNull();
    if (!select) return;
    await user.selectOptions(select, '2');
    expect(mockSetDatosBasicos).toHaveBeenCalledWith({
      rango_edad: 2
    });
  });
});

describe('Form Validation', () => {
  it('should not call nextStep if form is invalid', async () => {
    const { DatosBasicosSchema } = require('../../../validation.schema');
    jest.spyOn(DatosBasicosSchema, 'parse').mockImplementation(() => {
      throw { errors: [{ message: 'Error de validación' }] };
    });
    const { formData } = require('../../../store').default();
    formData.datosBasicos = mockFormData.datosBasicos;
    const { setDatosBasicos } = require('../../../store').default();
    setDatosBasicos(mockFormData.datosBasicos);
    jest.spyOn(setDatosBasicos, 'mockImplementation').mockReturnValue(mockFormData.datosBasicos);
    const { nextStep } = require('../../../store').default();
    jest.spyOn(nextStep, 'mockImplementation').mockReturnValue(mockNextStep);
    render(<DatosBasicos />);
    const submitButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(submitButton);
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('should validate and proceed to next step when form is valid', async () => {
    const { DatosBasicosSchema } = require('../../../validation.schema');
    jest.spyOn(DatosBasicosSchema, 'parse').mockReturnValue(true);
    const { formData } = require('../../../store').default();
    formData.datosBasicos = mockFormData.datosBasicos;
    const { setDatosBasicos } = require('../../../store').default();
    setDatosBasicos(mockFormData.datosBasicos);
    jest.spyOn(setDatosBasicos, 'mockImplementation').mockReturnValue(mockFormData.datosBasicos);
    const { nextStep } = require('../../../store').default();
    jest.spyOn(nextStep, 'mockImplementation').mockReturnValue(mockNextStep);
    render(<DatosBasicos />);
    const submitButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(submitButton);
    expect(DatosBasicosSchema.parse).toHaveBeenCalledWith(mockFormData.datosBasicos);
    expect(mockNextStep).toHaveBeenCalled();
  });



  it('should show validation error when form is invalid', async () => {
    const tempMockNextStep = jest.fn();
    const { DatosBasicosSchema } = require('../../../validation.schema');
    DatosBasicosSchema.parse.mockImplementation(() => {
      throw { errors: [{ message: 'Primer nombre es requerido' }] };
    });
    render(<DatosBasicos />);
    const submitButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(submitButton);
    expect(screen.getByText('*Primer nombre es requerido')).toBeInTheDocument();
    expect(tempMockNextStep).not.toHaveBeenCalled();
  });

  it('should show default error message when no specific error message', async () => {
    const { DatosBasicosSchema } = require('../../../validation.schema');
    DatosBasicosSchema.parse.mockImplementation(() => {
      throw { errors: [] };
    });
    render(<DatosBasicos />);
    const submitButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(submitButton);
    expect(screen.getByText('*Por favor complete todos los campos correctamente.')).toBeInTheDocument();
  });

  it('should clear error message after successful validation', async () => {
    const { DatosBasicosSchema } = require('../../../validation.schema');
    DatosBasicosSchema.parse.mockImplementation(() => {
      throw { errors: [{ message: 'Error de validación' }] };
    });
    render(<DatosBasicos />);
    const submitButton = screen.getByRole('button', { name: /siguiente/i });
    await user.click(submitButton);
    expect(screen.getByText('*Error de validación')).toBeInTheDocument();
    DatosBasicosSchema.parse.mockReturnValue(true);
    await user.click(submitButton);
    expect(screen.queryByText('*Error de validación')).not.toBeInTheDocument();
  });


});

describe('Select Options', () => {
  it('should have correct options for tipo de documento', () => {
    render(<DatosBasicos />);
    const documentTypeDiv = screen.getByText('Tipo de Documento');
    expect(documentTypeDiv).toBeInTheDocument();
    const select = documentTypeDiv.parentElement?.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue('Seleccionar tipo de documento');
    const options = screen.getAllByRole('option');
    const docTypeOptions = options.filter(option =>
      option.closest('select') === select
    );
    expect(docTypeOptions).toHaveLength(4);
  });

  it('should have correct options for sexo', () => {
    render(<DatosBasicos />);
    const sexDiv = screen.getByText('Sexo');
    expect(sexDiv).toBeInTheDocument();
    const select = sexDiv.parentElement?.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue('Seleccionar sexo');
    const options = screen.getAllByRole('option');
    const sexOptions = options.filter(option =>
      option.closest('select') === select
    );
    expect(sexOptions).toHaveLength(4);
  });

  it('should have correct options for rango de edad', () => {
    render(<DatosBasicos />);
    const age = screen.getByText('Rango de Edad');
    expect(age).toBeInTheDocument();
    const select = age.parentElement?.querySelector('select');
    expect(select).toBeInTheDocument();
    expect(select).toHaveDisplayValue('Seleccionar rango de edad');
    const options = screen.getAllByRole('option');
    const ageRangeOptions = options.filter(option =>
      option.closest('select') === select
    );
    expect(ageRangeOptions).toHaveLength(6);
  });
});


describe('Edge Cases', () => {
  it('should handle empty string values correctly', async () => {
    render(<DatosBasicos />);
    const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
    expect(firstNameDiv).not.toBeNull();
    if (!firstNameDiv) return;
    expect(firstNameDiv.querySelector('input')).not.toBeNull();
    const inputField = firstNameDiv.querySelector('input');
    expect(inputField).not.toBeNull();
    if (!inputField) return;
    await user.clear(inputField);
    expect(inputField.value).toBe('');
  });

  it('should handle zero values for numeric fields', async () => {
    render(<DatosBasicos />);
    const disabilityDiv = screen.getByText('Discapacidad').parentElement;
    expect(disabilityDiv).not.toBeNull();
    if (!disabilityDiv) return;
    expect(disabilityDiv.querySelector('select')).not.toBeNull();
    const select = disabilityDiv.querySelector('select');
    expect(select).not.toBeNull();
    if (!select) return;
    await user.selectOptions(select, '0');
    expect(mockSetDatosBasicos).toHaveBeenCalledWith({
      id_discapacidad: 0
    });
  });

  it('should handle invalid numeric input gracefully', async () => {
    render(<DatosBasicos />);
    const typeDocumentDiv = screen.getByText('Tipo de Documento').parentElement;
    expect(typeDocumentDiv).not.toBeNull();
    if (!typeDocumentDiv) return;
    const select = typeDocumentDiv.querySelector('select');
    expect(select).not.toBeNull();
    if (!select) return;
    fireEvent.change(select, { target: { value: 'invalid' } });
    expect(mockSetDatosBasicos).toHaveBeenCalledWith({
      id_tipo_documento: 0
    });
  });
});

describe('Field Values', () => {
  it('should display form data values from store', () => {
    const mockFormDataWithValues = {
      datosBasicos: {
        ...mockFormData.datosBasicos,
        primer_nombre: 'Juan',
        correo: 'juan@example.com',
        id_tipo_documento: 1
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
    const firstNameDiv = screen.getByText('Primer Nombre').parentElement;
    expect(firstNameDiv).toBeInTheDocument();
    const input = firstNameDiv!.querySelector('input');
    expect(input).toBeInTheDocument();
    if (!input) return;
    expect(input.value).toBe('Juan');
    const emailDiv = screen.getByText('Correo Electrónico').parentElement;
    expect(emailDiv).toBeInTheDocument();
    const emailInput = emailDiv!.querySelector('input');
    expect(emailInput).toBeInTheDocument();
    if (!emailInput) return;
    expect(emailInput.value).toBe('juan@example.com');
  });
});

describe('Accessibility', () => {
  it('should have proper labels for form fields', () => {
    render(<DatosBasicos />);
    const firstNameLabel = screen.getByText('Primer Nombre');
    expect(firstNameLabel).toBeInTheDocument();
    const firstNameInput = firstNameLabel.parentElement?.querySelector('input');
    expect(firstNameInput).toBeInTheDocument();
    const lastNameLabel = screen.getByText('Primer Apellido');
    expect(lastNameLabel).toBeInTheDocument();
    const lastNameInput = lastNameLabel.parentElement?.querySelector('input');
    expect(lastNameInput).toBeInTheDocument();
    const documentLabel = screen.getByText('Número de Documento');
    expect(documentLabel).toBeInTheDocument();
    const documentInput = documentLabel.parentElement?.querySelector('input');
    expect(documentInput).toBeInTheDocument();
    const phoneLabel = screen.getByText('Número de Celular');
    expect(phoneLabel).toBeInTheDocument();
    const phoneInput = phoneLabel.parentElement?.querySelector('input');
    expect(phoneInput).toBeInTheDocument();
    const emailLabel = screen.getByText('Correo Electrónico');
    expect(emailLabel).toBeInTheDocument();
    const emailInput = emailLabel.parentElement?.querySelector('input');
    expect(emailInput).toBeInTheDocument();
    const addressLabel = screen.getByText('Dirección');
    expect(addressLabel).toBeInTheDocument();
    const addressInput = addressLabel.parentElement?.querySelector('input');
    expect(addressInput).toBeInTheDocument();
  });

  it('should have required attribute on required fields', () => {
    render(<DatosBasicos />);
    const firstNameInput = screen.getByText('Primer Nombre').parentElement?.querySelector('input');
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('required');
    const lastNameInput = screen.getByText('Primer Apellido').parentElement?.querySelector('input');
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('required');
    const documentInput = screen.getByText('Número de Documento').parentElement?.querySelector('input');
    expect(documentInput).toBeInTheDocument();
    expect(documentInput).toHaveAttribute('required');
    const phoneInput = screen.getByText('Número de Celular').parentElement?.querySelector('input');
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('required');
    const emailInput = screen.getByText('Correo Electrónico').parentElement?.querySelector('input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('required');
    const addressInput = screen.getByText('Dirección').parentElement?.querySelector('input');
    expect(addressInput).toBeInTheDocument();
    expect(addressInput).toHaveAttribute('required')
  });

  it('should have proper input types', () => {
    render(<DatosBasicos />);
    const emailInput = screen.getByText('Correo Electrónico').parentElement?.querySelector('input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    const firstNameInput = screen.getByText('Primer Nombre').parentElement?.querySelector('input');
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('type', 'text');
  });
});
