class AuspiciousCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .calculator {
                    background-color: var(--card-color);
                    padding: 2rem;
                    border-radius: 1rem;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    width: 400px; /* Adjusted width for single column layout */
                }
                h1 {
                    color: var(--secondary-color);
                    margin-bottom: 1.5rem;
                }
                .input-group {
                    margin-bottom: 1rem;
                    text-align: left;
                }
                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }
                input, select {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid var(--primary-color);
                    background-color: var(--background-color);
                    color: var(--font-color);
                    border-radius: 0.5rem;
                    box-sizing: border-box;
                }
                button {
                    width: 100%;
                    padding: 0.75rem;
                    border: none;
                    background-color: var(--secondary-color);
                    color: var(--font-color);
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-size: 1rem;
                    font-weight: bold;
                    transition: background-color 0.3s;
                }
                button:hover {
                    background-color: #ff6384;
                }
                .stars {
                    margin-top: 1.5rem;
                    font-size: 2rem;
                }
                .star {
                    color: var(--star-empty-color);
                    cursor: default;
                }
                .star.full {
                    color: var(--star-full-color);
                }
                /* Removed .results-container flex styling */
                .results {
                    width: 100%; /* Full width */
                    opacity: 0;
                    transition: opacity 0.5s;
                }
                .recommendations {
                    width: 100%; /* Full width */
                    margin-top: 1.5rem; /* Space between results and recommendations */
                    opacity: 0;
                    transition: opacity 0.5s;
                }
                .results.visible, .recommendations.visible {
                    opacity: 1;
                }
                .results p, .recommendations p {
                    margin: 0.5rem 0;
                }
                .recommendations h3 {
                    color: var(--secondary-color);
                    margin-bottom: 1rem;
                }
                .recommendation-item {
                    margin-bottom: 1rem;
                }
                .recommendation-item img {
                    max-width: 100%;
                    height: auto;
                    min-height: 150px; /* Explicit placeholder height */
                    min-width: 150px; /* Explicit placeholder width */
                    border-radius: 0.5rem;
                    margin-bottom: 0.5rem;
                    background-color: var(--primary-color); /* Placeholder background */
                    display: block; /* Ensures min-width/height apply correctly */
                    margin-left: auto;
                    margin-right: auto;
                }
                .recommendation-item a {
                    color: var(--secondary-color);
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
            <div class="calculator">
                <h1>Huat Your Day Through</h1>
                <p>This is your auspicious level for TODAY</p>
                <div class="input-group">
                    <label for="dob">Date of Birth (DDMMYYYY)</label>
                    <input type="text" id="dob" placeholder="DDMMYYYY">
                </div>
                <div class="input-group">
                    <label for="gender">Gender</label>
                    <select id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button id="calculate">Calculate</button>
                <div class="stars" id="stars">
                    <span class="star">☆</span>
                    <span class="star">☆</span>
                    <span class="star">☆</span>
                    <span class="star">☆</span>
                    <span class="star">☆</span>
                </div>
                <div class="results" id="results">
                    <p><strong>Zodiac:</strong> <span id="zodiac"></span></p>
                    <p><strong>Element:</strong> <span id="element"></span></p>
                </div>
                <div class="recommendations" id="recommendations">
                    <h3>Dressing Style Recommendations</h3>
                    <!-- Recommendations will be populated here -->
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const calculateBtn = this.shadowRoot.getElementById('calculate');
        calculateBtn.addEventListener('click', () => this.calculateAuspiciousness());
    }

    async calculateAuspiciousness() {
        const dobInput = this.shadowRoot.getElementById('dob').value;
        const gender = this.shadowRoot.getElementById('gender').value;

        if (!/^\d{8}$/.test(dobInput)) {
            alert("Please enter a valid DDMMYYYY value.");
            return;
        }

        const year = parseInt(dobInput.substring(4), 10);
        const { zodiac, element } = this.getZodiac(year);

        const currentYear = new Date().getFullYear();
        const { zodiac: currentZodiac } = this.getZodiac(currentYear);

        const compatibilityScore = this.getCompatibilityScore(zodiac, currentZodiac);

        const digits = dobInput.split('').map(Number);
        const sum = digits.reduce((a, b) => a + b, 0);
        const stars = ((sum + compatibilityScore) % 5) + 1;

        const recommendations = this.getRecommendations(stars, gender);

        this.displayResults(stars, zodiac, element, recommendations);
    }

    getRecommendations(stars, gender) {
        const recs = [];
        const baseQuery = "clothing style"; // Removed 'auspicious' as it's implied and may dilute image search
        const imageBaseUrl = "https://source.unsplash.com/random/150x150/?";

        // Helper to get random image URL with gender-specific and general fashion terms
        const getRandomImageUrl = (seed, gender) => {
            let genderTerm = "";
            if (gender === "male") genderTerm = "men's";
            else if (gender === "female") genderTerm = "women's";
            else genderTerm = "unisex"; // Fallback for 'other' or unspecified
            return `${imageBaseUrl}${encodeURIComponent(`${seed},${genderTerm},fashion,clothing,outfit`)}`;
        };

        // Recommendation 1: Based on Auspiciousness Level
        let auspiciousLevelText;
        let auspiciousImageSeed;
        if (stars >= 4) {
            auspiciousLevelText = "Very Auspicious! Go for bold and vibrant colors.";
            auspiciousImageSeed = "bold,vibrant,colorful";
        } else if (stars >= 2) {
            auspiciousLevelText = "Moderately Auspicious! Try smart casual with bright accents.";
            auspiciousImageSeed = "smart,casual,bright,elegant";
        } else {
            auspiciousLevelText = "Slightly Auspicious! Keep it simple and comfortable.";
            auspiciousImageSeed = "simple,comfortable,minimalist";
        }
        recs.push({
            description: auspiciousLevelText,
            image: getRandomImageUrl(auspiciousImageSeed, gender),
            link: `https://www.google.com/search?q=${encodeURIComponent(`${baseQuery} ${auspiciousImageSeed.replace(/,/g, ' ')} ${gender}`)}`
        });

        // Recommendation 2: Based on Element
        const elementClothing = {
            'Wood': { desc: "Embrace nature with earthy tones and organic fabrics.", seed: "earthy,organic,fabrics,nature" },
            'Fire': { desc: "Radiate energy with reds, oranges, and dynamic patterns.", seed: "red,orange,dynamic,patterns,energetic" },
            'Earth': { desc: "Find stability in browns, yellows, and structured pieces.", seed: "brown,yellow,structured,stable" },
            'Metal': { desc: "Exude sophistication with whites, grays, and sleek designs.", seed: "white,gray,sleek,sophisticated" },
            'Water': { desc: "Flow gracefully with blues, blacks, and fluid silhouettes.", seed: "blue,black,fluid,graceful" }
        };
        const selectedElement = this.getZodiac(new Date().getFullYear()).element;
        recs.push({
            description: elementClothing[selectedElement].desc,
            image: getRandomImageUrl(elementClothing[selectedElement].seed, gender),
            link: `https://www.google.com/search?q=${encodeURIComponent(`${baseQuery} ${elementClothing[selectedElement].seed.replace(/,/g, ' ')} ${gender}`)}`
        });

        // Recommendation 3: General Good Luck (Placeholder for more complex logic)
        let luckyStyleText;
        let luckyImageSeed;
        if (gender === 'female') {
            luckyStyleText = "A touch of elegant jewelry always brings good fortune.";
            luckyImageSeed = "elegant,jewelry,accessories,lucky";
        } else if (gender === 'male') {
            luckyStyleText = "A crisp, well-fitted watch signifies prosperity.";
            luckyImageSeed = "watch,mens,accessories,prosperity";
        } else {
            luckyStyleText = "Harmonious accessories can uplift your day.";
            luckyImageSeed = "harmonious,accessories,uplifting";
        }
        recs.push({
            description: luckyStyleText,
            image: getRandomImageUrl(luckyImageSeed, gender),
            link: `https://www.google.com/search?q=${encodeURIComponent(`${baseQuery} ${luckyImageSeed.replace(/,/g, ' ')} ${gender}`)}`
        });

        return recs;
    }

    getCompatibilityScore(zodiac1, zodiac2) {
        const compatibility = {
            'Rat': { 'Ox': 3, 'Dragon': 3, 'Monkey': 3, 'Rooster': 2, 'Horse': 1, 'Goat': 1 },
            'Ox': { 'Rat': 3, 'Snake': 3, 'Rooster': 3, 'Monkey': 2, 'Goat': 1, 'Horse': 1 },
            'Tiger': { 'Horse': 3, 'Dog': 3, 'Pig': 2, 'Monkey': 1, 'Snake': 1 },
            'Rabbit': { 'Goat': 3, 'Pig': 3, 'Dog': 3, 'Rooster': 1, 'Rat': 1, 'Dragon': 1 },
            'Dragon': { 'Rat': 3, 'Monkey': 3, 'Rooster': 3, 'Dog': 1, 'Ox': 1, 'Goat': 1 },
            'Snake': { 'Ox': 3, 'Rooster': 3, 'Monkey': 2, 'Tiger': 1, 'Pig': 1 },
            'Horse': { 'Tiger': 3, 'Goat': 3, 'Dog': 3, 'Rat': 1, 'Ox': 1, 'Rooster': 1 },
            'Goat': { 'Rabbit': 3, 'Horse': 3, 'Pig': 3, 'Rat': 1, 'Ox': 1, 'Dog': 1 },
            'Monkey': { 'Rat': 3, 'Dragon': 3, 'Snake': 2, 'Tiger': 1, 'Pig': 1 },
            'Rooster': { 'Ox': 3, 'Dragon': 3, 'Snake': 3, 'Rabbit': 1, 'Dog': 1 },
            'Dog': { 'Tiger': 3, 'Horse': 3, 'Rabbit': 2, 'Dragon': 1, 'Goat': 1, 'Rooster': 1 },
            'Pig': { 'Goat': 3, 'Rabbit': 3, 'Tiger': 2, 'Snake': 1, 'Monkey': 1 }
        };
        return compatibility[zodiac1]?.[zodiac2] ?? 2;
    }


    getZodiac(year) {
        const zodiacs = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
        const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
        const zodiacIndex = (year - 4) % 12;
        const elementIndex = Math.floor(((year - 4) % 10) / 2);

        return {
            zodiac: zodiacs[zodiacIndex],
            element: elements[elementIndex],
        };
    }

    displayResults(starCount, zodiac, element, recommendations) { // Renamed from displayStars for clarity
        const starsContainer = this.shadowRoot.getElementById('stars');
        starsContainer.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.classList.add('star');
            if (i < starCount) {
                star.classList.add('full');
                star.textContent = '★';
            } else {
                star.textContent = '☆';
            }
            starsContainer.appendChild(star);
        }

        this.shadowRoot.getElementById('zodiac').textContent = zodiac;
        this.shadowRoot.getElementById('element').textContent = element;
        this.shadowRoot.getElementById('results').classList.add('visible');

        const recommendationsDiv = this.shadowRoot.getElementById('recommendations');
        recommendationsDiv.innerHTML = '<h3>Dressing Style Recommendations</h3>'; // Clear previous and add header
        recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.classList.add('recommendation-item');
            recItem.innerHTML = `
                <img src="${rec.image}" alt="${rec.description}" loading="lazy">
                <p>${rec.description}</p>
                <a href="${rec.link}" target="_blank">Shop Now</a>
            `;
            recommendationsDiv.appendChild(recItem);
        });
        recommendationsDiv.classList.add('visible');
    }
}

customElements.define('auspicious-calculator', AuspiciousCalculator);

// Theme Toggling Logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeToggleBtn.textContent = '☀️';
        } else {
            themeToggleBtn.textContent = '🌙';
        }
    } else {
        // Default to dark mode if no preference is set
        document.body.classList.add('dark-mode'); // Assuming 'dark-mode' class isn't explicitly needed if it's the default, but good for clarity.
        themeToggleBtn.textContent = '🌙';
    }


    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode'); // Explicitly add dark-mode for clarity
            localStorage.setItem('theme', 'dark-mode');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-mode'); // Remove dark-mode class
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            themeToggleBtn.textContent = '☀️';
        }
    });
});
