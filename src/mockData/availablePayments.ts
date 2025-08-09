import type { payments } from '../modals/payments'

export const availablePayments: payments[] = [
    {
        paymentType: 'credit_card',
        DisplayName: 'Credit Card'
    },
    {
        paymentType: 'debit_card',
        DisplayName: 'Debit Card'
    },
    {
        paymentType: 'upi',
        DisplayName: 'UPI'
    },
    {
        paymentType: 'net_banking',
        DisplayName: 'Net Banking'
    },
    {
        paymentType: 'wallet',
        DisplayName: 'Digital Wallet'
    },
    {
        paymentType: 'cod',
        DisplayName: 'Cash on Delivery'
    },
    {
        paymentType: 'bank_transfer',
        DisplayName: 'Bank Transfer'
    },
    {
        paymentType: 'paypal',
        DisplayName: 'PayPal'
    }
]
