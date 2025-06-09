<template>
    <Header />
    <main>
        <slot />
    </main>
    <Footer />
</template>


<style lang="scss" scoped>
main {
    @media screen and (max-width: 768px) {
        margin-top: 60px;
    }
}
</style>