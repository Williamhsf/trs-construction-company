// VARIABLES
const allProjects = [
  { img: "./images/img-01.jpg", title: "Luxury Apartment Complex" },
  { img: "./images/img-02.jpg", title: "Corporate Office Tower" },
  { img: "./images/img-03.jpg", title: "Industrial Facility" },
  { img: "./images/img-04.jpg", title: "Modern Hospital Center" },
  { img: "./images/img-05.jpg", title: "Urban Residential Park" },
  { img: "./images/img-06.png", title: "Shopping Mall Expansion" },
  { img: "./images/img-07.png", title: "Boutique Hotel Design" },
  { img: "./images/img-08.jpg", title: "Logistics Hub" },
  { img: "./images/img-09.jpg", title: "Sustainable Tech Park" },
];

const mainGrid = document.getElementById("mainProjectGrid");
const modalGrid = document.getElementById("modalProjectGrid");

const modalOverlay = document.getElementById("modalOverlay");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

// FUNCTIONS
function createProjectCard(project) {
  // card container
  const card = document.createElement("div");
  card.className = "project-card";

  // intern content
  card.innerHTML = `
  <img src="${project.img}" alt="${project.title}" /> 
  <span>${project.title}</span>
  `;

  return card;
}

// section featured projects
// mainGrid
allProjects.slice(0, 3).forEach((project) => {
  const card = createProjectCard(project);
  mainGrid.prepend(card);
});

// modalGrid
allProjects.forEach((project) => {
  const card = createProjectCard(project);
  modalGrid.appendChild(card);
});

// LISTENERS
// open
openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});
// close
closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close if you click on the bottom
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
