import { getCookie, hasCookie, setCookie } from "cookies-next"


export const getCookieCart = (): { [id: string]: number } => {

  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}');
    return cookieCart
  }

  return {}
}

export const addProductToCart = (id: string) => {

  const product = getCookieCart();

  if (product[id]) {
    product[id] += 1
  } else {
    product[id] = 1
  }
  setCookie( 'cart', JSON.stringify(product));
}