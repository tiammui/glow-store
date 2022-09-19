export const STATUS = {
  DELIVERED: 'DELIVERED',
  PENDING: 'PENDING',
  TRANSIT: 'TRANSIT',
};

/**
 * Cost of delivery based on location (in Naira)
 * @type {{[country:string]:{[state:string]:{[city:string]:number}}}}
 */
export const deliveryBilling = {
  nigeria: {
    lagos: {
      ikeja: 2000,
      yaba: 4000,
      ikorodu: 6000,
      oshodi: 1000,
    },
  },
};

// CONSTRUCTORS
export function CartItemMaker(productId, quantity) {
  this.productId = productId || 333;
  this.quantity = quantity || 5;
}
export function ProductMaker(
  id,
  category,
  name,
  desc,
  mainImgURL,
  imgsURL,
  price,
  discount,
  hotSale,
  inStock
) {
  this.id = id || 333;
  this.category = category || 'cleanser';
  this.name = name || 'Arvil Cleanser';
  this.desc =
    desc || 'Good for cleaning all the bacteria that cause itching in the body';
  this.mainImgURL = mainImgURL || '';
  this.imgsURL = imgsURL || ['fgf', 'fddf', 'fddf'];
  this.price = price || 10000;
  this.discount = discount || 20;
  this.hotSale = hotSale || true;
  this.inStock = inStock || 5;
}
export function OrderProductMaker(
  productId,
  purchasedPrice,
  purchasedDiscount,
  quantity
) {
  this.productId = productId || 333;
  this.purchasedPrice = purchasedPrice || 12000;
  this.purchasedDiscount = purchasedDiscount || 10;
  this.quantity = quantity || 3;
}
export function HeadInfoMaker(productId) {
  this.productId = productId || 333;
}
export function OrderMaker(
  id,
  products,
  deliveryAddress,
  contact,
  note,
  status
) {
  deliveryAddress = deliveryAddress || {
    country: 'nigeria',
    state: 'lagos',
    city: 'oshodi',
    street: '10 Isholaimam street',
  };
  contact = contact || {
    name: 'Tiamiyu Muizz',
    email: 'tiammui@gmail.com', //can be used to get user info
    phoneNumber: '08083524016',
  };

  this.id = id || 3030;
  this.products = products || [new OrderProduct()];
  this.deliveryAddress = deliveryAddress;
  this.contact = contact;
  this.note = note || 'i have an agreesive dog';
  this.status = status || STATUS.DELIVERED; // assigned on server
}
export function UserMaker(
  id,
  email,
  firstname,
  lastname,
  address,
  contact,
  orders,
  isAdmin,
  cart
) {
  address = address || {
    country: 'nigeria',
    state: 'lagos',
    city: 'oshodi',
    street: '10 Isholaimam street',
  };
  contact = contact || {
    email: 'tiammui@gmail.com',
    phoneNumber: '08083524016',
  };

  this.id = id || 'yre78292';
  this.email = email || 'tiammui@gmail.com';
  this.firstname = firstname || 'Muizz';
  this.lastname = lastname || 'Tiamiyu';
  this.address = address;
  this.contact = contact;
  this.orders = orders || [3030];
  this.isAdmin = isAdmin || false;
  this.cart = cart || [new CartItemMaker()];
}

// export const headInfo = {
//   isProduct:false,
//   title:"Get a free gel",
//   message:"The best gel for edge control",
//   actionBtnText:"",// provide if `isProduct` is false
//   actionURL:"",// provide if `isProduct` is false
//   bgImgURL:"",// provide if `isProduct` is false
//   productId:""// provide if `isProduct` is true
// }

export const initObj = {
  productCategories: [
    'all',
    'moisturisers',
    'cleanser',
    'perfume',
    'body cream',
    'whitening cream',
    'makeup',
    'trending',
    'fresh',
  ],
  trendingProducts: [333],
  freshProducts: [333],
  headerInfo: [new HeadInfoMaker(), new HeadInfoMaker(), new HeadInfoMaker()],
};

export const stat = {
  totalOrder: 205,
  pendingOrder: 20,
  amtUsers: 50,
  amtUniqueProducts: 7, // amount of diff kind of products
  amtProductSold: 400,
  totalEarning: 1500000,
};

const cartSchema = {
  cartItems: [],
  amtProduct: 0,
};
