export interface House {
  title?: string
  imageUrl?: string
  address?: string
  price?: number
  numOfGuests?: number
  numOfBets?: number
  numOfBaths?: number
  rating?: number
}

export interface HouseWithId extends House {
  _id: string
}

// Query
export interface HousesData {
  houses: HouseWithId[]
}

// Mutation
export interface CreateHouse {
  createList: House
}
export interface UpdateHouse {
  updateList: House
}
export interface DeleteHouse {
  deleteList: HouseWithId
}

// Variables
export interface ID {
  id: string
}
export interface DataVariables extends ID {
  data: House
}

// PROPS
export interface Props {
  title: string;
}