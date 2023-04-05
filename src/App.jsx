import "./App.scss";
import Home from "./pages/Home";
import React, { useState, useEffect } from "react";

function App() {
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://strawberry-farm-backend.onrender.com")
            .then((response) => response.json())
            .then((data) => {
                setMaxCapacity(data.maxCapacity);
                console.log("maxCapacity fetch in App " + data.maxCapacity);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div id="App">
            <Home
                fetchData={fetchData}
                maxCapacity={maxCapacity}
                revenue={revenue}
            />
        </div>
    );
}

export default App;
