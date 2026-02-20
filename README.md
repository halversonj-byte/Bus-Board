# Bus Status Board

**Thomas Jefferson Junior High - Woodridge School District 68**

Real-time bus status display board. Tap a bus to toggle between **Arrived** (green) and **Late** (red). All connected devices update instantly — the TV in the hallway, the office computer, and your phone at the bus turnaround all stay in sync.

---

## How It Works

- All 12 buses default to **Arrived** (green) each day (auto-resets daily)
- Tap a bus once to mark it as **Late** (red)
- Tap again to mark it as **Arrived** (green)
- Changes appear instantly on every device viewing the page
- No login or admin button — anyone with the URL can update

## What You Need

1. A **GitHub** account (you already have this)
2. A **Supabase** account (free — this is the real-time database that syncs all devices)

---

## Step-by-Step Setup

### Step 1: Create a Free Supabase Account

1. Go to **https://supabase.com** and click **Start your project**
2. Sign up with your GitHub account (easiest) or email
3. You're now on the Supabase dashboard

### Step 2: Create a New Supabase Project

1. Click **New Project**
2. Fill in:
   - **Name:** `bus-board` (or whatever you like)
   - **Database Password:** Pick something and save it somewhere (you won't need it often)
   - **Region:** Choose the one closest to you (e.g., East US)
3. Click **Create new project**
4. Wait about 1 minute for it to finish setting up

### Step 3: Set Up the Database

1. In your Supabase project, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `setup.sql` from this repository (you can view it on GitHub)
4. Copy the **entire contents** of `setup.sql` and paste it into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned" — that means it worked

### Step 4: Verify the Table Was Created

1. Click **Table Editor** in the left sidebar
2. You should see a table called **buses** with 12 rows (bus numbers 1–12)
3. Each row should show `status: arrived`

### Step 5: Get Your Supabase Credentials

1. Click **Project Settings** (the gear icon) in the left sidebar
2. Click **API** under the Configuration section
3. You need two values from this page:
   - **Project URL** — looks like `https://abcdefg.supabase.co`
   - **anon public** key — a long string under "Project API keys"
4. Keep this page open — you'll need these values in the next step

### Step 6: Add Your Credentials to the Website

1. Go to your GitHub repository for this project
2. Click on the file **index.html**
3. Click the pencil icon (Edit this file) in the top right
4. Find these two lines near the bottom of the file (around line 188):
   ```js
   const SUPABASE_URL  = 'YOUR_SUPABASE_URL';
   const SUPABASE_KEY  = 'YOUR_SUPABASE_ANON_KEY';
   ```
5. Replace `YOUR_SUPABASE_URL` with your **Project URL** from Step 5
6. Replace `YOUR_SUPABASE_ANON_KEY` with your **anon public** key from Step 5
7. It should look something like this (your values will be different):
   ```js
   const SUPABASE_URL  = 'https://abcdefg.supabase.co';
   const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.abc123...';
   ```
8. Click **Commit changes** (green button)

### Step 7: Enable GitHub Pages

1. In your GitHub repository, click **Settings** (the tab, not the gear)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Under **Branch**, select **main** (or your default branch) and **/ (root)**
5. Click **Save**
6. Wait 1–2 minutes for GitHub to build the site
7. Refresh the Settings > Pages page — you'll see a green banner with your site URL:
   ```
   https://YOUR-USERNAME.github.io/Bus-Board/
   ```

### Step 8: Test It

1. Open your GitHub Pages URL in a browser — you should see the bus board with all 12 buses in green (Arrived)
2. Open the **same URL** in a second browser window or on your phone
3. Tap a bus in one window — it should turn red (Late)
4. Check the other window — it should update to red within 1–2 seconds
5. Tap it again — it turns back to green (Arrived) on both screens

---

## Using the Bus Board

- **TV Display:** Open the URL in Chrome on the computer connected to the hallway TV. Press F11 for fullscreen.
- **Office Staff:** Open the same URL on the office computer or phone
- **Bus Turnaround:** Open the URL on your phone at the bus loop
- **Any device:** Bookmark the URL for quick access

All devices share the same live status — tap on one, it updates everywhere.

## Changing Bus Numbers

If your bus routes aren't numbered 1–12, you can change them:

1. Go to **SQL Editor** in your Supabase project
2. Run this to clear the old buses and insert your actual numbers:
   ```sql
   DELETE FROM buses;
   INSERT INTO buses (bus_number) VALUES
     (101), (102), (103), (104), (105), (106),
     (201), (202), (203), (204), (205), (206);
   ```
   (Replace the numbers above with your actual bus route numbers)
