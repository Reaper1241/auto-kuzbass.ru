export default function findModel(modelUrl, models) {
    return models.find(model => model.url_model === modelUrl)?.id;
}