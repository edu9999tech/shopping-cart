import { useState } from 'react'
import { availablePayments } from '../mockData/availablePayments'
import type { payments } from '../modals/payments'
import { 
    createOrderReceipt, 
    canConfirmOrder, 
    type OrderDetails 
} from '../utils/orderUtils'
import { UI_CLASSES } from '../utils/uiUtils'
import OrderSuccessAnimation from './OrderSuccessAnimation'
import Loading from './Loading'

type ConfirmOrderProps = {
    onClose: () => void;
    onConfirmOrder: () => void;
    orderDetails?: OrderDetails;
}

export const ConfirmOrder = ({ onClose, onConfirmOrder, orderDetails }: ConfirmOrderProps) => {
    const [selectedPayment, setSelectedPayment] = useState<string>('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
    const [orderConfirmationData, setOrderConfirmationData] = useState<{
        orderId: string;
        total: number;
        paymentMethod: string;
    } | null>(null)

    const handlePaymentSelect = (paymentType: string) => {
        setSelectedPayment(paymentType)
    }

    const handleConfirmOrder = async () => {
        if (selectedPayment && orderDetails) {
            setIsProcessing(true);
            
            // Simulate processing delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const selectedPaymentName = availablePayments.find(p => p.paymentType === selectedPayment)?.DisplayName || '';
            const receipt = createOrderReceipt(selectedPaymentName, orderDetails);

            // Log order confirmation
            console.log('Order confirmed with payment:', selectedPayment);
            console.log('Order ID:', receipt.orderId);
            console.log('Order Details:', orderDetails);

            // Set order confirmation data for animation
            setOrderConfirmationData({
                orderId: receipt.orderId,
                total: orderDetails.total,
                paymentMethod: selectedPaymentName
            });

            setIsProcessing(false);
            setShowSuccessAnimation(true);
        }
    }

    const handleAnimationComplete = () => {
        setShowSuccessAnimation(false);
        // Clear cart and close modal
        onConfirmOrder();
        onClose();
    }

    return (
        <div className={UI_CLASSES.LAYOUT.CONTAINER}>
            <h1 className={UI_CLASSES.TEXT.HEADING}>
                Confirm Order
            </h1>
            
            <div className="mb-6">
                <h2 className={UI_CLASSES.TEXT.SUBHEADING}>
                    Select Payment Method
                </h2>
                
                <div className="space-y-3">
                    {availablePayments.map((payment: payments) => (
                        <div 
                            key={payment.paymentType}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedPayment === payment.paymentType
                                    ? UI_CLASSES.CARD.SELECTED
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handlePaymentSelect(payment.paymentType)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedPayment === payment.paymentType
                                            ? 'border-green-500 bg-green-500'
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedPayment === payment.paymentType && (
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-800">
                                        {payment.DisplayName}
                                    </span>
                                </div>
                                
                                {selectedPayment === payment.paymentType && (
                                    <div className="text-green-500">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPayment && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-2">
                        Selected Payment Method:
                    </h3>
                    <p className="text-blue-700">
                        {availablePayments.find(p => p.paymentType === selectedPayment)?.DisplayName}
                    </p>
                </div>
            )}

            <div className="flex space-x-3">
                <button 
                    className={UI_CLASSES.BUTTON.SECONDARY}
                    onClick={onClose}
                    disabled={isProcessing}
                >
                    Cancel
                </button>
                <button 
                    className={`flex-1 font-bold py-3 px-4 rounded-lg transition-colors duration-200 ${
                        canConfirmOrder(orderDetails?.items || [], selectedPayment) && !isProcessing
                            ? UI_CLASSES.BUTTON.PRIMARY
                            : UI_CLASSES.BUTTON.DISABLED
                    }`}
                    disabled={!canConfirmOrder(orderDetails?.items || [], selectedPayment) || isProcessing}
                    onClick={handleConfirmOrder}
                >
                    {isProcessing ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                            Processing...
                        </div>
                    ) : (
                        'Confirm Order'
                    )}
                </button>
            </div>

            {/* Loading overlay for processing */}
            <Loading 
                isLoading={isProcessing} 
                text="Processing your payment..." 
                overlay={true} 
            />

            {/* Success Animation */}
            <OrderSuccessAnimation
                isVisible={showSuccessAnimation}
                onComplete={handleAnimationComplete}
                orderDetails={orderConfirmationData}
            />
        </div>
    )
}