import numpy as np
import pandas as pd 
import pickle 

model4 = pickle.load(open('model_four.pkl', 'rb'))

def predict4():
    # content = request.get_json()
    # la = content["la4"]
    # oq = content["oq4"]
    # yb = content["yb4"]
    # ga = content["ga4"]
    data= [{'LotArea':1300, 'OverallQual':9, 'YearBuilt':3007, 'GrLivArea':790}]
    df = pd.DataFrame(data)
    salesPrediction =  model4.predict(df)
    salesPrice = np.exp(salesPrediction) 

    print(salesPrice[0])

predict4()