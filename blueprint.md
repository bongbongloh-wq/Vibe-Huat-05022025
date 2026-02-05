# Vibe Huat - Auspicious Day Calculator

## Overview

A simple, modern, and visually appealing single-page web application that allows users to input their date and time of birth to receive an "auspicious level" rating. The app also displays the user's Chinese zodiac sign, element, and location.

## Design and Features

### Core Functionality
-   **Input:** Users can enter their date of birth in `DDMMYYYY` format and their birth time in `HHMM` (24-hour) format.
-   **Calculation:** A deterministic algorithm calculates an "auspicious level" from 1 to 5 based on the provided date and time.
-   **Output:** The result is displayed as a 1 to 5-star rating.
-   **Zodiac & Element:** The user's Chinese zodiac sign and element are determined from their birth year and displayed.
-   **Geolocation:** The user's location (city, country) is determined via their IP address and displayed.

### Visual Design
-   **Theme:** Modern, mystical. Implemented a day and night mode toggle. Default is dark theme, light mode can be activated via a toggle button.
-   **Color Palette:** A deep blue and black background with red and yellow accents for dark mode. Light mode uses a lighter palette with blues, greens, and grays.
-   **Layout:** A centered card-based UI that is clean, intuitive, and responsive.
-   **Typography:** System default fonts are used for a clean look.
-   **Iconography:** Star icons are used for the rating, and emojis are used for the theme toggle button.

### Technology
-   **Frontend:** HTML, CSS, Vanilla JavaScript
-   **Architecture:** The application is built around a central Web Component (`<auspicious-calculator>`) to encapsulate the logic and view, promoting modularity and reusability.
-   **Styling:** Modern CSS features like custom properties, flexbox, and a dark theme are used for styling and layout.
-   **APIs:** A free geolocation API is used to get the user's location.

## Current Task: Advanced Features

1.  **Zodiac Logic:** Implement the logic to calculate the Chinese zodiac sign and element from a birth year.
2.  **Compatibility Algorithm:** Create a new auspiciousness calculation based on zodiac and element compatibility.
3.  **UI Updates:** Modify the web component to display the zodiac sign, element, and location.
4.  **Geolocation:** Integrate a geolocation API to fetch and display the user's location.
5.  **Styling:** Update the CSS with a new cosmic background.
