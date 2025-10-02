// ========================
// Digitação do título
// ========================
const titulo = document.getElementById("titulo");
const texto = "📋 Lista de Tarefas";
let i = 0;

function digitar() {
  if (i < texto.length) {
    titulo.textContent += texto.charAt(i);
    i++;
    setTimeout(digitar, 100);
  } else {
    setInterval(() => {
      titulo.style.borderRight =
        titulo.style.borderRight === "3px solid transparent"
          ? "3px solid #ff6a95"
          : "3px solid transparent";
    }, 500);
  }
}
digitar();

// ========================
// Variáveis globais
// ========================
let listaTarefas = document.getElementById("listaTarefas");
let listaLixeira = document.getElementById("listaLixeira");
let msg = document.getElementById("mensagem");

// Carregar do localStorage ou começar vazio
let Tarefas = JSON.parse(localStorage.getItem("List_tarefas")) || [];
let Lixeira = JSON.parse(localStorage.getItem("List_lixeira")) || [];

// ========================
// Funções de salvar/carregar
// ========================
function salvarTarefas() {
  localStorage.setItem("List_tarefas", JSON.stringify(Tarefas));
  localStorage.setItem("List_lixeira", JSON.stringify(Lixeira));
}

function renderizarTarefas() {
  listaTarefas.innerHTML = "";

  Tarefas.forEach((tarefa, index) => {
    let li = document.createElement("li");

    let check = document.createElement("input");
    check.type = "checkbox";
    check.classList.add("checkbox");
    check.checked = tarefa.feito;
    check.onchange = () => {
      Tarefas[index].feito = check.checked;
      salvarTarefas();
      renderizarTarefas();
    };

    let span = document.createElement("span");
    span.textContent = tarefa.texto;
    if (tarefa.feito) span.style.textDecoration = "line-through";

    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "X";
    btnExcluir.style.marginLeft = "20px";
    btnExcluir.classList.add("removerTarefa");
    btnExcluir.onclick = () => {
      // Mover para lixeira
      Lixeira.push(Tarefas[index]);
      Tarefas.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
      renderizarLixeira();
    };

    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(btnExcluir);
    listaTarefas.appendChild(li);
  });
}

function renderizarLixeira() {
  listaLixeira.innerHTML = "";

  Lixeira.forEach((tarefa, index) => {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = tarefa.texto;
    if (tarefa.feito) span.style.textDecoration = "line-through";

    // Restaurar
    let btnRestaurar = document.createElement("button");
    btnRestaurar.textContent = "♻️ Restaurar";
    btnRestaurar.classList.add("btn-lixeira", "btn-restaurar");
    btnRestaurar.onclick = () => {
      Tarefas.push(Lixeira[index]);
      Lixeira.splice(index, 1);
      salvarTarefas();
      renderizarTarefas();
      renderizarLixeira();
    };

    // Excluir permanentemente
    let btnExcluir = document.createElement("button");
    btnExcluir.textContent = "🗑️ Excluir";
    btnExcluir.classList.add("btn-lixeira");
    btnExcluir.onclick = () => {
      Lixeira.splice(index, 1);
      salvarTarefas();
      renderizarLixeira();
    };

    li.appendChild(span);
    li.appendChild(btnRestaurar);
    li.appendChild(btnExcluir);
    listaLixeira.appendChild(li);
  });
}

// ========================
// Adicionar tarefa
// ========================
function adicionarTarefa() {
  let inputTarefa = document.getElementById("inputTarefa");
  let tarefa = inputTarefa.value.trim();

  if (tarefa === "") {
    msg.textContent = "Insira algo!";
    msg.style.color = "oklch(82.8% 0.189 84.429)";
    return;
  }

  Tarefas.push({ texto: tarefa, feito: false });
  salvarTarefas();
  renderizarTarefas();

  msg.textContent = "Tarefa adicionada com sucesso!";
  msg.style.color = "oklch(79.2% 0.209 151.711)";
  inputTarefa.value = "";
}

// Enter também adiciona
document.getElementById("inputTarefa").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

// ========================
// Abrir/fechar lixeira
// ========================
function abrirLixeira(event) {
  event.preventDefault();
  let lixeiraBox = document.getElementById("lixeiraAparece");
  lixeiraBox.style.display =
    lixeiraBox.style.display === "none" ? "block" : "none";
}

// ========================
// Carregar listas ao abrir a página
// ========================
renderizarTarefas();
renderizarLixeira();
