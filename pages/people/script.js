document.addEventListener("DOMContentLoaded", () => {
  const people = [
    {
      id: 1,
      name: "Oliver Smith",
      title: "Lead UX Designer",
      department: "Design",
      location: "London",
      email: "oliver.s@axero.com",
      avatar: "https://i.pravatar.cc/150?img=1",
      banner: "https://images.unsplash.com/photo-1522071820081-009f0129c7da",
      about:
        "Passionate about creating human-centered designs that are both beautiful and functional.",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    },
    {
      id: 2,
      name: "Amélie Dubois",
      title: "Sr. Frontend Developer",
      department: "Engineering",
      location: "Paris",
      email: "amelie.d@axero.com",
      avatar: "https://i.pravatar.cc/150?img=2",
      banner: "https://images.unsplash.com/photo-1550439062-609e1531270e",
      about:
        "Building performant web applications with modern JavaScript frameworks.",
      skills: ["React", "TypeScript", "Next.js", "CSS Grid"],
    },
    {
      id: 3,
      name: "Klaus Müller",
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Berlin",
      email: "klaus.m@axero.com",
      avatar: "https://i.pravatar.cc/150?img=3",
      banner: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      about:
        "Driving growth through data-driven marketing strategies and creative campaigns.",
      skills: ["SEO", "Content Marketing", "Google Analytics"],
    },
    {
      id: 4,
      name: "Sofia García",
      title: "HR Business Partner",
      department: "HR",
      location: "Madrid",
      email: "sofia.g@axero.com",
      avatar: "https://i.pravatar.cc/150?img=4",
      banner: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      about:
        "Dedicated to fostering a positive and productive workplace culture.",
      skills: ["Recruitment", "Employee Relations", "HR Policies"],
    },
    {
      id: 5,
      name: "Giulia Rossi",
      title: "Backend Developer",
      department: "Engineering",
      location: "Rome",
      email: "giulia.r@axero.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      banner: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe",
      about: "Architecting scalable and reliable server-side solutions.",
      skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      id: 6,
      name: "Lars Andersson",
      title: "Product Manager",
      department: "Design",
      location: "Stockholm",
      email: "lars.a@axero.com",
      avatar: "https://i.pravatar.cc/150?img=6",
      banner: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      about: "Translating user needs into product features that deliver value.",
      skills: ["Agile", "Roadmapping", "User Stories"],
    },
    {
      id: 7,
      name: "Anja Schmidt",
      title: "Data Scientist",
      department: "Engineering",
      location: "Munich",
      email: "anja.s@axero.com",
      avatar: "https://i.pravatar.cc/150?img=7",
      banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      about: "Finding insights and telling stories with data.",
      skills: ["Python", "SQL", "Tableau", "Machine Learning"],
    },
    {
      id: 8,
      name: "Javier Moreno",
      title: "Social Media Specialist",
      department: "Marketing",
      location: "Barcelona",
      email: "javier.m@axero.com",
      avatar: "https://i.pravatar.cc/150?img=8",
      banner: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
      about: "Managing our social presence and engaging with our community.",
      skills: ["Content Creation", "Hootsuite", "Community Management"],
    },
    {
      id: 9,
      name: "Daan Jansen",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Amsterdam",
      email: "daan.j@axero.com",
      avatar: "https://i.pravatar.cc/150?img=9",
      banner: "https://images.unsplash.com/photo-1607798748738-b15c40d33d57",
      about: "Focusing on CI/CD pipelines and infrastructure automation.",
      skills: ["Jenkins", "Kubernetes", "Terraform", "CI/CD"],
    },
    {
      id: 10,
      name: "Emily Jones",
      title: "Junior UI Designer",
      department: "Design",
      location: "Manchester",
      email: "emily.j@axero.com",
      avatar: "https://i.pravatar.cc/150?img=10",
      banner: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f",
      about:
        "Assisting the design team with creating intuitive user interfaces.",
      skills: ["Adobe XD", "Wireframing", "UI Kits"],
    },
  ];

  const container = document.getElementById("people-container");
  const searchInput = document.getElementById("search-input");
  const deptFilter = document.getElementById("department-filter");
  const gridViewBtn = document.getElementById("grid-view-btn");
  const listViewBtn = document.getElementById("list-view-btn");
  const modalContainer = document.getElementById("profile-modal-container");
  const modalContent = document.getElementById("profile-modal-content");

  function renderPeople(peopleArray) {
    container.innerHTML = "";
    peopleArray.forEach((person, index) => {
      const personWrapper = document.createElement("div");
      personWrapper.className = "person-wrapper";
      personWrapper.style.animationDelay = `${index * 50}ms`;
      personWrapper.dataset.personId = person.id;

      personWrapper.innerHTML = `
                <div class="person-card glass-card">
                    <img src="${person.avatar}" alt="${person.name}">
                    <h3>${person.name}</h3>
                    <p>${person.title}</p>
                </div>
                <div class="person-list-item glass-card">
                    <img src="${person.avatar}" alt="${person.name}">
                    <div class="list-info">
                        <h3>${person.name}</h3>
                        <p>${person.title}</p>
                    </div>
                    <div class="list-contact">
                        <a href="mailto:${person.email}"><i class="fas fa-envelope"></i> ${person.email}</a>
                    </div>
                </div>
            `;
      container.appendChild(personWrapper);
    });
  }

  function filterAndSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const department = deptFilter.value;

    let filteredPeople = people.filter((person) => {
      const matchesSearch =
        person.name.toLowerCase().includes(searchTerm) ||
        person.title.toLowerCase().includes(searchTerm);
      const matchesDept =
        department === "all" || person.department === department;
      return matchesSearch && matchesDept;
    });
    renderPeople(filteredPeople);
  }

  function openProfileModal(person) {
    modalContent.innerHTML = `
            <div class="close-btn-wrapper">
                <button class="close-btn" id="close-modal-btn"><i class="fas fa-times"></i></button>
            </div>
            <div class="profile-header">
                <div class="profile-banner" style="background-image: url('${
                  person.banner
                }')"></div>
                <img src="${person.avatar}" alt="${
      person.name
    }" class="profile-avatar">
                <h2>${person.name}</h2>
                <p>${person.title}</p>
            </div>
            <div class="profile-body">
                <div class="profile-section">
                    <h4>About</h4>
                    <p>${person.about}</p>
                </div>
                <div class="profile-section">
                    <h4>Details</h4>
                    <div class="profile-info-grid">
                        <div class="info-item"><span>Department</span><span>${
                          person.department
                        }</span></div>
                        <div class="info-item"><span>Location</span><span>${
                          person.location
                        }</span></div>
                        <div class="info-item"><span>Email</span><span><a href="mailto:${
                          person.email
                        }">${person.email}</a></span></div>
                        <div class="info-item"><span>Manager</span><span>John Doe</span></div>
                    </div>
                </div>
                <div class="profile-section">
                    <h4>Skills</h4>
                    <div class="skills-list">
                        ${person.skills
                          .map(
                            (skill) => `<span class="skill-tag">${skill}</span>`
                          )
                          .join("")}
                    </div>
                </div>
            </div>
        `;
    modalContainer.classList.add("show");
    document
      .getElementById("close-modal-btn")
      .addEventListener("click", () => modalContainer.classList.remove("show"));
  }

  searchInput.addEventListener("input", filterAndSearch);
  deptFilter.addEventListener("change", filterAndSearch);

  gridViewBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  });

  listViewBtn.addEventListener("click", () => {
    container.classList.remove("grid-view");
    container.classList.add("list-view");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  });

  container.addEventListener("click", (e) => {
    const wrapper = e.target.closest(".person-wrapper");
    if (wrapper) {
      const personId = parseInt(wrapper.dataset.personId);
      const personData = people.find((p) => p.id === personId);
      if (personData) openProfileModal(personData);
    }
  });

  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.classList.remove("show");
    }
  });

  renderPeople(people);
});
