export function yandexEcommerceArray(action, products) {
  let ecomItems = ref([]);
  for (let i = 0; i < products.length; i++) {
    ecomItems.value.push({
      "category": 'Новый авто',
      "brand": products[i].brand ? products[i].brand : null,
      "name": products[i].model ? products[i].model : null,

      "id": products[i].id,
      "price": products[i].sale ? products[i].price - products[i].sale : products[i].price,
      "discount": products[i].sale ? products[i].sale : 0,
      "quantity": 1,
      "variant": products[i].color ? products[i].color : null
    })
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