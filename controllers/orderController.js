const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Product = require('../models/productModel')
//stripe instance
const stripe = require('stripe')(process.env.STRIPE_KEY)
async function createOrder(req, res){
    //get payload
        const {orderItems, shippingAddress, totalPrice} = req.body
        if(orderItems?.length <= 0){
            throw new Error('No order items')
        }
    // find user
        const user = await User.findById(req.userAuthId)
    // check if user has shipping addresss
        if(!user?.hasShippingAddress){
            throw new Error("Please provide shipping address")
        }
    //create order
        const order = await Order.create({
            user: user?._id,
            orderItems,
            shippingAddress,
            totalPrice
        })
    // update product qty
        const products = await Product.find({_id:{ $in: orderItems} })
        orderItems.map(async(order)=>{
            const product = products.find((prod)=>{
                return prod._id.toString() === order._id.toString()
            })
            if(product){
                product.totalSold += order.qty
            }
            await product.save()
        })
    // push order into user
        user.orders.push(order?._id)
        await user.save()
    //make payment (stripe)
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name:"Hats",
                            description:"Best hat"
                        },
                        unit_amount: 10*100
                    },
                    quantity: 2
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancel`,
        });

    res.send({url: session.url})
    res.json({
        success:"",
        message:"order created",
        order,
        user,
    })

}
module.exports = {
    createOrder
}