import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

import Farm from "./assets/img/farm.png";
import Strawberry from "./assets/img/strawberry.png";
import Pony from "./assets/img/pony.webp";

function App() {
    const [utilization, setUtilization] = useState(0);
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://strawberry-farm-backend.onrender.com")
            .then((response) => response.json())
            .then((data) => {
                setUtilization(data.utilization);
                setMaxCapacity(data.maxCapacity);
                setRevenue(data.revenue);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateUtilization = (increment) => {
        axios
            .post(
                "https://strawberry-farm-backend.onrender.com/update-utilization",
                { increment }
            )
            .then((response) => {
                console.log(response.data);
                setUtilization(response.data.utilization);
                fetchData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateRevenue = () => {
        axios
            .post("https://strawberry-farm-backend.onrender.com/sell-all", {
                utilization,
            })
            .then((response) => {
                console.log(response.data);
                setRevenue(response.data.revenue); // update the revenue in the state
                fetchData(); // refetch the utilization data
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const resetRevenue = () => {
        axios
            .post("https://strawberry-farm-backend.onrender.com/reset-revenue")
            .then((response) => {
                console.log(response.data);
                setRevenue(response.data.revenue); // update the revenue in the state
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const buttonDisabled1 = utilization >= maxCapacity;
    const buttonDisabled5 = utilization >= maxCapacity - 4;
    const buttonDisabled10 = utilization >= maxCapacity - 9;

    return (
        <div id="App">
            <h1>Revenue: ${revenue}</h1>
            <section id="dashboard">
                <div id="buttons">
                    <button
                        id="one"
                        onClick={() => updateUtilization(1)}
                        disabled={buttonDisabled1}
                    >
                        <img src={Strawberry} alt="" />
                    </button>
                    <button
                        id="five"
                        onClick={() => updateUtilization(5)}
                        disabled={buttonDisabled5}
                    >
                        <img src={Strawberry} alt="" />{" "}
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                    </button>
                    <button
                        id="ten"
                        onClick={() => updateUtilization(10)}
                        disabled={buttonDisabled10}
                    >
                        <img src={Strawberry} alt="" />{" "}
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />{" "}
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                        <img src={Strawberry} alt="" />
                    </button>
                </div>
                <article id="storage">
                    <div id="maxCapacity" style={{ height: `${maxCapacity}%` }}>
                        <div
                            id="utilization"
                            style={{ height: `${utilization}%` }}
                        ></div>
                    </div>
                    <button onClick={updateRevenue}>Sell All</button>
                </article>
                <button id="pony" onClick={resetRevenue}>
                    <img src={Pony} alt="" />
                    <span>Buy a pony</span>
                    <img src={Pony} alt="" />
                </button>
            </section>
            <img src={Farm} alt="" />
        </div>
    );
}

export default App;
