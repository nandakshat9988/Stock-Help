const apiKey = "d9h0m51r01qmrn76d0c0d9h0m51r01qmrn76d0cg";

const stock = localStorage.getItem("stock");

async function loadStock() {

    try {

        const response = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${apiKey}`
        );

        const data = await response.json();

        document.getElementById("companyInfo").innerHTML = `
            <img src="${data.logo}" width="80">

            <h2>${data.name}</h2>

            <p><b>Symbol:</b> ${data.ticker}</p>

            <p><b>Country:</b> ${data.country}</p>

            <p><b>Exchange:</b> ${data.exchange}</p>

            <p><b>Industry:</b> ${data.finnhubIndustry}</p>

            <p><b>IPO:</b> ${data.ipo}</p>
        `;

    } catch(err) {
        console.log(err);
    }

}

async function predictStock(symbol) {
    console.log("request sending");

    const response = await fetch("http://127.0.0.1:5000/predict", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            symbol: symbol
        })

    });
    console.log("request sent");

    const data = await response.json();
    console.log(data);

    document.getElementById("prediction").innerHTML = `
        <h2>Prediction</h2>

        <p>Current Price : $${data.currentPrice}</p>

        <p>Tomorrow Prediction : $${data.predictedPrice}</p>
    `;
    
}
async function init() {
    await loadStock();
    await predictStock(stock);
}

init();