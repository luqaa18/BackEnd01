const clientSocket = io();

const inputPrice = document.getElementById("price");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputDescription = document.getElementById("description");
const inputCode = document.getElementById("code");
const inputTitle = document.getElementById("title");
const btnAdd = document.getElementById("add");

// Evento para agregar producto
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    !inputTitle.value ||
    !inputDescription.value ||
    !inputCategory.value ||
    !inputCode.value ||
    !inputPrice.value ||
    !inputStock.value ||
    isNaN(Number(inputPrice.value)) ||
    isNaN(Number(inputStock.value))
  ) {
    alert("Asegurate de completar todos los campos!");
    return;
  }
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    category: inputCategory.value,
    code: inputCode.value,
    price: Number(inputPrice.value),
    stock: Number(inputStock.value),
  };
  clientSocket.emit("addProd", newProduct);

  // Limpia los campos una vez agregado el producto
  inputTitle.value = "";
  inputDescription.value = "";
  inputCategory.value = "";
  inputCode.value = "";
  inputPrice.value = "";
  inputStock.value = "";
});

// Escucha el evento de actualización de productos
clientSocket.on("products", (products) => {
  tbody.innerHTML = "";
  products.forEach((product) => {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML += `
        <tr id="product-${product.id}">
          <td>
            <p class="product-name">${product.title}</p>
            <p class="product-details">${product.description}</p>
          </td>
          <td>${product.category}</td>
          <td>${product.code}</td>
          <td>$${product.price}</td>
          <td>${product.stock}</td>
          <td><button class="delete-button" data-id="${product.id}">Eliminar</button></td>
        </tr>
      `;
  });
});

// Maneja el clic en los botones de eliminación
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const productId = event.target.getAttribute("data-id");
    clientSocket.emit("deleteProd", productId);
  }
});

// Escucha el evento de actualización de productos después de eliminar
clientSocket.on("updateProducts", (updatedProducts) => {
  const productContainer = document.querySelector(".divContainer");
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  updatedProducts.forEach((product) => {
    tbody.innerHTML += `
        <tr id="product-${product.id}">
          <td>
            <p class="product-name">${product.title}</p>
            <p class="product-details">${product.description}</p>
          </td>
          <td>${product.category}</td>
          <td>${product.code}</td>
          <td>$${product.price}</td>
          <td>${product.stock}</td>
          <td><button class="delete-button" data-id="${product.id}">Eliminar</button></td>
        </tr>
      `;
  });
});
