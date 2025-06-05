import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CaracterizacionSocioeconomica from '../../../src/app/components/CaracterizacionSocioEconomica';

const mockNextStep = jest.fn();
const mockPrevStep = jest.fn();
const mockSetCaracterizacionSocioeconomica = jest.fn();
const mockFormData = {
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
  }
};

jest.mock('../../../store', () => ({
  __esModule: true,
  default: () => ({
    nextStep: mockNextStep,
    prevStep: mockPrevStep,
    formData: mockFormData,
    setCaracterizacionSocioeconomica: mockSetCaracterizacionSocioeconomica
  })
}));

const user = userEvent.setup();

describe('CaracterizacionSocioeconomica Component - Rendering Tests', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('should render the component with title', () => {
      render(<CaracterizacionSocioeconomica />);
      expect(screen.getByText('Caracterización Socioeconómica')).toBeInTheDocument();
    });

    it('should render all form fields', () => {
      render(<CaracterizacionSocioeconomica />);

      // Text inputs
      expect(screen.getByText('Ocupación')).toBeInTheDocument();
      expect(screen.getByText('Número de Personas que Laboran')).toBeInTheDocument();
      expect(screen.getByText('Número de Personas con las que Convive')).toBeInTheDocument();
      expect(screen.getByText('Observaciones')).toBeInTheDocument();

      // Select fields
      expect(screen.getByText('Promedio de Ingresos Personales')).toBeInTheDocument();
      expect(screen.getByText('Promedio de Ingresos Familiares')).toBeInTheDocument();
      expect(screen.getByText('Promedio de Egresos')).toBeInTheDocument();
      expect(screen.getByText('Estrato')).toBeInTheDocument();
      expect(screen.getByText('Tipo de Vivienda')).toBeInTheDocument();

      // Checkbox fields
      expect(screen.getByText('¿Tiene Dependientes?')).toBeInTheDocument();
      expect(screen.getByText('¿Depende de Alguien?')).toBeInTheDocument();
      expect(screen.getByText('¿Ha Sido Asesorado Anteriormente?')).toBeInTheDocument();
    });

    it('should render navigation buttons', () => {
      render(<CaracterizacionSocioeconomica />);
      expect(screen.getByRole('button', { name: /anterior/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /siguiente/i })).toBeInTheDocument();
    });

    it('should not show error message initially', () => {
      render(<CaracterizacionSocioeconomica />);
      expect(screen.queryByText(/\*/)).not.toBeInTheDocument();
    });

    it('should not show conditional fields initially', () => {
      render(<CaracterizacionSocioeconomica />);
      expect(screen.queryByText('Número de Dependientes')).not.toBeInTheDocument();
      expect(screen.queryByText('¿Depende de un Abogado?')).not.toBeInTheDocument();
    });
  });

  describe('Select Options Rendering', () => {
    it('should have correct options for promedio ingresos personales', () => {
      render(<CaracterizacionSocioeconomica />);
      const ingresosPersonalesDiv = screen.getByText('Promedio de Ingresos Personales');
      expect(ingresosPersonalesDiv).toBeInTheDocument();
      const select = ingresosPersonalesDiv.parentElement?.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue('Seleccione rango de ingresos');

      const options = select?.querySelectorAll('option');
      expect(options).toHaveLength(6); // including default option
    });

    it('should have correct options for promedio ingresos familiares', () => {
      render(<CaracterizacionSocioeconomica />);
      const ingresosFamiliaresDiv = screen.getByText('Promedio de Ingresos Familiares');
      expect(ingresosFamiliaresDiv).toBeInTheDocument();
      const select = ingresosFamiliaresDiv.parentElement?.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue('Seleccione rango de ingresos familiares');

      const options = select?.querySelectorAll('option');
      expect(options).toHaveLength(6); // including default option
    });

    it('should have correct options for promedio egresos', () => {
      render(<CaracterizacionSocioeconomica />);
      const egresosDiv = screen.getByText('Promedio de Egresos');
      expect(egresosDiv).toBeInTheDocument();
      const select = egresosDiv.parentElement?.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue('Seleccione rango de egresos');

      const options = select?.querySelectorAll('option');
      expect(options).toHaveLength(6); // including default option
    });

    it('should have correct options for estrato', () => {
      render(<CaracterizacionSocioeconomica />);
      const estratoDiv = screen.getByText('Estrato');
      expect(estratoDiv).toBeInTheDocument();
      const select = estratoDiv.parentElement?.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue('Seleccione su estrato');

      const options = select?.querySelectorAll('option');
      expect(options).toHaveLength(7); // including default option
    });

    it('should have correct options for tipo de vivienda', () => {
      render(<CaracterizacionSocioeconomica />);
      const viviendaDiv = screen.getByText('Tipo de Vivienda');
      expect(viviendaDiv).toBeInTheDocument();
      const select = viviendaDiv.parentElement?.querySelector('select');
      expect(select).toBeInTheDocument();
      expect(select).toHaveDisplayValue('Seleccione tipo de vivienda');

      const options = select?.querySelectorAll('option');
      expect(options).toHaveLength(5); // including default option
    });
  });

  describe('Input Fields Rendering', () => {
    it('should render text input for ocupacion', () => {
      render(<CaracterizacionSocioeconomica />);
      const ocupacionDiv = screen.getByText('Ocupación').parentElement;
      const input = ocupacionDiv?.querySelector('input[type="text"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Ingrese su ocupación');
      expect(input).toHaveAttribute('required');
    });

    it('should render number inputs for numeric fields', () => {
      render(<CaracterizacionSocioeconomica />);

      const personasLaborandoDiv = screen.getByText('Número de Personas que Laboran').parentElement;
      const personasLaborandoInput = personasLaborandoDiv?.querySelector('input[type="number"]');
      expect(personasLaborandoInput).toBeInTheDocument();
      expect(personasLaborandoInput).toHaveAttribute('min', '0');
      expect(personasLaborandoInput).toHaveAttribute('required');

      const personasConviveDiv = screen.getByText('Número de Personas con las que Convive').parentElement;
      const personasConviveInput = personasConviveDiv?.querySelector('input[type="number"]');
      expect(personasConviveInput).toBeInTheDocument();
      expect(personasConviveInput).toHaveAttribute('min', '0');
      expect(personasConviveInput).toHaveAttribute('required');
    });

    it('should render textarea for observaciones', () => {
      render(<CaracterizacionSocioeconomica />);
      const observacionesDiv = screen.getByText('Observaciones').parentElement;
      const textarea = observacionesDiv?.querySelector('textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Observaciones adicionales');
      expect(textarea).toHaveAttribute('rows', '4');
    });
  });

  describe('Checkbox Fields Rendering', () => {
    it('should render checkboxes for boolean fields', () => {
      render(<CaracterizacionSocioeconomica />);

      const dependientesCheckbox = screen.getByRole('checkbox', { name: /si/i });
      expect(dependientesCheckbox).toBeInTheDocument();

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3); // dependientes, depende, asesorado
    });

    it('should have checkboxes unchecked initially', () => {
      render(<CaracterizacionSocioeconomica />);

      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });
    });
  });


  describe('Form Layout Rendering', () => {
    it('should render form fields in grid layout', () => {
      render(<CaracterizacionSocioeconomica />);
      const gridContainer = screen.getByText('Ocupación').closest('.grid');
      expect(gridContainer).toHaveClass('grid', 'gap-6', 'mb-6', 'md:grid-cols-2');
    });

    it('should render observaciones field spanning full width', () => {
      render(<CaracterizacionSocioeconomica />);
      const observacionesContainer = screen.getByText('Observaciones').closest('.md\\:col-span-2');
      expect(observacionesContainer).toHaveClass('md:col-span-2');
    });

    it('should render navigation buttons with proper styling', () => {
      render(<CaracterizacionSocioeconomica />);

      const prevButton = screen.getByRole('button', { name: /anterior/i });
      expect(prevButton).toHaveClass('text-blue-500', 'text-lg', 'sm:text-xl');

      const nextButton = screen.getByRole('button', { name: /siguiente/i });
      expect(nextButton).toHaveClass('text-white', 'bg-blue-500', 'px-3', 'py-1', 'rounded-lg', 'text-lg', 'sm:text-xl');
    });
  });
});
