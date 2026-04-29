# MVP Acceptance Criteria by Step

## 1. Entry
- User can identify the product and its core purpose within one screen.
- A single primary action moves the user into the dashboard.
- The screen does not compete with multiple parallel paths.

## 2. Dashboard
- User sees a stable dashboard shell on load.
- The dashboard presents "new brief" as the main action.
- Visual hierarchy stays calm and uncluttered.

## 3. New Brief
- User can enter company/account name and website URL.
- User can optionally choose a focus type.
- Submitting with minimum required fields advances to processing.
- Missing required input keeps the user in flow with a visible inline error or blocked submission state.

## 4. Processing
- Submission transitions immediately to a visible loading state.
- The loading state clearly indicates that the brief is being generated.
- The state does not require user action to continue.

## 5. Result
- Successful processing reveals a result view in the same core flow.
- Result shows the account name, website, summary, signals, and next step.
- Content is scannable and grouped into clear sections.
- If generation fails, a visible error state is shown instead of a broken layout.

## 6. Share
- User can trigger share from the result view.
- The interface returns a shareable brief outcome such as a copyable link.
- User receives a visible success confirmation after share output is available.

## 7. Recipient View
- Opening the shared brief displays a readable, read-only version of the result.
- Recipient can understand the account summary without creator context.
- The shared view excludes editing or dashboard controls in MVP.