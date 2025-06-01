"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Upload, Shield, Lock, X } from "lucide-react"

export default function SecureMessageModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [file, setFile] = useState<File | null>(null)
  const [addresses, setAddresses] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSend = () => {
    // Aquí iría la lógica de envío
    setFile(null)
    setAddresses("")
    onOpenChange(false)
  }

  const handleCancel = () => {
    setFile(null)
    setAddresses("")
    onOpenChange(false)
  }

  return (
    // <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Lock className="w-4 h-4 mr-2" />
            Enviar Mensaje Seguro
          </Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-md p-0 border-0 bg-transparent">
          <Card className="w-full border-slate-200 shadow-xl">
            <CardHeader className="pb-4 relative">
              <Button variant="ghost" size="icon" className="absolute right-4 top-4 h-6 w-6" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900">Mensaje Seguro</CardTitle>
                  <CardDescription className="text-slate-600">
                    Comparte información sensible de forma segura
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Explicación de seguridad */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Tu archivo será encriptado en tu dispositivo antes de ser compartido
                  </p>
                </div>
              </div>

              {/* Campo de archivo */}
              <div className="space-y-2">
                <Label htmlFor="file-upload" className="text-sm font-medium text-slate-700">
                  Archivo Sensible
                </Label>
                <div className="relative">
                  <Input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
                  <Label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      {file ? (
                        <div>
                          <p className="text-sm font-medium text-slate-700">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-medium text-slate-700">Haz clic para subir archivo</p>
                          <p className="text-xs text-slate-500">Máximo 10MB</p>
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              </div>

              {/* Campo de direcciones */}
              <div className="space-y-2">
                <Label htmlFor="addresses" className="text-sm font-medium text-slate-700">
                  Direcciones Públicas
                </Label>
                <Textarea
                  id="addresses"
                  placeholder="0x1234..., 0x5678..., 0x9abc..."
                  value={addresses}
                  onChange={(e) => setAddresses(e.target.value)}
                  className="min-h-[80px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-slate-500">Separa múltiples direcciones con comas</p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!file || !addresses.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Enviar Seguro
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    // </div>
  )
}
