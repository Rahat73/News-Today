const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    displayCategory(data.data.news_category);
    //console.log(data.data.news_category);
}

const displayCategory = (categories) => {
    const categoryContainer = document.getElementById('category');
    for (const category in categories) {
        //console.log(categories[category].category_name);
        const categoryName = document.createElement('button');
        categoryName.classList.add("btn", "btn-ghost");
        categoryName.innerHTML = `
            ${categories[category].category_name}
        `
        categoryContainer.appendChild(categoryName);
    }
}

loadCategory();