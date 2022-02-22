const cartItems = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function geraValor() {
  let valorTotal = 0;
  const elementos = document.querySelectorAll('li');
  elementos.forEach((element) => {
    const variante = element.innerText;
    const valor = variante.slice([variante.search('PRICE: ') + 8], variante.length);
    valorTotal += parseFloat(valor);
  });
  document.querySelector('.total-price').innerText = `${valorTotal}`;
}

function cartItemClickListener(event) {
  event.target.parentElement.removeChild(event.target);
  saveCartItems(cartItems.innerHTML);
  geraValor();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addToCart(event) {
  const itemID = getSkuFromProductItem(event.target.parentElement);
  const produtoCarrinho = await fetchItem(itemID);
  cartItems.appendChild(
    createCartItemElement({
      sku: produtoCarrinho.id,
      name: produtoCarrinho.title,
      salePrice: produtoCarrinho.price,
    }),
  );
  saveCartItems(cartItems.innerHTML);
  geraValor();
}

async function pageLoad() {
  const elemento = createCustomElement('p', 'loading', 'carregando...');
  document.querySelector('.cart').appendChild(elemento);
}

async function pageDone() {
  const elemento = document.querySelector('.loading');
  elemento.parentElement.removeChild(elemento);
}

window.onload = async () => {
  await pageLoad();
  const produtos = await fetchProducts('computador');
  produtos.results.forEach((element) => {
    document.querySelector('.items').appendChild(
      createProductItemElement({ sku: element.id, name: element.title, image: element.thumbnail }),
    );
  });
  await pageDone();
  getSavedCartItems();
  const elemento = cartItems;
  elemento.innerHTML = getSavedCartItems();
  document.querySelector('.cart').appendChild(createCustomElement('p', 'total-price', '0'));
  geraValor();
  document.querySelectorAll('li').forEach((element) => 
  element.addEventListener('click', cartItemClickListener));
  document.querySelectorAll('.item__add').forEach((element) =>
  element.addEventListener('click', addToCart));
};

document.querySelector('.empty-cart').addEventListener('click', () => { // Função para limpar o carrinho, atualizar a valor total e salvar no localStorage.
  const elementos = document.querySelectorAll('li');
  elementos.forEach((element) => {
    element.parentElement.removeChild(element);
    geraValor();
    saveCartItems(cartItems.innerHTML);
  });
});
