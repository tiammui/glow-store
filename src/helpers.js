import { ProductMaker, CartItemMaker, UserMaker } from './mockbase';

export function addNumSeparator(num) {
  const numStr = num + '';
  const len = numStr.length;
  if (len < 4) return num;
}

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

  if (!cart.length) return 0;
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
  const { price, discount } = getProduct(cartItem.productId);
  const totalCost = cartItem.quantity * calcDiscount(price, discount);

  return totalCost;
}

export function getCart(userId) {
  // if the user is logged in fetch their saved cart from firebase, if not check localStorage
  var cart = [];

  return cart;
}

export function getProduct(productId) {
  // check for product locally, if not found fetch from firebase
  // should be intelligent enough to only fetch a document once, e.g while fetching a document it should not allow another fetching of that same document until fetched 

  return new ProductMaker();
}

export function getCurrentUser(){
  // get auth info of current user
  return new UserMaker()
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

export function formatAddress(street,city,state,country){
  return `${street}, ${city}, ${state}, ${country}`
}

/**
 *
 * @param {string} snackMsg message to show in snack
 * @param {"success"|"warning"|"info"} type extra message to add to snack
 */
export function snack(snackMsg, type) {
  // Get the snackbar DIV
  let snackElem = document.getElementById('snackbar');
  let className = ` show ${type}`;
  let delay = type == 'warning' ? 10500 : 4500;

  // Add the snack message
  snackElem.innerHTML = snackMsg;

  // Add the "show" class to DIV
  snackElem.className += className;
  // After 3 seconds, remove the show class from DIV
  setTimeout(function () {
    snackElem.className = snackElem.className.replace(className, '');
  }, delay);
}

