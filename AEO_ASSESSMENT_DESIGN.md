# AEO Assessment Integration Design

## Overview

This document outlines the design for integrating a simple AEO (Answer Engine Optimization) assessment into the whoza.ai platform's onboarding flow, based on Sam Hogan's framework.

## Key Design Principles

1. **No Conflict with Free Score Analysis**: The AEO assessment is a **self-assessment questionnaire** that collects user responses about their current AI visibility practices. It is NOT a replacement for the automated Free Score analysis.

2. **Complementary to Onboarding**: The assessment will be added as an **optional step** in the onboarding flow (Start.jsx), positioned after business details collection but before final submission.

3. **No User Confusion**: Clear labeling distinguishes this from the Free Score:
   - Free Score = Automated AI analysis of your business visibility
   - AEO Assessment = Self-assessment of your current practices

4. **Strategic Scoring**: Designed to produce low scores (typically below 60) for businesses with minimal AI visibility, aligning with the core business model of elevating AI presence.

## Integration Location

**File**: `src/pages/Start.jsx`

**Position**: New Step 3.5 (between "Services" and "Finish")

**Current Flow**:
1. Account (email/password)
2. Business (name, trade, postcode, service area)
3. Services (website, Google Business, key services)
4. Finish (credentials, competitors)

**New Flow**:
1. Account (email/password)
2. Business (name, trade, postcode, service area)
3. Services (website, Google Business, key services)
4. **AI Readiness (NEW - AEO Assessment)**
5. Finish (credentials, competitors)

## Assessment Structure

### Questions (5 Core Questions)

Based on Sam Hogan's AEO framework, simplified for tradesperson onboarding:

| # | Question | Options | Points |
|---|----------|---------|--------|
| 1 | Does your website have a FAQ section that answers common customer questions? | Yes (20) / No (0) / Not Sure (5) | 0-20 |
| 2 | Is your business listed on Google Business Profile with complete information? | Yes, fully complete (25) / Partially (10) / No (0) | 0-25 |
| 3 | Have you submitted your website to Bing Webmaster Tools? | Yes (20) / No (0) / What's that? (0) | 0-20 |
| 4 | Does your website use structured data (schema markup)? | Yes (20) / No (0) / Not Sure (5) | 0-20 |
| 5 | Have you ever tested if AI assistants (ChatGPT, Perplexity) can find your business? | Yes, they find me (15) / Yes, they don't (5) / Never tested (0) | 0-15 |

**Maximum Score**: 100 points
**Expected Average for New Users**: 15-35 points (validates need for Whoza.ai)

### Scoring Segments

| Score Range | Segment | Message |
|-------------|---------|---------|
| 0-20 | Invisible | "AI assistants can't find you yet. Whoza.ai will change that." |
| 21-40 | Hidden | "You have some basics, but AI search is missing you." |
| 41-60 | Emerging | "Good foundation! Let's make you fully visible to AI." |
| 61-80 | Visible | "You're ahead of most! Let's optimize further." |
| 81-100 | Dominant | "Excellent! Let's maintain your AI visibility lead." |

## Data Storage

Assessment responses will be stored in the existing `formData` state and saved to the user profile on account creation:

```javascript
formData: {
  // ... existing fields
  aeoAssessment: {
    hasFAQ: 'yes' | 'no' | 'not_sure',
    googleBusinessComplete: 'complete' | 'partial' | 'no',
    bingWebmasterSubmitted: 'yes' | 'no' | 'unknown',
    hasStructuredData: 'yes' | 'no' | 'not_sure',
    aiAssistantTested: 'found' | 'not_found' | 'never_tested',
    calculatedScore: number,
    completedAt: timestamp
  }
}
```

## UI/UX Design

### Visual Style
- Match existing Start.jsx form styling
- Use card-based question layout
- Radio button selections with clear labels
- Progress indicator showing step 4 of 5

### Skip Option
- "Skip for now" link at bottom
- Skipping sets all answers to null and score to 0
- User can complete later from account settings

### Score Display
- Show calculated score after completing assessment
- Brief explanation of what the score means
- Encourage completion of onboarding

## Component Structure

```
src/
  components/
    AEOAssessment/
      AEOAssessment.jsx       # Main assessment component
      AEOQuestion.jsx         # Individual question component
      AEOScoreDisplay.jsx     # Score result display
      aeoAssessment.css       # Styles
  utils/
    aeoScoring.js             # Scoring logic
```

## Implementation Checklist

- [ ] Create AEOAssessment component
- [ ] Create scoring utility function
- [ ] Add new step to STEPS array in Start.jsx
- [ ] Add formData fields for assessment
- [ ] Add validation for new step
- [ ] Add step rendering in renderStepContent
- [ ] Save assessment data on account creation
- [ ] Test full onboarding flow
- [ ] Verify no conflicts with Free Score

## Non-Goals

- This assessment does NOT replace the Free Score analysis
- This assessment does NOT call any external APIs
- This assessment does NOT block onboarding completion
- This assessment is NOT shown to existing users (onboarding only)
