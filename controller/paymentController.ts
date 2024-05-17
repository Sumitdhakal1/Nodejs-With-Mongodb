import { Request, Response, NextFunction } from "express"
import { catchAsync } from '../utils/catchAsync'
import User from "../models/userModel";
import stripePackage from 'stripe'
import { IGetUserAuthInfoRequest } from "../utils/types/interfaces";

const stripe = new stripePackage(process.env.STRIPE_SECRETE_KEY!)

export const paymentSession = catchAsync(async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const payment = await User.findById(req.params.id)

    const sessions = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        line_items: [
            {
                price: 'sumit',
                quantity:1000,
            }],
    })

    res.status(200).json({
        status:'success',
        sessions
    })

})