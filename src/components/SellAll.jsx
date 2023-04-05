import axios from "axios";
import Strawberry from "../assets/img/strawberry.png";
import React, { useEffect } from "react";

function Buttons(props) {
    const { maxCapacity, utilization, onUtilizationChange } = props;

    useEffect(() => {
        fetchUtilization();
    }, []);

    const fetchUtilization = () => {
        fetch("https://strawberry-farm-backend.onrender.com")
            .then((response) => response.json())
            .then((data) => {
                onUtilizationChange(data.utilization);
                console.log(
                    "Utilization fetch in Buttons " + data.utilization + " "
                );
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
                onUtilizationChange(0);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <button onClick={updateRevenue}>Sell All</button>
        </>
    );
}

export default Buttons;
