# BriefLink Lifecycle Framework and Copy
## Goal
Move qualified agency and consultancy users from signup to the first meaningful activation milestone: **`brief-shared`**.

## Activation principle
Every message should help the user complete one useful step:
1. create or continue a client brief
2. share it with the right collaborator or client
3. experience the value of faster alignment after the brief is shared

## Audience guardrail
Write for:
- agencies
- consultancies
- client-service teams
- strategists, account leads, project leads, and operators managing client inputs

Do not drift into:
- generic SMB owner language
- creator / freelancer positioning
- broad team chat or docs replacement claims

---

# Lifecycle Framework

## Core activation event
- **Primary activation milestone:** `brief-shared`

## Key supporting events
- `account-created`
- `email-verified` or equivalent confirmed signup state
- `brief-created`
- `brief-started`
- `brief-progressed` (at least one meaningful section completed)
- `share-opened` or collaborator engagement event if available
- `return-visit`
- `inactive-3d`, `inactive-7d`, `inactive-14d` derived states

## User states
1. **Signed up, no brief created**
2. **Brief created, not meaningfully progressed**
3. **Brief in progress, not shared**
4. **Brief shared**
5. **Shared once, not returned**
6. **Stalled after partial setup or draft creation**

## Channel assumptions
- Email is the primary lifecycle channel
- In-product banners / nudges support progress while active
- Cadence should stay light and behavior-based

## Messaging guardrails
- Tie every message to a concrete next step
- Use specific value: clearer client input, fewer revision loops, faster alignment
- Never fake urgency
- Never punish inactivity
- Avoid “just checking in” language
- Avoid feature tours disconnected from progress to `brief-shared`

---

# Trigger Map

## 1) Signup confirmation
**Trigger:** `account-created`  
**Audience state:** New signup  
**Goal:** Confirm they’re in the right place and direct them to create their first brief  
**Primary CTA:** Create your first brief

## 2) Activation onboarding
**Trigger:** first session after signup, or within 10–30 minutes of `account-created` if no `brief-created`  
**Audience state:** Signed up, no brief created  
**Goal:** Get them to start a real brief tied to a client or project  
**Primary CTA:** Start a client brief

## 3) Pre-share nudge
**Trigger:** `brief-created` or `brief-progressed`, but no `brief-shared` within defined window  
**Audience state:** Draft started or in progress  
**Goal:** Move them from drafting to sharing  
**Primary CTA:** Share your brief

## 4) Post-share reinforcement
**Trigger:** `brief-shared`  
**Audience state:** Activated  
**Goal:** Reinforce value and prompt the next useful loop: review responses, refine alignment, reuse on another client/project  
**Primary CTA:** Review shared brief / Create another brief

## 5) Stalled-user reactivation
**Trigger:** inactivity after signup or draft activity without reaching `brief-shared`  
**Audience state:** Stalled  
**Goal:** Help them resume from where they left off and complete the share step  
**Primary CTA:** Continue your brief

---

# Copy Set

## 1) Signup confirmation

### Email
**Subject options**
- You’re in — now send a clearer client brief
- Welcome to BriefLink
- Start your first brief

**Preview text**
- Create your first brief and share it when you’re ready.
- A simple way to collect clearer client input before work starts.

**Body**
Hi {{first_name}},

Welcome to BriefLink.

BriefLink helps agency and consultancy teams collect client input in a format that’s easier to review, share, and act on before work gets underway.

Your next step is simple: create your first brief, then share it with the client or collaborator who needs to weigh in.

That first shared brief is where BriefLink becomes useful — fewer back-and-forth messages, clearer inputs, and a stronger starting point for delivery.

**CTA:** Create your first brief

**Secondary line**
Already have a client or project in mind? Start there.

**Guardrails**
- Do not overexplain the product
- Do not mention a long setup process
- Keep the focus on one action: create a brief

---

### In-product message
**Label:** Welcome  
**Body:** Start with one real client brief. You can draft it first, then share when ready.  
**CTA:** Create brief

**Guardrails**
- Keep it short
- Reinforce low-friction start

---

## 2) Activation onboarding

### Email
**Trigger detail:** sent if no `brief-created` after initial signup window

**Subject options**
- Turn your next client kickoff into a clearer brief
- Start with one real brief
- Create a brief you can actually share

**Preview text**
- Pick a client or project and get the first version in place.
- Start with the brief you need next, not a sample.

**Body**
Hi {{first_name}},

