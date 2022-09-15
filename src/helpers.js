import { ProductMaker, CartItemMaker } from './mockbase';

export function calcDiscount(price, discount) {
  return price - price * (discount / 100);
}

export function capitalise(text) {
  let words = text.split(' ');
  let output = '';

  for (let i = 0; i < words.length; i++) {
    let first = words[i].charAt(0).toUpperCase();
    let rest = words[i].slice(1);

    output += first + rest + ' ';
  }

  return output;
}

export function getCart(userId) {
  // if the user is logged in fetch their saved cart from firebase, if not check localStorage
  var cart = [new CartItemMaker(), new CartItemMaker()]

  return cart
}

export function getProduct(productId) {
  // check for product locally, if not found fetch from firebase

  return new ProductMaker();
}

/**
 * Use to determine the index of an object in the `array` that the value of the provided `property`
 * is equal to the `searchTerm`
 * @param {[]} array The object array to be searched
 * @param {string} property The object property to be searched
 * @param {any} searchTerm The value to be looked for
 * @returns {number} The index of the object in the `array`.
 */
export function indexOfObject(array, property, searchTerm){
  for(var i=0,len=array.length;i<len;i++){
    if(array[i][property]==searchTerm)return i;
  }
  return -1;
}

export function paginateCat(pageNum){
  // Use for pagination
  console.log(pageNum)
}

export function range(size) {
  let sequence = [];

  for (let i = 1; i <= size; i++) {
    sequence.push(i);
  }

  return sequence;
}
