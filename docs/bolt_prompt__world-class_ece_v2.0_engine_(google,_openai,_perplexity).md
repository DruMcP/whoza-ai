# Bolt Prompt: World-Class ECE v2.0 Engine (Google, OpenAI, Perplexity)

## Task Objective

This is a comprehensive task to upgrade the Whoza.ai platform. You will implement three major features:
1.  **World-Class ECE v2.0 Scoring Engine:** Overhaul the `verify-free-score` function to calculate a real, data-driven score using the new v2.0 methodology, with full integration of Google Places, OpenAI, and Perplexity APIs.
2.  **Forgot Password Functionality:** Ensure the existing "Forgot Password" UI is fully functional by connecting it to Supabase Auth and Resend.
3.  **"How It Works" Page UI Fix:** Change the layout of the four-step process from a 2x2 grid to a single-row 1x4 layout for better user experience.

---

## Part 1: World-Class ECE v2.0 Scoring Engine Implementation

**File to Modify:** `/supabase/functions/verify-free-score/index.ts`

**High-Level Goal:** The current function only validates and stores submissions. You need to replace this with a full-fledged scoring engine that uses live data from Google, OpenAI, and Perplexity.

### Step 1.1: Environment Variables

Ensure the following environment variables are available in your Supabase project:
- `GOOGLE_PLACES_API_KEY`: Your Google Cloud API key with the Places API enabled.
- `OPENAI_API_KEY`: Your OpenAI API key.
- `PERPLEXITY_API_KEY`: Your Perplexity API key.

### Step 1.2: Data Aggregation Pipeline

Within the main function handler, after validating the user's input, create a data aggregation pipeline. This will collect all the necessary data points before scoring.

**A. Google Places API Integration (Critical Path)**

1.  **Text Search:** Use the business name and postcode to find the business's Place ID.
    - **Endpoint:** `https://places.googleapis.com/v1/places:searchText`
    - **Method:** `POST`
    - **Body:** `{ "textQuery": "{businessName}, {postcode}, UK" }`
    - **Header:** `X-Goog-FieldMask: places.id,places.displayName`
2.  **Handle No Results:** If no reliable match is found, stop and return a low score (e.g., 8/100) with a message that the business could not be found on Google.
3.  **Place Details:** If a `place_id` is found, make a Place Details request.
    - **Endpoint:** `https://places.googleapis.com/v1/places/{placeId}`
    - **Method:** `GET`
    - **Header:** `X-Goog-FieldMask: id,displayName,formattedAddress,businessStatus,websiteUri,rating,userRatingCount,types,reviews`
4.  **Store Data:** Store the results in a `googleData` object.

**B. Website Analysis**

1.  **Check Existence:** If `googleData.websiteUri` exists, perform an HTTP `fetch` request to it.
2.  **Analyze Response:** If the status is 200, the website exists. Check if the URL starts with `https://`.
3.  **Scrape Content:** If the website exists, use `cheerio` to parse the HTML and check for the presence of key pages and signals. Store these as booleans in a `websiteData` object:
    - `hasServicesPage`: Look for a link with text like "Services".
    - `hasContactPage`: Look for a link with text like "Contact".
    - `hasAboutPage`: Look for a link with text like "About".
    - `hasTestimonials`: Look for text like "Testimonials" or "Reviews".
    - `hasSocialLinks`: Look for `href` attributes pointing to Facebook, Instagram, etc.
    - `hasAccreditations`: Look for `img` tags with `alt` text containing trade-specific accreditations (e.g., "Gas Safe", "NICEIC").

**C. OpenAI API Integration (Review & Content Analysis)**

1.  **Review Analysis:** If `googleData.reviews` exists, take the text from the most recent 5 reviews and send it to the OpenAI Completions API (`gpt-4.1-mini` model).
    - **Prompt:** `"Analyze the following customer reviews for a local tradesperson. Summarize the key positive and negative themes in one sentence each. Positive themes: Negative themes:"`
    - **Store:** Store the summarized themes in a `reviewAnalysis` object.

2.  **Website Content Analysis:** If the website exists, scrape the text content from the homepage and send it to the OpenAI Completions API (`gpt-4.1-mini` model).
    - **Prompt:** `"Analyze the following website content for a local tradesperson. Rate the clarity of the services offered, the trustworthiness of the content, and the level of expertise demonstrated, each on a scale of 1 to 10. Return a JSON object with the keys 'clarity', 'trustworthiness', and 'expertise'."`
    - **Store:** Store the returned JSON object in a `contentAnalysis` object.

**D. Perplexity API Integration (Answerability & Consensus)**

1.  **Question 1 (Answerability):** Ask Perplexity a direct question about the business.
    - **Prompt:** `"Does {businessName} in {location} offer emergency services?"`
    - **Analyze Response:** Check if Perplexity's answer is accurate and if it cites the business's website as a source.

2.  **Question 2 (Consensus):** Ask Perplexity a competitive question.
    - **Prompt:** `"Who is the best {tradeType} in {location}?"`
    - **Analyze Response:** Check if the business is mentioned in Perplexity's answer.

### Step 1.3: Scoring Logic Implementation

Create a `calculateEceScore(googleData, websiteData, reviewAnalysis, contentAnalysis, perplexityResults)` function that implements the 5-pillar algorithm. Return `totalScore` and a `pillarScores` object.

