import { render, screen } from '@testing-library/react';
import Home from '../../../src/app/page';

jest.mock('../../../store', () => ({
  __esModule: true,
  default: () => ({
    step: 1
  })
}));

jest.mock('../../../src/app/components/registro-caso', () => {
  return function MockRegistroCasoJuridico() {
    return <div data-testid="registro-caso-juridico">Registro Caso Juridico Component</div>;
  };
});


describe('Home Component', () => {
  const mockUseJobAppStore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Home component with default step 1', () => {
    mockUseJobAppStore.mockReturnValue({
      step: 1
    });
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
  });

  it('should render RegistroCasoJuridico component regardless of step', () => {
    mockUseJobAppStore.mockReturnValue({
      step: 3
    });
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
  });

  it('should handle undefined step gracefully', () => {
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
  });

  it('should handle step 0', () => {
    mockUseJobAppStore.mockReturnValue({
      step: 0
    });
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
  });


  it('should not render step components in main return', () => {
    mockUseJobAppStore.mockReturnValue({
      step: 1
    });
    render(<Home />);
    expect(screen.queryByTestId('personal-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('experience-info')).not.toBeInTheDocument();
    expect(screen.queryByTestId('education-background')).not.toBeInTheDocument();
    expect(screen.queryByTestId('review-submit')).not.toBeInTheDocument();
  });

  it('should only render RegistroCasoJuridico component', () => {
    mockUseJobAppStore.mockReturnValue({
      step: 1
    });
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
    const container = screen.getByTestId('registro-caso-juridico').parentElement;
    expect(container?.children).toHaveLength(1);
  });

  it('should work with empty store return', () => {
    mockUseJobAppStore.mockReturnValue({});
    render(<Home />);
    expect(screen.getByTestId('registro-caso-juridico')).toBeInTheDocument();
  });

  it('should render without crashing', () => {
    expect(() => render(<Home />)).not.toThrow();
  });
});
