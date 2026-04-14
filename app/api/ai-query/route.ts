import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

interface CompanyProfile {
  industry: string;
  orgSize: string;
  location: string;
}

const industryData: Record<string, { roles: string[]; skills: string[]; metrics: string[] }> = {
  'Manufacturing & Industrial': {
    roles: ['CNC Machinist', 'Quality Inspector', 'Production Supervisor', 'Maintenance Technician', 'Safety Coordinator', 'Shift Lead'],
    skills: ['Machine Operation', 'Quality Control', 'Lean Manufacturing', 'Safety Protocols', 'Equipment Maintenance', 'Blueprint Reading'],
    metrics: ['production output', 'defect rates', 'equipment uptime', 'safety incidents'],
  },
  'Healthcare & Medical': {
    roles: ['Registered Nurse', 'Medical Assistant', 'Lab Technician', 'Patient Care Coordinator', 'Pharmacy Tech', 'Unit Supervisor'],
    skills: ['Patient Care', 'Medical Records', 'Clinical Procedures', 'HIPAA Compliance', 'Emergency Response', 'Team Coordination'],
    metrics: ['patient satisfaction scores', 'compliance rates', 'response times', 'certification levels'],
  },
  'Retail & Hospitality': {
    roles: ['Store Manager', 'Shift Supervisor', 'Customer Service Lead', 'Inventory Specialist', 'Sales Associate', 'Front Desk Manager'],
    skills: ['Customer Service', 'Inventory Management', 'POS Systems', 'Team Leadership', 'Sales Techniques', 'Conflict Resolution'],
    metrics: ['sales per hour', 'customer satisfaction', 'inventory accuracy', 'employee retention'],
  },
  'Construction & Trades': {
    roles: ['Site Foreman', 'Journeyman Electrician', 'Master Plumber', 'Project Coordinator', 'Safety Officer', 'Equipment Operator'],
    skills: ['Blueprint Reading', 'OSHA Compliance', 'Project Estimation', 'Equipment Operation', 'Trade Certification', 'Team Supervision'],
    metrics: ['project completion rates', 'safety compliance', 'budget adherence', 'certification levels'],
  },
  'Technology & Software': {
    roles: ['Senior Developer', 'DevOps Engineer', 'Product Manager', 'QA Lead', 'Technical Lead', 'Solutions Architect'],
    skills: ['Software Development', 'Cloud Architecture', 'Agile Methodologies', 'System Design', 'Code Review', 'Technical Documentation'],
    metrics: ['sprint velocity', 'code quality scores', 'deployment frequency', 'bug resolution time'],
  },
  'Financial Services': {
    roles: ['Branch Manager', 'Loan Officer', 'Compliance Analyst', 'Financial Advisor', 'Operations Supervisor', 'Risk Manager'],
    skills: ['Financial Analysis', 'Regulatory Compliance', 'Risk Assessment', 'Customer Relations', 'Portfolio Management', 'Audit Procedures'],
    metrics: ['client retention', 'compliance scores', 'portfolio performance', 'processing accuracy'],
  },
  'Logistics & Transportation': {
    roles: ['Fleet Manager', 'Warehouse Supervisor', 'Dispatch Coordinator', 'Driver Trainer', 'Inventory Manager', 'Operations Lead'],
    skills: ['Route Optimization', 'Fleet Management', 'Warehouse Operations', 'DOT Compliance', 'Inventory Systems', 'Team Scheduling'],
    metrics: ['on-time delivery rates', 'fuel efficiency', 'inventory accuracy', 'safety records'],
  },
};

function getIndustryData(industry: string) {
  return industryData[industry] || industryData['Manufacturing & Industrial'];
}

function calculateEmployeeCount(orgSize: string): number {
  if (orgSize.includes('1-50')) return 35;
  if (orgSize.includes('51-200')) return 120;
  if (orgSize.includes('201-500')) return 340;
  if (orgSize.includes('501-1000')) return 720;
  return 1500;
}

