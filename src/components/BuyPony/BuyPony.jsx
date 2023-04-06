import Pony from "../../assets/img/pony.webp";
import "./BuyPony.scss";

function BuyPony(props) {
    const { onRevenueChange } = props;

    const resetRevenue = async () => {
        try {
            const response = await fetch(
                "https://strawberry-farm-backend.onrender.com/reset-revenue",
                {
                    method: "POST",
                }
            );
            const data = await response.json();
            console.log("new function 2");
            console.log(data);
            onRevenueChange(data.revenue); // update the revenue in the state
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                id="pony"
                onClick={() => {
                    resetRevenue();
                }}
            >
                {props.children}
                <img src={Pony} alt="" />
                <span>Buy a pony</span>
                <img src={Pony} alt="" />
            </button>
        </>
    );
}

export default BuyPony;
