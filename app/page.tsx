"use client"
import { useState, useEffect } from "react"

type Cita = {
  id: number
  servicio: string
  profesional: string
  cliente: string
  telefono?: string
  inicio: number
  fin: number
  fecha: string
  color: string
}

export default function Home() {
  const [servicio, setServicio] = useState("")
  const [cliente, setCliente] = useState("")
  const [telefono, setTelefono] = useState("")
  const [citas, setCitas] = useState<Cita[]>([])
  const [hovered, setHovered] = useState<string | null>(null)

  const [fecha, setFecha] = useState(
    new Date().toISOString().split("T")[0]
  )

  // 🔥 FIX SOLO AQUI (NO ROMPE NADA)
  const [servicioAmparo, setServicioAmparo] = useState("")
  const [servicioEva, setServicioEva] = useState("")

  const profesionales = [
    { nombre: "Amparo", soloUñas: false },
    { nombre: "Eva", soloUñas: true }
  ]

  useEffect(() => {
    const data = localStorage.getItem("citas")
    if (data) setCitas(JSON.parse(data))
  }, [])

  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas))
  }, [citas])

  const categorias = [
    {
      nombre: "UÑAS",
      esUñas: true,
      servicios: [
        { nombre: "Semipermanentes", tiempo: 30, color: "#ffb6d5" },
        { nombre: "Tradicionales", tiempo: 15, color: "#ffd6a5" },
        { nombre: "Acrigel", tiempo: 60, color: "#a0e7ff" },
        { nombre: "Acrílicas", tiempo: 60, color: "#cdb4ff" },
        { nombre: "Esmaltado pies", tiempo: 30, color: "#ffd6e0" }
      ]
    },
    {
      nombre: "BELLEZA",
      esUñas: false,
      servicios: [
        { nombre: "Maquillaje", tiempo: 45, color: "#fff3a6" },
        { nombre: "Peinados", tiempo: 45, color: "#bde0fe" },
        { nombre: "Lifting pestañas", tiempo: 60, color: "#ffc8dd" }
      ]
    },
    {
      nombre: "TRATAMIENTOS",
      esUñas: false,
      servicios: [
        { nombre: "Higiene facial", tiempo: 90, color: "#b9fbc0" },
        { nombre: "Microblading", tiempo: 120, color: "#e0aaff" },
        { nombre: "Depilación corporal", tiempo: 30, color: "#caffbf" },
        { nombre: "Depilación facial", tiempo: 15, color: "#f1f1f1" }
      ]
    }
  ]

  const servicioSel = categorias
    .flatMap(c => c.servicios)
    .find(s =>
      s.nombre === servicioAmparo || s.nombre === servicioEva || s.nombre === servicio
    )

  const toTime = (m: number) => {
    const h = Math.floor(m / 60)
    const mm = m % 60
    return `${h.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`
  }

  const horas = Array.from({ length: 40 }, (_, i) => 600 + i * 15)

  const crearCita = (inicio: number, prof: any) => {
    if (!cliente.trim()) return alert("Escribe el nombre del cliente")
    if (!servicioSel) return

    const servicioActual =
      prof.nombre === "Amparo" ? servicioAmparo : servicioEva

    const cat = categorias.find(c =>
      c.servicios.some(s => s.nombre === servicioActual)
    )

    if (prof.soloUñas && !cat?.esUñas) {
      alert("Eva solo puede hacer servicios de UÑAS")
      return
    }

    const nueva: Cita = {
      id: Date.now(),
      servicio: servicioActual || servicio,
      profesional: prof.nombre,
      cliente,
      telefono,
      inicio,
      fin: inicio + (servicioSel?.tiempo || 0),
      fecha,
      color: servicioSel?.color || "#ccc"
    }

    setCitas(prev => [...prev, nueva])
    setCliente("")
    setTelefono("")
  }

  const eliminar = (id: number) => {
    setCitas(prev => prev.filter(c => c.id !== id))
  }

  const renderServicios = (prof: any) => {
    const categoriasFiltradas = prof.soloUñas
      ? categorias.filter(c => c.esUñas)
      : categorias

    return (
      <div style={{ marginTop: 12, marginBottom: 12 }}>

        <div style={{
          marginBottom: 10,
          padding: "10px 12px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.8)",
          fontWeight: "bold"
        }}>
          💅 Servicios disponibles
        </div>

        {categoriasFiltradas.map(cat => (
          <div key={cat.nombre} style={{ marginBottom: 14 }}>

            <div style={{ fontWeight: "bold", color: "#d81b60" }}>
              {cat.nombre}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 8
            }}>
              {cat.servicios.map(s => {

                const activo =
                  prof.nombre === "Amparo"
                    ? servicioAmparo === s.nombre
                    : servicioEva === s.nombre

                return (
                  <div
                    key={s.nombre}
                    onClick={() =>
                      prof.nombre === "Amparo"
                        ? setServicioAmparo(s.nombre)
                        : setServicioEva(s.nombre)
                    }
                    onMouseEnter={() => setHovered(s.nombre)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      padding: 12,
                      borderRadius: 16,
                      background: activo ? "#111" : "white",
                      color: activo ? "white" : "#111",
                      border: "1px solid #eee",
                      cursor: "pointer"
                    }}
                  >
                    <b>{s.nombre}</b>
                    <div style={{ fontSize: 11 }}>{s.tiempo} min</div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  const renderColumna = (prof: any) => {
    const citasFiltradas = citas.filter(
      c => c.profesional === prof.nombre && c.fecha === fecha
    )

    const isEva = prof.nombre === "Eva"

    return (
      <div style={{ flex: 1, margin: 10 }}>

        <div style={{
          textAlign: "center",
          padding: 14,
          color: "white",
          background: isEva
            ? "linear-gradient(135deg, #7b2cbf, #9d4edd)"
            : "linear-gradient(135deg, #ff4d6d, #ff758f)"
        }}>
          {prof.nombre}
        </div>

        {renderServicios(prof)}

        <div style={{ position: "relative", height: 650, background: "#fafafa" }}>

          {horas.map(h => (
            <div
              key={h}
              onClick={() => crearCita(h, prof)}
              style={{
                position: "absolute",
                top: (h - 600) * 2,
                left: 0,
                right: 0,
                height: 30,
                borderTop: "1px dashed #eee",
                cursor: "pointer"
              }}
            />
          ))}

          {citasFiltradas.map(c => (
            <div
              key={c.id}
              style={{
                position: "absolute",
                top: (c.inicio - 600) * 2,
                left: 6,
                right: 6,
                height: (c.fin - c.inicio) * 2,
                background: `linear-gradient(135deg, ${c.color}, #fff)`
              }}
            >
              <b>{c.servicio}</b>
              <div>{c.cliente}</div>
              <div>{toTime(c.inicio)} - {toTime(c.fin)}</div>

              <button onClick={() => eliminar(c.id)}>
                borrar
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <main style={{ padding: 25, fontFamily: "Arial" }}>

      {/* 👤 CLIENTE */}
      <input
        placeholder="Nombre cliente"
        value={cliente}
        onChange={e => setCliente(e.target.value)}
      />

      {/* 📞 TELÉFONO */}
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}
      />

      {/* 📅 FECHA */}
      <input
        type="date"
        value={fecha}
        onChange={e => setFecha(e.target.value)}
      />

      {/* 📊 CALENDARIO */}
      <div style={{ display: "flex" }}>
        {profesionales.map(p => renderColumna(p))}
      </div>

    </main>
  )
}