The fastest way to see whether BriefLink fits your workflow is to use it on a real engagement.

Choose a client or project you already need to scope, align on, or kick off. Create the brief, add the essentials, and share it once it’s ready for input.

You don’t need a perfect draft before you start. You just need enough structure to get the right people aligned earlier.

**CTA:** Start a client brief

**Secondary line**
Best fit: agencies and consultancies managing client input across kickoff, discovery, or project intake.

**Guardrails**
- Must sound practical, not inspirational
- Should encourage using a real project
- No generic “explore the platform” CTA

---

### In-product checklist module
**Label:** Get to your first shared brief  
**Steps**
1. Create a brief
2. Add the key project details
3. Share it with a client or collaborator

**CTA:** Start brief

**Guardrails**
- Checklist should mirror activation path exactly
- No extra optional steps above the fold

---

## 3) Pre-share nudges

### Variant A: Draft created, little progress
**Trigger:** `brief-created` and no `brief-progressed` or `brief-shared` within 24 hours

**Email subject options**
- Your brief is ready for the next step
- Finish your draft, then share it
- Keep your client brief moving

**Preview text**
- Add the essentials so you can send it out with confidence.
- A few details now makes sharing easier later.

**Body**
Hi {{first_name}},

You’ve started a brief in BriefLink.

Next, add the key details your client or team needs to align on — then share it out. Even a lightweight first version can replace a messy email thread and give everyone one place to respond from.

If you already know who should review it, aim for a draft that’s clear enough to send, not perfect enough to sit on.

**CTA:** Continue your brief

**Guardrails**
- Avoid “complete your profile” style language
- Nudge toward progress and then sharing

---

### Variant B: Brief in progress, not shared
**Trigger:** `brief-progressed` and no `brief-shared` within 48 hours

**Email subject options**
- Your brief looks ready to share
- Don’t let the brief stay in draft
- Send the brief while the project is still fresh

**Preview text**
- Sharing now helps you get aligned before delivery work starts.
- Move from draft to feedback with one share.

**Body**
Hi {{first_name}},

Your brief is underway.

The next useful step is to share it with the client or collaborator who should weigh in. That’s where BriefLink starts reducing back-and-forth — one brief, one link, clearer feedback.

If the draft is good enough for review, send it. You can always refine after you get input.

**CTA:** Share your brief

**Guardrails**
- No false pressure
- Must normalize sharing a workable draft
- Emphasize the value of input and alignment

---

### In-product nudge
**Label:** Ready to move this forward?  
**Body:** If this draft is clear enough to review, share it now and collect input in one place.  
**CTA:** Share brief

**Guardrails**
- Show only when a draft exists and sharing is the next logical step
- Avoid showing repeatedly in the same session after dismissal

---

## 4) Post-share reinforcement

### Email
**Trigger:** immediately after `brief-shared`

**Subject options**
- Your brief is live
- Brief shared — now review responses in one place
- Nice work — you’ve sent your first brief

**Preview text**
- This is where BriefLink starts paying off.
- Keep momentum by reviewing feedback as it comes in.

**Body**
Hi {{first_name}},

Your brief has been shared.

This is the point where BriefLink becomes useful in practice: instead of chasing client input across email threads, you now have one place to collect and review it.

As responses come in, use the brief to tighten alignment before the project moves further downstream.

**Primary CTA:** Review shared brief

**Secondary CTA:** Create another brief

**Secondary line**
If you run multiple client engagements, repeating this step on the next brief is the fastest way to build the habit.

**Guardrails**
- Reinforce completed progress
- Tie value to the actual shared state
- Offer a next loop without overselling expansion

---

### In-product success state
**Label:** Brief shared  
**Body:** Nice — you’ve reached the first useful milestone. Review responses here as they come in, or start another brief for the next client engagement.  
**Primary CTA:** Review activity  
**Secondary CTA:** New brief

**Guardrails**
- Celebrate lightly
- Focus on practical next actions

---

## 5) Stalled-user reactivation

### Variant A: Signed up, no brief, inactive
**Trigger:** `inactive-3d` after `account-created`, no `brief-created`

**Email subject options**
- Use BriefLink on the next client brief you already need
- Still planning to try BriefLink?
- Start with one active client project

**Preview text**
- You don’t need a big rollout — just one real brief.
- The easiest test is a project already waiting on client input.

**Body**
Hi {{first_name}},

If you’re still evaluating BriefLink, start with one live client project that needs clearer input or alignment.

