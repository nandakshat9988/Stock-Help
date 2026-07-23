async function selectStock() {

    let stock = document.getElementById("stockInput").value;
    const apiKey = "d9h0m51r01qmrn76d0c0d9h0m51r01qmrn76d0cg";
    if(stock === ""){
        alert("Please select a stock");
        return;
    }
    try {

        const response = await fetch(
            `https://finnhub.io/api/v1/stock/profile2?symbol=${stock}&token=${apiKey}`
        );
        const data = await response.json();
        document.getElementById("result").innerHTML = `
            <h3>${data.name}</h3>
            <p><strong>Symbol:</strong> ${data.ticker}</p>
            <p><strong>Country:</strong> ${data.country}</p>
            <p><strong>Exchange:</strong> ${data.exchange}</p>
            <p><strong>Industry:</strong> ${data.finnhubIndustry}</p>
            <p><strong>IPO Date:</strong> ${data.ipo}</p>
            <img src="${data.logo}" width="100">
        `;
    } catch(error) {
        console.log(error);
    }
}



const input = document.getElementById("stockInput");
const suggestions = document.getElementById("suggestions");
input.addEventListener("keyup", async () => {
    const query = input.value;
    if(query.length < 2){
        suggestions.innerHTML = "";
        return;
    }
    const apiKey = "d9h0m51r01qmrn76d0c0d9h0m51r01qmrn76d0cg";
    try {
    const response = await fetch(
        `https://finnhub.io/api/v1/search?q=${query}&token=${apiKey}`
    );
    const data = await response.json();
    suggestions.innerHTML = "";
    data.result.forEach(stock => {
        const item = document.createElement("div");
        item.innerHTML =
            `${stock.description} (${stock.symbol})`;
        item.classList.add("stock-item");
        item.onclick = () => {
            input.value = stock.symbol;
            suggestions.innerHTML = "";
        };
        suggestions.appendChild(item);
    });
} catch(error) {
    console.log(error);
}

});