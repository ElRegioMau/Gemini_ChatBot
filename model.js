import { API_KEY } from "./config.js";

export async function enviarMensajeGemini(mensajeUsuario) {
  const url = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" + API_KEY;

  const body = {
    contents: [
      {
        parts: [{ text: mensajeUsuario }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    const textoRespuesta = data.candidates?.[0]?.content?.parts?.[0]?.text || "No obtuve respuesta.";
    return textoRespuesta;
  } catch (error) {
    console.error("Error al conectar con Gemini:", error);
    return "Error al conectar con la IA.";
  }
}
