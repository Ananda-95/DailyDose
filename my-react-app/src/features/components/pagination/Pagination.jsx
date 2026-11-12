import { useState } from "react";

const users = [
    { id: 1, name: "Ananda", email: "ananda@gmail.com", role: "Developer" },
    { id: 2, name: "Rahul", email: "rahul@gmail.com", role: "Developer" },
    { id: 3, name: "Priya", email: "priya@gmail.com", role: "Tester" },
    { id: 4, name: "Kiran", email: "kiran@gmail.com", role: "Developer" },
    { id: 5, name: "Sneha", email: "sneha@gmail.com", role: "Designer" },
    { id: 6, name: "Arun", email: "arun@gmail.com", role: "Developer" },
    { id: 7, name: "Divya", email: "divya@gmail.com", role: "Tester" },
    { id: 8, name: "Manoj", email: "manoj@gmail.com", role: "Developer" },
    { id: 9, name: "Pooja", email: "pooja@gmail.com", role: "Designer" },
    { id: 10, name: "Vijay", email: "vijay@gmail.com", role: "Developer" },
    { id: 11, name: "Ravi", email: "ravi@gmail.com", role: "Tester" },
    { id: 12, name: "Swathi", email: "swathi@gmail.com", role: "Developer" },
    { id: 13, name: "Ajay", email: "ajay@gmail.com", role: "Developer" },
    { id: 14, name: "Meena", email: "meena@gmail.com", role: "Designer" },
    { id: 15, name: "Suresh", email: "suresh@gmail.com", role: "Developer" },
    { id: 16, name: "Deepa", email: "deepa@gmail.com", role: "Tester" },
    { id: 17, name: "Naveen", email: "naveen@gmail.com", role: "Developer" },
    { id: 18, name: "Asha", email: "asha@gmail.com", role: "Designer" },
    { id: 19, name: "Ramesh", email: "ramesh@gmail.com", role: "Developer" },
    { id: 20, name: "Kavya", email: "kavya@gmail.com", role: "Tester" },
];

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const totalPages = Math.ceil(users.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;

    const tableUsers = users.slice(startIndex, startIndex + pageSize);

    const handleClick = (page) => {
        setCurrentPage(page);
    }
    const handleLength = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(1);
    }
    return (
        <>
            <div>
                <select name="pageLength" onChange={handleLength}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <table>
                    <thead>
                    <tr>
                    <th>User Id</th>
                    <th>User Name</th>
                    <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
             
                    <tbody>
                        {
                            tableUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <button disabled={currentPage === 1} onClick={() => handleClick(currentPage - 1)}>Prev</button>

                        {
                            Array.from(
                                { length: totalPages },
                                (_, index)=> index +1
                            ).map((page) => (
                                <button onClick={() => handleClick(page)} style={{ background: currentPage===page ? "blue" : "" }}>{page}</button>
                            ))
                        }

                        <button disabled={currentPage === totalPages} onClick={() => handleClick(currentPage+1)}>Next</button>
                    </tfoot>
                </table>

            </div>
        </>
    )
}
export default Pagination