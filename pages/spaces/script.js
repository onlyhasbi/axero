document.addEventListener("DOMContentLoaded", () => {
  const spaces = [
    {
      title: "Human Resources Hub",
      description:
        "Your central place for all HR-related questions, documents, and announcements.",
      category: "department",
      members: 128,
      activity: "High",
      icon: "fa-users-gear",
      banner:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    },
    {
      title: "Project Phoenix Launch",
      description:
        "Collaboration space for the cross-functional team leading the Project Phoenix launch in Q4.",
      category: "project",
      members: 24,
      activity: "High",
      icon: "fa-rocket",
      banner:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070",
    },
    {
      title: "Company Book Club",
      description:
        'Join fellow book lovers to discuss our monthly pick. This month: "The Midnight Library".',
      category: "social",
      members: 42,
      activity: "Medium",
      icon: "fa-book-open",
      banner:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1887",
    },
    {
      title: "Marketing & Comms",
      description:
        "The official space for the Marketing team to coordinate campaigns and share assets.",
      category: "department",
      members: 35,
      activity: "High",
      icon: "fa-bullhorn",
      banner:
        "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070",
    },
    {
      title: "Tech Support & IT",
      description:
        "Have a tech issue? Find solutions, FAQs, and submit help desk tickets here.",
      category: "department",
      members: 95,
      activity: "Medium",
      icon: "fa-headset",
      banner:
        "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=2070",
    },
    {
      title: "Project Titan - Phase 2",
      description:
        "Planning and execution workspace for the next phase of our enterprise software overhaul.",
      category: "project",
      members: 18,
      activity: "Low",
      icon: "fa-sitemap",
      banner:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    },
  ];

  const grid = document.getElementById("space-grid");
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");

  function renderSpaces(spaceArray) {
    grid.innerHTML = "";

    if (spaceArray.length === 0) {
      grid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h2>No spaces found</h2>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
      return;
    }

    spaceArray.forEach((space) => {
      const card = document.createElement("div");
      card.className = "space-card";
      card.innerHTML = `
                <div class="card-banner" style="background-image: url('${space.banner}');"></div>
                <div class="card-content">
                    <div class="card-icon"><i class="fas ${space.icon}"></i></div>
                    <h3>${space.title}</h3>
                    <p>${space.description}</p>
                </div>
                <div class="card-footer">
                    <div class="card-meta">
                        <span><i class="fas fa-users"></i> ${space.members} Members</span>
                        <span><i class="fas fa-chart-line"></i> ${space.activity} Activity</span>
                    </div>
                    <button class="card-join-btn">Join</button>
                </div>
            `;
      grid.appendChild(card);
    });
  }

  function filterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = filterSelect.value;

    let filteredSpaces = spaces;

    if (searchTerm) {
      filteredSpaces = filteredSpaces.filter(
        (space) =>
          space.title.toLowerCase().includes(searchTerm) ||
          space.description.toLowerCase().includes(searchTerm)
      );
    }

    if (category !== "all") {
      filteredSpaces = filteredSpaces.filter(
        (space) => space.category === category
      );
    }

    renderSpaces(filteredSpaces);
  }

  searchInput.addEventListener("input", filterAndSearch);
  filterSelect.addEventListener("change", filterAndSearch);
  renderSpaces(spaces);
});

document.addEventListener("DOMContentLoaded", () => {
  const createSpaceBtn = document.querySelector(".create-btn");
  const modalContainer = document.getElementById("modal-container");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const createSpaceForm = document.getElementById("create-space-form");

  function openModal() {
    modalContainer.classList.add("show");
  }

  function closeModal() {
    modalContainer.classList.remove("show");
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const newSpace = {
      title: document.getElementById("space-name").value,
      description: document.getElementById("space-description").value,
      category: document.getElementById("space-category").value,
      icon: document.getElementById("space-icon").value,
      members: 1,
      activity: "New",
      banner:
        "https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=1887",
    };

    spaces.unshift(newSpace);
    filterAndSearch();
    createSpaceForm.reset();
    closeModal();
  }

  createSpaceBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });
  createSpaceForm.addEventListener("submit", handleFormSubmit);
});
