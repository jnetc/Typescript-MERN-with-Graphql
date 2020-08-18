//= SCHEMA
import HouseModel from '../db/schema';
//= TYPES
import { House } from '../interface/types';

const Query = {
  house: async (_: void, { id }: { id: string }): Promise<House | null> => {
    const existList = await HouseModel.findById({ _id: id });
    if (!existList) {
      throw new Error('Not found');
    }
    return existList;
  },
  houses: async (): Promise<House[]> => {
    return await HouseModel.find({});
  },
};

export default Query;
