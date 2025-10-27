import { enviarMensajeGemini } from "./model.js";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", manejarMensaje);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") manejarMensaje();
});

async function manejarMensaje() {
  const mensaje = userInput.value.trim();
  if (!mensaje) return;

  agregarMensaje(mensaje, "user");
  userInput.value = "";

  const respuesta = await enviarMensajeGemini(mensaje);
  agregarMensaje(respuesta, "bot");
}

function agregarMensaje(texto, tipo) {
  const msg = document.createElement("div");
  msg.classList.add("message", tipo);
  msg.textContent = texto;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
