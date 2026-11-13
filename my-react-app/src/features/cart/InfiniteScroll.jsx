import { useState, useEffect, useRef } from "react";
const InfiniteScroll = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasScroll, setHasScroll] = useState(true);
    const [errors, setErrors] = useState(null);
    const observerRef = useRef(null);

    const LIMIT = 10;

    const fetchProducts = async () => {
        try {
            const skip = products.length;
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);

           
            if (!response.ok) {
                throw new Error("some error");
            }
            const result = await response.json();
         
            setProducts((prev) => ([
                ...prev, ...result.products
            ]));

            setHasScroll(skip + result.products.length < result.total)

        } catch (error) {
            setErrors(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);


    useEffect(() => {
        if (loading || !hasScroll) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchProducts();
                }
            },
            {
                threshold: 1
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loading, hasScroll]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Infinite Scroll Products</h2>

            {
                loading && <h5>Loading</h5>
            }
            {
                errors && <p>{errors.message}</p>
            }
            <div>

                {
                    products.length > 0 ?
                    products.map((product) => (
                        <div key={product.id}>
                            {
                                product.title
                            }
                        </div>
                    )) : "no products available"
                }

            </div>
           
            <h3>
                {
                    hasScroll ? "loading" : "no more data available"
                }
            </h3>

            <div
                ref={observerRef}
                style={{ height: "20px" }}
            />


        </div>
    );
};

export default InfiniteScroll;
