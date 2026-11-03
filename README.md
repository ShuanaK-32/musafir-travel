# Musafir Travels - Luxury Bus Reservation & Ticketing System

A full-stack, production-ready bus reservation portal built with Python, SQLite, HTML5, CSS3, and JavaScript.

---

## Quick Start (1-Click Run)

### Option 1: Double-Click Batch File
Double-click `start_server.bat` in the project root.  
It automatically starts the Python server on port 5000 and opens the homepage in your browser.

### Option 2: Command Line
```bash
python server.py
```
Then visit: [http://localhost:5000/frontend/pages/index.html](http://localhost:5000/frontend/pages/index.html)

---

## Demonstration Video Walkthrough

Watch the complete end-to-end website walkthrough (Customer Login, Intercity Bus Search, Interactive 2+1 Sleeper Deck Selection, Dynamic UPI QR Instant Checkout, and Verified Boarding Pass Confirmation) for user **Zara Khan**:

- **Direct Video Link (MP4)**: [musafir_travel_demo_zara_khan.mp4](demo/musafir_travel_demo_zara_khan.mp4)
- **WebM Video Link**: [musafir_travel_demo_zara_khan.webm](demo/musafir_travel_demo_zara_khan.webm)

---

## Default Login Credentials

| Role | Username / Email | Password |
|---|---|---|
| **Demonstration User** | `Zara Khan` (`zk741725@gmail.com`) | `Zara@2006` |
| **System Admin** | `admin@musafir.com` | `admin123` |
| **Test Passenger** | `user@musafir.com` | `user123` |

---

## How to Add or Paste Images in VS Code

If pasting directly (`Ctrl+V`) into VS Code does not work for you:

### Method 1: Use the Included 1-Click Clipboard Saver (Easiest)
1. Copy **ANY** image to your clipboard (e.g. right-click image online -> **Copy Image**, or take a screenshot using `Win + Shift + S`).
2. Double-click **`paste_image.bat`** (or in VS Code terminal run: `python paste_image.py my_image.png`).
3. Your image is immediately saved directly into `frontend/assets/Images/`!

### Method 2: Drag & Drop inside VS Code
1. Open the file `frontend/pages/index.html` in VS Code.
2. From Windows File Explorer, drag your image file directly into the editor tab while holding **Shift**.
3. VS Code will automatically place it and write the `<img>` tag for you.

### Method 3: Standard Copy & Paste in Windows File Explorer
1. Copy the image file from your computer (`Ctrl+C`).
2. Navigate into `frontend/assets/Images/` and press `Ctrl+V`.
3. In your HTML or CSS, refer to it as `../assets/Images/your_image.png`.

---

## Project Structure

```
musafir-travel/
├── .vscode/               # VS Code project settings & extension recommendations
├── database/              # SQLite database (buses, bookings, users, coupons, payments)
│   └── musafir_database.sqlite
├── frontend/
│   ├── assets/Images/     # All bus photos, amenities icons, banners, and logos
│   ├── css/styles.css     # Unified stylesheet (zero emojis, brand theme)
│   ├── js/script.js       # Dynamic UPI QR, seat layout, booking logic, auth
│   └── pages/             # All application pages (index, search, booking, admin, etc.)
├── tests/                 # Automated test suite (python tests/test_api.py)
├── paste_image.bat        # 1-Click Windows clipboard image saver
├── paste_image.py         # Python clipboard image tool
├── start_server.bat       # 1-Click project launcher
├── server.py              # Backend REST API and static server
└── README.md              # Documentation
```

---

## Automated Tests

Run the full automated test suite anytime:
```bash
python tests/test_api.py
```
