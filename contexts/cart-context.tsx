'use client' //marca o arquivo como cliente component

import { createContext, useContext, useReducer } from 'react'
import { Product } from '@/lib/products'

type CartItem = {    //representa produto no carrinha com qtd, reutiliza o tipo Product que ja existe
  product: Product
  quantity: number
}

type CartState = {   //define todos os eventos possíveis que podem modificar o carrinhod
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: number }
  | { type: 'INCREASE'; productId: number }
  | { type: 'DECREASE'; productId: number }
  | { type: 'CLEAR' }


//função do carrinho de compra  
//função pura que recebe o estado atual + uma ação e devolve o novo estado. Nunca modifica o estado diretamente — sempre cria objetos novo
  function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find((i) => i.product.id === action.product.id)
      if (exists) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, quantity: 1 }] }
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) }
    case 'INCREASE':
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      }
    case 'DECREASE':
      return {
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  totalPriceInCents: number
  add: (product: Product) => void
  remove: (productId: number) => void
  increase: (productId: number) => void
  decrease: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPriceInCents = state.items.reduce(  //percorre todos os itens do carrinho
    (sum, i) => sum + i.product.priceInCents * i.quantity, //verifica todos os itens do carrinho, some a quantidade e devolve o total
    0
  )

  return (
    <CartContext.Provider   // componente que envolve a árvore de componentes e disponibiliza o carrinho para todos os filhos. Calcula totalItems e totalPriceInCents derivados do estado — não são estados separados, são computados na hora.
      value={{
        items: state.items,
        totalItems,
        totalPriceInCents,
        add: (product) => dispatch({ type: 'ADD', product }),
        remove: (productId) => dispatch({ type: 'REMOVE', productId }),
        increase: (productId) => dispatch({ type: 'INCREASE', productId }),
        decrease: (productId) => dispatch({ type: 'DECREASE', productId }),
        clear: () => dispatch({ type: 'CLEAR' }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() { //garante que ninguem use o ook fora do provider por acidente
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider')
  return context
}
