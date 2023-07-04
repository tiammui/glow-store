import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import WebFont from 'webfontloader';

import firebase, {
  auth,
  uiConfig,
  authUI,
  getFireProduct,
  getFireOrder,
  queryFireProducts,
} from './firebase';
import './styles/App.css';
import './styles/styles.css';
import './styles/desktop.css';
import './styles/firebaseui.css';

import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import CheckOut from './pages/CheckOut';
import OrderDetails from './pages/OrderDetails';
import Contacts from './pages/Contacts';
import UserDetails from './pages/UserDetails';
import NotFound from './pages/NotFound';
import AdminProductUpload from './pages/AdminProductUpload';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Menu from './components/Menu';
import SignInModal from './components/SignInModal';
import { SnackBar } from './components/bigComponents';
import { localCart, indexOfObject, snack } from './helpers';
import { CartItemMaker, ProductMaker, OrderMaker } from './mockbase';

export default function App() {
  const [cart, setCart] = useState(localCart());
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [productsCache, setProductsCache] = useState({}); // productCache: {[productId:string]:ProductMaker}
  const [ordersCache, setOrdersCache] = useState({}); // productCache: {[productId:string]:ProductMaker}
  const [categoriesCache, setCategoriesCache] = useState({}); // categoryCache: {[category:string]:productId[]}

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lato'],
      },
    });

    let unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        snack('Signed in as ' + user.email, 'success');

        setShowSignIn(false);
        setIsSignedIn(true);

        // TODO - update cart
        // setCart();
      } else {
        setIsSignedIn(false);

        // reset cart
        setCart(localCart());
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let quantity =
      cart.length &&
      (cart.length == 1
        ? cart[0].quantity
        : cart.reduce((a, b, i) =>
            i == 1 ? a.quantity + b.quantity : a + b.quantity
          )); // reduce return the complete element of an array if it length == 1

    setCartQuantity(quantity);
    if (isSignedIn) {
      // TODO - update firestore
    } else {
      localCart(cart);
    }
  }, [cart]);

  /**
   * @param {"add"|"remove"|"increment"|"decrement"} operation
   * @param {number} productId
   */
  function cartHandler(operation, productId) {
    // use snackbar to announce status of operations

    switch (operation) {
      case 'add':
        if (
          indexOfObject(cart, 'productId', productId) == -1 &&
          getItem(productId)
        ) {
          // if product is not already in cart and it exist

          setCart((prev) => {
            if (prev.length) {
              return [...prev, new CartItemMaker(productId, 1)];
            }
            return [new CartItemMaker(productId, 1)];
          });
        } else if (indexOfObject(cart, 'productId', productId) != -1) {
          cartHandler('increment', productId);
        } else {
          // product can't be fetched or doesn't exist
        }
        break;
      case 'remove':
        setCart((prev) => prev.filter((item) => item.productId != productId));
        break;
      case 'increment':
        setCart((prev) =>
          prev.map((item) =>
            item.productId == productId
              ? new CartItemMaker(productId, item.quantity + 1)
              : item
          )
        );
        break;
      case 'decrement':
        setCart((prev) =>
          prev.map((item) =>
            item.productId == productId
              ? new CartItemMaker(
                  productId,
                  item.quantity == 1 ? 1 : item.quantity - 1
                )
              : item
          )
        );
        break;
      default: //nothing
    }

    // if user is logged-in,after any operation update user cart on firebase, if not save to localStorage
  }

  /**
   * @param {""} category
   * @param {number} currentPage
   * @return {ProductMaker[] || false} return false if products can't be fetched
   */
  async function getCategoryProducts(category, currentPage) {
    // manage caching of result to `productCache` and `queryCache`
    let DOCS_PER_PAGE = 10;
    let products = [];
    let productIDs = [];
    let expectedCacheLen = DOCS_PER_PAGE * currentPage;

    if (categoriesCache[category]) {
      // category has been cached before

      if (categoriesCache[category].length >= expectedCacheLen) {
        // docs needed for current page is cached

        products = getDocs(expectedCacheLen - DOCS_PER_PAGE, expectedCacheLen);
      } else {
        // docs needed for current page is not cached, fetch needed docs from after last fetched doc
        products = fetchDocs(
          expectedCacheLen - categoriesCache[category].length,
          productsCache[
            categoriesCache[category][categoriesCache[category].length - 1]
          ]
        );
      }
    } else {
      // category has not been cached before, fetch docs from firebase and cache appropriately in `productCache` and `queryCache`
      products = fetchDocs(DOCS_PER_PAGE * currentPage);
    }

    return products;

    function fetchDocs(docsToFetch, lastDocObj) {
      let result=[];
      await queryFireProducts(
        category,
        { category },
        { docsToFetch, lastDocObj }
      ).then((docs) => {
        result = docs;
      });

      productIDs = result.map((product) => {
        // cache each product and return the product id
        setProductsCache((prev) => ({ ...prev, [product.id]: product }));
        return product.id;
      });

      setCategoriesCache((prev) => ({ ...prev, [category]: productIDs }));

      // return last ten doc in the category cache, that way if fetched doc is not up to expected at least some product will show
      let amtIsSmall = categoriesCache[category].length <= 10;
      return getDocs(
        amtIsSmall ? 0 : categoriesCache[category].length - 10,
        categoriesCache[category].length
      );
    }
    function getDocs(start, end) {
      let result = categoriesCache[category].slice(start, end);

      return result.map((productId) => productsCache[productId]);
    }
  }

  /**
   * Intelligently manage the getting of product and order info (from database and locally)
   * @params {'order'|'product'|string} type can also be productId, to pass just one arg
   * @params {string} id orderId or productId 
   * @return {ProductMaker || OrderMaker || false} return false if product/order with the `id` doesn't exist, or product/order can't be currently fetched
   */
  async function getItem(type,id) {
    var itemCache,setItem,getFireFunc;
    if ( arguments.length > 1 && type == "order"){
      itemCache = ordersCache;
      setItem = setOrdersCache;
      getFireFunc = getFireOrder;

      id = '1000001';
    } else {
      id = id || type; // when one arg is passed, productId is passed as `type`
      itemCache = productsCache;
      setItem = setProductsCache;
      getFireFunc = getFireProduct;

      id = '100001';
    }
    // if an error occur while fetching a document, how should i handle it?

    let item = {};
    if (!itemCache[id]) {
      // fetch from firebase
      await getFireFunc(id).then((doc) => {
        item = doc;
      });

      if (item)
      setItem((prev) => ({ ...prev, [item.id]: item }));
    } else {
      // fetch from productCache
      item = itemCache[id];
    }

    return item;
  }
  
  return (
    <>
      <TopBar
        showSignInHnd={setShowSignIn}
        showMenuHnd={setShowMenu}
        cartQuantity={cartQuantity}
        isSignedIn={isSignedIn}
      />
      <Menu
        showSignInHnd={setShowSignIn}
        isSignedIn={isSignedIn}
        showMenu={showMenu}
        showMenuHnd={setShowMenu}
      />

      <div id="main-container">
        <Routes>
          <Route
            path="/"
            element={<Home cartHandler={cartHandler} getProduct={getItem} />}
          />
          <Route
            path="products"
            element={
              <ProductCategory
                filter="All"
                getProduct={getItem}
                cartHandler={cartHandler}
              />
            }
          />
          <Route
            path="products/category/:category"
            element={
              <ProductCategory
                getProduct={getItem}
                cartHandler={cartHandler}
              />
            }
          />
          <Route
            path="products/:productId"
            element={
              <ProductDetails
                cart={cart}
                cartHandler={cartHandler}
                getProduct={getItem}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                cart={cart}
                cartHandler={cartHandler}
                getProduct={getItem}
              />
            }
          />
          <Route
            path="checkout"
            element={<CheckOut cart={cart} getProduct={getItem} />}
          />

          <Route
            path="user"
            element={
              <UserDetails
                showSignInHnd={setShowSignIn}
                getItem={getItem}
              />
            }
          />
          <Route path="user/orders/:orderId" element={<OrderDetails />} />

          <Route path="contacts" element={<Contacts />} />
          <Route path="contact" element={<Contacts />} />
          <Route path="admin/product/upload" element={<AdminProductUpload />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <SnackBar />
      <SignInModal
        uiConfig={uiConfig}
        showSignIn={showSignIn}
        showSignInHnd={setShowSignIn}
        authUI={authUI}
      />
    </>
  );
}
