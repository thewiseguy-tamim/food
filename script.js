const apiBase = "https://www.themealdb.com/api/json/v1/1";

function searchMeals() {
    const query = document.getElementById('search-input').value;
    if (query) {
        fetch(`${apiBase}/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => {
                const mealResults = document.getElementById('meal-results');
                mealResults.innerHTML = '';
                if (data.meals) {
                    data.meals.forEach(meal => {
                        mealResults.innerHTML += `
                            <div class="meal-card" style="cursor: pointer;" onclick="showMealDetails(${meal.idMeal})">
                                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                <div>
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    mealResults.innerHTML = '<p>No meals found.</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }
}


function showMealDetails(mealId) {
    fetch(`${apiBase}/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealDetails = document.getElementById('meal-details');
            mealDetails.style.display = 'block';
            mealDetails.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="mb-3">
                <h3>${meal.strMeal}</h3>
                <p><strong>Ingredients:</strong> ${getIngredients(meal)}</p>
            `;
        });
}


function getIngredients(meal) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== '') {
            ingredients.push(`${meal[`strIngredient${i}`]} (${meal[`strMeasure${i}`]})`);
        }
    }
    return ingredients.join(', ');
}
