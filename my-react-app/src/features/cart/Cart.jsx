import { useState } from 'react';

const products = [
    { id: 1, name: 'Pen', price: 99 },
    { id: 2, name: 'Books', price: 149 },
    { id: 3, name: 'Bags', price: 809 },
];


const Cart = () => {

    const [cartsItems, setCartItems] = useState([]);

    const addToCart = (product) => {

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                return prev.map((item) => {
                    return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                })
            } else {
                return [...prev, { ...product, quantity:1 }]
            }

        })

    }

    const removeFromCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (!existing) return prev;

            if (existing.quantity === 1) {
                return prev.map((item) => item.id !== product.id)
            } else {
                prev.map((item) => {
                    return item.id === product.id ? { ...item, quantity: item.quantity -1 } : item
                })
            }
        })
    }
    return (
        <>
            <div>
                {
                    products.map((product) => (
                        <div key={product.id}>
                            <span>{product.name} - {product.price} </span>
                            <button onClick={()=>addToCart(product) }>Add to Cart</button>
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    cartsItems.length > 0 ? 
                        <div>
                            {
                                cartsItems.map((item) => (
                                    <div key={item.id}>
                                        <span>{item.name} - {item.price} - {item.quantity}</span>
                                        <button onClick={() => removeFromCart(item) }>Remove From Cart</button>
                                    </div>
                                ))
                            }
                    </div>
                    
                    : "no items added to cart yet"
                }
            </div>
        
        </>
    )
}

export default Cart