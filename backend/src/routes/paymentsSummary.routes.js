import { Router } from 'express'
import { getPaymentSummary } from '../controllers/paymentSummary.controller.js'

const paymentsSummaryRouter = Router();

paymentsSummaryRouter.route('/').get(getPaymentSummary)

export default paymentsSummaryRouter;

// http://localhost:4000/api/paymentSummary