//= Subscription Type
import { PubSubEngine } from 'apollo-server-express';

const Subscription = {
  listsub: {
    subscribe: (
      _parent: void,
      _args: void,
      { pubsub }: { pubsub: PubSubEngine }
    ): unknown => {
      return pubsub.asyncIterator([
        'LIST_ADDED',
        'LIST_UPDATED',
        'LIST_DELETED',
      ]);
    },
  },
};

export default Subscription;
