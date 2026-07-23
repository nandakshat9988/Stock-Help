from flask import Flask, request, jsonify
from flask_cors import CORS

import yfinance as yf
import pandas as pd

from sklearn.linear_model import LinearRegression

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():

    symbol = request.json["symbol"]

    # Download last 1 year data
    df = yf.download(symbol, period="1y", multi_level_index=False)
    if df.empty:
        return jsonify({"error": "Invalid Stock Symbol"})
    print(df.head())
    print(df.columns)

    df = df[["Close"]]

    # Day number
    df["Day"] = range(len(df))

    X = df[["Day"]]
    y = df["Close"]

    model = LinearRegression()
    model.fit(X, y)

    next_day = [[len(df)]]

    prediction = model.predict(next_day)[0]

    current_price = float(df["Close"].iloc[-1])

    return jsonify({
        "symbol": symbol,
        "currentPrice": round(current_price, 2),
        "predictedPrice": round(float(prediction), 2)
    })


if __name__ == "__main__":
    app.run(debug=True)