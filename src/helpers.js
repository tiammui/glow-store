import firebase from 'firebase';

import {
  ProductMaker,
  CartItemMaker,
  UserMaker,
  deliveryBilling,
  initObj,
  OrderMaker,
} from './mockbase';

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
  if (!text) return '';
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
export function cartCost(cart, getProduct) {
  // discount is considered

  if (!cart.length) return 0;
  if (cart.length == 1) {
    var product = {};
    getProduct(cart[0].productId).then((doc) => (product = doc));
    return totalCost(cart[0].quantity, product.price, product.discount);
  }
  const cost = cart.reduce((a, b, i) => {
    /**
     * @type {ProductMaker}
     */
    var bProduct = {};
    getProduct(b.productId).then((doc) => (bProduct = doc));

    let bCost = totalCost(b.quantity, bProduct.price, bProduct.discount);

    if (i == 1) {
      /**
       * @type {ProductMaker}
       */
      let aProduct = {};
      getProduct(a.productId).then((doc) => (aProduct = doc));
      let aCost = totalCost(a.quantity, aProduct.price, aProduct.discount);

      return aCost + bCost;
    } else {
      a + bCost;
    }
  });

  return cost;
}

/**
 * @return {number} discounted cost
 */
export function cartItemCost(quantity, price, discount) {
  // discount is considered
  return totalCost(quantity, price, discount);
}

export function formatAddress(street, city, state, country) {
  return `${street}, ${city}, ${state}, ${country}`;
}

export function localCart(cart) {
  /**
   * @param {{cart:[],lastUpdate:number}}
   */
  let localisedCart = {
    cart: [],
    lastUpdate: 0, // defaulted to zero, to make last updated date more than 7 days if localStorage for cart is empty
  };
  let LOCAL_CART_STORAGE_KEY = 'cart';

  if (cart) {
    // update localStorage
    localisedCart = { cart, lastUpdate: Date.now() };
    return localStorage.setItem(
      LOCAL_CART_STORAGE_KEY,
      JSON.stringify(localisedCart)
    );
  }

  // return cart from localStorage, if local storage is empty use defaults to not break app
  localisedCart =
    JSON.parse(localStorage.getItem(LOCAL_CART_STORAGE_KEY)) || localisedCart;

  // 7 days == 604,800 seconds == 604,800,000 milliseconds

  if (Date.now() - localisedCart.lastUpdate > 604800000) {
    // last day updated is more than 7 days, clear localStorage
    localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
    return [];
  } else {
    return localisedCart.cart;
  }
}

export function getDeliveryCity(state, country) {
  // can fetch from firebase as well
  return Object.keys(deliveryBilling[country][state]);
}

export function getDeliveryFee(city, state, country) {
  // can fetch from firebase as well
  return deliveryBilling[country][state][city];
}

export function getInitObject() {
  // may fetch from firebase in future update, can be gotten locally for now
  return initObj;
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

/**
 * @param { OrderProductMaker[] } orderProducts
 */
export function orderCost(orderProducts) {
  if (!orderProducts.length) return 0;
  if (orderProducts.length == 1) {
    return totalCost(
      orderProducts[0].quantity,
      orderProducts[0].price,
      orderProducts[0].discount
    );
  }

  const cost = orderProducts.reduce((a, b, i) => {
    let bCost = totalCost(b.quantity, b.price, b.discount);
    if (i == 1) {
      let aCost = totalCost(a.quantity, a.price, a.discount);

      return aCost + bCost;
    } else {
      a + bCost;
    }
  });

  return cost;
}

/**
 * @param { OrderProductMaker[] } orderProducts
 */
export function orderItemAmt(orderProducts) {
  if (!orderProducts.length) return 0;
  if (orderProducts.length == 1) {
    return orderProducts[0].quantity;
  }

  const amount = orderProducts.reduce((a, b, i) => {
    let bAmt = b.quantity;
    if (i == 1) {
      let aAmt = a.quantity;

      return aAmt + bAmt;
    } else {
      a + bAmt;
    }
  });

  return amount;
}

export function range(size) {
  let sequence = [];

  for (let i = 1; i <= size; i++) {
    sequence.push(i);
  }

  return sequence;
}

export function totalCost(quantity, price, discount) {
  return quantity * calcDiscount(price, discount);
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

function cacheEngine() {}
