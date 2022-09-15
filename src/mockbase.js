export const categories = [
  'all',
  'moisturisers',
  'cleanser',
  'perfume',
  'body cream',
  'whitening cream',
  'makeup',
  'trending',
  'fresh',
];
export const STATUS = {
  DELIVERED: 'DELIVERED',
  PENDING: 'PENDING',
  TRANSIT: 'TRANSIT',
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
  this.imgsURL = imgsURL || ['fgf','fddf','fddf'];
  this.price = price || 10000;
  this.discount = discount || 20;
  this.hotSale = hotSale || true;
  this.inStock = inStock || 5;
}
export function OrderProductMaker(productId,purchasedPrice,purchasedDiscount,quantity){
  this.productId = productId|| 333;
  this.purchasedPrice =   purchasedPrice|| 12000;
  this.purchasedDiscount =   purchasedDiscount|| 10;
  this.quantity =   quantity|| 3;
}
export function HeadInfoMaker(productId){
  this.productId = productId || 333;
}
export function OrderMaker(id,products,deliveryAddress,contact,note,status){
  deliveryAddress = deliveryAddress || {
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Oshodi',
    street: '10 Isholaimam street',
  }
  contact = contact || {
    userId: 'yre78292',
    email: 'tiammui@gmail.com',
    phoneNumber: '08083524016',
  }

  this.id = id || 3030;
  this.products = products || [new OrderProduct()];
  this.deliveryAddress = deliveryAddress;
  this.contact = contact;
  this.note = note || 'i have an agreesive dog';
  this.status = status || STATUS.DELIVERED;
}
export function UserMaker(id,firstname,lastname,address,contact,orders,isAdmin,cart){
  address = address || {
    country: 'Nigeria',
    state: 'Lagos',
    city: 'Oshodi',
    street: '10 Isholaimam street',
  }
  contact = contact || {
    email: 'tiammui@gmail.com',
    phoneNumber: '08083524016',
  }

  this.id = id || 'yre78292';
  this.firstname = firstname || 'Muizz';
  this.lastname = lastname || 'Tiamiyu';
  this.address = address;
  this.contact = contact;
  this.orders = orders || [3030];
  this.isAdmin = isAdmin || false;
  this.cart = cart || [cartItem];
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
  productCategories: categories,
  trendingProducts: [333],
  freshProduct: [333],
  headerInfo: [new HeadInfoMaker()],
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
  cartItems:[],
  amtProduct:0
}