export function yandexEcommerce(action, product) {
  if (process.client) {
    console.log({
      action: action,
      product: product,
      list: 'new'
    })

    window.dataLayer.push({
      "ecommerce": {
        "currencyCode": "RUB",
        [`${action}`]: {
          "products": [
            {
              "category": 'Новый авто',
              "brand": product.brand ? product.brand : null,
              "name": product.model ? product.model : null,
              "list": 'new',

              "id": product.id,
              "price": product.sale ? product.price - product.sale : product.price,
              "discount": product.sale ? product.sale : 0,
              "quantity": 1,
              "variant": product.color ? product.color : null
            },
          ]
        }
      }
    })
  }
}