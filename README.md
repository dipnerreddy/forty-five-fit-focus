<!-- # 💪 45-Day Fitness Challenge – Fullstack Web App

A sleek, mobile-first fitness tracking platform that guides users through a 45-day challenge with daily gym or home workouts, streak tracking, weekly progress summaries, and a shareable certificate.

---
## 🌏 URL
- [45-days-fitness.dipnerreddy.in](https://45-days-fitness.dipnerreddy.in/)
---

## 📌 Key Features

- 🔐 **User Auth**: Simple email + password login/signup  
- 🏋️ **Workout Modes**: Choose either **Home** or **Gym** workouts (non-switchable mid-challenge)  
- ✅ **Daily Tracker**: Daily workouts with checkbox per set + manual weight input  
- 🔥 **Streak Logic**: Missing a day resets progress to Day 1  
- 📊 **Weekly Summary**: Graphical insights for progress and weight  
- ✉️ **Email Nudges**: Daily reminders & motivational encouragements  
- 💬 **Motivational Quotes**: Daily inspiration on dashboard  
- 📄 **Completion Certificate**: Shareable link with Open Graph preview  
- 🎨 **Modern UI**: Swiss design, white space heavy, inspired by [21st.dev](https://21st.dev)  
- 📱 **Mobile-First Design**: Optimized for phone-first experiences  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS 4.0, ShadCN/UI, TypeScript  
- **Backend**: Supabase (Auth + DB), Node.js APIs  
- **Design System**: 21st.dev-style compound components  
- **Workout Source**: Google Sheets CSV (Gym & Home)  
- **Charts**: Recharts or Chart.js  
- **Deployment**: Vercel  

---

## 🧠 Product Requirements Document (PRD)

### 1. 👤 User Flow

| Step     | Description                                              |
|----------|----------------------------------------------------------|
| Signup   | Name, Age, Weight, Gender, Routine (Home or Gym)         |
| Routine  | User selects workout type; cannot change mid-challenge  |
| Dashboard| Shows current day workout, motivational quote, streak   |
| Weekly   | Shows progress graph + weight data                      |
| Completion| 45th day ends → certificate generated & sharable link |
| Reset    | If a day is missed, streak resets to Day 1              |

---

### 2. 📅 Daily Workout Page

- Daily data pulled from Google Sheets CSV  
- User sees exercises for the day (Gym or Home routine)  
- Each exercise has 4 sets × 8 reps  
- User manually enters weight used  
- Each set has a checkbox  
- Day marked complete only when **all sets are done**

---

### 3. 📈 Weekly Summary Page

- Line graph showing:
  - Weight change over time  
  - Total sets completed  
  - Current streak  
- Weekly goal reflection  

---

### 4. 💌 Email Notifications

- **Signup Email**: Custom HTML email with call to confirm  
- **Password Reset**: Secure reset link  
- **Daily Reminders**: Nudges if a day is missed or pending  
- **Completion Congrats**: With shareable certificate link  

---

### 5. 🧾 Certificate Generator

- Auto-fills: name, date completed, routine type  
- Generates sharable link:  
  `https://45-days-fitness.dipnerreddy.in/verify/`  
- OG Preview (LinkedIn, WhatsApp, etc.)  
- Optional: PDF download  

---

### 6. 🔐 Rules & Validations

- 🔄 **Routine Lock**: Cannot switch between Home & Gym once started, If switch progress reset  
- ❌ **Missed Day = Reset**: No backdating  
- ✅ **All Sets = Day Complete**  
- ❌ **No Leaderboards / No Photos**  
- 🌓 **Dark/Light Mode**: Follows system theme  
- 📱 **Fully Mobile-Optimized**

---

### 7. 🧰 Components to Build

- `RoutineSelectorCard.tsx` – Choose Home or Gym (first login only)  
- `WorkoutTracker.tsx` – Checkboxes + manual weight + streak logic  
- `QuoteCard.tsx` – Rotates daily tips or motivational quotes  
- `StreakCounter.tsx` – Visually shows progress  
- `WeeklySummaryChart.tsx` – Displays weight + streak  
- `CertificatePage.tsx` – Dynamic OG share card + preview  

---

## 🚀 Developer Setup

### 1. Clone the Repo
```bash
git clone https://github.com/YOUR_USERNAME/45-day-fitness-app.git
cd 45-day-fitness-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables (`.env.local`)
```
SUPABASE_URL=
SUPABASE_ANON_KEY=
GOOGLE_SHEET_CSV=https://docs.google.com/spreadsheets/d/e/2PACX-1vRqDM3PdzUcbRIEKFoga2kmigtYQpN5Fi7UNYch9cckwDcOjR818y6hdTKsGS8K7aOzvzWQmqcpT9Hh/pub?output=csv
```

### 4. Run Locally
```bash
npm run dev
```

---

## 🔮 Future Enhancements

- 🔔 Push Notifications  
- 🧠 AI Personal Tips Based on Workout Logs  
- 🌙 Sleep + Water Habit Tracking  
- 📲 PWA/iOS/Android Export (via Capacitor)  

---

## 🧑‍🎓 Credits

- Made by **Avuthu Dipner Reddy**  
- Built using OpenAI GPT-4 & design system guidance  
- Workout Data from Google Sheets (CSV)  
- Design inspired by: [21st.dev](https://21st.dev)  

---

> “It’s not just about getting fit. It’s about becoming someone who doesn’t quit.” -->
