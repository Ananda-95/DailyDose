import { useState } from "react";
const UserForm = () => {
    const [formData, setFormData] = useState({
        uname: "",
        gender: "",
        city: "",
        skills: "",
    });

    const [submittedData, setSubmittedData] = useState([]);

    const skills = ["html", "css", "javascript"];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("form submitted");

        setSubmittedData((prev) => [...prev, formData]);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item != value),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="uname"
                        value={formData.uname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type="radio"
                        name="gender"
                        value="male"
                        onChange={handleChange}
                        Checked={formData.gender === "male"}
                    />{" "}
                    Male
                    <input
                        type="radio"
                        name="gender"
                        value="female"
                        onChange={handleChange}
                        Checked={formData.gender === "female"}
                    />{" "}
                    Female
                </div>
                <div>
                    <label>City</label>
                    <select name="city" value={formData.city} onChange={handleChange}>
                        <option value="">---select---</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Mysore">Mysore</option>
                    </select>
                </div>
                <div>
                    <label>Skills</label>
                    {skills.map((skill) => (
                        <span>
                            <input
                                type="checkbox"
                                name="skills"
                                value={skill}
                                onChange={handleChange}
                                checked={formData.skills.includes(skill)}
                            />{" "}
                            <span>{skill}</span>
                        </span>
                    ))}
                </div>
                <div>
                    <input type="submit" value="submit" />
                </div>

                <div>
                    {submittedData.length > 0 &&
                        submittedData.map((data, index) => (
                            <div key={index}>
                                <p>Name: {data.uname}</p>
                                <p>Gender: {data.gender}</p>
                                <p>City: {data.city}</p>
                                <p>Skills: {data.skills.join(", ")}</p>
                                <hr />
                            </div>
                        ))}
                </div>
            </form>
        </>
    );
};

export default UserForm;
