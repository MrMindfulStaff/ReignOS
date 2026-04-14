// REIGN AI Query Handler using Claude API
// This routes queries through Claude for intelligent, context-aware responses

const REIGN_CONTEXT = `You are the AI assistant for R.E.I.G.N. (Real-time Employment Intelligence and Growth Navigator), 
a workforce management platform that tracks employee skills, hours worked, and career progression.

The platform works by:
- Employees clock in/out, logging hours to specific skills and projects
- Skills automatically level up based on verified hours (Level 1: 500hrs, Level 2: 1000hrs, Level 3: 1500hrs, Level 4: 2000hrs, Level 5: 2500+hrs)
- All data is verified through time punches - can't be inflated or falsified
- AI analyzes this data to make bias-free recommendations for promotions, wage increases, and team optimization

When answering questions, provide:
- Data-driven insights based on hours and skill levels
- Specific employee names and metrics
- Unbiased, equitable recommendations
- Professional but friendly tone`;

export async function queryReignAI(question: string, useMCP: boolean = false): Promise<string> {
  try {
    console.log('Querying REIGN AI:', question, 'MCP Mode:', useMCP);
    
    // Call your backend API route that handles Claude API
    const response = await fetch('/api/ai-query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question, useMCP }),
    });

    if (!response.ok) {
      console.error('API response not OK:', response.status);
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    console.log('Response mode:', data.mode);
    
    if (data.error) {
      console.error('API returned error:', data.error);
    }
    
    return data.response;
  } catch (error) {
    console.error('AI query failed:', error);
    return 'Unable to process your question right now. Please try again.';
  }
}

// MCP Server connection
const MCP_SERVER_URL = 'https://mindfulreign-mcp-server-staging.gcaussade.workers.dev';

export async function queryMCPServer(question: string, token?: string): Promise<string> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/api/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify({ query: question }),
    });

    if (!response.ok) {
      throw new Error(`MCP request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.response || data.result || 'No response from MCP server';
  } catch (error) {
    console.error('MCP query failed:', error);
    throw error;
  }
}

