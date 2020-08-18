export interface House {
  _id?: string
  title?: string
  imageUrl?: string
  address?: string
  price?: number
  numOfGuests?: number
  numOfBets?: number
  numOfBaths?: number
  rating?: number
}

// Query
export interface HousesData {
  houses: House[]
}

// Mutation
export interface CreateHouse {
  createList: House
}
export interface UpdateHouse {
  updateList: House
}
export interface DeleteHouse {
  deleteList: House
}

// Variables
export interface ID {
  id?: string
}
export interface DataVariables extends ID {
  data: House
}

// PROPS
export interface Props {
  title: string;
}