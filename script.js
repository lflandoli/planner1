const API_URL = 'COLE_AQUI_SUA_URL_DO_APPS_SCRIPT';

async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  tasks.forEach(t => {
    const li = document.createElement('li');
    li.textContent = `[${t.projeto}] ${t.tarefa}`;
    li.draggable = true;

    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData("text/plain", li.outerHTML);
      li.remove();
    });

    const list = document.querySelector(`#${t.status.toLowerCase()} ul`);
    if(list) list.appendChild(li);
  });
}

// Drag & drop entre colunas
document.querySelectorAll(".column ul").forEach((ul) => {
  ul.addEventListener("dragover", e => e.preventDefault());
  ul.addEventListener("drop", e => {
    e.preventDefault();
    ul.insertAdjacentHTML("beforeend", e.dataTransfer.getData("text/plain"));
    ul.lastChild.draggable = true;
  });
});

window.onload = loadTasks;
