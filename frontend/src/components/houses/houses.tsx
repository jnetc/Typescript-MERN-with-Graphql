import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

// import { server } from '../../lib/api';
import {
  Props,
  HousesData,
  // HouseWithId,
  // CreateHouse,
  // UpdateHouse,
  // DeleteHouse,
  House,
  // ID,
  // DataVariables,
} from './types';

const HOUSES = gql`
  query Data {
    houses {
      _id
      title
      imageUrl
      address
      price
      numOfGuests
      numOfBets
      numOfBaths
    }
  }
`;

const CREATE_HOUSE = gql`
  mutation CreateList($data: CreateListInput!) {
    createList(data: $data) {
      title
      address
      price
    }
  }
`;

const UPDATE_HOUSE = gql`
  mutation UpdateList($id: ID!, $data: UpdateListInput) {
    updateList(id: $id, data: $data) {
      title
      imageUrl
      address
      price
      numOfGuests
      numOfBets
      numOfBaths
      rating
    }
  }
`;

const DELETE_HOUSE = gql`
  mutation DeleteList($id: ID!) {
    deleteList(id: $id) {
      _id
      title
      address
    }
  }
`;

export const Houses = ({ title }: Props) => {
  // const [houses, setHouses] = useState<House[] | null>(null)

  const { loading, data: getData, refetch } = useQuery<HousesData>(HOUSES);

  const [createHouse] = useMutation(CREATE_HOUSE);
  const [updateHouse, {data}] = useMutation(UPDATE_HOUSE);
  const [deleteHouse] = useMutation(DELETE_HOUSE);

  if (loading) return <h2>Loading</h2>;

  const handlerCreateHouse = async () => {
    await createHouse({
      variables: {
        data: {
          title: 'Kerrostalo',
          imageUrl: 'kerros.webp',
          address: 'Vantanportti 42, 42',
          price: 845000,
          numOfGuests: 1,
          numOfBets: 3,
          numOfBaths: 1,
          rating: 4.5,
        },
      },
    });
    refetch();
  };

  const handlerUpdateHouse = async (id: string, data: House) => {
    await updateHouse({
      variables: {
        id,
        data
      },
      optimisticResponse: true,

    });
    refetch()
  };

  const handlerDeleteHouse = async (id: string) => {
    await deleteHouse({
      variables: { id }
    });
    refetch()
  };
  console.log(getData?.houses);

  const DomElementHouses = getData?.houses.map(({ _id, title, address, price }) => {
    return (
      <li key={_id}>
        <span>{_id}</span>
        <h2>{title}</h2>
        <h5>{address}</h5>
        <p>{price}</p>
        <button
          onClick={() => handlerUpdateHouse(_id, { price: 500005, title: "Esponkaupunki asunto", address: "Matinkyla 23 a, 34" })}>
          Update
        </button>
        <button onClick={() => handlerDeleteHouse(_id)}>Delete</button>
      </li>
    );
  });

  return (
    <>
      <h2>{title}</h2>
      <ul>{DomElementHouses}</ul>
      <hr />
      <button onClick={handlerCreateHouse}>Create query</button>
      <hr />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};


