fetch("https://fakestoreapi.com/products")
  .then((data) => data.json())
  .then((completeData) => {
    let data1 = "";
    completeData.forEach((values) => {
      data1 += `<div class="card">
                  <h1 class="title">${values.title}</h1>
                  <img src="${values.image}" alt="image" />
                  <p class="description">${values.description.substring(
                    0,
                    100
                  )}</p>
                  <button onclick="alert('Item added to cart')">Buy Now</button>
                  <button onclick="alert('Item added to cart')">Add to Cart</button>
                  <p class="category">${values.category}</p>
                  <p class="price">${values.price}</p>
                  <button onclick="showFullDescription('${
                    values.description
                  }', event)">Read More</button>
                </div>`;
    });
    document.getElementById("cards").innerHTML = data1;
  })
  .catch((error) => {
    console.log(error);
  });

function showFullDescription(description, event) {
  var modal = document.createElement("div");
  modal.classList.add("modal");

  var closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", function () {
    modal.remove();
  });

  var descriptionText = document.createElement("p");
  descriptionText.textContent = description;

  modal.appendChild(closeButton);
  modal.appendChild(descriptionText);
  document.body.appendChild(modal);

  // Position the modal above the clicked "Read More" button
  var rect = event.target.getBoundingClientRect();
  var modalWidth = modal.offsetWidth;
  var modalHeight = modal.offsetHeight;
  var buttonWidth = event.target.offsetWidth;
  var buttonHeight = event.target.offsetHeight;

  var top = rect.top - modalHeight - 10; // Adjust as needed
  var left = rect.left + (buttonWidth - modalWidth) / 2;

  // Check if the modal overflows the window and adjust the position if necessary
  if (top < 0) {
    top = 10; // Adjust as needed
  }
  if (left < 0) {
    left = 10; // Adjust as needed
  }
  if (left + modalWidth > window.innerWidth) {
    left = window.innerWidth - modalWidth - 10; // Adjust as needed
  }

  modal.style.top = top + "px";
  modal.style.left = left + "px";
}
// Function to search and filter products based on user input in the search input field.
function searchProducts() {
  var input, filter, root, products, i, productName;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  root = document.getElementById("cards");
  products = root.getElementsByClassName("card");
  for (i = 0; i < products.length; i++) {
    productName = products[i]
      .getElementsByClassName("title")[0]
      .innerText.toUpperCase();
    if (productName.indexOf(filter) > -1) {
      products[i].style.display = "";
    } else {
      products[i].style.display = "none";
    }
  }
}
// Function to get options for the category select dropdown
async function getOptions(url) {
  const response = await fetch(url);
  const data = await response.json();
  const select = document.getElementById("categories");
  select.innerHTML = ""; // Clear previous options
  data.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.innerText = category;
    select.append(option);
  });
}

// Function to handle category selection
function handleCategorySelection() {
  const selectedCategory = document.getElementById("categories").value;
  filterProductsByCategory(selectedCategory);
}

// Function to filter products by category and update the DOM with the filtered product cards
function filterProductsByCategory(selectedCategory) {
  fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
    .then((response) => response.json())
    .then((filteredProducts) => {
      let data1 = "";
      filteredProducts.forEach((product) => {
        data1 += `<div class="card">
            <h1 class="title">${product.title}</h1>
            <img src="${product.image}" alt="image" />
            <p class="description">${product.description.substring(0, 100)}</p>
            <button onclick="alert('Item added to cart')">Buy Now</button>
            <button onclick="alert('Item added to cart')">Add to Cart</button>
            <p class="category">${product.category}</p>
            <p class="price">${product.price}</p>
            <button onclick="showFullDescription('${
              product.description
            }')">Read More</button>
          </div>`;
      });
      document.getElementById("cards").innerHTML = data1;
    });
}
// Event listener for category selection
document
  .getElementById("categories")
  .addEventListener("change", handleCategorySelection);

// Initial call to get options for the category select dropdown
getOptions("https://fakestoreapi.com/products/categories");

function submitRegister() {
  // Get the input values
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  function displayRegisteredAccount(account) {
    // You can display the registered account in index.html using DOM manipulation
    // For example, you can create a list of registered accounts and append the new account to the list
    var accountList = document.getElementById("accountList");
    var listItem = document.createElement("li");
    listItem.textContent = account.username + " - " + account.email;
    accountList.appendChild(listItem);
  }
}
