"use client"

import { useState } from "react"
import { Shield, Wallet, Lock, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export default function LoginScreen() {
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnectWallet = (walletType: string) => {
    setIsConnecting(true)
    // Simular conexión
    setTimeout(() => {
      setIsConnecting(false)
      console.log(`Connecting to ${walletType}...`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">SecretDot</h1>
          <p className="text-gray-400 text-sm">Powered by Polkadot</p>
        </div>

        {/* Main Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Value Proposition */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">
                Comparte datos sensibles de forma segura y simple
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Utiliza la tecnología blockchain de Polkadot para compartir información confidencial con máxima
                seguridad y transparencia.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Encriptación de extremo a extremo</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Verificación en blockchain</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">Control total de tus datos</span>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="space-y-4">
              <h3 className="text-white font-medium text-center mb-4">Conecta tu wallet para comenzar</h3>

              {/* Polkadot.js Wallet */}
              <Button
                onClick={() => handleConnectWallet("Polkadot.js")}
                disabled={isConnecting}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 h-12 text-base font-medium"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                  </div>
                  <span>Polkadot.js Extension</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>

              {/* MetaMask Wallet */}
              <Button
                onClick={() => handleConnectWallet("MetaMask")}
                disabled={isConnecting}
                variant="outline"
                className="w-full border-gray-600 bg-gray-700/50 hover:bg-gray-700 text-white h-12 text-base font-medium"
              >
                <div className="flex items-center justify-center gap-3">
                  <Wallet className="w-5 h-5 text-orange-400" />
                  <span>MetaMask</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Button>

              {/* Other Wallets */}
              <Button
                onClick={() => handleConnectWallet("Other")}
                disabled={isConnecting}
                variant="ghost"
                className="w-full text-gray-400 hover:text-white hover:bg-gray-700/50 h-10"
              >
                <span className="text-sm">Otras wallets compatibles</span>
              </Button>
            </div>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Tu wallet permanece bajo tu control. Nunca almacenamos tus claves privadas ni tenemos acceso a tus
                    fondos.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            ¿Necesitas ayuda?{" "}
            <span className="text-purple-400 hover:text-purple-300 cursor-pointer">Contacta soporte</span>
          </p>
        </div>
      </div>
    </div>
  )
}
