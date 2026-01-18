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

const contactModal = document.getElementById("contactModal");
const openContactModal = document.getElementById("openContactModal");
const closeContactModal = document.getElementById("closeContactModal");
const contactForm = document.getElementById("contactForm");

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

// contact
openContactModal.onclick = () => (contactModal.style.display = "flex");
closeContactModal.onclick = () => (contactModal.style.display = "none");

// Click outside the modal box to close it
window.onclick = (event) => {
  if (event.target == contactModal) contactModal.style.display = "none";
};

// funcoes
// 2. Envio do Formulário (Integração com e-mail)
contactForm.onsubmit = async (e) => {
  e.preventDefault();

  // alterando nome no butao de send para sending...
  const btnSubmit = contactForm.querySelector(".btn-send");
  btnSubmit.innerText = "Sending...";
  btnSubmit.disabled = true;

  // recebendo dados do formulario
  const formData = new FormData();
  formData.append(
    "name",
    contactForm.querySelector('input[type="text"]').value
  );
  formData.append(
    "email",
    contactForm.querySelector('input[type="email"]').value
  );
  formData.append("message", contactForm.querySelector("textarea").value);

  // eu usei o https://formsubmit.co/
  try {
    const response = await fetch("https://formsubmit.co/ajax/your-email", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("Message sent successfully!");
      contactForm.reset();
      contactModal.style.display = "none";
    } else {
      alert("Oops! There was a problem.");
    }
  } catch (error) {
    alert("Error connecting to the server.");
  } finally {
    btnSubmit.innerText = "Send Message";
    btnSubmit.disabled = false;
  }
};
