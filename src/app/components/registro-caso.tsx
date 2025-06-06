"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textArea"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Checkbox } from "../components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

import { FileIcon, User } from "lucide-react"
import ProgressBar from "./ProgressBar"
import useJobAppStore from "../../../store"
import PersonalInfo from "./DatosBasicos"
import ExperienceInfo from "./CaracterizacionSocioEconomica"
import EducationBackground from "./CasoJuridico"
import ReviewSubmit from "./ReviewSubmit"

export default function RegistroCasoJuridico() {
  const [fecha] = useState(new Date())
  const [radicado] = useState(`CJ-${new Date().getFullYear()}-###`)


const { step } = useJobAppStore();

  /**
 * Renderiza el componente correspondiente según el paso actual del formulario.
 *
 * Sistema de navegación por pasos (stepper):
 * - Paso 1: Datos Básicos del usuario (información personal)
 * - Paso 2: Caracterización Socioeconómica (situación económica)
 * - Paso 3: Caso Jurídico (detalles del caso legal)
 * - Paso 4: Revisión y Envío (confirmación final)
 *
 * @returns {JSX.Element | null} Componente del paso actual o null si es inválido
 */
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-6 bg-slate-900">
          <h1 className="text-xl font-semibold">SISTEMA JURÍDICO</h1>
        </div>

        <nav className="flex-1">
          <div className="bg-blue-500 py-3 px-6 border-l-4 border-white">
            <span className="flex items-center">• Registro de Casos</span>
          </div>
          <div className="py-3 px-6 hover:bg-slate-700">
            <span className="flex items-center">• Consulta de Casos</span>
          </div>
          <div className="py-3 px-6 hover:bg-slate-700">
            <span className="flex items-center">• Calendario</span>
          </div>
          <div className="py-3 px-6 hover:bg-slate-700">
            <span className="flex items-center">• Documentos</span>
          </div>
          <div className="py-3 px-6 hover:bg-slate-700">
            <span className="flex items-center">• Reportes</span>
          </div>
          <div className="py-3 px-6 hover:bg-slate-700">
            <span className="flex items-center">• Configuración</span>
          </div>
        </nav>

        <div className="p-4 mt-auto flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
            <User className="text-slate-800" />
          </div>
          <div>
            <p className="font-medium">Usuario Jurídico</p>
            <p className="text-sm text-slate-300">Asistente Legal</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center w-full">
       <ProgressBar />

        {/* steps */}
        <div>{renderStep()}</div>
      </div>
    </div>
  )
}
