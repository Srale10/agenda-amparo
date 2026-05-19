"use client"

import { useState } from "react"

export default function Home() {
  // 🟢 estados separados (esto es lo importante)
  const [selectedAmparo, setSelectedAmparo] = useState("")
  const [selectedEva, setSelectedEva] = useState("")

  return (
    <main>
      {/* 👇 AQUÍ NO TOCO TU DISEÑO */}
      {/* deja tu logo, colores, calendario, headers tal cual los tienes */}

      <div className="container">
        
        {/* 🟣 AMPARO (NO CAMBIO ESTILOS) */}
        <div className="amparoBox">
          <h3>Amparo</h3>

          {/* 👉 SOLO CAMBIA LA LÓGICA */}
          <button
            onClick={() => setSelectedAmparo("semipermanentes")}
            className={selectedAmparo === "semipermanentes" ? "active" : ""}
          >
            Semipermanentes
          </button>

          <button
            onClick={() => setSelectedAmparo("acrigel")}
            className={selectedAmparo === "acrigel" ? "active" : ""}
          >
            Acrigel
          </button>

          <p>Seleccionado: {selectedAmparo || "ninguno"}</p>
        </div>

        {/* 🔵 EVA (INDEPENDIENTE) */}
        <div className="evaBox">
          <h3>Eva (solo uñas)</h3>

          {/* 👉 MISMA IDEA PERO OTRO ESTADO */}
          <button
            onClick={() => setSelectedEva("semipermanentes")}
            className={selectedEva === "semipermanentes" ? "active" : ""}
          >
            Semipermanentes
          </button>

          <button
            onClick={() => setSelectedEva("acrigel")}
            className={selectedEva === "acrigel" ? "active" : ""}
          >
            Acrigel
          </button>

          <p>Seleccionado: {selectedEva || "ninguno"}</p>
        </div>

      </div>
    </main>
  )
}