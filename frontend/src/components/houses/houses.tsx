import React, {useState, useEffect} from 'react';
import { server } from '../../lib/api';
import {
  Props,
  House,
  HousesData,
  CreateHouse,
  UpdateHouse,
  DeleteHouse,
  ID,
  DataVariables,
} from './types';

const HOUSES = `
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

const CREATE_HOUSE = `
  mutation CreateHouse($data: CreateListInput!) {
    createList(data: $data) {
      title
      address
      price
    }
  }
`;

const UPDATE_HOUSE = `
  mutation UpdateHouse($id: ID!, $data: UpdateListInput) {
    updateList(id: $id, data: $data){
      title
      address
      price
      rating
    }
  }
`;

const DELETE_HOUSE = `
  mutation DeleteHouse($id: ID!) {
    deleteList(id: $id) {
      _id
      title
      address
    }
  }
`;


export const Houses = ({ title }: Props) => {

  const [houses, setHouses] = useState<House[] | null>(null)

  // В квадратные скобки помещает то, что будет
  // обновляться, создаваться, удаляться
  useEffect(() => {
    fetchHouses()
  }, [houses])

  // Получаем список квартир
  const fetchHouses = async () => {
    const { data } = await server.fetch<HousesData>({ query: HOUSES });
    setHouses(data.houses)
  };

  const createHouse = async () => {
    const { data } = await server.fetch<CreateHouse, DataVariables>({
      query: CREATE_HOUSE,
      variables: {
        data: {
          title: 'Kerrostalo',
          imageUrl: 'kerros.webp',
          address: 'Vantanportti 5, 56',
          price: 845000,
          numOfGuests: 1,
          numOfBets: 3,
          numOfBaths: 1,
          rating: 4.5,
        },
      },
    });
    console.log(data);
  };

  const updateHouse = async (id: string | undefined, data: House) => {
    console.log(id, data);

    const res = await server.fetch<UpdateHouse, DataVariables>({
      query: UPDATE_HOUSE,
      variables: {
        id,
        data
      },
    });
    console.log(res);
  };

  const deleteHouse = async (id: string | undefined ) => {
    const { data } = await server.fetch<DeleteHouse, ID>({
      query: DELETE_HOUSE,
      variables: { id },
    });
    console.log(data);
  };

const DomElementHouses = houses?.map(({ _id, ...data}) => {
  return (
    <li key={_id}>
      <span>{_id}</span>
      <h2>{data.title}</h2>
      <h5>{data.address}</h5>
      <p>{data.price}</p>
      <button onClick={() => updateHouse(_id, {...data, price: 480000})}>Update</button>
      <button onClick={() => deleteHouse(_id)}>Delete</button>
    </li>
  )
})
  return (
    <>
      <h2>{title}</h2>
      {/* <button onClick={fetchHouses}>Get query</button> */}
      <ul>
        {DomElementHouses}
      </ul>
      <hr />
      <button onClick={createHouse}>Create query</button>
      <hr />
      {/* <button onClick={updateHouse}>Update query</button> */}
      <hr />
      {/* <button onClick={deleteHouse}>Delete query</button> */}
    </>
  );
};
