// Query Selectors
const formRecipes = document.querySelector("#recipe-form");
const saveRecipes = document.querySelector("#save-recipes");
let listItems = [];



// Functions
formRecipes.addEventListener("submit", function(e){
    e.preventDefault()
    const name = cleanData(formRecipes.querySelector("#name").value);
    const order = cleanData(formRecipes.querySelector("#order").value);
    const price = cleanData(formRecipes.querySelector("#price").value);
    const quantity = cleanData(formRecipes.querySelector("#quantity").value);
    const location = cleanData(formRecipes.querySelector("#location").value);
    const note = cleanData(formRecipes.querySelector("#note").value);
    const newRecipe ={
        name,
        order,
        price,
        quantity,
        location,
        note,
        id: Date.now()
    }
    listItems.push(newRecipe);
    displayRecipes();
    e.target.reset();
    saveData();
});

function displayRecipes(){
    const showResult = listItems.map(item => `
        <div class="col-12 col-md-4 col-sm-6">
            <div class="card border-0 m-2">
                <div class="card-header bg-head text-white text-center">
                    <h4>${item.name}</h4>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled">
                        <li><strong class="me-2">ID:</strong>${item.id}</li>
                        <li><strong class="me-2">Order:</strong>${item.order}</li>
                        <li><strong class="me-2">Price:</strong>${item.price}</li>
                        <li><strong class="me-2">Quantity:</strong>${item.quantity}</li>
                        <li><strong class="me-2">Location:</strong>${item.location}</li>
                        <li><strong class="me-2">Note:</strong>${item.note}</li>
                    </ul>
                </div>
                <div class="row">
                    <div class="text-center mb-3">
                        <button class="btn btn-outline-danger" value="${item.id}">Delete Recipe</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
    saveRecipes.innerHTML = showResult;
}

// Delete Recipe
function deleteRecipe(id){
    listItems = listItems.filter(item => item.id !== id);
    saveData();
    displayRecipes();
}

// Matches ID
saveRecipes.addEventListener("click", function(e){
    if(e.target.matches(".btn-outline-danger")){
        deleteRecipe(JSON.parse(e.target.value))
    }
});


// Clean Data
function cleanData(inputUser){
    return DOMPurify.sanitize(inputUser);
}

// Local Storage
function saveData(){
    localStorage.setItem("saveRecipes.list", JSON.stringify(listItems));
}

// Load Initial UI
window.addEventListener("DOMContentLoaded", function(){
    const tempLocalStorage = localStorage.getItem("saveRecipes.list");
    const tempRecipes = JSON.parse(tempLocalStorage);
    listItems.push(...tempRecipes);
    saveData();
    displayRecipes();
});