import { CartItem, Product, DeliveryOption } from '../models/index.js'

const getPaymentSummary = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll();
        let totalitems = 0;
        let productCost = 0;
        let shippingCost = 0;

        for (const cart of cartItems) {
            const product = await Product.findByPk(cart.productId);
            const deliveryOption = await DeliveryOption.findByPk(cart.deliveryOptionId);

            totalitems += cart.quantity;
            productCost += product.priceCents * cart.quantity;
            shippingCost += deliveryOption.priceCents;

        };

        const totalCostBeforeTax = productCost + shippingCost;
        const tax = Math.round(totalCostBeforeTax * 0.1);
        const totalCost = totalCostBeforeTax + tax;

        if (totalitems === 0) {
            res.status(200).json({})
        } else {
            res.status(200).json({
                totalitems,
                productCostCents: productCost,
                shippingCostCents: shippingCost,
                totalCostBeforeTaxCents: totalCostBeforeTax,
                taxCents: tax,
                totalCostCents: totalCost
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internaln server error', error: error.message
        });
        console.log(error)
    }
}

export {
    getPaymentSummary
};
