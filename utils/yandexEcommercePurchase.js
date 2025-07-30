export function yandexEcommercePurchase(id, product) {
  console.log(id, product.id)

  if (process.client) {
    window.dataLayer.push({
      "ecommerce": {
        "currencyCode": "RUB",
        "purchase": {
          "actionField": {
            "id": id,
          },
          "products": [
            {
              "category": 'Новый авто',
              "brand": product.brand ? product.brand.toLowerCase() : null,
              "name": product.model ? product.model : null,

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