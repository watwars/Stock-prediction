from fastapi import FastAPI
from beta_and_growth_prediction import beta_calculation
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/betas")
def root(stocks) -> List[float]:
    print(stocks)
    return {"betas": beta_calculation(stocks)}