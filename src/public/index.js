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
  const productList = document.querySelector(".divContainer");
  productList.innerHTML = "";
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("borderBox");
    productDiv.innerHTML = `
        <div>
          <p>Producto: ${product.title}</p>
          <p>Código: ${product.code}</p>
          <p>Descripción: ${product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Categoría: ${product.category}</p>
        </div>
        <button class="delete-button" data-id="${product.id}">Eliminar</button>
      `;
    productList.appendChild(productDiv);
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
  productContainer.innerHTML = ""; 

  updatedProducts.forEach((product) => {
    productContainer.innerHTML += `
      <div class="borderBox" id="product-${product.id}">
        <div>
          <p>Producto: ${product.title}</p>
          <p>Código: ${product.code}</p>
          <p>Descripción: ${product.description}</p>
          <p>Precio: ${product.price}</p>
          <p>Stock: ${product.stock}</p>
          <p>Categoría: ${product.category}</p>
        </div>
        <button class="delete-button" data-id="${product.id}">Eliminar</button>
      </div>`;
  });
});
