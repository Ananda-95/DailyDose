import { useState, useEffect } from "react";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const styles = {
        main: {
            padding: "10px",
            margin: "10px",
        },
    };

    const fetchRecords = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos"
            );
            if (!response.ok) {
                throw new Error("error with api endpoint");
            }
            const result = await response.json();
            setProducts(result);
        } catch (err) {
            setErrors(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const searchResult = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <>
            <div style={styles.main}>
                <label>Search bar</label>
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search text"
                />
            </div>
            {loading && <h5>Loading...</h5>}

            {errors && <h5>{errors}</h5>}

            <div style={styles.main}>
                {products.length > 0 ? (
                    <div>
                        {searchResult.map((product) => (
                            <div key={product.id}>{product.title}</div>
                        ))}
                    </div>
                ) : (
                    "no products available"
                )}
            </div>
        </>
    );
};

export default Products;
