// Фото с Unsplash (бесплатная лицензия). Unsplash сам уменьшает картинку по
// параметрам в адресе, поэтому next/image получает исходник разумного размера
export function unsplash(photoId: string, width = 1600) {
  return `https://images.unsplash.com/${photoId}?w=${width}&q=80&auto=format&fit=crop`;
}