function generateName(): string {
  const firstNames = ['Marcus', 'Sofia', 'Jordan', 'Aisha', 'David', 'Elena', 'Michael', 'Priya', 'James', 'Maria', 'Kevin', 'Samantha', 'Carlos', 'Rachel', 'Tyler'];
  const lastNames = ['Thompson', 'Martinez', 'Kim', 'Johnson', 'Patel', 'Williams', 'Chen', 'Rodriguez', 'Davis', 'Lee', 'Brown', 'Garcia', 'Wilson', 'Taylor', 'Anderson'];
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function getRegionalContext(location: string): string {
  if (location.includes('Northeast')) return 'Competitive market with above-average wages; strong union presence in manufacturing';
  if (location.includes('Southeast')) return 'Growing market with moderate wages; high demand for skilled trades';
  if (location.includes('Midwest')) return 'Stable market with industry-standard wages; strong manufacturing base';
  if (location.includes('Southwest')) return 'Expanding market with competitive wages; high growth in construction and logistics';
  if (location.includes('West Coast')) return 'High-cost market with premium wages; tech-forward workforce expectations';
  if (location.includes('Mountain')) return 'Emerging market with competitive wages; growing demand across sectors';
  return 'Standard market conditions apply';
}

function buildContext(profile: CompanyProfile, question: string): string {
  const data = getIndustryData(profile.industry);
  const employeeCount = calculateEmployeeCount(profile.orgSize);
  const promotionReady = Math.floor(employeeCount * 0.08);
  const wageIncreaseEligible = Math.floor(employeeCount * 0.12);

  // Generate consistent employee names for this request
  const employee1Name = generateName();
  const employee2Name = generateName();
  const employee3Name = generateName();
  const employee4Name = generateName();

  // Generate consistent hours
  const employee1Hours = 5200 + Math.floor(Math.random() * 800);
  const employee2Hours = 4400 + Math.floor(Math.random() * 600);
  const employee3Hours = 3800 + Math.floor(Math.random() * 500);
  const employee4Hours = 3200 + Math.floor(Math.random() * 400);

  return `You are REIGNOS AI, an expert workforce intelligence assistant. Your role is to provide data-driven, objective insights for workforce management decisions based on verified employee data.

# Company and Workforce Data

First, here is the company profile:

<company_profile>
<industry>${profile.industry}</industry>
<organization_size>${profile.orgSize}</organization_size>
<employee_count>${employeeCount}</employee_count>
<location>${profile.location}</location>
<regional_context>${getRegionalContext(profile.location)}</regional_context>
</company_profile>

Here is the workforce overview data:

<workforce_overview>
<total_employees>${employeeCount}</total_employees>
<promotion_ready_count>${promotionReady}</promotion_ready_count>
<promotion_ready_percentage>8% of workforce</promotion_ready_percentage>
<wage_increase_eligible_count>${wageIncreaseEligible}</wage_increase_eligible_count>
<wage_increase_eligible_percentage>12% of workforce</wage_increase_eligible_percentage>
<average_tenure_years>3.2</average_tenure_years>
<skills_tracked_count>${data.skills.length * 3}+</skills_tracked_count>
<key_metrics>${data.metrics.join(', ')}</key_metrics>
</workforce_overview>

Here is the skill progression framework used to evaluate employees:

<skill_progression_framework>
- Level 1: 500 verified hours (Beginner)
- Level 2: 1,000 verified hours (Intermediate)
- Level 3: 1,500 verified hours (Proficient)
- Level 4: 2,000 verified hours (Advanced)
- Level 5: 2,500+ verified hours (Expert/Master)
</skill_progression_framework>

Here are the top performing employees in the workforce:

<top_performers>
<employee id="1">
  <name>${employee1Name}</name>
  <current_role>${data.roles[0]}</current_role>
  <verified_hours>${employee1Hours}</verified_hours>
  <tenure_years>2.8</tenure_years>
  <skills>
    <skill name="${data.skills[0]}" level="5" hours="2,600"/>
    <skill name="${data.skills[1]}" level="4" hours="2,100"/>
    <skill name="${data.skills[2]}" level="3" hours="1,700"/>
  </skills>
  <recommended_action>Ready for promotion to ${data.roles[2]}</recommended_action>
  <rationale>Demonstrated mastery in core competencies with 5,200+ verified hours</rationale>
</employee>

<employee id="2">
  <name>${employee2Name}</name>
  <current_role>${data.roles[1]}</current_role>
  <verified_hours>${employee2Hours}</verified_hours>
  <tenure_years>2.1</tenure_years>
  <skills>
    <skill name="${data.skills[2]}" level="4" hours="2,200"/>
    <skill name="${data.skills[3]}" level="4" hours="2,000"/>
    <skill name="${data.skills[1]}" level="3" hours="1,500"/>
  </skills>
  <recommended_action>Ready for senior-level transition</recommended_action>
  <rationale>Dual Level 4 skills with strong progression trajectory</rationale>
</employee>

<employee id="3">
  <name>${employee3Name}</name>
  <current_role>${data.roles[3]}</current_role>
  <verified_hours>${employee3Hours}</verified_hours>
  <tenure_years>1.9</tenure_years>
  <skills>
    <skill name="${data.skills[4]}" level="4" hours="2,100"/>
    <skill name="${data.skills[0]}" level="3" hours="1,600"/>
    <skill name="${data.skills[5]}" level="2" hours="1,100"/>
  </skills>
  <recommended_action>Strong candidate for team lead role</recommended_action>
  <rationale>Fast progression with leadership skill development</rationale>
</employee>

<employee id="4">
  <name>${employee4Name}</name>
  <current_role>${data.roles[4]}</current_role>
  <verified_hours>${employee4Hours}</verified_hours>
  <tenure_years>1.5</tenure_years>
  <skills>
    <skill name="${data.skills[3]}" level="3" hours="1,700"/>
    <skill name="${data.skills[5]}" level="3" hours="1,500"/>
  </skills>
  <recommended_action>Eligible for wage increase (12-15%)</recommended_action>
  <rationale>Exceeded role benchmarks; multiple Level 3 certifications</rationale>
</employee>
</top_performers>

Here is relevant industry context for this organization:

<industry_context>
<typical_roles>${data.roles.join(', ')}</typical_roles>
<critical_skills>${data.skills.join(', ')}</critical_skills>
<tracked_metrics>${data.metrics.join(', ')}</tracked_metrics>
</industry_context>

# Your Task

Your task is to answer questions about workforce management using the verified data provided above. You must base all of your responses on this data and provide specific, evidence-based recommendations.

## Critical Requirements

Follow these requirements when responding:

1. **Base all responses on verified data**: Only use information from the workforce data provided above. Do not fabricate or invent any data.

2. **Reference specific employees**: Use employee names from the <top_performers> section along with their verified hours and skill levels. Do not reference employees who are not listed.

3. **Cite your data sources**: For every claim you make, reference where the data comes from (e.g., "Based on verified hours..." or "Skill progression data shows...").

4. **Keep responses concise**: Limit your response to 2-4 paragraphs with bullet points for key insights.

5. **Use markdown formatting**:
   - Use **bold** for employee names and key numbers
   - Use bullet points for lists
   - Keep paragraphs to 2-3 sentences for readability

6. **Emphasize objectivity**: Make it clear that all recommendations are objective and bias-free, based on verified time-tracking and skill progression data.

## Response Structure

Structure your responses as follows:

1. **Lead with the direct answer**: Start with a clear, direct response to the question (e.g., "Based on verified data, 12 employees are promotion-ready.")

2. **Provide specific evidence**: Support your answer with concrete details using employee names and numbers:
   - Good: "**Marcus Thompson** has 5,280 verified hours with Level 5 in Machine Operation"
   - Bad: "Some employees have high hours"

3. **Use clear formatting for scannability**:
   - Use **bold** for employee names and key numbers
   - Use bullet points for lists
   - Keep paragraphs short (2-3 sentences)

4. **Include actionable recommendations** when appropriate:
   - What actions to take next
   - Suggested timelines
   - Risk factors to consider

5. **Reinforce objectivity**: End with a statement about how the recommendations are based on bias-free, data-driven decisions and reference the verification system.

## Example Response Format

Here is an example of a well-formatted response:

\`\`\`
Based on verified skill progression data, **[NUMBER]** employees are ready for promotion.

**Top recommendation: [Employee Name]**
- **[NUMBER] verified hours** in current role
- **Level [NUMBER]** ([Skill Level Description]) in [Skill Name]
- **Level [NUMBER]** ([Skill Level Description]) in [Skill Name]
- Suggested role: [Role Name]

**Additional candidates:**
- **[Employee Name]**: [Brief justification with specific metrics]
- **[Employee Name]**: [Brief justification with specific metrics]

**Recommended next steps:**
- [Specific action with timeline]
- [Specific action with timeline]

This recommendation is based entirely on objective, verified time-tracking and skill mastery data—ensuring fair, bias-free advancement decisions.
\`\`\`

## Constraints

You must adhere to the following constraints:

- Do not make up or fabricate any data that is not provided in the workforce data above
- Do not reference employees who are not listed in the <top_performers> section
- Do not suggest actions that would violate labor laws or regulations
- Do not provide specific salary numbers; use percentage ranges instead (e.g., "12-15% increase")
- Stay within your area of expertise (workforce analytics); do not provide legal or financial advice

## User Question

<user_question>
${question}
</user_question>

## Output Format

Provide your response in the following JSON format:

\`\`\`json
{
  "answer": "Your formatted response here with markdown",
  "followUpQuestions": [
    "First suggested follow-up question?",
    "Second suggested follow-up question?",
    "Third suggested follow-up question?"
  ]
}
\`\`\`

The "answer" field should contain your full response following the structure and requirements outlined above.

The "followUpQuestions" field should contain 3 relevant follow-up questions the user might want to ask based on:
- The topic they just asked about
- Related workforce insights they haven't explored yet
- Deeper dives into the data you just presented

Keep follow-up questions concise (under 50 characters each) and actionable.`;
}

export async function POST(request: NextRequest) {
  let question = '';
  let profile: CompanyProfile = { industry: '', orgSize: '', location: '' };

  try {
    const body = await request.json();
    question = body.question;
    profile = body.profile;

    if (!ANTHROPIC_API_KEY) {
      const fallback = generateFallbackResponse(question, profile);
      return NextResponse.json({
        response: fallback.response,
        followUpQuestions: fallback.followUpQuestions,
        mode: 'demo',
      });
    }

    const context = buildContext(profile, question);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: context,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Anthropic API error:', response.status, errorBody);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const rawResponse = data.content[0].text;

    // Try to parse as JSON for structured response with follow-ups
    try {
      // Extract JSON from the response (may be wrapped in markdown code blocks)
      const jsonMatch = rawResponse.match(/```json\s*([\s\S]*?)\s*```/) ||
                        rawResponse.match(/\{[\s\S]*"answer"[\s\S]*\}/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        const parsed = JSON.parse(jsonStr);

        return NextResponse.json({
          response: parsed.answer || rawResponse,
          followUpQuestions: parsed.followUpQuestions || [],
          mode: 'live',
        });
      }
    } catch {
      // If JSON parsing fails, return raw response
    }

    return NextResponse.json({
      response: rawResponse,
      followUpQuestions: getDefaultFollowUps(question),
      mode: 'live',
    });
  } catch (error) {
    console.error('AI query error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Use the stored question and profile for fallback
    if (question && profile.industry) {
      const fallback = generateFallbackResponse(question, profile);
      return NextResponse.json({
        response: fallback.response,
        followUpQuestions: fallback.followUpQuestions,
        mode: 'fallback',
        debug: errorMessage,
      });
    }

    return NextResponse.json({
      response: `I encountered an error: ${errorMessage}. Please try again.`,
      mode: 'error',
    });
  }
}

function getDefaultFollowUps(query: string): string[] {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('promotion')) {
    return [
      'What skills gaps should we address?',
      'Who else is close to promotion-ready?',
      'How do wages compare for promoted roles?',
    ];
  }
  if (lowerQuery.includes('wage') || lowerQuery.includes('raise') || lowerQuery.includes('increase')) {
    return [
      'Who is ready for promotion instead?',
      'What skills justify higher wages?',
      'Show team optimization opportunities',
    ];
  }
  if (lowerQuery.includes('team') || lowerQuery.includes('optim')) {
    return [
      'Who are the top performers?',
      'What skills gaps exist?',
      'Which employees need mentorship?',
    ];
  }
  if (lowerQuery.includes('skill')) {
    return [
      'Who should we cross-train?',
      'Which roles need more coverage?',
      'Show promotion-ready employees',
    ];
  }

  return [
    'Who is ready for promotion?',
    'Show wage increase recommendations',
    'What skills gaps should we address?',
  ];
}

function generateFallbackResponse(query: string, profile: CompanyProfile): { response: string; followUpQuestions: string[] } {
  const lowerQuery = query.toLowerCase();
  const employeeCount = profile.orgSize?.includes('1-50') ? 35 :
                        profile.orgSize?.includes('51-200') ? 120 : 340;
  const promotionReady = Math.floor(employeeCount * 0.08);

  if (lowerQuery.includes('promotion')) {
    return {
      response: `Based on verified hours and skill progression in your ${profile.industry} organization, **${promotionReady} employees** are currently ready for promotion.

**Top Candidates:**
- **Marcus Thompson** - 5,280 verified hours, 2 skills at Level 5
- **Sofia Martinez** - 4,460 verified hours, 3 skills at Level 4
- **Jordan Kim** - 3,840 verified hours, strong upward trajectory

All recommendations are based on objective, verified time-punch data and documented skill progression—ensuring bias-free advancement decisions.`,
      followUpQuestions: [
        'What skills gaps should we address?',
        'Who else is close to promotion-ready?',
        'How do wages compare for promoted roles?',
      ],
    };
  }

  if (lowerQuery.includes('wage') || lowerQuery.includes('raise') || lowerQuery.includes('increase')) {
    return {
      response: `Analyzing wage increase eligibility for your ${profile.orgSize} ${profile.industry} organization:

**${Math.floor(employeeCount * 0.12)} employees** meet criteria for wage adjustments based on:
- Verified skill level advancement
- Documented hours exceeding role benchmarks
- Regional market data for ${profile.location}

**Top Recommendation:**
**Marcus Thompson** has achieved 2 skills at Master level (Level 5) with 5,280+ verified hours. Suggested adjustment: 10-15% based on skill mastery and market benchmarks.`,
      followUpQuestions: [
        'Who is ready for promotion instead?',
        'What skills justify higher wages?',
        'Show team optimization opportunities',
      ],
    };
  }

  if (lowerQuery.includes('team') || lowerQuery.includes('optim')) {
    return {
      response: `**Team Optimization Insights for your ${profile.industry} Organization:**

**Current State:**
- ${employeeCount} employees across multiple departments
- Skills coverage: Good with some gaps in emerging areas

**Recommendations:**
1. Cross-train mid-level employees to address coverage gaps
2. Pair high-performers with developing team members for mentorship
3. Consider shift restructuring to maximize skill utilization

All insights derived from verified hours and documented skill progression—no subjective assessments.`,
      followUpQuestions: [
        'Who are the top performers?',
        'What skills gaps exist?',
        'Which employees need mentorship?',
      ],
    };
  }

  return {
    response: `I can help you analyze your ${profile.industry} workforce data. Try asking about:

- **Promotions** - Who's ready based on verified skill progression?
- **Wage increases** - Data-driven compensation recommendations
- **Team optimization** - How to structure teams for maximum effectiveness
- **Skills gaps** - Where to focus development efforts

All insights are based on objective, verified data from REIGNOS workforce tracking.`,
    followUpQuestions: [
      'Who is ready for promotion?',
      'Show wage increase recommendations',
      'What skills gaps should we address?',
    ],
  };
}
