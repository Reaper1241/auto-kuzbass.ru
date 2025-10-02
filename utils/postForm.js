import axios from 'axios'
import { useAppStore } from '/stores/AppStore.js'
import { apiFormNew, blackList  } from "@/constants/";
import { useNuxtApp } from '#imports'
axios.defaults.withCredentials = true
// const carEcommerce = computed(() => {
//   return {
//     brand: props.car?.url_brand || null,
//     name: props.car?.model || null,
//     category: 'Новый авто',
//     id: props.car?.id || null,
//     price: props.car?.sale ? (props.car.price - props.car.sale) : props.car?.price || 0,
//     discount: props.car?.sale || 0,
//     quantity: 1,
//     variant: props.car?.color || null
//   };
// });
export default function postForm(data, appType, car, category) {
  const appStore = useAppStore()

  const ip = useCookie('ip')
  ip.value = appStore.ip

  const domain = useCookie('domain')
  domain.value = window.location.hostname

  const formData = Object.keys(data).reduce((acc, key) => {
    if (key === 'name' || key === 'phone') {
      acc[key] = data[key];
    } else {
      acc.comment[key] = data[key];
    }
    return acc;
  }, { comment: {} });

  let clearPhone = formData.phone.replaceAll(' ', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '').replaceAll('-', '');

  let comment = ref('');

  if (formData.comment?.credit) {
    comment.value = `Первоначальный взнос: ${formData.comment.credit.RangePercent} %. Срок: ${formData.comment.credit.RangeTime == 0 ? '6 мес' : `${formData.comment.credit.RangeTime} лет`}`
  } else {
    comment.value = Object.values(formData.comment).some(value => value)
      ? Object.keys(formData.comment)
        .filter(key => formData.comment[key])
        .map(key => `${formData.comment[key]}`)
        .join(', ')
      : '';
  }

  console.log({
    category: category,
    car: car,
    appType: appType,
    formData: formData,
    comment: comment.value
  })

  appStore.formLoading = true

  if (blackList.some(blackListed => clearPhone.startsWith(blackListed))) {
    navigateTo('/thank');
  } else {
    // Проверяем, был ли уже сегодня заявка с этого IP
    const today = new Date().toISOString().split('T')[0];
    const ipKey = `submission_${appStore.ip}_${today}`;
    
    const hasSubmittedToday = localStorage.getItem(ipKey);
    
    if (hasSubmittedToday) {
      localStorage.setItem(ipKey, 'duplicate');
      
      const { $ym } = useNuxtApp()
      $ym('reachGoal', 'success-auto-kuzbass')
      
      axios.post(`${apiFormNew}`, {
        phone_number: clearPhone,
        full_name: formData.name ? formData.name : null,
        comment: comment.value ? comment.value : null,

        // Корректная обработка car объекта (может содержать только brand)
        car_id: car ? car.id : null,
        brand: car ? car.brand : null,
        model: car ? car.model : null,
        price: car ? (car.price ?? car.min_price ?? null) : null,

        send_form: 1,
        send_page: window.location.origin + window.location.pathname,
        source: `https://auto-kuzbass.ru/`,

        referrer: window.location.origin + window.location.pathname + (appStore.reffer ? appStore.reffer : ''),
        entry: appStore.entry ? appStore.entry : null,
        ip: appStore.ip,
        dealer_id: 329,

        application_type_id: appType,
        is_duplicate: true,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Domain': `https://auto-kuzbass.ru`,
        },
        withCredentials: true
      })
        .then(res => {
          appStore.orderId = res.data
          // Проверяем, есть ли достаточно данных для yandexEcommercePurchase
          if (car && car.id && car.price) {
            yandexEcommercePurchase(appStore.orderId, car);
          }
          appStore.formLoading = false;
          navigateTo('/thank');
        })
        .catch(err => {
          appStore.formLoading = false
          console.log('неудача')
          console.log(err)
          navigateTo('/thank');
        })
        .finally(() => {
          appStore.formLoading = false
        })
    } else {
      localStorage.setItem(ipKey, 'submitted');
      
      const { $ym } = useNuxtApp()
      $ym('reachGoal', 'success-auto-kuzbass')
      
      axios.post(`${apiFormNew}`, {
        phone_number: clearPhone,
        full_name: formData.name ? formData.name : null,
        comment: comment.value ? comment.value : null,

        // Корректная обработка car объекта (может содержать только brand)
        car_id: car ? car.id : null,
        brand: car ? car.brand : null,
        model: car ? car.model : null,
        price: car ? (car.price ?? car.min_price ?? null) : null,

        send_form: 1,
        send_page: window.location.origin + window.location.pathname,
        source: `https://auto-kuzbass.ru/`,

        referrer: window.location.origin + window.location.pathname + (appStore.reffer ? appStore.reffer : ''),
        entry: appStore.entry ? appStore.entry : null,
        ip: appStore.ip,
        dealer_id: 329,

        application_type_id: appType,
        is_duplicate: false,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Domain': `https://auto-kuzbass.ru`,
        },
        withCredentials: true
      })
        .then(res => {
          appStore.orderId = res.data
          // Проверяем, есть ли достаточно данных для yandexEcommercePurchase
          if (car && car.id && car.price) {
            yandexEcommercePurchase(appStore.orderId, car);
          }
          appStore.formLoading = false;
          navigateTo('/success-auto-kuzbass');
        })
        .catch(err => {
          appStore.formLoading = false
          console.log('неудача')
          console.log(err)
          navigateTo('/success-auto-kuzbass');
        })
        .finally(() => {
          appStore.formLoading = false
        })
    }
  }
}


