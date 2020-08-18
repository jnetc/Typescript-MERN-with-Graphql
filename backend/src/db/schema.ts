import { model, Schema } from 'mongoose';
//= TYPES
import { House } from '../interface/types';

const house = new Schema<House>({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numOfGuests: {
    type: Number,
    required: true,
  },
  numOfBets: {
    type: Number,
    required: true,
  },
  numOfBaths: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
});

const HouseModel = model<House>('house', house);
export default HouseModel;
