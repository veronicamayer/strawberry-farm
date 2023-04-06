import React, { useState, useEffect } from "react";
import "./Home.scss";

import Farm from "../../assets/img/farm.png";
import Buttons from "../../components/Buttons/Buttons";
import SellAll from "../../components/SellAll/SellAll";
import BuyPony from "../../components/BuyPony/BuyPony";

function Home(props) {
    const [revenue, setRevenue] = useState(0);
    const [utilization, setUtilization] = useState(0);
    const [maxCapacity, setMaxCapacity] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://strawberry-farm-backend.onrender.com"
                );
                const data = await response.json();
                setMaxCapacity(data.maxCapacity);
                console.log("maxCapacity fetch in Home " + data.maxCapacity);
                setRevenue(data.revenue);
                console.log("Revenue fetch in Home " + data.revenue);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

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
                    <SellAll
                        utilization={utilization}
                        onUtilizationChange={setUtilization}
                        onRevenueChange={setRevenue}
                    />
                </article>
                <BuyPony onRevenueChange={setRevenue} />
            </section>
            <img src={Farm} alt="" />
        </>
    );
}

export default Home;
