const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface FinanceRequest {
  income: number;
  expenses: Record<string, number>;
  goal: string;
}

export interface FinanceResponse {
  analysis: string;
  advice: string;
  savings_plan: string;
  savings: number;
}

export async function submitFinanceData(data: FinanceRequest): Promise<FinanceResponse> {
  const response = await fetch(`${API_BASE_URL}/api/finance`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to process finance data');
  }

  return response.json();
}
