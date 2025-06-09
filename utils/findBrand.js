export default function findBrand(brandUrl, brands) {
    return brands.find(brand => brand.url_brand === brandUrl)?.id;
}