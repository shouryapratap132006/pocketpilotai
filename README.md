# PocketPilot AI

A production-quality full-stack personal finance advisor powered by LangGraph, FastAPI, and Next.js.

## Overview

PocketPilot AI helps users manage their budgets by analyzing income and expenses, detecting overspending, and providing personalized financial education. It uses a graph-based state machine to ensure a structured and reliable AI reasoning process.

## Architecture

### Backend (Python/FastAPI)
- **LangGraph Orchestration**: Uses a state machine to handle financial analysis logic.
- **Stateful Logic**: Defines a clear path from budget analysis to specialized advice (reduction vs. savings plan).
- **FastAPI**: Exposes a stateless API for the frontend.

### Frontend (Next.js 14)
- **Modern UI**: Built with Tailwind CSS, featuring glassmorphism and a responsive design.
- **Dynamic Forms**: Allows users to add multiple expense categories easily.
- **State Persistence**: Uses `sessionStorage` for lightweight data passing between pages.

## LangGraph Flow

```ascii
[START]
   |
   v
[analyze_budget] 
   |
   +--- (savings < 0) ---> [reduce_expenses] ---+
   |                                            |
   +--- (savings >= 0) --> [generate_savings_plan] ---+
   |                                            |
   v                                            v
[final_advice] <--------------------------------+
   |
   v
 [END]
```

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up environment variables in `.env`:
   ```bash
   OPENAI_API_KEY=your_key_here
   # OR
   GOOGLE_API_KEY=your_key_here
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Financial Disclaimer

This application is for educational purposes only. It does not provide professional financial, investment, or trading advice. Always consult with a certified financial advisor before making significant financial decisions.
