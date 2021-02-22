from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
# from catboost import CatBoostRegressor


model4 = pickle.load(open('model_four.pkl', 'rb'))
model8 = pickle.load(open('model_EIGHT.pkl', 'rb'))


app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/")
def hello():
    return  jsonify("This is home page")





@app.route('/predict4', methods=["POST"])
def predict4():
    content = request.get_json()
    la = content["la4"]
    oq = content["oq4"]
    yb = content["yb4"]
    ga = content["ga4"]
    data= [{'LotArea':la, 'OverallQual':oq, 'YearBuilt':yb, 'GrLivArea':ga}]
    df = pd.DataFrame(data)
    salesPrediction =  model4.predict(df)
    salesPrice = np.exp(salesPrediction)
    return jsonify(salesPrice[0])



@app.route('/predict8', methods=["POST"])
def predict8():
    content = request.get_json()
    la = content["la4"]
    oq = content["oq4"]
    yb = content["yb4"]
    ga = content["ga4"]
    data= [{'LotArea':la, 'OverallQual':oq, 'YearBuilt':yb, 'GrLivArea':ga}]
    df = pd.DataFrame(data)
    salesPrediction =  model8.predict(df)
    salesPrice = np.exp(salesPrediction)
    return jsonify(salesPrice[0])
   

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)

