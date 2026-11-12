
import { useState } from "react";

const SkillsCheckbox = () => {

    const skillsList = [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Redux",
        "TypeScript",
        "Node.js"
    ];

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedSkills((prev) => [...prev, value]);
        } else {
            setSelectedSkills((prev) =>
                prev.filter((skill) => skill !== value)
            );
        }
    };

    return (
        <div>
            <h2>Select Your Skills</h2>

            {skillsList.map((skill) => (
                <div key={skill}>
                    <label>
                        <input
                            type="checkbox"
                            value={skill}
                            checked={selectedSkills.includes(skill)}
                            onChange={handleChange}
                        />
                        {skill}
                    </label>
                </div>
            ))}

            <hr />

            <h3>Selected Skills:</h3>

            {selectedSkills.length > 0 ? (
                <ul>
                    {selectedSkills.map((skill) => (
                        <li key={skill}>{skill}</li>
                    ))}
                </ul>
            ) : (
                <p>No skills selected</p>
            )}

            <p>
                Total Selected: {selectedSkills.length}
            </p>
        </div>
    );
};

export default SkillsCheckbox;
