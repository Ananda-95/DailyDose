
import { useState, useEffect } from "react";

const DebouncedSearch = ({
    onSearch,
    delay = 500,
    placeholder = "Search..."
}) => {

    const [search, setSearch] = useState("");

    useEffect(() => {

        const timer = setTimeout(() => {
            onSearch(search);
        }, delay);

        return () => {
            clearTimeout(timer);
        };

    }, [search, delay, onSearch]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder={placeholder}
        />
    );
};

export default DebouncedSearch;
