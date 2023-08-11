
const { products, categories } = window;


console.log({ products, categories }, "Store Data");

function getCategoryProducts(category) 
{
  return products
    .filter((product) => product.categories.includes(category.id))
    .filter((product) => !product.discontinued);
}

function showCategory(selectedCategory = categories[0]) 
{
  document.querySelector("#selectedCategoryTitle").innerText = selectedCategory.name;

  const cardCont = document.querySelector(".card-container");
  cardCont.innerHTML = "";



  const categoryProd = getCategoryProducts(selectedCategory);
  categoryProd.forEach((product) => {
    const productCard = createProductCard(product);
    document.querySelector(".card-container").append(productCard);
  });
}

function createCategoryButtons() 
{
  const nav = document.querySelector("#menu");

  categories.forEach((category) => {
    const button = document.createElement("button");

    button.id = `category-${category.id}-btn`;
    button.type = "button";
    button.innerText = category.name;
    button.classList.add("nav-button");
    button.onclick = () => showCategory(category);

    nav.appendChild(button);
  });
}





function createProductCard(product)
 {

  const card = document.createElement("div");

  card.classList.add("card");

  
  const productImage = document.createElement("img");


  productImage.src = product.imageUrl;
  productImage.classList.add("card-image");
  card.appendChild(productImage);

  const cardDetail = document.createElement("div");
  cardDetail.classList.add("card_detail");

  const spanCategory = document.createElement("span");
  spanCategory.textContent = product.categories
    .map((id) => {
      return categories.filter((category) => category.id === id).map((category) => category.name);
    })
    .toString();

  const nameD= document.createElement("div");
  nameD.classList.add("name");
  nameD.textContent = product.title;

  const descP = document.createElement("p");
  descP.classList.add("description");
  descP.textContent = product.description;



  const price = document.createElement("span");
  price.classList.add("price");
  price.textContent = `$${product.price.toFixed(2)} CAD`;

  cardDetail.append(nameD);

  cardDetail.append(descP);
  
  cardDetail.append(price);

  card.append(productImage);
  card.append(cardDetail);

  
  return card;
}

function init() 
{
  createCategoryButtons();
  showCategory();
}

addEventListener("DOMContentLoaded", init);

