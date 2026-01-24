import os
from typing import TypedDict, Dict, Literal
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from dotenv import load_dotenv

load_dotenv()

# Define the state
class FinanceState(TypedDict):
    income: int
    expenses: Dict[str, int]
    goal: str
    analysis: str
    savings: int
    advice: str
    savings_plan: str

# Helper to get Gemini LLM
def get_llm():
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key or api_key == "your_google_api_key_here":
        print("WARNING: GOOGLE_API_KEY is not set. Using mock responses.")
        return None
        
    return ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0,
        google_api_key=api_key
    )

# Node 1: Analyze Budget
def analyze_budget(state: FinanceState):
    total_expenses = sum(state["expenses"].values())
    savings = state["income"] - total_expenses
    
    analysis = f"Total Monthly Income: ${state['income']}\n"
    analysis += f"Total Monthly Expenses: ${total_expenses}\n"
    analysis += f"Initial Monthly Savings: ${savings}\n"
    analysis += "Breakdown:\n"
    for category, amount in state["expenses"].items():
        analysis += f"- {category.capitalize()}: ${amount}\n"
    
    return {
        "analysis": analysis,
        "savings": savings
    }

# Node 2: Check Overspending (Conditional Router)
def check_overspending(state: FinanceState) -> Literal["reduce_expenses", "generate_savings_plan"]:
    if state["savings"] < 0:
        return "reduce_expenses"
    else:
        return "generate_savings_plan"

# Node 3: Reduce Expenses
def reduce_expenses(state: FinanceState):
    llm = get_llm()
    if llm:
        try:
            prompt = f"""
            User is overspending by ${abs(state['savings'])}. 
            Monthly Income: ${state['income']}
            Monthly Expenses: {state['expenses']}
            Goal: {state['goal']}
            
            Suggest 3 realistic and non-judgmental expense cuts to help them reach a positive savings balance.
            Keep it practical and supportive.
            """
            response = llm.invoke([HumanMessage(content=prompt)])
            advice = response.content
        except Exception as e:
            print(f"Error in reduce_expenses: {e}")
            advice = "I'm having trouble connecting to my AI core right now, but generally, consider reducing non-essential subscriptions or dining out temporarily."
    else:
        advice = "Mock Advice: 1. Cook at home more. 2. Cancel unused subscriptions. 3. Look for cheaper utility plans."
    
    return {"advice": advice}

# Node 4: Generate Savings Plan
def generate_savings_plan(state: FinanceState):
    llm = get_llm()
    if llm:
        try:
            prompt = f"""
            User has ${state['savings']} in monthly savings.
            Monthly Income: ${state['income']}
            Monthly Expenses: {state['expenses']}
            Goal: {state['goal']}
            
            Generate a monthly savings plan to help them achieve their goal: {state['goal']}.
            Focus on allocation of their ${state['savings']} savings.
            Do NOT provide investment or trading advice.
            """
            response = llm.invoke([HumanMessage(content=prompt)])
            savings_plan = response.content
        except Exception as e:
            print(f"Error in generate_savings_plan: {e}")
            savings_plan = f"I'm experiencing some technical difficulties, but I suggest putting most of your ${state['savings']} into your {state['goal']} for now."
    else:
        savings_plan = f"Mock Savings Plan: Allocate 50% of your ${state['savings']} to your {state['goal']} and 50% to an emergency fund."
    
    return {"savings_plan": savings_plan}

# Node 5: Final Advice
def final_advice(state: FinanceState):
    summary = state["analysis"]
    overspending_warning = "⚠️ WARNING: You are currently spending more than you earn." if state["savings"] < 0 else "✅ Great job! You have a positive savings balance."
    
    final_disclaimer = "\n\nDISCLAIMER: This analysis is for educational purposes only and does not constitute professional financial advice."
    
    # Consolidate advice if one exists
    combined_advice = f"{overspending_warning}\n\n{state.get('advice', '') or state.get('savings_plan', '')}"
    
    return {"advice": combined_advice + final_disclaimer}

# Build the Graph
workflow = StateGraph(FinanceState)

# Add nodes
workflow.add_node("analyze_budget", analyze_budget)
workflow.add_node("reduce_expenses", reduce_expenses)
workflow.add_node("generate_savings_plan", generate_savings_plan)
workflow.add_node("final_advice", final_advice)

# Set entry point
workflow.set_entry_point("analyze_budget")

# Add conditional edges
workflow.add_conditional_edges(
    "analyze_budget",
    check_overspending,
    {
        "reduce_expenses": "reduce_expenses",
        "generate_savings_plan": "generate_savings_plan"
    }
)

# Add normal edges
workflow.add_edge("reduce_expenses", "final_advice")
workflow.add_edge("generate_savings_plan", "final_advice")
workflow.add_edge("final_advice", END)

# Compile the graph
finance_app = workflow.compile()
