import { Request, Response } from 'express';
import Order from '../models/Order';

export const createOrder = async (req: Request, res: Response) => {
  const { email, name, address, items } = req.body;

  try {
    const order = new Order({
      email,
      name,
      address,
      items,
    });

    //saving the purchase to the order model
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create order' });
  }
};