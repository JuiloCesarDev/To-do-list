const titulo = document.getElementById("titulo");
const texto = "📋 Lista de Tarefas";
let i = 0;

function digitar() {
  if (i < texto.length) {
    titulo.textContent += texto.charAt(i);
    i++;
    setTimeout(digitar, 100); // velocidade da digitação
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

function adicionarTarefa() {
  let inputTarefa = document.getElementById("inputTarefa");
  let tarefa = inputTarefa.value.trim();
  let msg = document.getElementById("mensagem");
  let listaTarefas = document.getElementById("listaTarefas");

  if (tarefa === "") {
    msg.textContent = "Insira algo!";
    msg.style.color = "oklch(39.6% 0.141 25.723)";
    return;
  }

  let novaTarefa = document.createElement("li");

  let check = document.createElement("input");
  check.type = "checkbox";
  check.onchange = () => {
    if (check.checked) {
      novaTarefa.style.textDecoration = "line-through";
    } else {
      novaTarefa.style.textDecoration = "none";
    }
  };

  let span = document.createElement("span");
  span.textContent = tarefa;

  let btnExcluir = document.createElement("button");
  btnExcluir.textContent = "❌";
  btnExcluir.style.marginLeft = "20px";
  btnExcluir.onclick = () => {
    listaTarefas.removeChild(novaTarefa);
  };

  novaTarefa.appendChild(check);
  novaTarefa.appendChild(span);
  novaTarefa.appendChild(btnExcluir);

  listaTarefas.appendChild(novaTarefa);

  msg.textContent = "Tarefa adicionada com sucesso!";
  msg.style.color = "oklch(87.1% 0.15 154.449)";
  inputTarefa.value = "";
}

document
  .getElementById("inputTarefa")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      adicionarTarefa();
    }
  });

function abrirLogin(event) {
  event.preventDefault();
  let loginBox = document.getElementById("loginAparece");
  if (loginBox.style.display === "none") {
    loginBox.style.display = "block";
  } else {
    loginBox.style.display = "none";
  }
}

function fazerLogin() {
  let usuario = document.getElementById("usuario").value;
  let senha = document.getElementById("senha").value;
  let msg = document.getElementById("mensagem");

  if (usuario === "admin" && senha === "123") {
    msg.textContent = "Login realizado com sucesso!";
    msg.style.color = "green";
    document.getElementById("loginAparece").style.display = "none";
  } else {
    msg.textContent = "Usuário ou senha inválidos!";
    msg.style.color = "red";
  }
}
