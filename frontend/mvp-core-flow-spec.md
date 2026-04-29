# BriefLink MVP Core Flow Spec

Purpose: calm additive frontend prototype flow.

Primary user: team member submits source material and reviews generated output.

Principles:
- calm by default
- additive evolution
- one obvious next action
- explicit loading success and error states
- plain terminology

MVP flow:
1. workspace entry
2. input capture
3. processing state
4. results review
5. follow-up actions

Workspace entry:
- calm headline
- short explanatory copy
- primary action to start
- reserved area for future recent runs

Input capture:
- single-column form
- text area for pasted source material
- helper text
- primary submit action
- inline validation for empty input

Processing state:
- clear status label
- quiet loading treatment
- short progress message
- duplicate submission prevented

Results review:
- completion header
- readable grouped output sections
- failure or empty-state messaging
- next-step action area

State model:
- idle
- editing
- submitting
- success
- error

Data expectations:
- send source text
- receive summary or title
- receive content sections
- optional run identifier
- optional recoverable error message

Accessibility:
- visible labels
- semantic headings and regions
- assistive-friendly status messaging
- sufficient contrast

Non-goals:
- multi-user collaboration
- deep analytics
- complex settings
- dense CRM tables

Future additions:
- URL ingestion
- file upload
- recent runs
- editable sections
- export or share actions
- background polling