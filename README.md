# Bus Status Board

**Thomas Jefferson Junior High - Woodridge School District 68**

Real-time bus status display board. Tap a bus to toggle between **Arrived** (green) and **Late** (red). All connected devices update instantly.

## How It Works

- All 12 buses default to **Arrived** (green) each day
- Tap a bus to mark it as **Late** (red)
- Tap again to mark it as **Arrived** (green)
- All changes sync in real time across every connected device
- Status automatically resets to Arrived at midnight

## Setup

1. Install [Node.js](https://nodejs.org/) (version 18 or later)
2. Clone this repository
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open `http://localhost:3000` in a browser

## Usage

- **TV Display:** Open the URL in a browser on the computer connected to the TV
- **Staff Control:** Open the same URL on any phone, tablet, or computer on the same network
- **Bus Turnaround:** Open the URL on a phone at the bus loop

All devices stay in sync automatically.

## Changing Bus Numbers

Edit the `BUS_NUMBERS` array in `server.js`:

```js
const BUS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
```

## Deploying Online

To make the board accessible from anywhere (not just the school network), deploy to a free hosting service:

- **[Render](https://render.com)** - Connect your GitHub repo, select "Web Service", it auto-detects Node.js
- **[Railway](https://railway.app)** - Connect your GitHub repo and deploy
- **[Glitch](https://glitch.com)** - Import from GitHub

The `PORT` environment variable is read automatically for hosted environments.
