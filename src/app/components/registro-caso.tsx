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

export default function RegistroCasoJuridico() {
  const [fecha] = useState(new Date())
  const [radicado] = useState(`CJ-${new Date().getFullYear()}-###`)

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
      <div className="flex-1 bg-white">
        <header className="border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold">Registro de Caso Jurídico</h1>
            <div className="text-sm text-gray-500 mt-1">Inicio / Casos / Nuevo registro</div>
          </div>
        </header>

        <div className="p-6">
          <div className="border rounded-md">
            <div className="bg-gray-50 p-4 border-b text-black">
              <h2 className="text-lg font-medium">Información del Nuevo Caso</h2>
              <p className="text-sm text-gray-500">* Campos obligatorios</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                <div>
                  <Label htmlFor="radicado">Radicado:</Label>
                  <Input id="radicado" value={radicado} disabled className="bg-gray-100" />
                  <p className="text-xs text-gray-500 mt-1">(Generado automáticamente)</p>
                </div>

                <div>
                  <Label htmlFor="fecha">Fecha de recepción:</Label>
                  <Input id="fecha" disabled className="bg-gray-100" />
                </div>

                <div>
                  <Label htmlFor="titulo" className="flex items-center">
                    Título del caso: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input id="titulo" required />
                </div>

                <div>
                  <Label htmlFor="prioridad" className="flex items-center">
                    Prioridad: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="area" className="flex items-center">
                    Área jurídica: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="civil">Civil</SelectItem>
                      <SelectItem value="penal">Penal</SelectItem>
                      <SelectItem value="laboral">Laboral</SelectItem>
                      <SelectItem value="administrativo">Administrativo</SelectItem>
                      <SelectItem value="constitucional">Constitucional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="telefono" className="flex items-center">
                    Teléfono de contacto: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input id="telefono" required />
                </div>

                <div>
                  <Label className="flex items-center mb-2">
                    Tipo de cliente: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <RadioGroup defaultValue="natural" className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="natural" id="natural" />
                      <Label htmlFor="natural">Persona Natural</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="juridica" id="juridica" />
                      <Label htmlFor="juridica">Persona Jurídica</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="descripcion" className="flex items-center">
                    Descripción del caso: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea id="descripcion" required className="min-h-[150px]" />
                </div>

                <div>
                  <Label htmlFor="nombre" className="flex items-center">
                    Nombre/Razón social: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input id="nombre" required />
                </div>

                <div className="flex items-start space-x-2 pt-6">
                  <Checkbox id="sensible" />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="sensible">Caso sensible (p.ej. violencia de género)</Label>
                    <p className="text-sm text-muted-foreground">
                      (Si marca esta opción, se desactivará la asignación automática)
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="identificacion" className="flex items-center">
                    Número de identificación: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input id="identificacion" required />
                </div>

                <div>
                  <Label htmlFor="correo" className="flex items-center">
                    Correo electrónico: <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input id="correo" type="email" required />
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Documentación</h3>
                <div>
                  <Button type="button" className="bg-blue-500 hover:bg-blue-600">
                    <FileIcon className="mr-2 h-4 w-4" /> Seleccionar archivos
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">Formatos permitidos: PDF, DOCX, JPG, PNG</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between border-t pt-6">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-green-500 hover:bg-green-600">Registrar Caso</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
