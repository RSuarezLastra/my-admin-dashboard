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
  setCookie('cart', JSON.stringify(product));
}

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  delete cookieCart[id];

  setCookie('cart', JSON.stringify(cookieCart));
}

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  if (cookieCart[id] == 1) {
    delete cookieCart[id];
  } else {
    cookieCart[id] -= 1
  }
  
  setCookie('cart', JSON.stringify(cookieCart));
}