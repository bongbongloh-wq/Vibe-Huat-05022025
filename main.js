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
                    width: 300px;
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
                input {
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
                .results {
                    margin-top: 1.5rem;
                    opacity: 0;
                    transition: opacity 0.5s;
                }
                .results.visible {
                    opacity: 1;
                }
                .results p {
                    margin: 0.5rem 0;
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
                    <label for="tob">Time of Birth (HHMM)</label>
                    <input type="text" id="tob" placeholder="HHMM">
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
            </div>
        `;
    }

    addEventListeners() {
        const calculateBtn = this.shadowRoot.getElementById('calculate');
        calculateBtn.addEventListener('click', () => this.calculateAuspiciousness());
    }

    async calculateAuspiciousness() {
        const dobInput = this.shadowRoot.getElementById('dob').value;
        const tobInput = this.shadowRoot.getElementById('tob').value;

        if (!/^\d{8}$/.test(dobInput) || !/^\d{4}$/.test(tobInput)) {
            alert("Please enter valid DDMMYYYY and HHMM values.");
            return;
        }

        const year = parseInt(dobInput.substring(4), 10);
        const { zodiac, element } = this.getZodiac(year);

        const currentYear = new Date().getFullYear();
        const { zodiac: currentZodiac } = this.getZodiac(currentYear);

        const compatibilityScore = this.getCompatibilityScore(zodiac, currentZodiac);

        const digits = (dobInput + tobInput).split('').map(Number);
        const sum = digits.reduce((a, b) => a + b, 0);
        const stars = ((sum + compatibilityScore) % 5) + 1;

        this.displayStars(stars, zodiac, element);


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

    displayStars(starCount, zodiac, element) {
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

