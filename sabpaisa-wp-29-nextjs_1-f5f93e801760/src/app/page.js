'use client';
import { useState } from 'react';
import { submitPaymentForm } from "sabpaisa-pg-dev";

const clientCode = process.env.NEXT_PUBLIC_CLIENT_CODE;
console.log("Client Code:", clientCode);
const transUserName = process.env.NEXT_PUBLIC_TRANS_USERNAME;
const transUserPassword = process.env.NEXT_PUBLIC_TRANS_PASSWORD;
const authKey = process.env.NEXT_PUBLIC_AUTH_KEY;
const authIV = process.env.NEXT_PUBLIC_AUTH_IV;

const defaultValues = {
  clientCode: clientCode || "DJ020",
  transUserName: transUserName || "DJL754@sp",
  transUserPassword: transUserPassword || "4q3qhgmJNM4m",
  authKey: authKey || "ISTrmmDC2bTvkxzlDRrVguVwetGS8xC/UFPsp6w+Itg=",
  authIV: authIV || "M+aUFgRMPq7ci+Cmoytp3KJ2GPBOwO72Z2Cjbr55zY7++pT9mLES2M5cIblnBtaX",
  payerName: "Anand Kumar Shaw",
  payerEmail: "anand.kumar@sabpaisa.in",
  payerMobile: "6291312929",  
  amount: 8625,
  amountType: "INR",
  clientTxnId: "DJ020-2023-10-05-0001",
  channelId: "npm",
  udf1: null, udf2: null, udf3: null, udf4: null, udf5: null,
  udf6: null, udf7: null, udf8: null, udf9: null, udf10: null,
  udf11: null, udf12: null, udf13: null, udf14: null, udf15: null,
  udf16: null, udf17: null, udf18: null, udf19: null, udf20: null,
  payerVpa: "", modeTransfer: "", byPassFlag: "",
  cardHolderName: "", pan: "", cardExpMonth: "", cardExpYear: "", cardType: "", cvv: "",
  browserDetails: "", bankId: "", env: "STAG", callbackUrl: "http://localhost:3000/response",
};

const PaymentGayewayForm = () => {
  const [formState, setFormState] = useState(defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    submitPaymentForm(formState);
  }

  return (
    <>
      <form onSubmit={handleSubmit} style={{ padding: 20, maxWidth: 600 }}>
        {Object.keys(defaultValues).map((key) => (
          <div key={key} style={{ marginBottom: 10 }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>{key}</label>
            <input
              type="text"
              name={key}
              value={formState[key] ?? ''}
              onChange={handleChange}
              style={{ width: '100%', padding: 8 }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px' }}>
          Proceed to Pay
        </button>
      </form>
    </>
  );
};

export default PaymentGayewayForm;