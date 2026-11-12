
import { useState } from "react";
import DebouncedSearch from "./DebouncedSearch";

const Products = () => {

    const products = [
        { id: 1, name: "Laptop" },
        { id: 2, name: "Mobile" },
        { id: 3, name: "Keyboard" },
        { id: 4, name: "Mouse" },
        { id: 5, name: "Monitor" }
    ];

    const [filteredProducts, setFilteredProducts] =
        useState(products);

    const handleSearch = (searchText) => {

        const result = products.filter((product) =>
            product.name
                .toLowerCase()
                .includes(searchText.toLowerCase())
        );

        setFilteredProducts(result);
    };

    return (
        <div>
            <h2>Product Search</h2>

            <DebouncedSearch
                onSearch={handleSearch}
                delay={500}
                placeholder="Search products..."
            />

            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <div key={product.id}>
                        {product.name}
                    </div>
                ))
            ) : (
                <p>No products found</p>
            )}
        </div>
    );
};

export default Products;
