//= Subscription Type
import { PubSubEngine } from 'apollo-server-express';
//= SCHEMA
import HouseModel from '../db/schema';
//= TYPES
import { House } from '../interface/types';

const Mutation = {
  createList: async (
    _parent: void,
    { data }: { data: House },
    { pubsub }: { pubsub: PubSubEngine }
  ): Promise<House | null> => {
    const house = await HouseModel.findOne({
      address: data.address.toLowerCase(),
    });

    if (house) {
      throw new Error(
        'This address is invalid or exist on dataabase. Please take other address.'
      );
    }

    const list = { ...data };
    const newList = await HouseModel.create(list);

    pubsub.publish('LIST_ADDED', {
      listsub: {
        type: 'ADDED',
        data: newList,
      },
    });

    return newList;
  },

  updateList: async (
    parent: void,
    { id, data }: { id: string; data: House },
    { pubsub }: { pubsub: PubSubEngine }
  ): Promise<House | null> => {
    const findHouse = await HouseModel.findByIdAndUpdate({ _id: id }, data);

    if (!findHouse) {
      throw new Error('Not found. Please сhoose another house');
    }
    pubsub.publish('LIST_UPDATED', {
      listsub: {
        type: 'UPDATED',
        data: findHouse,
      },
    });

    return findHouse;
  },

  deleteList: async (
    _parent: void,
    { id }: { id: string },
    { pubsub }: { pubsub: PubSubEngine }
  ): Promise<House | null> => {
    const findHouse = HouseModel.findByIdAndDelete({ _id: id });

    if (!findHouse) {
      throw new Error('Not found this house');
    }

    pubsub.publish('LIST_DELETED', {
      listsub: {
        type: 'DELETED',
        data: findHouse,
      },
    });

    return findHouse;
  },
};

export default Mutation;
