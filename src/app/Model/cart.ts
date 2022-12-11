export enum CartOperations {
  ADD = 'add',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface CartPayload {
  data: CartItemDetail,
  operation: CartOperations
}

export interface CartItemDetail {
  productId: number,
  quantity: number
}

export interface CartResponse {
  message: string
}
