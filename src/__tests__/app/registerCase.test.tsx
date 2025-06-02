import { render, screen } from '@testing-library/react';
import RegistroCasoJuridico from "./../../../src/app/components/registro-caso";

jest.mock('./../../../store', () => ({
  __esModule: true,
  default: () => ({
    step: 1
  })
}));

jest.mock('../../../src/app/components/DatosBasicos', () => {
  return function MockPersonalInfo() {
    return <div data-testid="personal-info">Personal Info Component</div>;
  };
});

jest.mock('../../../src/app/components/CaracterizacionSocioEconomica', () => {
  return function MockExperienceInfo() {
    return <div data-testid="experience-info">Experience Info Component</div>;
  };
});

jest.mock('../../../src/app/components/CasoJuridico', () => {
  return function MockEducationBackground() {
    return <div data-testid="education-background">Education Background Component</div>;
  };
});

jest.mock('../../../src/app/components/ReviewSubmit', () => {
  return function MockReviewSubmit() {
    return <div data-testid="review-submit">Review Submit Component</div>;
  };
});

jest.mock('../../../src/app/components/ProgressBar', () => {
  return function MockProgressBar() {
    return <div data-testid="progress-bar">Progress Bar</div>;
  };
});

describe('RegistroCasoJuridico Component', () => {

  it('should renders RegistroCasoJuridico component', () => {
    render(<RegistroCasoJuridico />);
    expect(screen.getByText('SISTEMA JURÍDICO')).toBeInTheDocument();
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should render sidebar navigation items', () => {
    render(<RegistroCasoJuridico />);
    expect(screen.getByText('• Registro de Casos')).toBeInTheDocument();
    expect(screen.getByText('• Consulta de Casos')).toBeInTheDocument();
    expect(screen.getByText('• Calendario')).toBeInTheDocument();
    expect(screen.getByText('• Documentos')).toBeInTheDocument();
    expect(screen.getByText('• Reportes')).toBeInTheDocument();
    expect(screen.getByText('• Configuración')).toBeInTheDocument();
  });

  it('should render user information in sidebar', () => {
    render(<RegistroCasoJuridico />);
    expect(screen.getByText('Usuario Jurídico')).toBeInTheDocument();
    expect(screen.getByText('Asistente Legal')).toBeInTheDocument();
  });

  it('should render progress bar component', () => {
    render(<RegistroCasoJuridico />);
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });

  it('should render PersonalInfo component when step is 1', () => {
    render(<RegistroCasoJuridico />);
    expect(screen.getByTestId('personal-info')).toBeInTheDocument();
  });

  it('should have active state on "Registro de Casos" menu item', () => {
    render(<RegistroCasoJuridico />);
    const activeItem = screen.getByText('• Registro de Casos').closest('div');
    expect(activeItem).toHaveClass('bg-blue-500');
  });

  it('should render main layout structure', () => {
    render(<RegistroCasoJuridico />);
    const sidebar = screen.getByText('SISTEMA JURÍDICO').closest('div');
    expect(sidebar).toHaveClass('bg-slate-900');
  });
})
