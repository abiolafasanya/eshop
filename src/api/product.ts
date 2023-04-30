import Axios from './Axios';

async function getProducts() {
  const { data } = await Axios.get('https://fakestoreapi.com/products');
  if (data.error) return;
  return data;
}

async function findProduct(id: string | number) {
  const { data } = await Axios.get('https://fakestoreapi.com/products/' + id);
  if (data.error) return;
  return data;
}

async function findCategories() {
  const { data } = await Axios.get('https://fakestoreapi.com/products/categories');
  if (data.error) return;
  return data;
}

export const getStatesInNigeria = async () => {
  try {
    const response = await Axios.get(
      'https://api.opencagedata.com/geocode/v1/json?q=Nigeria&abbrv=1&no_annotations=1&limit=100&key=c4cb1ee5c69844108c4825d025ceb571'
    );

    if (response.data.results.length) {
      const nigeriaData = response.data.results[0].components;
      const states = nigeriaData.state.split(';');
      console.log(states); // should output an array of all Nigerian states
      return states
    }
  } catch (error) {
    console.error(error);
  }
};


export default {
  getProducts,
  findProduct,
  findCategories,
  getStatesInNigeria
};



