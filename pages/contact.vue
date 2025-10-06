<script setup>
</script>

<template>
    <BannerEB4/>
    <Bread />
    <div class="contact-title">
        <BasePageTitle class="title"/>
    </div>
    <div class="contacts-wrapper">
      <Contacts />
      <ContactsMap />
    </div>
    <ModalAFK />
    <SEO />
</template>

<style lang="scss" scoped>
.contacts-wrapper {
    padding-bottom: 15px;
max-width: 1430px;
margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px; // можно регулировать отступ
  @media screen and (max-width: 1000px) {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    }
}
.contact-title{
    max-width: 1430px;
    margin: 0 auto;
}

.title{
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 34px 20px;
    @media screen and (max-width: 567px) {
        font-size: 20px;
    }
}
</style>