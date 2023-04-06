import "./SellAll.scss";

function SellAll(props) {
    const { utilization, onUtilizationChange, onRevenueChange } = props;

    const updateRevenue = async () => {
        try {
            const response = await fetch(
                "https://strawberry-farm-backend.onrender.com/sell-all",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ utilization }),
                }
            );
            const data = await response.json();
            console.log("new function");
            console.log(data);
            onRevenueChange(data.revenue); // update the revenue in the state
            onUtilizationChange(0);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <button
                id="sellAll"
                onClick={() => {
                    updateRevenue();
                }}
            >
                {props.children}
                Sell All
            </button>
        </>
    );
}

export default SellAll;
