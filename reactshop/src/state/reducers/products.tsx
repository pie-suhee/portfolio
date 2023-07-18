import { SET_PRODUCTS } from '../../constants/actionTypes'

type Product = {
    id: number
    name: string
    price: number
}

type ProductsState = Product[]

const INIT_STATE: ProductsState = []

const productsReducer = (state = INIT_STATE, action: { type: string, payload: Product[] }) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return [...action.payload]
        default:
            return state
    }
}

export default productsReducer