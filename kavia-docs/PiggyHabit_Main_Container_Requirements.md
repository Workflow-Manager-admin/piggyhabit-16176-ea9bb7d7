# PiggyHabit Main Container – Requirements Document

## 1. Overview

PiggyHabit is a motivational web application that enables users to manually track their small savings habits, simulating the experience of using a traditional piggy bank. The aim is to encourage saving habits, provide visual motivation, and support goal-setting, without handling any actual money transactions. The platform is built using React JS and is designed to be clean, modern, and inviting—employing a dark theme with a cheerful color palette.

This document outlines the primary requirements, constraints, features, and user interface expectations for the main container of the PiggyHabit application.

---

## 2. User Requirements

- Users must be able to view their current “piggy bank” balance on the home screen.
- Users should be able to add an amount to their savings, increasing the balance.
- Users should be able to remove (subtract) an amount from their savings, simulating a withdrawal or spending action.
- The application must allow users to set a savings goal and display their progress toward this goal.
- A savings history (chronological list of deposits and withdrawals) should be visible to users, allowing them to track progress and patterns.
- All user interactions should be intuitive and visually engaging, utilizing a friendly UI and a large piggy bank icon as a central visual element.
- The entire experience should be accessible and responsive on various devices and screen sizes.
- No login, authentication, or network connectivity is required; data can be stored locally.

---

## 3. System Requirements

- Platform: Web browser, responsive layout for both desktop and mobile browsers.
- Tech Stack: React JS (latest stable), JavaScript (ES6+).
- No backend server required; the application runs fully client-side with state persisted locally (e.g., localStorage).
- No real-money handling, online transactions, or sensitive data storage.

---

## 4. Functional Requirements

### 4.1 Balance Display
- The main container displays the current savings balance at the top, accompanied by a prominent piggy bank icon.

### 4.2 Add Savings
- Users can enter an amount and add it to their balance using a clear, accessible button.
- The balance updates instantly on addition.

### 4.3 Remove Savings
- Users can enter an amount and remove it from their balance, representing spending or withdrawal.
- The balance updates instantly on subtraction.
- If a remove action would result in a negative balance, the app must block the action and display an appropriate message.

### 4.4 Savings Goal Setting
- Users can set a target (goal) balance.
- The app shows a progress bar or visual indicator reflecting how close the user is to reaching their savings goal.

### 4.5 Savings History
- Provides a chronological, readable list of all deposits and withdrawals with amounts and dates.
- Most recent transactions appear at the top.

### 4.6 User Interface & Layout
- The main screen organizes features in a logical, user-friendly manner:
  - Balance and icon at the top.
  - Add/Remove controls grouped beneath or beside the balance.
  - Goal progress bar close to the balance for immediate motivation.
  - Savings history visible in a section or tab near the bottom.
- Responsive design to ensure usability on both mobile and desktop browsers.

---

## 5. Non-Functional Requirements & Constraints

- **Usability:** Simple, minimal learning curve; all interactions are clear and immediately understandable.
- **Accessibility:** Interface elements (buttons, inputs) must be easily tappable/clickable and support screen readers where possible.
- **Performance:** Loads quickly, lightweight with minimal dependencies, and no unnecessary third-party UI frameworks.
- **Branding/Theming:** 
  - Uses a dark theme as the default.
  - Color palette includes the following (as CSS variables in `App.css`):
    - Primary (Kavia Orange): `#E87A41`
    - Secondary (Dark Background): `#1A1A1A`
    - Accent: May include variations like `#FFB300`, `#E65100`, etc.
    - Text Color: White `#ffffff`, with secondary/disabled states as `rgba(255,255,255,0.7)`.
  - UI components should be visually friendly (rounded edges, large icons, and clear typography).

---

## 6. Technology Stack

- **Frontend Framework:** React JS (no additional UI libraries by default)
- **Styling:** Vanilla CSS with variables and classes defined in `App.css`
- **Programming Language:** JavaScript (ES6+)
- **Data Persistence:** Browser localStorage

---

## 7. Out of Scope/Constraints

- No user accounts, authentication, or cloud storage.
- No backend or network API usage.
- No real-money transactions or integrations with financial services.
- PiggyHabit is purely for motivational and personal tracking use.

---

## 8. Summary

The PiggyHabit main container serves as a welcoming and functional dashboard for manual savings tracking, employing motivational visuals and lightweight architecture. All features focus on simplicity, positive reinforcement, and personal habit-building, delivered with a modern, branded UI in a fully offline web app.

