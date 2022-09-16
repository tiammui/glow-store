import { ProductMaker, CartItemMaker } from './mockbase';

/**
 * @return {number} discounted price
 */
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

/**
 * @param {CartItemMaker[]} cart
 * @return {number} discounted total cost
 */
export function cartCost(cart) {
  // discount is considered
  const totalCost = cart.reduce((a, b, i) => {
    /**
     * @type {ProductMaker}
     */
    var bProduct = getProduct(b.productId);
    let bCost = b.quantity * calcDiscount(bProduct.price, bProduct.discount);

    if (i == 1) {
      /**
       * @type {ProductMaker}
       */
      let aProduct = getProduct(a.productId);
      let aCost = a.quantity * calcDiscount(aProduct.price, aProduct.discount);

      return aCost + bCost;
    } else {
      a + bCost;
    }
  });

  return totalCost;
}
/**
 * @param {CartItemMaker} cartItem
 * @return {number} discounted cost
 */
export function cartItemCost(cartItem) {
  // discount is considered
  const {price,discount} = getProduct(cartItem.productId);
  const totalCost = cartItem.quantity * calcDiscount(price, discount)

  return totalCost;
}

export function getCart(userId) {
  // if the user is logged in fetch their saved cart from firebase, if not check localStorage
  var cart = [new CartItemMaker(), new CartItemMaker()];

  return cart;
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
export function indexOfObject(array, property, searchTerm) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i][property] == searchTerm) return i;
  }
  return -1;
}

export function paginateCat(pageNum) {
  // Use for pagination
  console.log(pageNum);
}

export function range(size) {
  let sequence = [];

  for (let i = 1; i <= size; i++) {
    sequence.push(i);
  }

  return sequence;
}

export function addNumSeparator(num) {
  const numStr = num + '';
  const len = numStr.length;
  if (len < 4) return num;

}
