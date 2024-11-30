// Input elements and buttons
var productNameInput = document.getElementById("nameInput");
var productPriceInput = document.getElementById("priceInput");
var productCategoryInput = document.getElementById("CatogoryInput");
var productDescriptionInput = document.getElementById("DescriptionInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var searchInput = document.getElementById("searchInput");
// Storage of products
var allProducts = [];
var productUpdateIndex = null;

// Recover stored data
allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
displayData(allProducts);

// Add New Product
function addProduct() {
  if (valdateAllProduct()) {
    var product = {
      productName: productNameInput.value,
      productPrice: productPriceInput.value,
      productCategory: productCategoryInput.value,
      productDescription: productDescriptionInput.value,
    };
    allProducts.push(product);
    localStorage.setItem("allProducts", JSON.stringify(allProducts));
    displayData(allProducts);
    clearInputs();
    Swal.fire({
      title: "You are honest",
      text: "Your data is correct",
      icon: "success",
    });
  } else {
    Swal.fire({
      title: "incorrect",
      text: "Enter valid data",
      icon: "error",
    });
  }
}

// Display data in the table
function displayData(products) {
  var htmlMarkup = "";
  for (var i = 0; i < products.length; i++) {
    htmlMarkup += `
      <tr>
        <td>${i + 1}</td>
        <td>${products[i].productName}</td>
        <td>${products[i].productPrice} $</td>
        <td>${products[i].productCategory}</td>
        <td>${products[i].productDescription}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="setProductForUpdate(${i})">Update</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("Crtona").innerHTML = htmlMarkup;
}

// Delete Product
function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayData(allProducts);
}

// Prepare the product for update
function setProductForUpdate(index) {
  productUpdateIndex = index;
  var product = allProducts[index];
  productNameInput.value = product.productName;
  productPriceInput.value = product.productPrice;
  productCategoryInput.value = product.productCategory;
  productDescriptionInput.value = product.productDescription;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

// Update Product
function finalUpdate() {
  var updatedProduct = {
    productName: productNameInput.value,
    productPrice: productPriceInput.value,
    productCategory: productCategoryInput.value,
    productDescription: productDescriptionInput.value,
  };
  allProducts.splice(productUpdateIndex, 1, updatedProduct);
  localStorage.setItem("allProducts", JSON.stringify(allProducts));
  displayData(allProducts);

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearInputs();
}

// Clear inputs
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// Search functionality
function searchProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchValue)
  );
  displayData(filteredProducts);
}

// //Valdition Name
// function validProductName(nameValue) {
//   if (nameRegex.test(nameValue) == true) {
//     nameRegexs.classList.add("d-none");
//     productNameInput.classList.replace("is-invalid", "is-valid")();
//   } else {
//     productNameInput.classList.add('is-invalid')
//     nameRegexs.classList.remove("d-none");
//   }
// }

// //Valdition Price
// function validPrice(priceValue){
//   if (PriceRegex.test(priceValue) == true) {
//     productPriceInput.classList.replace("is-invalid","is-valid");
//     priceAlert.classList.add("d-none");
//   }else{
//     productPriceInput.classList.add('is-invalid')
//     priceAlert.classList.remove("d-none");
//   }
// }

function valdate(regex, inputvalue, alert, input) {
  if (regex.test(inputvalue) == true) {
    input.classList.replace("is-invalid", "is-valid");
    alert.classList.add("d-none");
    return true;
  } else {
    input.classList.add("is-invalid");
    alert.classList.remove("d-none");
    return false;
  }
}

function valdateAllProduct() {
  if (
    valdate(
      /^[a-zA-Z0-9 ]{5,20}$/,
      productNameInput.value,
      nameAlert,
      productNameInput
    ) &&
    valdate(
      /^\d{1,6}$/,
      productPriceInput.value,
      priceAlert,
      productPriceInput
    ) &&
    valdate(
      /^(technology|mobile|tv)$/i,
      productCategoryInput.value,
      alertCatogory,
      productCategoryInput
    ) &&
    valdate(
      /^[\s\S]{3,300}$/,
      productDescriptionInput.value,
      alertdescrition,
      productDescriptionInput
    )
  ) {
    // console.log("This Valid Data");
    return true;
  } else {
    // console.log('Enter This Valid Data');
    return false;
  }
}
