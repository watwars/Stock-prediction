import pandas as pd
import pandas_datareader.data as reader
import datetime as dt

stock_list = ['GOOGL', 'AAPL', 'MNST', 'AMZN', 'FB', 'TPR', 'ODFL']

def beta_calculation(user_input):
    end = dt.datetime.now()
    start = dt.date(end.year - 2, end.month, end.day)
    market_index = ['^IXIC']

    df = reader.get_data_yahoo(market_index, start, end)
    weekly_returns_market = df.resample('W').ffill().pct_change()
    weekly_returns_market = weekly_returns_market.dropna()
    weekly_returns_market = weekly_returns_market['Adj Close']
    weekly_returns_market = weekly_returns_market.rename(columns={'^IXIC': 'Market Avg'})
    market_variance = weekly_returns_market.var()
    market_variance = market_variance.iloc[0]

    betas = []
    for stock_ticker_symbol in user_input:
        df = reader.get_data_yahoo([stock_ticker_symbol], start, end)
        weekly_returns_stock = df.resample('W').ffill().pct_change()
        weekly_returns_stock = weekly_returns_stock.dropna()
        weekly_returns_stock = weekly_returns_stock['Adj Close']
        covariance_table = pd.concat([weekly_returns_market, weekly_returns_stock], axis = 1)
        covariance = covariance_table.cov()
        covariance = covariance.loc['Market Avg', stock_ticker_symbol].round(7)
        beta = covariance / market_variance
        beta = beta.round(3)
        betas.append(beta)
    return betas


def growth_category(growth_pct):
    if growth_pct > 0.05:
        return 'Large Increase'
    elif growth_pct > 0.01:
        return 'Small Increase'
    elif growth_pct > 0:
        return 'No increase'
    elif growth_pct > -0.01:
        return 'Small Decrease'
    else:
        return 'Large Decrease'


'''
for stock_ticker_symbol in user_input:
    stock = []
    stock.append(stock_ticker_symbol)
    df = reader.get_data_yahoo(user_input, start, end)
    weekly_returns_stock_ml = df.resample('W').ffill().pct_change()
    weekly_returns_stock_ml = weekly_returns_stock_ml.dropna()
    weekly_returns_stock_ml = weekly_returns_stock_ml['Adj Close']
    print(weekly_returns_stock_ml)
    #weekly_returns_stock_ml['Stock Growth Category'] = weekly_returns_stock_ml['Adj Close'].apply(growth_category)
    #print(weekly_returns_stock_ml)
'''

