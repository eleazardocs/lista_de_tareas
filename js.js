let input = document.querySelector("input");
let addBtn = document.querySelector(".btn-mas");
let ul = document.querySelector("ul");

addBtn.addEventListener("click", (e) => {
  let agregarTexto = (texto) => {
    contador++
    let objetoTexto = {
      id: contador,
      texto: texto
    }
    if (getarrayText() != null) {
      arrayText = getarrayText()
    }
    arrayText.push(objetoTexto)
    setarrayText()
  }
  agregarTexto(input.value);
  input.value = "";
  });

ul.addEventListener('click', (event) => {
  if(event.path[0].type == 'submit') {
    borrarTexto(event.path[1].id)
  }
})

ul.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    editarTexto(event.path[1].id, event.path[0].value)
  }
})

// Local Storage

var arrayText = []
var contador = 0

let getContador = () => {
  let cont = localStorage.getItem("contador")
  return cont
}

let setContador = () => {
    localStorage.setItem("contador",contador)
}

let inicilizarContador = () => {
  if (getContador() != null) {
    contador = getContador()
  }
}

let getarrayText = () => {
  setContador()
  let arreglo = JSON.parse(localStorage.getItem("arrayText"))
  return arreglo
}

let setarrayText = () => {
  localStorage.setItem("arrayText",JSON.stringify(arrayText))
  listarTareas()
}



let listarTareas = () => {
  ul.innerHTML = ''
  let datos = getarrayText()
  if (datos != null) {
    for (let tarea of datos.reverse()) {
      ul.innerHTML += `
        <li id="${tarea.id}">
            <input type="text" class="input-tarea" maxlength="28" value="${tarea.texto}">
            <button class="btn-delete">X</button>
        </li>
      `
    }
  }
}

let editarTexto = (idTarea, texto) => {
  let newTarea = {
    id: idTarea,
    texto: texto
  }
  let datos = getarrayText()
  let newArreglo = []
  if (datos != null) {
    for (let tarea of datos) {
      if (tarea.id == idTarea) {
        newArreglo.push(newTarea)
      }else{
        newArreglo.push(tarea)
      }
    }
  }
  arrayText = newArreglo
  setarrayText()
}

let borrarTexto = (idTarea) => {
  let datos = getarrayText()
  let newArreglo = []
  if (datos != null) {
    for (let tarea of datos) {
      if (tarea.id != idTarea) {
        newArreglo.push(tarea)
      }
    }
  }
  arrayText = newArreglo
  setarrayText()
}

// inicia
inicilizarContador()
listarTareas()
