const btnMensaje = document.getElementById('btnMensaje')
const mensajeClase = document.getElementById('mensajeClase')
const botonesPerfil = document.querySelectorAll('.btnPerfil')
const detallePerfil = document.getElementById('detallePerfil')


const btnGuardarCandidato = document.getElementById("btnGuardarCandidato");
const mensajeGuardado = document.getElementById("mensajeGuardado");
const contenedorCandidatosGuardados = document.getElementById("contenedorCandidatosGuardados");


async function cargarCandidatosGuardados() {
  const respuesta = await fetch("/api/candidatos");
  const candidatos = await respuesta.json();

  contenedorCandidatosGuardados.innerHTML = "";

  candidatos.forEach(function (candidato) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta-guardada");

    tarjeta.innerHTML = `
      <h3>${candidato.nombre}</h3>
      <p><strong>Rol:</strong> ${candidato.rol}</p>
      <p><strong>Propuesta:</strong> ${candidato.propuesta}</p>
      <p><strong>Estado:</strong> ${candidato.estado}</p>
    `;

    contenedorCandidatosGuardados.appendChild(tarjeta);
  });
}

btnGuardarCandidato.addEventListener("click", async function () {
  const nombre = document.getElementById("nombreCandidato").value.trim();
  const rol = document.getElementById("rolCandidato").value.trim();
  const propuesta = document.getElementById("propuestaCandidato").value.trim();

  if (!nombre || !rol || !propuesta) {
    mensajeGuardado.textContent = "Completa nombre, rol y propuesta.";
    return;
  }

  const nuevoPerfil = {
    nombre: nombre,
    rol: rol,
    propuesta: propuesta
  };

  const respuesta = await fetch("/api/candidatos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevoPerfil)
  });

  const resultado = await respuesta.json();
  mensajeGuardado.textContent = resultado.mensaje;

  document.getElementById("nombreCandidato").value = "";
  document.getElementById("rolCandidato").value = "";
  document.getElementById("propuestaCandidato").value = "";

  cargarCandidatosGuardados();
});

cargarCandidatosGuardados();



let contadorDeClicks = 0

btnMensaje.addEventListener('click', () => {
    // mensajeClase.textContent = '¡Hola! Este es un mensaje de alerta.'
    mensajeClase.textContent = 'el texto que quisimos mostrar' + contadorDeClicks
    contadorDeClicks = contadorDeClicks + 1


})

botonesPerfil.forEach((boton) => {
    boton.addEventListener('click', () => {
        const perfil = boton.getAttribute('data-perfil')
        detallePerfil.textContent = `Información detallada del perfil: ${perfil}`
    })
})