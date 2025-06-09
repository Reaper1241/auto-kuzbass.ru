import { defineNuxtPlugin } from '#app';
import htmlSanitizerDirective from '~/directives/htmlSanitizerDirective';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('htmlSanitizer', htmlSanitizerDirective);
});