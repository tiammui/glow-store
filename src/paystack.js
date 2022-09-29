import { PaystackButton } from 'react-paystack'

const componentProps = {
  email,
  amount,
  metadata: {
    name,
    phone,
  },
  publicKey,
  text: "Pay Now",
  onSuccess: (ref) =>
    alert("Thanks for doing business with us! Come back soon!!"),
  onClose: () => alert("Wait! You need this oil, don't go!!!!"),
} 

// https://paystack.com/docs/payments/verify-payments

<PaystackButton {...componentProps} />