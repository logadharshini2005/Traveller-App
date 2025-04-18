const countryInput = document.getElementById('countryInput');
const searchButton = document.getElementById('searchButton');
const suggestionsContainer = document.getElementById('suggestions');
const destinationsContainer = document.getElementById('destinations-container');
const destinationsGrid = document.querySelector('#destinations-container .destinations-grid');
const countryNameDisplay = document.getElementById('country-name');
const backButton = document.getElementById('backButton');
const searchContainer = document.getElementById('search-container');

// Data for tourist spots by country
const touristSpots = {
    "France": ["Eiffel Tower", "Louvre Museum", "Palace of Versailles", "French Riviera", "Mont Saint-Michel"],
    "Japan": ["Mount Fuji", "Tokyo Skytree", "Kinkaku-ji (Golden Pavilion)", "Hiroshima Peace Memorial Park", "Fushimi Inari Shrine"],
    "India": ["Taj Mahal", "Kerala Backwaters", "Golden Temple", "Hawa Mahal", "Varanasi Ghats"],
    "USA": ["Grand Canyon", "Statue of Liberty", "Yellowstone National Park", "Golden Gate Bridge", "Walt Disney World"],
    "Italy": ["Colosseum", "Venice Canals", "Leaning Tower of Pisa", "Florence Duomo", "Pompeii"],
    "Australia": ["Sydney Opera House", "Great Barrier Reef", "Uluru (Ayers Rock)", "Melbourne Cricket Ground", "Great Ocean Road"],
    "Brazil": ["Rio de Janeiro Carnival", "Iguazu Falls", "Amazon Rainforest", "Christ the Redeemer", "Copacabana Beach"],
    "UK": ["British Museum", "Tower of London", "Stonehenge", "Edinburgh Castle", "Lake District"],
    "Spain": ["Sagrada Familia", "Park Güell", "Alhambra", "La Rambla", "Plaza Mayor"],
    "Germany": ["Brandenburg Gate", "Neuschwanstein Castle", "Cologne Cathedral", "Oktoberfest (Munich)", "Black Forest"]
};

// Event listener for input changes to suggest countries
if (countryInput && suggestionsContainer) {
    countryInput.addEventListener('input', () => {
        const input = countryInput.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'none';

        if (input.length >= 2) {
            const matchingCountries = Object.keys(touristSpots)
                .filter(country => country.toLowerCase().startsWith(input));

            if (matchingCountries.length > 0) {
                suggestionsContainer.style.display = 'block';
                matchingCountries.slice(0, 5).forEach(country => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = country;
                    suggestionItem.addEventListener('click', () => {
                        countryInput.value = country;
                        suggestionsContainer.style.display = 'none';
                    });
                    suggestionsContainer.appendChild(suggestionItem);
                });
            }
        }
    });

    // Hide suggestions on focus if there's text
    countryInput.addEventListener('focus', () => {
        if (countryInput.value.trim()) {
            countryInput.dispatchEvent(new Event('input'));
        }
    });

    // Hide suggestions on outside click
    document.addEventListener('click', (event) => {
        if (!countryInput.contains(event.target) && !suggestionsContainer.contains(event.target)) {
            suggestionsContainer.style.display = 'none';
        }
    });

    // Trigger search on Enter key press
    countryInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && searchButton) {
            searchButton.click();
        }
    });
}

// Event listener for the "Find Spots" button
if (searchButton && countryInput && destinationsContainer && searchContainer && countryNameDisplay && destinationsGrid) {
    searchButton.addEventListener('click', () => {
        const country = countryInput.value.trim();
        if (touristSpots.hasOwnProperty(country)) {
            displayDestinations(country, touristSpots[country]);
        } else {
            alert("Sorry, we don't have tourist spots for that country yet!");
        }
    });
} else {
    console.error("One or more of the search button or related elements not found.");
}

// Function to display the tourist spots
function displayDestinations(country, spots) {
    if (countryNameDisplay && destinationsGrid && searchContainer && destinationsContainer) {
        countryNameDisplay.textContent = country;
        destinationsGrid.innerHTML = '';
        spots.forEach(spot => {
            const card = document.createElement('div');
            card.classList.add('destination-card');
            const imageUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(spot)}`;
            card.innerHTML = `
                <img src="${imageUrl}" alt="${spot}">
                <h3>${spot}</h3>
                <p>Explore the beauty of ${spot}!</p>
            `;
            destinationsGrid.appendChild(card);
        });
        searchContainer.classList.add('hidden');
        destinationsContainer.classList.remove('hidden');
    } else {
        console.error("One or more elements for displaying destinations not found.");
    }
}

// Event listener for the "Back to Search" button
if (backButton && destinationsContainer && searchContainer) {
    backButton.addEventListener('click', () => {
        destinationsContainer.classList.add('hidden');
        searchContainer.classList.remove('hidden');
        if (countryInput) {
            countryInput.value = '';
        }
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    });
} else {
    console.error("Back button or related elements not found.");
}