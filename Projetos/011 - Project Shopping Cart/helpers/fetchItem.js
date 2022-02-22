const fetchItem = async (pesquisa) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${pesquisa}`);
    const object = await response.json();
    return object;
  } catch (error) {
    return new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
