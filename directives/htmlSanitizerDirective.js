import { htmlSanitizer } from '@/utils/htmlSanitizer';

export default {
    mounted(el, binding) {
        if (binding.value) {
            el.innerHTML = htmlSanitizer(binding.value);
        }
    },
    updated(el, binding) {
        if (binding.value) {
            el.innerHTML = htmlSanitizer(binding.value);
        }
    }
};