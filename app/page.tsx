"use client"

import { useState } from "react"

export default function Home() {
  const [selected, setSelected] = useState({
    amparo: "",
    eva: ""
  })

  const services = [
    "Acrigel",
    "Uñas tradicionales",
    "Esmaltado pies",
    "Manicura",
    "Pedicura"
  ]

  const selectService = (pro: "amparo" | "eva", service: string) => {
    setSelected((prev) => ({
      ...prev,
      [pro]: service
    }))
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 30,
        fontFamily: "Arial",
        background: "linear-gradient(135deg, #ffe6f0, #e6f7ff)"
      }}
    >
      {/* LOGO */}
      <h1 style={{ fontSize: 55, color: "#d81b60", marginBottom: 10 }}>
        MUAH 💅
      </h1>

      <h2 style={{ marginBottom: 30 }}>Agenda Amparo</h2>

      {/* CONTAINER */}
      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        
        {/* AMPARO */}
        <div
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 20,
            background: "#fff",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ color: "#d81b60", fontSize: 24 }}>
            Amparo 👩‍💼
          </h3>

          {services.map((s) => (
            <button
              key={s}
              onClick={() => selectService("amparo", s)}
              style={{
                display: "block",
                width: "100%",
                padding: 12,
                marginTop: 10,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background:
                  selected.amparo === s ? "#d81b60" : "#f3f3f3",
                color: selected.amparo === s ? "#fff" : "#000",
                transition: "0.3s"
              }}
            >
              {s}
            </button>
          ))}

          <p style={{ marginTop: 20 }}>
            Seleccionado: {selected.amparo || "ninguno"}
          </p>
        </div>

        {/* EVA */}
        <div
          style={{
            flex: 1,
            padding: 20,
            borderRadius: 20,
            background: "#fff",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ color: "#1976d2", fontSize: 24 }}>
            Eva 💅 (solo uñas)
          </h3>

          {services.map((s) => (
            <button
              key={s}
              onClick={() => selectService("eva", s)}
              style={{
                display: "block",
                width: "100%",
                padding: 12,
                marginTop: 10,
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background:
                  selected.eva === s ? "#1976d2" : "#f3f3f3",
                color: selected.eva === s ? "#fff" : "#000",
                transition: "0.3s"
              }}
            >
              {s}
            </button>
          ))}

          <p style={{ marginTop: 20 }}>
            Seleccionado: {selected.eva || "ninguno"}
          </p>
        </div>
      </div>
    </main>
  )
}