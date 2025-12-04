export default defineNuxtRouteMiddleware((to) => {
  // Проверяем, не главная ли страница и есть ли слеш в конце
  if (to.path !== '/' && to.path.endsWith('/')) {
    console.log(`[Middleware] Редирект со слеша: ${to.path} → ${to.path.slice(0, -1)}`);
    
    // Делаем редирект без слеша с кодом 301
    return navigateTo(to.path.slice(0, -1), { 
      redirectCode: 301,  // Постоянный редирект для SEO
      replace: true      // Заменяем в истории браузера
    });
  }
  
  // Дополнительно: проверяем, нет ли двойных слешей
  if (to.path.includes('//')) {
    const cleanPath = to.path.replace(/\/+/g, '/');
    console.log(`[Middleware] Редирект с двойных слешей: ${to.path} → ${cleanPath}`);
    return navigateTo(cleanPath, { redirectCode: 301, replace: true });
  }
});