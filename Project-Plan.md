# Project Plan: Pomodoro Timer Web Application

## 1. Project Understanding

The goal is to build a web-based Pomodoro timer. The application will guide the user through the Pomodoro cycles: four 25-minute focus periods, each followed by a 5-minute short break, with the final focus period being followed by a 15-minute long break. The cycle then repeats.

The user will have control over the timer, with the ability to start it at any point in the cycle. Upon completion of a timer, the application will provide several configurable notification options: a flashing title bar, an audible alert, and a system notification if the browser is not in focus. These notifications can be enabled or disabled through a settings panel.

## 2. Implementation Plan

### Technologies

*   **Framework:** React with TypeScript
*   **Build Tool:** Vite
*   **Styling:** Bootstrap

### Steps

1.  **Project Setup:**
    *   Initialize a new React project using `npm create vite@latest . -- --template react-ts`.
    *   Install dependencies: `npm install bootstrap`.

2.  **Component Structure:**
    *   `App.tsx`: Main component, manages state and Pomodoro cycle.
    *   `Timer.tsx`: Displays countdown and handles start/stop.
    *   `Controls.tsx`: Allows user to select the starting point in the cycle.
    *   `Settings.tsx`: For toggling notification features.

3.  **State Management:**
    *   Use React hooks (`useState`, `useEffect`) for timer state, cycle management, and user settings.
    *   Persist settings to `localStorage`.

4.  **Timer Logic:**
    *   Use `setInterval` within `Timer.tsx` for the countdown.
    *   On completion, a function in `App.tsx` will advance the cycle.

5.  **Notifications:**
    *   **Flashing Title:** A function will rapidly alternate `document.title`.
    *   **Audio Cue:** Use the Web Audio API (`new Audio()`). A placeholder sound will be used.
    *   **Desktop Notifications:** Use the Notification API, requesting user permission.

6.  **Styling:**
    *   Use Bootstrap for a responsive and clean UI.
    *   Customize the theme for a unique look.

## 3. External Modules

*   `react`
*   `react-dom`
*   `bootstrap`
*   `@types/bootstrap`