- **Pillar 1: Clarity (20 pts):** Award points for GBP existence (5), secure website (5), NAP consistency (5 - *defer this for now if too complex*), Yell listing (3 - *use a simple search*), Bing listing (2 - *use a simple search*).
- **Pillar 2: Consensus (30 pts):** Implement the weighted scoring for Google reviews based on the matrix in the spec. Add points for Checkatrade presence (*defer full scraping, just check for a profile for now*). Add points if Perplexity mentions the business in the competitive question.
- **Pillar 3: Answerability (20 pts):** Award points based on the booleans in `websiteData`. Add points if Perplexity accurately answers the direct question and cites the business's website.
- **Pillar 4: Safety (15 pts):** Award points for accreditations and social links from `websiteData`. Use the `trustworthiness` score from the OpenAI content analysis.
- **Pillar 5: Context (15 pts):** Award points for specific GBP categories. Use the `clarity` and `expertise` scores from the OpenAI content analysis.

### Step 1.4: Generate Recommendations & Return Value

- Based on the lowest-scoring signals, generate an array of 2-3 actionable recommendations.
- Modify the function's final return statement to include the `totalScore`, `pillarScores`, and `recommendations`.
- The email sent to the user should be updated to include their actual score.

---

## Part 2: Forgot Password Functionality

**File to Modify:** `/src/pages/SignIn.tsx` (or similar component that handles the sign-in form)

**High-Level Goal:** The "Forgot Password?" link and form already exist. You need to wire up the client-side logic to call a new Supabase Edge Function that handles the password reset flow.

### Step 2.1: Create a New Supabase Edge Function

Create a new function named `reset-password`.

- **Endpoint:** `/functions/v1/reset-password`
- **Method:** `POST`

This function will:
1.  Receive an `email` in the request body.
2.  Call Supabase Auth's `resetPasswordForEmail()` method.
    ```typescript
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://whoza.ai/update-password',
    });
    ```
3.  This will automatically handle sending a password reset email to the user via the configured email provider (Resend).
4.  Return a success or error response to the client.

### Step 2.2: Update Client-Side Logic

In your `SignIn.tsx` component:
1.  Create a state to handle the forgot password form (e.g., `showForgotPassword`).
2.  When the user clicks "Forgot password?", toggle this state to show the reset form.
3.  Create a function `handlePasswordReset` that is called when the "Send Reset Link" button is clicked.
4.  This function should:
    - Perform basic email validation.
    - Make a `fetch` request to your new `/reset-password` Edge Function.
    - Display a success message to the user (e.g., "If an account with that email exists, a password reset link has been sent.").
    - Handle and display any errors returned from the function.

### Step 2.3: Create the Update Password Page

1.  Create a new page at `/update-password`.
2.  This page will be the `redirectTo` target from the reset email.
3.  On this page, use Supabase's `onAuthStateChange` listener to detect the `PASSWORD_RECOVERY` event.
4.  When this event is detected, it means the user has clicked the link in their email. You can then securely present them with a form to enter and confirm their new password.
5.  Use `supabase.auth.updateUser()` to save the new password.

---

## Part 3: "How It Works" Page UI Fix

**File to Modify:** `/src/pages/HowItWorks.tsx` (or the component responsible for rendering the four steps section)

**High-Level Goal:** The current layout for the four steps requires users to scroll, which is not ideal. You need to modify the styling to display all four steps in a single, non-scrolling row on desktop screens.

### Step 3.1: Identify the Target Container

Locate the `div` or container element that wraps the four step cards.

### Step 3.2: Modify the CSS

Apply the following CSS changes to the container and the cards:

1.  **Container Styling:**
    - Use Flexbox to create the horizontal layout: `display: flex;`, `flex-direction: row;`, `justify-content: space-between;`.
    - Ensure it spans the full width of its parent.

2.  **Card Styling:**
    - Make the cards more compact to fit in a single row. You may need to reduce `width`, `height`, `padding`, or `font-size` within the cards.
    - The goal is for all four cards and the arrows between them to be visible in the viewport on a standard desktop screen without horizontal scrolling.

3.  **Responsive Breakpoint:**
    - Add a media query for mobile devices (e.g., `@media (max-width: 768px)`).
    - Inside the media query, change the `flex-direction` back to `column` so the steps stack vertically on smaller screens.

### Example CSS (Conceptual)

```css
/* This is a conceptual example. Adapt it to your existing class names. */

.four-steps-container {
  display: flex;
  flex-direction: row; /* Horizontal layout on desktop */
  justify-content: space-around;
  align-items: flex-start;
  gap: 1rem;
}

.step-card {
  flex: 1; /* Allow cards to share space */
  max-width: 23%; /* Adjust as needed to fit 4 cards */
  /* You may need to reduce padding or font sizes here */
}

/* Responsive styles for mobile */
@media (max-width: 992px) { /* Breakpoint might need adjustment */
  .four-steps-container {
    flex-direction: column; /* Stack vertically on mobile */
    align-items: center;
  }

  .step-card {
    max-width: 80%; /* Allow cards to be wider on mobile */
    margin-bottom: 2rem;
  }
}
```

---

## Final Verification

After implementing all three parts, please verify:
1.  The Free Score form correctly calculates and returns a v2.0 score using all three APIs.
2.  The Forgot Password flow sends an email and allows a user to reset their password.
3.  The How It Works page displays the four steps in a single row on desktop and stacks them correctly on mobile.
