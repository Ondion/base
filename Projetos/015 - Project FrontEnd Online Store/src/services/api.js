export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const result = await response.json();
  return result;
}

export async function getProductsFromCategoryAndQuery(
  categoryId = undefined,
  query = undefined,
) {
  if (categoryId) {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`,
    );
    const result = await response.json();
    return result;
  } if (query) {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${query}`,
    );
    const result = await response.json();
    return result;
  }
  return new Error('Fetch indisponível');
}

export async function getAll(categoryId = '$CATEGORY_ID', query = '') {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const result = await response.json();
  return result;
}

export async function getDetails(query) {
  const response = await fetch(`https://api.mercadolibre.com/items/${query}`);
  const result = await response.json();
  return result;
}

export default { getCategories, getProductsFromCategoryAndQuery, getAll, getDetails };
