export default defineNuxtRouteMiddleware((to, from) => {
    const appStore = useAppStore()

    if (process.client) {
        document.body.style.overflow = "auto";
    }

    if (to.name == 'car') {
    } else if (from.name == 'car') {
    } else {
        appStore.recentCarsNew.cars = {}
        appStore.recentCarsNew.count = 0
        appStore.recentQueryNew = ''
    }
})