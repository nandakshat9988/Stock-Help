function selectStock() {
    const stock = document.getElementById("stockInput").value;

    if (stock === "") {
        alert("Please select a stock");
        return;
    }

    localStorage.setItem("stock", stock);

    window.location.href = "stock.html";
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