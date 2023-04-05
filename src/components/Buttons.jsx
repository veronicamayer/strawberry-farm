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

    const updateUtilization = (increment) => {
        axios
            .post(
                "https://strawberry-farm-backend.onrender.com/update-utilization",
                { increment }
            )
            .then((response) => {
                console.log(response.data);
                onUtilizationChange(response.data.utilization);
                fetchUtilization();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const buttonDisabled1 = utilization >= maxCapacity;
    const buttonDisabled5 = utilization >= maxCapacity - 4;
    const buttonDisabled10 = utilization >= maxCapacity - 9;

    return (
        <div id="buttons">
            <button
                id="one"
                onClick={() => {
                    updateUtilization(1);
                }}
                disabled={buttonDisabled1}
            >
                {props.children}
                <img src={Strawberry} alt="" />
            </button>
            <button
                id="five"
                onClick={() => {
                    updateUtilization(5);
                }}
                disabled={buttonDisabled5}
            >
                {props.children}
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
            </button>
            <button
                id="ten"
                onClick={() => {
                    updateUtilization(10);
                }}
                disabled={buttonDisabled10}
            >
                {props.children}
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
                <img src={Strawberry} alt="" />
            </button>
        </div>
    );
}

export default Buttons;
