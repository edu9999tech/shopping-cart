import React, { useEffect, useState } from 'react';

interface OrderSuccessAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
  orderDetails?: {
    orderId?: string;
    total?: number;
    paymentMethod?: string;
  };
}

const OrderSuccessAnimation: React.FC<OrderSuccessAnimationProps> = ({ 
  isVisible, 
  onComplete,
  orderDetails 
}) => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setAnimationStage(0);
      return;
    }

    const stages = [
      () => setAnimationStage(1), // Show initial state
      () => setAnimationStage(2), // Show checkmark animation
      () => setAnimationStage(3), // Show details
      () => setAnimationStage(4), // Show celebration particles
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    stages.forEach((stage, index) => {
      const timeout = setTimeout(stage, index * 800);
      timeouts.push(timeout);
    });

    // Auto-complete after 4 seconds
    const completeTimeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000);
    timeouts.push(completeTimeout);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden">
        {/* Background particles */}
        {animationStage >= 4 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-400 rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Main content */}
        <div className="relative z-10">
          {/* Checkmark Animation */}
          <div className="mb-6">
            <div 
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-1000 ${
                animationStage >= 2 
                  ? 'bg-green-500 scale-100' 
                  : 'bg-gray-200 scale-75'
              }`}
            >
              <svg 
                className={`w-10 h-10 text-white transition-all duration-500 ${
                  animationStage >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7"
                  className={animationStage >= 2 ? 'animate-pulse' : ''}
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className={`transition-all duration-500 ${
            animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Confirmed! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase!
            </p>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                {orderDetails.orderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-semibold">#{orderDetails.orderId}</span>
                  </div>
                )}
                {orderDetails.total && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-green-600">₹{orderDetails.total.toFixed(2)}</span>
                  </div>
                )}
                {orderDetails.paymentMethod && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>
                    <span className="font-semibold">{orderDetails.paymentMethod}</span>
                  </div>
                )}
              </div>
            )}

            {/* Processing indicator */}
            <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
              <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-green-500 rounded-full mr-2"></div>
              Processing your order...
            </div>
          </div>

          {/* Close button (appears after animation) */}
          {animationStage >= 4 && (
            <button
              onClick={onComplete}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-200"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessAnimation;
