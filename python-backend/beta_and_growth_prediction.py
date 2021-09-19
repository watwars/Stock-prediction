import numpy as np
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import pandas_datareader.data as reader
import datetime as dt

def beta_calculation(stock_ticker_symbol):
    stock_info = []
    end = dt.datetime.now()
    start = dt.date(end.year - 2, end.month, end.day)

    market_index = ['^IXIC']
    df_market = reader.get_data_yahoo(market_index, start, end)
    weekly_returns_market = df_market.resample('W').ffill().pct_change()
    weekly_returns_market = weekly_returns_market.dropna()
    weekly_returns_market = weekly_returns_market['Adj Close']
    weekly_returns_market = weekly_returns_market.rename(columns={'^IXIC': 'Market Avg'})
    market_variance = weekly_returns_market.var()
    market_variance = market_variance.iloc[0]

    df_stock = reader.get_data_yahoo([stock_ticker_symbol], start, end)
    weekly_returns_stock = df_stock.resample('W').ffill().pct_change()
    weekly_returns_stock = weekly_returns_stock.dropna()
    weekly_returns_stock = weekly_returns_stock['Adj Close']
    covariance_table = pd.concat([weekly_returns_market, weekly_returns_stock], axis = 1)
    covariance = covariance_table.cov()
    covariance = covariance.loc['Market Avg', stock_ticker_symbol].round(7)
    beta = covariance / market_variance
    beta = beta.round(3)
    stock_info.append(beta)

    daily_price_stock = df_stock.to_period('D')
    daily_price_stock = daily_price_stock.dropna()
    daily_price_stock = daily_price_stock['Adj Close']
    daily_price_stock = daily_price_stock[str(stock_ticker_symbol)]
    train_data = daily_price_stock.iloc[0:1095]
    model = ARIMA(train_data, order=(1, 1, 0), seasonal_order=(0, 0, 0, 0))
    fitted_model = model.fit()
    prediction = fitted_model.predict(start=1096, end=1096)
    prediction = prediction.iloc[0]
    prediction = prediction.round(3)
    stock_info.append(prediction)

    return stock_info


