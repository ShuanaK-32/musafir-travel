# Musafir Travels - Luxury Bus Reservation & Ticketing System

A full-stack, production-grade intercity bus reservation portal built with Python, SQLite, HTML5, CSS3, and modern vanilla JavaScript.

---

## Demonstration Video Walkthrough

Watch the complete end-to-end system walkthrough featuring customer **Zara Khan** and the **System Admin Control Center**:

- **GitHub Video Viewer (Plays directly in browser)**: [musafir_travel_demo_zara_khan.mp4 on GitHub](https://github.com/ShuanaK-32/musafir-travel/blob/main/demo/musafir_travel_demo_zara_khan.mp4)
- **Direct Video Stream / Download (MP4)**: [musafir_travel_demo_zara_khan.mp4](https://raw.githubusercontent.com/ShuanaK-32/musafir-travel/main/demo/musafir_travel_demo_zara_khan.mp4)
- **Direct Video Stream (WebM)**: [musafir_travel_demo_zara_khan.webm](https://raw.githubusercontent.com/ShuanaK-32/musafir-travel/main/demo/musafir_travel_demo_zara_khan.webm)
- **Demo Poster Preview**: [demo_thumbnail.jpg](https://raw.githubusercontent.com/ShuanaK-32/musafir-travel/main/demo/demo_thumbnail.jpg)

The walkthrough demonstrates:
1. Customer login with user `Zara Khan`.
2. Seamless single-line desktop navigation bar showing user badge and wallet balance.
3. Luxury sleeper bus search (Chhatrapati Sambhajinagar to Pune).
4. Interactive 2+1 AC sleeper deck seat selection (Seat L4).
5. Passenger details submission and dynamic UPI QR code payment simulation (`musafirtravels@okhdfcbank`).
6. Instant digital boarding pass confirmation with PNR and QR code.
7. Customer My Bookings dashboard showing active confirmed reservations.
8. System Admin Control Center showcasing real-time KPI revenue metrics, booking management records, and luxury fleet status.

---

## Default Login Credentials

| Role | Username / Email | Password | Access Scope |
|---|---|---|---|
| **Demonstration User** | `Zara Khan` (`zk741725@gmail.com`) | `Zara@2006` | Customer Booking, Seat Selection, Ticket & Wallet |
| **System Admin** | `admin@musafir.com` | `admin123` | Admin Control Center, Live Revenue, Bookings & Fleet |
| **Test Passenger** | `user@musafir.com` | `user123` | Standard Customer Account |

---

## Key Features & Recent Enhancements

### 1. Desktop Navbar Alignment
- **Single-Line Header Layout**: Compacted padding (`0.75rem 3.5%`) and link spacing (`1.1rem`) with `flex-wrap: nowrap` so that the brand logo, navigation links, user profile badge, wallet pill, and logout button remain on a single line (72px height) without wrapping onto a second line on standard desktop viewports (1280px+).

### 2. Mobile Responsive Redesign
- **Mobile Drawer Navigation**: Slide-out mobile navigation drawer triggered by an accessible hamburger menu toggle.
- **Responsive Layout & Cards**: Fluid container widths, touch-friendly button targets (minimum 44px), optimized intercity search forms, responsive sleeper deck layout, and stacked cards for seamless viewing on smartphones and tablets.
- **Zero Horizontal Overflow**: Guaranteed viewport containment preventing horizontal scrolling on mobile devices.

### 3. Dynamic UPI QR Payment Gateway
- **Real-Time QR Generation**: Dynamic UPI payment string targeting `musafirtravels@okhdfcbank` with auto-calculated fare and unique transaction references.
- **Simulation & Instant Confirmation**: Includes automated payment countdown timer and instant demo verification that issues an official PNR and digital boarding pass.

### 4. Customer Self-Service & Admin Portals
- **Customer Portal**: Intercity search, interactive 2+1 AC sleeper seat selection, boarding point selection, wallet management, booking history, and ticket cancellation with automated refund tracking.
- **Admin Control Center**: Live KPI analytics (Total Revenue, Total Bookings, Fleet Operations, Registered Users), live booking audit table with real-time updates, and bus fleet scheduling.

### 5. Cloud Deployment Ready (Render)
- Fully configured infrastructure blueprint in `render.yaml` and Python dependencies in `requirements.txt` for 1-click cloud deployment.

---

## Quick Start (Local Setup)

### Option 1: 1-Click Launch (Windows Batch File)
Double-click `start_server.bat` in the project root.  
It automatically starts the Python server on port 5000 and opens the homepage in your default web browser.

### Option 2: Command Line
```bash
# Clone the repository
git clone https://github.com/ShuanaK-32/musafir-travel.git
cd musafir-travel

# Start the built-in HTTP and REST API server
python server.py
```
Then visit: [http://localhost:5000/frontend/pages/index.html](http://localhost:5000/frontend/pages/index.html)

---

## Cloud Deployment (Render)

The repository includes a ready-to-use Render Blueprint:

1. Push your repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New +** -> **Blueprint**.
3. Select the `musafir-travel` repository.
4. Render will read `render.yaml`, set up the Python environment, execute `pip install -r requirements.txt`, and start `python server.py`.

---

## How to Add or Paste Images in VS Code

If pasting directly (`Ctrl+V`) into VS Code does not work for you:

### Method 1: Use the Included 1-Click Clipboard Saver (Easiest)
1. Copy **ANY** image to your clipboard (e.g. right-click image online -> **Copy Image**, or take a screenshot using `Win + Shift + S`).
2. Double-click **`paste_image.bat`** (or in VS Code terminal run: `python paste_image.py my_image.png`).
3. Your image is immediately saved directly into `frontend/assets/Images/`.

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
├── .vscode/               # VS Code workspace settings and extension recommendations
├── database/              # SQLite database (buses, bookings, users, coupons, payments)
│   └── musafir_database.sqlite
├── demo/                  # Video walkthrough and presentation media
│   ├── demo_thumbnail.jpg
│   ├── musafir_travel_demo_zara_khan.mp4
│   └── musafir_travel_demo_zara_khan.webm
├── frontend/
│   ├── assets/Images/     # Bus photos, amenities icons, banners, and brand logos
│   ├── css/styles.css     # Unified responsive stylesheet (mobile-optimized, aligned navbar)
│   ├── js/
│   │   ├── qrcode.min.js  # QR code generator library
│   │   └── script.js      # Dynamic UPI QR, seat selector, booking flow, auth logic
│   └── pages/             # Application views
│       ├── admin.html     # Admin Control Center (KPI metrics, live bookings, fleet)
│       ├── bookings.html  # Customer My Bookings and ticket history
│       ├── confirmation.html # Boarding pass with PNR and QR code
│       ├── index.html     # Homepage with route search and promotions
│       ├── login.html     # User and admin authentication portal
│       ├── offers.html    # Special discounts and promotional codes
│       ├── refunds.html   # Refund tracking and policy details
│       ├── search.html    # Bus search results and live seat selector
│       └── signup.html    # New customer registration
├── tests/                 # Automated test suite
│   └── test_api.py        # Backend API and database tests
├── .env                   # Environment variable configuration
├── .gitignore             # Git ignore rules
├── paste_image.bat        # 1-Click Windows clipboard image saver
├── paste_image.py         # Python clipboard image tool
├── render.yaml            # Render Cloud deployment blueprint
├── requirements.txt       # Python package dependencies
├── server.py              # Backend REST API and static HTTP server
├── start_server.bat       # 1-Click Windows project launcher
└── README.md              # Complete project documentation
```

---

## Automated Tests

Run the full automated test suite anytime:
```bash
python tests/test_api.py
```
All tests verify route search, seat availability, booking creation, passenger validation, and authentication endpoints.