// import axios from 'axios'
// import { useAppStore } from '/stores/AppStore.js'
// import { apiFormNew, blackList } from "@/constants/";
// import { useNuxtApp } from '#imports'

// axios.defaults.withCredentials = true

// export default async function postForm(data, appType, car, category) {
//   const appStore = useAppStore()
//   const { $ym } = useNuxtApp()

//   try {
//     // 1. Подготовка данных формы
//     const formData = {
//       name: data.name || '',
//       phone: data.phone ? data.phone.replace(/\D/g, '') : '', // Очистка номера
//       comment: data.comment || ''
//     };

//     // 2. Проверка на черный список
//     if (blackList.some(blackListed => formData.phone.startsWith(blackListed))) {
//       await navigateTo('/thank');
//       return;
//     }

//     // 3. Подготовка данных для API
//     const postData = {
//       phone_number: formData.phone,
//       full_name: formData.name,
//       comment: formData.comment,
//       car_id: car?.id ? Number(car.id) : null,
//       brand: car?.brand || null,
//       model: car?.model || null,
//       price: car?.price ? Number(car.price) : null,
//       send_form: 1,
//       send_page: window.location.href,
//       source: 'https://auto-kuzbass.ru/',
//       referrer: document.referrer || window.location.href,
//       entry: appStore.entry || null,
//       ip: appStore.ip,
//       dealer_id: 272,
//       application_type_id: Number(appType) // Важно: преобразуем в число
//     };

//     console.log('Отправляемые данные:', postData);

//     // 4. Отправка в Яндекс.Метрику
//     if (typeof $ym === 'function') {
//       $ym('reachGoal', 'success');
//     }

//     // 5. Отправка запроса
//     appStore.formLoading = true;
//     const response = await axios.post(apiFormNew, postData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Domain': 'tmn-auto.ru'
//       },
//       withCredentials: true,
//       timeout: 10000
//     });

//     // 6. Обработка успешного ответа
//     appStore.orderId = response.data;
//     if (car) {
//       yandexEcommercePurchase(appStore.orderId, car);
//     }
//     await navigateTo('/success-tmn-auto.ru');
    
//   } catch (err) {
//     console.error('Полная ошибка:', {
//       message: err.message,
//       response: err.response?.data,
//       status: err.response?.status,
//       config: err.config
//     });
//     await navigateTo('/thank');
//   } finally {
//     appStore.formLoading = false;
//   }
// }