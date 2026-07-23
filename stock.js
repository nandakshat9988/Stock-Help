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

loadStock();