document.addEventListener("DOMContentLoaded", () => {
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");
  const greetingEl = document.getElementById("greeting-message");
  const quickLinksListEl = document.getElementById("quick-links-list");
  const eventListEl = document.getElementById("event-list");
  const appsGridEl = document.getElementById("apps-grid");
  const hiresGridEl = document.getElementById("hires-grid");

  const quickLinks = [
    { icon: "fa-bullhorn", text: "Announcements" },
    { icon: "fa-users", text: "People Directory" },
    { icon: "fa-book", text: "Employee Handbook" },
    { icon: "fa-headset", text: "IT Support" },
  ];

  const events = [
    { day: "06", month: "Aug", title: "Payroll Payout", location: "Online" },
    {
      day: "09",
      month: "Aug",
      title: "Company Standup",
      location: "Front Lobby, Building A",
    },
    { day: "10", month: "Aug", title: "Team Meeting", location: "Zoom Call" },
    {
      day: "12",
      month: "Aug",
      title: "UI/UX Design Workshop",
      location: "Creative Room 3",
    },
  ];

  const apps = [
    { icon: "fa-slack", brand: true, text: "Slack" },
    { icon: "fa-figma", brand: true, text: "Figma" },
    { icon: "fa-google-drive", brand: true, text: "Drive" },
    {
      icon: "fa-trello",
      brand: true,
      text: "Trello",
    },
    {
      icon: "fa-github",
      brand: true,
      text: "GitHub",
    },
    {
      icon: "fa-video",
      brand: false,
      text: "Zoom",
    },
    {
      icon: "fa-dropbox",
      brand: true,
      text: "Dropbox",
    },
    {
      icon: "fa-sketch",
      brand: true,
      text: "Sketch",
    },
    {
      icon: "fa-invision",
      brand: true,
      text: "Invision",
    },
    {
      icon: "fa-intercom",
      brand: true,
      text: "Intercom",
    },
    {
      icon: "fa-salesforce",
      brand: true,
      text: "Salesforce",
    },
    {
      icon: "fa-microsoft",
      brand: true,
      text: "Teams",
    },
  ];

  const hires = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  function updateClock() {
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    dateEl.textContent = now.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const hour = now.getHours();
    let greeting = "Good Evening";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    greetingEl.textContent = `${greeting}, User!`;
  }

  function populateWidgets() {
    // Quick Links
    quickLinksListEl.innerHTML = quickLinks
      .map(
        (link) => `
            <li><a href="#"><i class="fas ${link.icon}"></i><span>${link.text}</span></a></li>
        `
      )
      .join("");

    // Events
    eventListEl.innerHTML = events
      .map(
        (event) => `
            <div class="event-item">
                <div class="event-date"><span>${event.day}</span>${event.month}</div>
                <div class="event-details">
                    <h4>${event.title}</h4>
                    <p>${event.location}</p>
                </div>
            </div>
        `
      )
      .join("");

    // Launch Pad Apps
    appsGridEl.innerHTML = apps
      .map(
        (app) => `
             <div class="app-item">
                <i class="${app.brand ? "fab" : "fas"} ${app.icon}"></i>
                <span>${app.text}</span>
            </div>
        `
      )
      .join("");

    // New Hires
    hiresGridEl.innerHTML = hires
      .map(
        (imgNum) => `
            <img src="https://i.pravatar.cc/100?img=${imgNum}" alt="New Hire" />
        `
      )
      .join("");
  }

  const hamburger = document.getElementById("hamburger");
  const navigationMenus = document.getElementById("navigation-menus");

  hamburger.addEventListener("click", function () {
    navigationMenus.classList.toggle("show");
  });

  document.addEventListener("click", function (event) {
    const isClickInsideMenu = navigationMenus.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnHamburger &&
      navigationMenus.classList.contains("show")
    ) {
      navigationMenus.classList.remove("show");
    }
  });

  updateClock();
  setInterval(updateClock, 1000);
  populateWidgets();
});
