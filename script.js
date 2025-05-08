const input = document.getElementById("input-task"); // Champ de saisie
const button = document.querySelector(".button"); // Bouton "Clique Moi dessus !"
const taskList = document.getElementById("taskList"); // Liste UL
const filter = document.getElementById("filter"); // Menu déroulant pour filtrer

// je récupère les tâches depuis le localStorage, ou un tableau vide si rien n'est stocké
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Par défaut, j'affiche toutes les tâches
let currentFilter = "all";

// Fonction pour afficher les tâches en fonction du filtre
function displayTasks() {
  // je vide d'abord l'affichage actuel
  taskList.innerHTML = "";

  // je filtre les tâches selon le filtre sélectionné
  let filteredTasks = tasks.filter((task) => {
    if (currentFilter === "done") return task.done;
    if (currentFilter === "active") return !task.done;
    return true; // si filtre = "all"
  });

  // Pour chaque tâche filtrée :
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Case à cocher
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      updateTasks();
    });

    // Texte de la tâche
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.done) span.style.textDecoration = "line-through";

    // Bouton modifier
    const editBtn = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.src = "./modif.svg";
    editIcon.alt = "Modifier";
    editIcon.style.width = "20px";
    editIcon.style.height = "20px";
    editBtn.appendChild(editIcon);
    editBtn.addEventListener("click", () => {
      const newText = prompt("Modifier la tâche :", task.text);
      if (newText) {
        task.text = newText;
        updateTasks();
      }
    });

    // Bouton supprimer
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./trash.svg";
    deleteIcon.alt = "Supprimer";
    deleteIcon.style.width = "20px";
    editIcon.style.height = "20px";
    deleteBtn.appendChild(deleteIcon);
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1); // supprime 1 élément à la position index
      updateTasks();
    });

    // j'ajoute tous les éléments à la ligne
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Fonction pour enregistrer les tâches et actualiser l'affichage
function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

// Quand je clique sur le bouton : j'ajoute une tâche
button.addEventListener("click", () => {
  const text = input.value.trim(); // on enlève les espaces inutiles
  if (text !== "") {
    tasks.push({ text, done: false });
    input.value = "";
    updateTasks();
  }
});

// Quand je change de filtre, j'actualise la vue
filter.addEventListener("change", () => {
  currentFilter = filter.value;
  displayTasks();
});

// Affichage initial au chargement de la page
displayTasks();
