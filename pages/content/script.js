document.addEventListener('DOMContentLoaded', () => {
    const contentItems = [
        { id: 1, title: 'Q3 Performance Review Highlights', type: 'Article', department: 'HR', author: 'Dewi Anggraini', avatar: 'https://i.pravatar.cc/150?img=4', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0', excerpt: 'A summary of our incredible achievements last quarter and a look ahead to Q4 goals.' },
        { id: 2, title: 'New Employee Onboarding Guide', type: 'Document', department: 'HR', author: 'Dewi Anggraini', avatar: 'https://i.pravatar.cc/150?img=4', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978', excerpt: 'The complete guide for all new hires, including company policies, benefits, and contacts.' },
        { id: 3, title: 'Frontend Frameworks in 2025', type: 'Article', department: 'Engineering', author: 'Amélie Dubois', avatar: 'https://i.pravatar.cc/150?img=2', image: 'https://images.unsplash.com/photo-1550439062-609e1531270e', excerpt: 'An in-depth analysis of the current state of frontend development and our new tech stack.' },
        { id: 4, title: 'Summer BBQ Announcement', type: 'Announcement', department: 'Marketing', author: 'Klaus Müller', avatar: 'https://i.pravatar.cc/150?img=3', image: 'https://images.unsplash.com/photo-1496449903678-68ddcb189a24', excerpt: 'Join us for our annual summer party! Good food, music, and great company await.' },
        { id: 5, title: 'How to Use the New CRM', type: 'Video', department: 'Salesforce', author: 'Lars Andersson', avatar: 'https://i.pravatar.cc/150?img=6', image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1', excerpt: 'A quick video tutorial on navigating the new features in our updated Salesforce CRM.' }
    ];

    const contentFeed = document.getElementById('content-feed');
    const featuredContent = document.getElementById('featured-content');
    const typeFilterContainer = document.getElementById('type-filter');
    const deptFilterContainer = document.getElementById('department-filter');
    const searchInput = document.getElementById('search-input');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const sidebar = document.getElementById('filter-sidebar');
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const closeFiltersBtn = document.getElementById('close-filters-btn');
    const scroller = document.getElementById('featured-content');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');

    const renderContentCards = (container, items) => {
        container.innerHTML = '';
        if (items.length === 0) {
            contentFeed.innerHTML = `<p class="empty-state">No content found matching your criteria.</p>`;
            return;
        }
        items.forEach((item, index) => {
            const card = document.createElement('article');
            card.className = 'content-card';
            card.style.animationDelay = `${index * 50}ms`;
            card.innerHTML = `
                <div class="card-image" style="background-image: url('${item.image}')"></div>
                <div class="card-body">
                    <span class="card-type">${item.type}</span>
                    <h4>${item.title}</h4>
                    <p>${item.excerpt}</p>
                    <div class="card-meta">
                        <img src="${item.avatar}" alt="${item.author}">
                        <span>By ${item.author} &middot; ${item.department}</span>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    };
    
    const populateFilters = () => {
        const types = [...new Set(contentItems.map(item => item.type))];
        const departments = [...new Set(contentItems.map(item => item.department))];

        typeFilterContainer.innerHTML += types.map(type => `
            <div class="filter-option">
                <input type="checkbox" id="type-${type}" name="type" value="${type}">
                <label for="type-${type}">${type}</label>
            </div>
        `).join('');

        deptFilterContainer.innerHTML += departments.map(dept => `
            <div class="filter-option">
                <input type="checkbox" id="dept-${dept}" name="department" value="${dept}">
                <label for="dept-${dept}">${dept}</label>
            </div>
        `).join('');
    };

    const applyFilters = () => {
        const searchTerm = searchInput.value.toLowerCase();
        
        const selectedTypes = [...document.querySelectorAll('#type-filter input:checked')].map(el => el.value);
        const selectedDepts = [...document.querySelectorAll('#department-filter input:checked')].map(el => el.value);

        let filteredItems = contentItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm) || item.excerpt.toLowerCase().includes(searchTerm);
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.type);
            const matchesDept = selectedDepts.length === 0 || selectedDepts.includes(item.department);
            return matchesSearch && matchesType && matchesDept;
        });
        
        renderContentCards(contentFeed, filteredItems);
    };

    searchInput.addEventListener('input', applyFilters);
    typeFilterContainer.addEventListener('change', applyFilters);
    deptFilterContainer.addEventListener('change', applyFilters);

    clearFiltersBtn.addEventListener('click', () => {
        document.querySelectorAll('.filter-option input').forEach(input => input.checked = false);
        searchInput.value = '';
        applyFilters();
    });
    
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 365; 

        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    mobileFilterBtn.addEventListener('click', () => sidebar.classList.add('show'));
    closeFiltersBtn.addEventListener('click', () => sidebar.classList.remove('show'));

    populateFilters();
    renderContentCards(featuredContent, contentItems.slice(0, 5));
    renderContentCards(contentFeed, contentItems);
});