async function loadDefaultMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const mealResults = document.getElementById('meal-results');
    mealResults.innerHTML = '';

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                  <h3>${meal.strMeal}</h3>
                                  <button onclick="showMealDetails('${meal.idMeal}')" class="btn btn-secondary mt-2">View Details</button>`;
            mealResults.appendChild(mealCard);
        });
    } else {
        mealResults.innerHTML = '<p>No meals available.</p>';
    }
}

async function searchMeals() {
    const searchInput = document.getElementById('search-input').value;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();
    const mealResults = document.getElementById('meal-results');
    mealResults.innerHTML = '';

    if (data.meals) {
        data.meals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                  <h3>${meal.strMeal}</h3>
                                  <button onclick="showMealDetails('${meal.idMeal}')" class="btn btn-secondary mt-2">View Details</button>`;
            mealResults.appendChild(mealCard);
        });
    } else {
        mealResults.innerHTML = '<p>No meals found.</p>';
    }
}

async function showMealDetails(mealId) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    const meal = data.meals[0];
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = `<h2>${meal.strMeal}</h2>
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                            <p><strong>Category:</strong> ${meal.strCategory}</p>
                            <p><strong>Instructions:</strong> ${meal.strInstructions}</p>`;
    mealDetails.style.display = 'block';
}
