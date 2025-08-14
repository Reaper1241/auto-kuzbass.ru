export function yandexEcommercePurchase(id, product) {
  if (!process.client) return;

  let brand = product.brand ? product.brand.toLowerCase() : null;
  if (brand && brand.includes('ваз (lada)')) {
    brand = 'lada';
  }

  let model = product.model
    ? product.model.toLowerCase().replace(/\s+/g, '_')
    : null;

  const price = product.sale
    ? product.price - product.sale
    : product.price;

  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({ ecommerce: null });

  window.dataLayer.push({
    ecommerce: {
      purchase: {
        actionField: {
          id: String(id),
          revenue: String(price),
          tax: '0',
          shipping: '0'
        },
        products: [
          {
            id: String(product.id),
            name: model,
            category: 'Новый авто',
            brand: brand,
            price: String(price),
            quantity: 1,
            variant: product.color || null
          }
        ]
      }
    }
  });
}