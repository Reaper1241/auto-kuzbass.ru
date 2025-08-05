export function yandexEcommercePurchase(id, product) {
  console.log(id, product.id);

  if (process.client) {
    let brand = product.brand ? product.brand.toLowerCase() : null;
    if (brand && brand.includes('ваз (lada)')) {
      brand = 'lada';
    }

    let model = product.model ? product.model.toLowerCase().replace(/\s+/g, '_') : null;

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
              "brand": brand,
              "name": model, // Используем обработанную модель
              "id": product.id,
              "price": product.sale ? product.price - product.sale : product.price,
              "discount": product.sale ? product.sale : 0,
              "quantity": 1,
              "variant": product.color ? product.color : null
            }
          ]
        }
      }
    });
  }
}