You don’t need to migrate a process or train a whole team to test it. Create one brief, share it, and see whether it reduces the usual back-and-forth.

**CTA:** Start your brief

**Guardrails**
- Reassure low commitment
- Keep the ask concrete and credible

---

### Variant B: Brief started, inactive before share
**Trigger:** `inactive-3d` or `inactive-7d` after `brief-created` or `brief-progressed`, no `brief-shared`

**Email subject options**
- Pick up where you left off
- Your draft brief is still here
- Finish the brief and send it when ready

**Preview text**
- Get back to a draft that’s already underway.
- One more pass may be enough to share it.

**Body**
Hi {{first_name}},

Your draft brief is still waiting for you in BriefLink.

If this project is still active, the next step is to get the draft into a shareable state and send it to the client or collaborator who needs to review it.

You don’t need a polished final version before sharing — just a clear enough starting point to collect useful input.

**CTA:** Continue your brief

**Guardrails**
- Reference saved progress
- Reduce perfectionism friction
- Point clearly toward sharing

---

### Variant C: Longer-tail reactivation
**Trigger:** `inactive-14d`, no `brief-shared`

**Email subject options**
- A simple way to restart: share one brief
- If client input is still arriving by email, start here
- Try BriefLink on the next kickoff or intake brief

**Preview text**
- Use the next project that needs alignment as your restart point.
- BriefLink is most useful once a brief gets shared.

**Body**
Hi {{first_name}},

If BriefLink fell off your list, the easiest way back in is to use it on the next project where client input is likely to get messy.

Create the brief, get it clear enough to send, and share it early. That’s the moment BriefLink can replace scattered requests with one structured place to review what comes back.

**CTA:** Restart with a brief

**Guardrails**
- No guilt framing
- Must re-anchor on an upcoming real workflow
- Keep it outcome-first

---

# Recommended Cadence

## Email cadence
1. **Immediately:** signup confirmation
2. **Same day or next session:** activation onboarding if no brief created
3. **+24h after brief creation:** pre-share nudge A if low progress
4. **+48h after meaningful progress:** pre-share nudge B if not shared
5. **Immediate on share:** post-share reinforcement
6. **+3d inactivity:** stalled reactivation A or B based on state
7. **+14d inactivity:** longer-tail reactivation if still no share

## Frequency guardrails
- Cap at 4 activation-focused emails in a rolling 7-day window
- Suppress pre-share nudges immediately once `brief-shared` fires
- Suppress reactivation once the user resumes activity
- Prefer behavior-based branching over time-based blasting

---

# Personalization Inputs

Use if available:
- `first_name`
- agency / consultancy firm name
- client/project name
- brief title
- role or team function
- last completed step

## Safe personalization examples
- “Your draft brief for {{project_name}} is still here.”
- “Share {{brief_title}} when it’s ready for review.”
- “Start with the client brief you already need this week.”

## Avoid
- fake specificity from weak CRM fields
- over-personalized urgency
- industry claims not supported by known data

---

# CTA Library
Use concise, action-tied labels:
- Create your first brief
- Start a client brief
- Continue your brief
- Share your brief
- Review shared brief
- Create another brief
- Restart with a brief

Avoid:
- Learn more
- Explore platform
- Check it out
- Complete setup
- Upgrade now

---

# Voice Guardrails
## Do
- sound like a practical teammate
- anchor on clearer client input and faster alignment
- reduce friction around “good enough to share”
- reinforce the real milestone: `brief-shared`

## Don’t
- use hype
- imply universal fit for all businesses
- overpromise transformation from signup alone
- shame users for inactivity
- rely on countdowns, pressure, or artificial scarcity

---

# Success Criteria by Stage

## Signup confirmation
- Higher rate of `brief-created` within 24h

## Activation onboarding
- Increased first brief starts from new agency / consultancy signups

## Pre-share nudges
- Increased conversion from `brief-created` and `brief-progressed` to `brief-shared`

## Post-share reinforcement
- Higher return rate after first share
- Increased second brief creation

## Stalled reactivation
- Recovery of abandoned draft users into resumed editing and eventual `brief-shared`

---

# Measurement Notes
Track message performance against:
- open rate
- click-to-session rate
- `brief-created` from email
- `brief-progressed` from email-assisted sessions
- `brief-shared` conversion
- time from signup to first share
- second brief creation after first shared brief

Primary KPI for this lifecycle system:
- **% of qualified signups reaching `brief-shared` within 7 days**