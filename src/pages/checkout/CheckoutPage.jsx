import { formatMoney } from '../../utils/money'
import axios from 'axios'
import './CheckoutPage.css'
import './checkout-header.css'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
export function CheckoutPage({ cart }) {
    const [deliveryOption, setDeliveryOption] = useState([])
    const [paymentSummary, setPaymentSummary] = useState(null)

    // useEffect(() => {
    //     axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    //         .then((response) => {
    //             setDeliveryOption(response.data)
    //         })
    // }, [])
    // useEffect(() => {
    //     axios.get('/api/payment-summary')
    //         .then((response) => {
    //             setPaymentSummary(response.data)
    //         })
    // }, [])
    useEffect(() => {
        const fetchCheckoutData = async () => {
            const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOption(deliveryOptionsResponse.data)
            const paymentSummaryResponse = await axios.get('/api/payment-summary')
            setPaymentSummary(paymentSummaryResponse.data)
        }
        fetchCheckoutData()
    }, [])
    return (
        <>
            <title>Checkout</title>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">3 items</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOption.length > 0 &&
                            cart.map((cartItem) => {
                                const selectedDeliveryOption = deliveryOption.find((option) => option.id === cartItem.deliveryOptionId)
                                return (
                                    <div key={cartItem.id} className="cart-item-container">
                                        <div className="delivery-date">
                                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img className="product-image"
                                                src={cartItem.product.image} />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {cartItem.product.name}
                                                </div>
                                                <div className="product-price">
                                                    {formatMoney(cartItem.product.priceCents)}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                    </span>
                                                    <span className="update-quantity-link link-primary">
                                                        Update
                                                    </span>
                                                    <span className="delete-quantity-link link-primary">
                                                        Delete
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>


                                                {
                                                    deliveryOption.map((option) => {
                                                        const fee = option.priceCents === 0 ? 'FREE Shipping' : formatMoney(option.priceCents)

                                                        return (
                                                            <div key={option.id} className="delivery-option">
                                                                <input checked={option.id === cartItem.deliveryOptionId} type="radio" className="delivery-option-input"
                                                                    name={`delivery-option-${cartItem.productId}`}
                                                                />
                                                                <div>
                                                                    <div className="delivery-option-date">
                                                                        {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                                    </div>
                                                                    <div className="delivery-option-price">
                                                                        {fee}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        {paymentSummary && (
                            <>
                            <div className="payment-summary-row">
                            <div>Items ({paymentSummary.totalItems}):</div>
                            <div className="payment-summary-money">
                                {formatMoney(paymentSummary.productCostCents)}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                        </div>
                        </>
                        )}


                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}