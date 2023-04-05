import React, { useState, useEffect } from "react";
import axios from "axios";

import Farm from "../assets/img/farm.png";
import Pony from "../assets/img/pony.webp";
import Buttons from "../components/Buttons";

function Home(props) {
    const [revenue, setRevenue] = useState(0);
    const [utilization, setUtilization] = useState(0);

    const { maxCapacity, fetchData } = props;
    useEffect(() => {
        fetchRevenue();
    }, []);
    const fetchRevenue = () => {
        fetch("https://strawberry-farm-backend.onrender.com")
            .then((response) => response.json())
            .then((data) => {
                setRevenue(data.revenue);
                console.log("Revenue fetch in Home " + data.revenue);
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
                setUtilization(0);
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

    return (
        <>
            <h1>Revenue: ${revenue}</h1>
            <section id="dashboard">
                <article id="counter">
                    <Buttons
                        maxCapacity={maxCapacity}
                        utilization={utilization}
                        onUtilizationChange={setUtilization}
                    />
                    <p>
                        storage: {utilization} / {maxCapacity}
                    </p>
                </article>
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
        </>
    );
}

export default Home;
