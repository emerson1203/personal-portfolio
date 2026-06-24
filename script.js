/* 
  Emerson Barrett's Portfolio Scripts
  Includes: Theme Toggle, Fade-in Animations, and Smooth Scrolling
*/

function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }

    function renderLists(wordGroups) {
        const container = document.getElementById("game-container");
        container.innerHTML = "";

        const letters = shuffle("ABCDEFGHIJKLMNOPRSTW".split(""));

        wordGroups.forEach((group, index) => {
            const letter = letters[index % letters.length];
            const card = document.createElement("div");
            card.className = "info-card";

            const title = document.createElement("h3");
            title.textContent = `Round ${index + 1} — ${letter}`;
            card.appendChild(title);

            const ul = document.createElement("ul");
            group.forEach(word => {
                const li = document.createElement("li");
                li.textContent = word;
                ul.appendChild(li);
            });

            card.appendChild(ul);
            container.appendChild(card);
        });
    }

document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if user has a preference saved in local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀ Light Mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.textContent = '☀ Light Mode';
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
            }
            
            localStorage.setItem('theme', theme);
        });
    }

    // --- FADE-IN ANIMATION LOGIC ---
    // Uses Intersection Observer for clean scrolling animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
    fadeElements.forEach(el => el.classList.add('visible'));
    
    // --- SMOOTH SCROLLING ---
    // Makes internal links feel more polished
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const words = [
        "boy's name", "girl's name", "U.S. cities", "things that are cold", "school supplies", "pro sports teams",
        "insets", "breakfast foods", "furniture", "TV shows", "things in the ocean", "presidents",
        "product names", "famous women", "medicine/drugs", "made of metal", "hobbies", "things you plug in",
        "animals", "languages", "junk food", "things that grow", "companies", "articles of clothing",
        "desserts", "car parts", "things on a map", "athletes", "4 letter words", "5 letter words", 
        "items in a fridge", "farm animals", "street names", "things at the beach", "colors", "tools", 
        "heros", "terms of endearment", "things that are black", "things that are blue", "things that are red", "things that are white",
        "vehicles", "tropical locations", "college majors", "dairy products", "souvenirs", "items in a purse",
        "world records", "sandwiches", "items in a catalog", "world leaders/politicians", "school subjects", "excuses for being late",
        "ice cream flavors", "things that jump/bounce", "television stars", "things in a park", "foreign cities", "stones/gems",
        "musical instruments", "nicknames", "things in the sky", "pizza toppings", "colleges/universities", "fish",
        "countries", "things with spots", "historical figures", "something you're afraid of", "terms of measurment", "things in this room",
        "book titles", "authors", "things that are green", "liquids", "words with 10+ letters", "songs", 
        "musical artists", "villains", "movies", "actors", "math terms", "weekend activites",
        "parts of the body", "something you keep hidden", "something you save up for", "apps", "websites", "items in a kitchen",
        "items in a bathroom", "items in a garage", "names used in songs", "words associated with money", "date activities", "things that are hot",
        "restaurants", "stores", "things that can kill you", "things for kids", "fruits", "vegetables",
        "carbs", "items in a closet", "cosmetics/toiletries", "spices/herbs", "notorious people", "reptiles/amphibians",
        "mammals", "bad habits", "every day activities", "new years resolutions", "things that are orange", "things that are yellow",
        "things that are purple", "things that are pink", "things that are grey", "things that are soft", "things that are sharp", "things that are clear",
        "lies", "things that you shout", "costumes", "personality traits", "birds", "flowers",
        "things you replace", "things that are sticky", "fictional characters", "menu items", "capitals", "things with tails",
        "sports equipment", "crimes", "toys", "chores", "job titles", "bodies of water",
        "weapons", "things that are round", "famous duos and trios", "items in a desk", "diseases", "games",
        "nicknames", "internet personalities", "heroes"
    ];

    const shuffled = shuffle([...words]); // copy + shuffle
    const groups = chunkArray(shuffled, 12);
    renderLists(groups);

});
