// BACKEND TRANSACTION VERIFICATION (can use heroku)


{/* <script src="https://js.paystack.co/v1/inline.js"></script>  */}

// const paymentForm = document.getElementById('paymentForm');
// paymentForm.addEventListener("submit", payWithPaystack, false);
// function payWithPaystack(e) {
//   e.preventDefault();

//   let handler = PaystackPop.setup({
//     key: 'pk_test_xxxxxxxxxx', // Replace with your public key
//     email: document.getElementById("email-address").value,
//     amount: document.getElementById("amount").value * 100,
//     ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
//     // label: "Optional string that replaces customer email"
//     onClose: function(){
//       alert('Window closed.');
//     },
//     callback: function(response){
//       let message = 'Payment complete! Reference: ' + response.reference;
//       alert(message);
//     }
//   });

//   handler.openIframe();
// }


// var paymentForm = document.getElementById('paymentForm');
// paymentForm.addEventListener('submit', payWithPaystack, false);
// function payWithPaystack() {
//   var handler = PaystackPop.setup({
//     key: 'YOUR_PUBLIC_KEY', // Replace with your public key
//     email: document.getElementById('email-address').value,
//     amount: document.getElementById('amount').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
//     currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
//     ref: 'YOUR_REFERENCE', // Replace with a reference you generated
//     callback: function(response) {
//       //this happens after the payment is completed successfully
//       var reference = response.reference;
//       alert('Payment complete! Reference: ' + reference);
//       // Make an AJAX call to your server with the reference to verify the transaction
//     },
//     onClose: function() {
//       alert('Transaction was not completed, window closed.');
//     },
//   });
//   handler.openIframe();
// }