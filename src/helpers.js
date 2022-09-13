import {product} from './mockbase'

export function getProduct(productId){
  // check for product locally, if not found fetch from firebase

  return {...product}
}

export function calcDiscount(price,discount){
  return price - (price * (discount/100))
}