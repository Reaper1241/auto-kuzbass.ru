export function yandexEcommerceArray(action, products) {
  let ecomItems = ref([]);
  
  for (let i = 0; i < products.length; i++) {
    let brand = products[i].brand ? products[i].brand.toLowerCase() : null;
    if (brand && brand.includes('ваз (lada)')) {
      brand = 'lada';
    }

    let model = products[i].model ? products[i].model.toLowerCase().replace(/\s+/g, '_') : null;

    ecomItems.value.push({
      "category": 'Новый авто',
      "brand": brand,
      "name": model, 
      "id": products[i].id,
      "price": products[i].sale ? products[i].price - products[i].sale : products[i].price,
      "discount": products[i].sale ? products[i].sale : 0,
      "quantity": 1,
      "variant": products[i].color ? products[i].color : null
    });
  }
  if (process.client) {
    window.dataLayer.push({
      "ecommerce": {
        "currencyCode": "RUB",
        [`${action}`]: {
          "products": [
            ecomItems.value
          ]
        }
      }
    })
  }
}