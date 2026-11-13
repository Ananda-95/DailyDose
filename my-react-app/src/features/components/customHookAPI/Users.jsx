
import useFetch from "./useFetch";

const Users = () => {

    const {
        data,
        loading,
        error,
        refetch
    } = useFetch("https://jsonplaceholder.typicode.com/users");

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (error) {
        return <h3>Error: {error}</h3>;
    }

    return (
        <div>
            <h2>Users List</h2>

            <button onClick={refetch}>
                Refetch Users
            </button>

            {data?.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            ))}
        </div>
    );
};

export default Users;
