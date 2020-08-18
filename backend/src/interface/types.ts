import { Types, Document } from 'mongoose';

export interface House extends Document {
  _id: Types.ObjectId;
  title: string;
  imageUrl: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBets: number;
  numOfBaths: number;
  rating: number;
}
