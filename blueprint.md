# Vibe Huat - Auspicious Day Calculator

## Overview

A simple, modern, and visually appealing single-page web application that allows users to input their date and time of birth to receive an "auspicious level" rating. The app also displays the user's Chinese zodiac sign, element, and dressing style recommendations.

## Design and Features

### Core Functionality
-   **Input:** Users can enter their date of birth in `DDMMYYYY` format.
-   **Gender Selection:** Users can select their gender (Male, Female, Other).
-   **Calculation:** A deterministic algorithm calculates an "auspicious level" from 1 to 5 based on the provided date and time.
-   **Output:** The result is displayed as a 1 to 5-star rating.
-   **Zodiac & Element:** The user's Chinese zodiac sign and element are determined from their birth year and displayed.
-   **Dressing Recommendations:** Based on the auspicious level and gender, the app provides 3 textual dressing style recommendations.
-   **Shopping Links:** Each recommendation includes a Google search link for users to find related products.

### Visual Design
-   **Theme:** Modern, mystical. Implemented a day and night mode toggle. Default is dark theme, light mode can be activated via a toggle button.
-   **Color Palette:** A deep blue and black background with red and yellow accents for dark mode. Light mode uses a lighter palette with blues, greens, and grays.
-   **Layout:** A centered card-based UI that is clean, intuitive, and responsive, with results and recommendations presented in a two-column layout.
-   **Typography:** System default fonts are used for a clean look.
-   **Iconography:** Star icons are used for the rating, and emojis are used for the theme toggle button.
-   **Dressing Style Recommendations:** Images are sourced dynamically from Unsplash (`source.unsplash.com`) based on text prompts to visually represent the dressing styles, simulating generative AI images.

### Technology
-   **Frontend:** HTML, CSS, Vanilla JavaScript
-   **Architecture:** The application is built around a central Web Component (`<auspicious-calculator>`) to encapsulate the logic and view, promoting modularity and reusability.
-   **Styling:** Modern CSS features like custom properties, flexbox, and a dark theme are used for styling and layout.

## Current Task: Advanced Features
-   **Gender Input:** Implemented a dropdown menu for gender selection (Male, Female, Other).
-   **Recommendation Logic:** Implemented a function to generate textual dressing recommendations and Google search links based on the auspicious level and gender.
-   **UI Updates:** Modified the web component to display the recommendations in a new column next to the results.
-   **Styling:** Styled the new UI elements to match the existing theme.

**Limitations:**
-   **No Real Product Integration:** The dressing style recommendations currently use generic Google search links. There is no integration with actual e-commerce platforms to provide real-time product availability or direct purchase links.
-   **Simulated Image Generation:** While images are dynamically fetched from Unsplash based on prompts, these are not truly "generative AI" images created on-the-fly by the application. They are existing photos matched by keywords.
