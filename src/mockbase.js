
export const categories = ["moisturisers","perfume","body cream","whitening cream","makeup"]
export const STATUS = {
  DELIVERED:"DELIVERED",
  PENDING:"PENDING",
  TRANSIT:"TRANSIT",
}

export const cartItem = {
  productId:333,
  quantity: 5
}

export const product = {
  id:333,
  category:"",
  name:"Arvil Cleanser",
  desc:"Good fo cleaning all the bacteria that cause itching in the body",
  mainImgURL:"",
  imgsURL:[""],
  price:12000,
  discount:20,
  hotSale:false,
  inStock:5,
}

export const orderProducts = {
  productId:333,
  purchasedPrice:12000,
  purchasedDiscount:10,
  quantity:3
}

export const order = {
  id:3030,
  products:[orderProducts],
  deliveryAddress:{
    country:"Nigeria",
    state:"Lagos",
    city:"Oshodi",
    street:"10 Isholaimam street"
  },
  contact:{
    userId:"yre78292",
    email:"tiammui@gmail.com",
    phoneNumber:"08083524016"
  },
  note:"i have an agreesive dog",
  status: STATUS.DELIVERED
}

export const user = {
  id:"yre78292",
  firstname:"Muizz",
  lastname:"Tiamiyu",
  address:{
    country:"Nigeria",
    state:"Lagos",
    city:"Oshodi",
    street:"10 Isholaimam street"
  },
  contact:{
    userId:"yre78292",
    email:"tiammui@gmail.com",
    phoneNumber:"08083524016"
  },
  orders:[3030],
  isAdmin:false,
  cart:[cartItem]
}

export const headInfo = {
  productId:""// provide if `isProduct` is true
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
  productCategories:categories,
  trendingProducts:[333],
  freshProduct:[333],
  headerInfo: [headInfo]
}

export const stat = {
  totalOrder:205,
  pendingOrder:20,
  amtUsers:50,
  amtUniqueProducts:7,// amount of diff kind of products
  amtProductSold:400,
  totalEarning:1500000
}