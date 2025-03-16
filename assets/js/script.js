const tareas = [
  { id: 1345754904561, nombre: "Sacar basura", realizada: false },
  { id: 2768654397653, nombre: "Cocinar", realizada: false },
  { id: 3478908750127, nombre: "Limpiar baños", realizada: false },
];

const tareasInput = document.getElementById("tareasInput");
const btnAgregar = document.getElementById("btnAgregar");
const totalTareas = document.getElementById("totalTareas");
const totalTareasRealizadas = document.getElementById("totalTareasRealizadas");
const tbodyTareas = document.getElementById("tbodyTareas");

function renderTareas() {
  tbodyTareas.innerHTML = "";
  tareas.forEach((tarea) => {
    tbodyTareas.innerHTML += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombre}</td>
                <td class="tablaCheckbox">
                    <input type="checkbox" data-id="${tarea.id}" ${
      tarea.realizada ? "checked" : ""
    }>
                </td>
                <td class="btn-eliminar">
                    <button class="botonX" data-id="${tarea.id}">❌</button>
                </td>
            </tr>
        `;
  });

  const botonesEliminar = document.querySelectorAll(".botonX");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const idTarea = event.target.getAttribute("data-id");
      eliminarTarea(idTarea);
    });
  });

  totalTareas.innerHTML = tareas.length;

  const tareasRealizadas = tareas.filter((tarea) => tarea.realizada).length;
  totalTareasRealizadas.innerHTML = tareasRealizadas;
}

function eliminarTarea(id) {
  const index = tareas.findIndex((tarea) => tarea.id == id);
  if (index !== -1) {
    tareas.splice(index, 1);
    renderTareas();
  }
}

btnAgregar.addEventListener("click", () => {
  let tareaUsuario = tareasInput.value;
  if (tareaUsuario.trim() !== "") {
    tareas.push({ id: Date.now(), nombre: tareaUsuario, realizada: false });
    renderTareas();
  }
  tareasInput.value = "";
});

tbodyTareas.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const idTarea = event.target.getAttribute("data-id");
    const tarea = tareas.find((t) => t.id == idTarea);
    if (tarea) {
      tarea.realizada = event.target.checked;
      renderTareas();
    }
  }
});

renderTareas();
