import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const PaymentSuccess = () => {
  const { tran_id } = useParams();
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/myaccount/AllOrders');
  };

  return (
    <div className="flex items-center justify-center h-[93vh] bg-gradient-to-r from-green-50 to-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-20 w-[800px] h-[500px] text-center">
        <CheckCircle2 className="text-green-500 mx-auto mb-4" size={60} />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your payment has been successfully processed.</p>

        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6">
          <p className="font-semibold">Transaction ID:</p>
          <p className="break-all">{tran_id}</p>
        </div>

        <button
          onClick={handleViewOrders}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition duration-200 cursor-pointer"
        >
          View My Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
