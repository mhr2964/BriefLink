# MVP Screen and State Inventory

## 1. Entry
### Purpose
Orient the user and start the core flow.

### Required elements
- product name
- one-sentence value proposition
- primary call to action

### States
- default

---

## 2. Dashboard
### Purpose
Provide the calm app shell and route the user into brief creation.

### Required elements
- dashboard shell
- page title
- primary "new brief" action
- minimal contextual guidance

### States
- default
- empty dashboard

---

## 3. New Brief
### Purpose
Collect the minimum input needed to generate a brief.

### Required elements
- company/account name field
- website URL field
- optional focus selector
- submit action
- reset or clear action

### States
- default
- incomplete form
- ready to submit

---

## 4. Processing
### Purpose
Show that brief generation is underway.

### Required elements
- processing title
- short status message
- calm loading treatment

### States
- loading

---

## 5. Result
### Purpose
Display the generated brief.

### Required elements
- account name
- website
- summary
- key signals list
- suggested next step
- share action

### States
- empty
- success
- error

---

## 6. Share
### Purpose
Let the user distribute the generated brief.

### Required elements
- share action trigger
- share link or copy-ready output
- confirmation that sharing is available

### States
- default
- copied/success
- error

---

## 7. Recipient View
### Purpose
Present the shared brief in a simple read-only format.

### Required elements
- brief title or account name
- summary
- key signals
- suggested next step
- read-only presentation

### States
- default
- unavailable/error