import { ProductMaker } from './mockbase';

export function getProduct(productId) {
  // check for product locally, if not found fetch from firebase

  return new ProductMaker();
}

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

export function range(size) {
  let sequence = [];

  for (let i = 1; i <= size; i++) {
    sequence.push(i);
  }

  return sequence;
}
