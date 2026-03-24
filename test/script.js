const plants = [
    {
        id: 1,
        name: "Monstera Deliciosa",
        scientific: "Monstera deliciosa",
        description: "Known for its iconic, large, fenestrated leaves that bring a lush, tropical vibe to any space.",
        image: "images/monstera_deliciosa_1774301825808.png",
        light: "Bright, indirect light. Avoid direct sun.",
        water: "Water when the top 2 inches of soil are dry.",
        difficulty: "Beginner Friendly",
        category: "Statement"
    },
    {
        id: 2,
        name: "Fiddle Leaf Fig",
        scientific: "Ficus lyrata",
        description: "A gorgeous statement plant requiring some patience but rewarding you with huge, violin-shaped, vibrant green foliage.",
        image: "images/fiddle_leaf_fig_1774301841284.png",
        light: "Bright, indirect sunlight.",
        water: "Water thoroughly when top 2-3 inches are dry.",
        difficulty: "Moderate",
        category: "Statement"
    },
    {
        id: 3,
        name: "Snake Plant",
        scientific: "Sansevieria trifasciata",
        description: "The ultimate beginner plant! Sleek, modern, and nearly indestructible. Purifies indoor air efficiently.",
        image: "images/snake_plant_1774301855211.png",
        light: "Tolerates low light but thrives in bright light.",
        water: "Allow soil to dry completely between waterings.",
        difficulty: "Very Easy",
        category: "Low Light"
    },
    {
        id: 4,
        name: "Golden Pothos",
        scientific: "Epipremnum aureum",
        description: "A beautiful trailing plant that can be hung in baskets or allowed to climb. Fast-growing and low-maintenance.",
        image: "images/pothos_1774301868615.png",
        light: "Low to bright, indirect light.",
        water: "Water when soil is dry. Very forgiving.",
        difficulty: "Beginner Friendly",
        category: "Trailing"
    },
    {
        id: 5,
        name: "Spider Plant",
        scientific: "Chlorophytum comosum",
        description: "A classic hanging plant that produces long, arching leaves and small 'spiderettes' that dangle beautifully.",
        image: "images/spider_plant_1774302660862.png",
        light: "Bright, indirect light.",
        water: "Water when the top inch of soil is dry.",
        difficulty: "Beginner Friendly",
        category: "Pet Safe"
    },
    {
        id: 6,
        name: "ZZ Plant",
        scientific: "Zamioculcas zamiifolia",
        description: "Extremely hardy and drought-tolerant with glossy, oval-shaped leaves on graceful waxy stems.",
        image: "images/zz_plant_1774302673863.png",
        light: "Low to bright indirect light.",
        water: "Water only when the soil is completely dry.",
        difficulty: "Very Easy",
        category: "Low Light"
    },
    {
        id: 7,
        name: "Aloe Vera",
        scientific: "Aloe barbadensis miller",
        description: "A practical and beautiful succulent known for its fleshy, spike-edged leaves containing soothing gel.",
        image: "images/aloe_vera_1774302689006.png",
        light: "Bright, direct or indirect light.",
        water: "Water deeply but infrequently, allowing soil to dry completely.",
        difficulty: "Very Easy",
        category: "Succulent"
    },
    {
        id: 8,
        name: "Peace Lily",
        scientific: "Spathiphyllum",
        description: "An elegant plant with dark green leaves and pristine white spathes (flowers). Excellent at filtering indoor air.",
        image: "images/peace_lily_1774302706143.png",
        light: "Low to bright indirect light.",
        water: "Keep soil consistently moist but not soggy. Leaves will droop dramatically when thirsty.",
        difficulty: "Moderate",
        category: "Flowering"
    },
    {
        id: 9,
        name: "Rubber Plant",
        scientific: "Ficus elastica",
        description: "A bold, structural indoor tree featuring large, glossy, leathery leaves that bring a rich aesthetic.",
        image: "images/rubber_plant_1774302719695.png",
        light: "Bright, indirect light.",
        water: "Water when the top few inches of soil are dry.",
        difficulty: "Beginner Friendly",
        category: "Statement"
    }
];

const categories = ["All", "Statement", "Low Light", "Trailing", "Pet Safe", "Succulent", "Flowering"];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("plant-grid");
    const modal = document.getElementById("plant-modal");
    const closeBtn = document.querySelector(".close-btn");
    const filterContainer = document.getElementById("category-filters");

    // Modal elements
    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalScientific = document.getElementById("modal-scientific");
    const modalDesc = document.getElementById("modal-desc");
    const modalLight = document.getElementById("modal-light");
    const modalWater = document.getElementById("modal-water");
    const modalDifficulty = document.getElementById("modal-difficulty");

    let currentCategory = "All";

    function renderFilters() {
        filterContainer.innerHTML = "";
        categories.forEach(cat => {
            const btn = document.createElement("button");
            btn.className = `filter-btn ${cat === currentCategory ? 'active' : ''}`;
            btn.textContent = cat;
            btn.addEventListener("click", () => {
                currentCategory = cat;
                renderFilters();
                renderPlants();
            });
            filterContainer.appendChild(btn);
        });
    }

    function renderPlants() {
        grid.innerHTML = "";
        
        const filtered = currentCategory === "All" 
            ? plants 
            : plants.filter(p => p.category === currentCategory);

        filtered.forEach((plant, index) => {
            const card = document.createElement("div");
            card.className = "plant-card";
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${plant.image}" class="card-img" alt="${plant.name}">
                <div class="card-content">
                    <h3 class="card-title">${plant.name}</h3>
                    <p class="card-scientific">${plant.scientific}</p>
                </div>
            `;
            
            card.addEventListener("click", () => openModal(plant));
            grid.appendChild(card);
        });
    }

    function openModal(plant) {
        modalImg.src = plant.image;
        modalTitle.textContent = plant.name;
        modalScientific.textContent = plant.scientific;
        modalDesc.textContent = plant.description;
        modalLight.textContent = plant.light;
        modalWater.textContent = plant.water;
        modalDifficulty.textContent = plant.difficulty;
        
        modal.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.add("hidden");
        document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    // Initialize
    renderFilters();
    renderPlants();
});
