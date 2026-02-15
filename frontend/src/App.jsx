import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cards from './components/Card'
import cardsData from './Carddata.json'

function App() {
  const [count, setCount] = useState(0)

  const loadScript = (src)=>{
    return new Promise ((resolve)=>{
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    })
  }

  useEffect(()=>{
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  },[]);

  const handlePayment = async (courseId,amount)=>{
    try {
      const options = {
        amount,
        courseId
      }

      const res = await axios.post('http://localhost:3000/api/create-order', options)
      const data = res.data;
      console.log(data);
      const paymentObject = new window.Razorpay({
        key: "XXXXXXXXXXXXXXXX",
        order_id: data.order.id,
        handler: async (response) => {
          console.log(response.orderId);
           // Verify payment on backend, then show success
          const payload = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          try {
            const res = await axios.post('http://localhost:3000/api/verify-payment', payload);
            if (res.status === 200) {
              alert('Payment successful!');
            } else {
              alert('Payment verification failed');
            }
          } catch (err) {
            alert('Payment verification failed');
          }
        },
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {cardsData.map((card) => (
        <Cards key={card.title} {...card} handlePayment={handlePayment} />
      ))}
    </>
  )
}

export default App
