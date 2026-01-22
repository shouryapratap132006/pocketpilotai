from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from graph import finance_app

app = FastAPI(title="PocketPilot AI")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FinanceRequest(BaseModel):
    income: int
    expenses: Dict[str, int]
    goal: str

@app.get("/")
async def root():
    return {"message": "AI Personal Finance Copilot API is running"}

@app.post("/api/finance")
async def process_finance(request: FinanceRequest):
    try:
        # Initial state
        initial_state = {
            "income": request.income,
            "expenses": request.expenses,
            "goal": request.goal,
            "analysis": "",
            "savings": 0,
            "advice": "",
            "savings_plan": ""
        }
        
        # Run the graph
        result = finance_app.invoke(initial_state)
        
        return {
            "analysis": result.get("analysis"),
            "advice": result.get("advice"),
            "savings_plan": result.get("savings_plan", ""),
            "savings": result.get("savings")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
