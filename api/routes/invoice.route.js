// POST route for creating an invoice
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createInvoice } from '../controllers/invoice.controller.js';
const router = express.Router();

// POST route for creating an invoice
router.post('/invoicecreate',verifyToken,createInvoice);

export default router;