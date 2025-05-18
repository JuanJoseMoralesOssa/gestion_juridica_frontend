'use client';
import Image from "next/image";
import RegistroCasoJuridico from "./components/registro-caso";
import useJobAppStore from "../../store";
import PersonalInfo from "./components/DatosBasicos";
import ExperienceInfo from "./components/CaracterizacionSocioEconomica";
import EducationBackground from "./components/CasoJuridico";
import ReviewSubmit from "./components/ReviewSubmit";

export default function Home() {

const { step } = useJobAppStore();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <ExperienceInfo />;
      case 3:
        return <EducationBackground />;
      case 4:
        return <ReviewSubmit />;
      default:
        return null;
    }
  };

  return (
    <div className="">
      <RegistroCasoJuridico />
    </div>
  );
}
