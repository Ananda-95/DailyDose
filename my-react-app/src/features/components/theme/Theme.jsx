import { useState } from "react";

const Theme = () => {
    const [isDark, setIsDark] = useState(false);

    const styles = {
        main: {
            minHeight: "100vh",
            padding: "10px",
            backgroundColor:  isDark? "#000": "#FFF" ,
            color: isDark? "#FFF": "#000" ,
            border:"1px solid #ccc"
        },

        button: {
            backgroundColor:  isDark? "#FFF": "#000" ,
            padding: "10px",
            color: isDark ? "#000" : "#FFF"
        }
    }

    const themeChange = () => {
        setIsDark(!isDark);
    }
    return (
        <>
            <div style={styles.main}>

                <button onClick={themeChange} style={styles.button}>Change Theme</button>

            </div>
        </>
    )
}
export default Theme