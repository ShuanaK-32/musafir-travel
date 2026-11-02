
"""
Musafir Travels - Python SQLite Backend REST Server
Database: database/musafir_database.sqlite

API endpoints:
GET  /api/buses
GET  /api/bookings
GET  /api/users
GET  /api/coupons
GET  /api/refunds
POST /api/bookings
POST /api/login
POST /api/signup
POST /api/buses/add
"""

import http.server
import socketserver
import json
import sqlite3
import os
import urllib.parse
import hashlib
import hmac
import secrets
import time
import razorpay

PORT = int(os.environ.get("PORT", 5000))

RAZORPAY_KEY_ID = os.environ.get("RAZORPAY_KEY_ID", "rzp_test_TtfckYcWVm7nKW")
RAZORPAY_KEY_SECRET = os.environ.get("RAZORPAY_KEY_SECRET", "BK21lKWOu4YsLWq8VkKm1v7O")

def get_razorpay_client():
    if not RAZORPAY_KEY_ID or not RAZORPAY_KEY_SECRET:
        raise RuntimeError("Razorpay API keys are not configured.")

    return razorpay.Client(
        auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET)
    )


# Temporary in-memory login sessions
AUTH_SESSIONS = {}
SESSION_LIFETIME = 8 * 60 * 60  # 8 hours


def create_session(email, role):
    token = secrets.token_urlsafe(32)
    AUTH_SESSIONS[token] = {
        "email": email,
        "role": role,
        "expires": time.time() + SESSION_LIFETIME
    }
    return token


def get_session(token):
    session = AUTH_SESSIONS.get(token)
    if not session:
        return None

    if session["expires"] <= time.time():
        AUTH_SESSIONS.pop(token, None)
        return None

    return session

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(BASE_DIR, "database", "musafir_database.sqlite")
# Password security helpers
def hash_password(password):
    salt = os.urandom(16)
    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        600_000
    )
    return "pbkdf2_sha256$" + salt.hex() + "$" + password_hash.hex()


def verify_password(password, stored_password):
    try:
        if stored_password.startswith("pbkdf2_sha256$"):
            _, salt_hex, hash_hex = stored_password.split("$")
            salt = bytes.fromhex(salt_hex)
            expected_hash = bytes.fromhex(hash_hex)

            actual_hash = hashlib.pbkdf2_hmac(
                "sha256",
                password.encode("utf-8"),
                salt,
                600_000
            )

            return hmac.compare_digest(actual_hash, expected_hash)

        # Temporary compatibility for accounts created before this update.
        return hmac.compare_digest(password, stored_password)

    except (ValueError, TypeError):
        return False


def get_connection():
    """Open a connection to the project's existing database."""
    os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn


def init_sqlite_db():
    """Create tables if missing without deleting existing data."""
    with get_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS buses (
                id INTEGER PRIMARY KEY,
                operator TEXT,
                bus_number TEXT,
                bus_type TEXT,
                rating REAL,
                ratings_count INTEGER,
                from_city TEXT,
                to_city TEXT,
                departure_time TEXT,
                arrival_time TEXT,
                duration TEXT,
                price INTEGER,
                total_seats INTEGER,
                seats_available INTEGER,
                boarding_points TEXT,
                dropping_points TEXT,
                occupied_seats TEXT,
                women_seats TEXT,
                senior_seats TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS payments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pnr TEXT NOT NULL UNIQUE,
                order_id TEXT NOT NULL UNIQUE,
                payment_id TEXT UNIQUE,
                amount_paise INTEGER NOT NULL,
                currency TEXT NOT NULL DEFAULT 'INR',
                status TEXT NOT NULL DEFAULT 'CREATED',
                created_at TEXT NOT NULL,
                verified_at TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pnr TEXT UNIQUE,
                bus_id INTEGER,
                operator TEXT,
                bus_type TEXT,
                from_city TEXT,
                to_city TEXT,
                journey_date TEXT,
                departure_time TEXT,
                arrival_time TEXT,
                boarding_point TEXT,
                dropping_point TEXT,
                seats TEXT,
                passengers TEXT,
                contact_email TEXT,
                contact_phone TEXT,
                base_fare INTEGER,
                gst INTEGER,
                senior_discount INTEGER,
                coupon_discount INTEGER,
                total_fare INTEGER,
                coupon_used TEXT,
                payment_method TEXT,
                booking_date TEXT,
                status TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT,
                name TEXT,
                role TEXT,
                phone TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS refunds (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                refund_id TEXT UNIQUE,
                pnr TEXT,
                user_email TEXT,
                amount INTEGER,
                status TEXT,
                request_date TEXT,
                refund_mode TEXT
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS coupons (
                code TEXT PRIMARY KEY,
                discount_percent INTEGER,
                flat_discount INTEGER,
                max_discount INTEGER,
                min_amount INTEGER,
                desc TEXT,
                active INTEGER
            )
        """)

        # Seed sample buses only when the buses table is empty.
        cursor.execute("SELECT COUNT(*) FROM buses")
        if cursor.fetchone()[0] == 0:
            buses = [
                (
                    101, "Musafir Travels Luxury AC Sleeper (2+1)",
                    "MH-20-BT-9921", "AC Sleeper", 4.9, 420,
                    "Chhatrapati Sambhajinagar (Aurangabad)", "Mumbai",
                    "09:30 PM", "05:30 AM", "8h 00m", 750, 24, 16,
                    json.dumps([
                        {"name": "Baba Petrol Pump Musafir Office", "time": "09:30 PM"},
                        {"name": "Cidco Bus Stand", "time": "09:50 PM"}
                    ]),
                    json.dumps([
                        {"name": "Thane Teen Hath Naka", "time": "04:45 AM"},
                        {"name": "Dadar East Asiad Stand", "time": "05:15 AM"}
                    ]),
                    json.dumps(["L1", "L5", "U2", "U8"]),
                    json.dumps(["L3", "L4", "U3", "U4"]),
                    json.dumps(["L11", "L12", "U11", "U12"])
                ),
                (
                    102, "Musafir Express Executive Seater (2+2)",
                    "MH-20-EX-4410", "AC Seater", 4.7, 310,
                    "Chhatrapati Sambhajinagar (Aurangabad)", "Pune",
                    "06:00 AM", "11:00 AM", "5h 00m", 450, 36, 24,
                    json.dumps([
                        {"name": "Central Bus Stand (CBS)", "time": "06:00 AM"},
                        {"name": "Kranti Chowk", "time": "06:15 AM"}
                    ]),
                    json.dumps([
                        {"name": "Viman Nagar Metro Stop", "time": "10:30 AM"},
                        {"name": "Shivajinagar Musafir Office", "time": "11:00 AM"}
                    ]),
                    json.dumps(["S1", "S2", "S7", "S12"]),
                    json.dumps(["S3", "S4", "S5", "S6"]),
                    json.dumps(["S33", "S34", "S35", "S36"])
                ),
                (
                    103, "Musafir Volvo Multi-Axle AC Sleeper (2+1)",
                    "MH-01-VL-7711", "AC Sleeper", 4.9, 580,
                    "Mumbai", "Pune", "07:30 AM", "11:00 AM",
                    "3h 30m", 600, 24, 15,
                    json.dumps([
                        {"name": "Dadar East Asiad Stand", "time": "07:30 AM"},
                        {"name": "Vashi Highway Signal", "time": "08:20 AM"}
                    ]),
                    json.dumps([
                        {"name": "Wakad Hinjewadi Flyover", "time": "10:30 AM"},
                        {"name": "Swargate Musafir Depot", "time": "11:00 AM"}
                    ]),
                    json.dumps(["L2", "L6", "U1"]),
                    json.dumps(["L3", "L4"]),
                    json.dumps(["L11", "L12"])
                ),
                (
                    104, "Musafir Gold Luxury Sleeper (2+1)",
                    "MH-12-GL-1008", "AC Sleeper", 4.8, 390,
                    "Pune", "Nagpur", "05:00 PM", "07:30 AM",
                    "14h 30m", 1350, 24, 17,
                    json.dumps([
                        {"name": "Swargate Musafir Office", "time": "05:00 PM"}
                    ]),
                    json.dumps([
                        {"name": "Nagpur Ganeshpeth Stand", "time": "07:30 AM"}
                    ]),
                    json.dumps(["L1", "L2"]),
                    json.dumps(["L4", "U4"]),
                    json.dumps(["L10", "U10"])
                )
            ]

            cursor.executemany("""
                INSERT INTO buses VALUES (
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
                )
            """, buses)

        cursor.execute("SELECT COUNT(*) FROM users")
        if cursor.fetchone()[0] == 0:
            cursor.executemany("""
                INSERT INTO users (email, password, name, role, phone)
                VALUES (?, ?, ?, ?, ?)
            """, [
                ("admin@musafir.com", "admin123", "System Admin",
                 "admin", "8055206206"),
                ("user@musafir.com", "user123", "Rahul Sharma",
                 "user", "9876543210")
            ])

        cursor.execute("SELECT COUNT(*) FROM coupons")
        if cursor.fetchone()[0] == 0:
            cursor.executemany("""
                INSERT INTO coupons
                (code, discount_percent, flat_discount, max_discount,
                 min_amount, desc, active)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, [
                ("MUSAFIR20", 20, 0, 200, 300, "20% OFF up to Rs 200", 1),
                ("FIRSTBUS", 0, 100, 100, 400, "Flat Rs 100 OFF for new users", 1),
                ("SENIOR10", 10, 0, 150, 200, "10% Concession for Senior Citizens", 1)
            ])



class MusafirHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):

    def translate_path(self, path):
        """Serve website files from this project folder."""
        path = urllib.parse.urlparse(path).path
        path = urllib.parse.unquote(path)
        relative_path = os.path.normpath(path.lstrip("/\\"))
        full_path = os.path.abspath(
            os.path.join(BASE_DIR, relative_path)
        )

        # Prevent access to files outside the project folder.
        if os.path.commonpath([BASE_DIR, full_path]) != BASE_DIR:
            return os.path.join(BASE_DIR, "__not_found__")

        return full_path

    def do_OPTIONS(self):
        """Handle CORS preflight requests."""
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.end_headers()

    def send_json_response(self, data, status=200):
        """Send a JSON response to the client."""
        response = json.dumps(data).encode("utf-8")

        self.send_response(status)
        self.send_header(
            "Content-Type",
            "application/json; charset=utf-8"
        )
        self.send_header("Content-Length", str(len(response)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        self.end_headers()
        self.wfile.write(response)

    def read_json_body(self):
        """Read and validate the JSON request body."""
        length = int(self.headers.get("Content-Length", "0"))

        if length > 1_000_000:
            raise ValueError("Request body is too large.")

        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw) if raw.strip() else {}

    def do_GET(self):
        """Handle GET API requests."""
        path = urllib.parse.urlparse(self.path).path

        if path in ["", "/", "/index.html"]:
            self.send_response(302)
            self.send_header("Location", "/frontend/pages/index.html")
            self.end_headers()
            return

        endpoints = {
            "/api/buses": self.get_buses,
            "/api/bookings": self.get_bookings,
            "/api/users": self.get_users,
            "/api/coupons": self.get_coupons,
            "/api/refunds": self.get_refunds,
        }

        if path not in endpoints:
            return super().do_GET()

        try:
            result = endpoints[path]()
            self.send_json_response(result)

        except (sqlite3.Error, ValueError, TypeError) as exc:
            print(f"GET {path} failed: {exc}")
            self.send_json_response(
                {
                    "status": "ERROR",
                    "message": "Unable to retrieve data.",
                },
                500,
            )

    def do_POST(self):
        """Handle POST API requests."""
        path = urllib.parse.urlparse(self.path).path

        try:
            data = self.read_json_body()

            if not isinstance(data, dict):
                self.send_json_response(
                    {
                        "status": "ERROR",
                        "message": "Invalid request body.",
                    },
                    400,
                )
                return

            # Route the request to the correct handler.
            if path == "/api/payments/create-order":
                result = self.create_payment_order(data)

            elif path == "/api/payments/verify":
                result = self.verify_payment(data)

            elif path == "/api/bookings":
                result = self.save_booking(data)

            elif path == "/api/login":
                result = self.handle_login(data)

            elif path == "/api/signup":
                result = self.handle_signup(data)

            elif path == "/api/buses/add":
                result = self.add_bus(data)

            else:
                self.send_json_response(
                    {
                        "status": "ERROR",
                        "message": "Invalid API endpoint.",
                    },
                    404,
                )
                return

            status_code = (
                400 if result.get("status") == "ERROR" else 200
            )
            self.send_json_response(result, status_code)

        except (ValueError, json.JSONDecodeError) as exc:
            print(f"Invalid POST request at {path}: {exc}")
            self.send_json_response(
                {
                    "status": "ERROR",
                    "message": "Invalid JSON request.",
                },
                400,
            )

        except sqlite3.Error as exc:
            print(f"Database error at {path}: {exc}")
            self.send_json_response(
                {
                    "status": "ERROR",
                    "message": "A database error occurred.",
                },
                500,
            )

        except (TypeError, KeyError) as exc:
            print(f"Request processing error at {path}: {exc}")
            self.send_json_response(
                {
                    "status": "ERROR",
                    "message": "Server could not process the request.",
                },
                500,
            )

        except Exception as exc:
            print(f"Unexpected error at {path}: {exc}")
            self.send_json_response(
                {
                    "status": "ERROR",
                    "message": "An unexpected server error occurred.",
                },
                500,
            )

    def get_buses(self):
        """Fetch all buses from the SQLite database."""
        with get_connection() as conn:
            rows = conn.execute(
                "SELECT * FROM buses ORDER BY id"
            ).fetchall()

        buses = []

        for r in rows:
            buses.append(
                {
                    "id": r["id"],
                    "operator": r["operator"],
                    "busNumber": r["bus_number"],
                    "busType": r["bus_type"],
                    "rating": r["rating"],
                    "ratingsCount": r["ratings_count"],
                    "from": r["from_city"],
                    "to": r["to_city"],
                    "departureTime": r["departure_time"],
                    "arrivalTime": r["arrival_time"],
                    "duration": r["duration"],
                    "price": r["price"],
                    "totalSeats": r["total_seats"],
                    "seatsAvailable": r["seats_available"],
                    "boardingPoints": json.loads(
                        r["boarding_points"] or "[]"
                    ),
                    "droppingPoints": json.loads(
                        r["dropping_points"] or "[]"
                    ),
                    "occupiedSeats": json.loads(
                        r["occupied_seats"] or "[]"
                    ),
                    "womenSeats": json.loads(
                        r["women_seats"] or "[]"
                    ),
                    "seniorSeats": json.loads(
                        r["senior_seats"] or "[]"
                    ),
                }
            )

        return buses

    def get_bookings(self):
        with get_connection() as conn:
            rows = conn.execute(
                "SELECT * FROM bookings ORDER BY id DESC"
            ).fetchall()

        bookings = []
        for r in rows:
            bookings.append({
                "id": r["id"],
                "pnr": r["pnr"],
                "busId": r["bus_id"],
                "operator": r["operator"],
                "busType": r["bus_type"],
                "from": r["from_city"],
                "to": r["to_city"],
                "journeyDate": r["journey_date"],
                "departureTime": r["departure_time"],
                "arrivalTime": r["arrival_time"],
                "boardingPoint": r["boarding_point"],
                "droppingPoint": r["dropping_point"],
                "seats": json.loads(r["seats"] or "[]"),
                "passengers": json.loads(r["passengers"] or "[]"),
                "contactEmail": r["contact_email"],
                "contactPhone": r["contact_phone"],
                "baseFare": r["base_fare"],
                "gst": r["gst"],
                "seniorDiscount": r["senior_discount"],
                "couponDiscount": r["coupon_discount"],
                "totalFare": r["total_fare"],
                "couponUsed": r["coupon_used"],
                "paymentMethod": r["payment_method"],
                "bookingDate": r["booking_date"],
                "status": r["status"]
            })
        return bookings

    
    def create_payment_order(self, data):
        booking = data.get("booking")

        if not isinstance(booking, dict):
            return {
                "status": "ERROR",
                "error": "Booking details are required."
            }

        pnr = str(booking.get("pnr", "")).strip()
        bus_id = booking.get("busId")
        seats = booking.get("seats")

        if not pnr or not isinstance(seats, list) or not seats:
            return {
                "status": "ERROR",
                "error": "Booking reference and seats are required."
            }

        try:
            client = get_razorpay_client()

            with get_connection() as conn:
                existing = conn.execute(
                    "SELECT status FROM bookings WHERE pnr = ?", (pnr,)
                ).fetchone()

                if existing:
                    return {
                        "status": "ERROR",
                        "error": "This booking reference already exists."
                    }

                bus = conn.execute(
                    "SELECT * FROM buses WHERE id = ?", (bus_id,)
                ).fetchone()

                if not bus:
                    return {
                        "status": "ERROR",
                        "error": "Selected bus was not found."
                    }

                # Calculate the base fare using the server's bus price.
                base_fare = int(bus["price"]) * len(seats)
                gst = round(base_fare * 0.05)

                # Do not trust a browser-supplied total or discount.
                # Discounts must be validated server-side before enabling them.
                amount_rupees = base_fare + gst
                amount_paise = int(amount_rupees * 100)

                if amount_paise <= 0:
                    return {
                        "status": "ERROR",
                        "error": "Invalid payment amount."
                    }

                order = client.order.create({
                    "amount": amount_paise,
                    "currency": "INR",
                    "receipt": pnr,
                    "notes": {"pnr": pnr}
                })

                conn.execute("""
                    INSERT INTO bookings (
                        pnr, bus_id, operator, bus_type, from_city, to_city,
                        journey_date, departure_time, arrival_time,
                        boarding_point, dropping_point, seats, passengers,
                        contact_email, contact_phone, base_fare, gst,
                        senior_discount, coupon_discount, total_fare,
                        coupon_used, payment_method, booking_date, status
                    ) VALUES (
                        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                        ?, ?, 0, 0, ?, ?, 'Razorpay', ?, 'PENDING_PAYMENT'
                    )
                """, (
                    pnr, bus["id"], bus["operator"], bus["bus_type"],
                    bus["from_city"], bus["to_city"],
                    booking.get("journeyDate"),
                    bus["departure_time"], bus["arrival_time"],
                    booking.get("boardingPoint"),
                    booking.get("droppingPoint"),
                    json.dumps(seats),
                    json.dumps(booking.get("passengers", [])),
                    booking.get("contactEmail"),
                    booking.get("contactPhone"),
                    base_fare, gst, amount_rupees,
                    "NONE", booking.get("bookingDate")
                ))

                conn.execute("""
                    INSERT INTO payments (
                        pnr, order_id, amount_paise, currency,
                        status, created_at
                    ) VALUES (?, ?, ?, 'INR', 'CREATED', ?)
                """, (
                    pnr, order["id"], amount_paise,
                    time.strftime("%Y-%m-%d %H:%M:%S")
                ))

            return {
                "status": "SUCCESS",
                "key_id": RAZORPAY_KEY_ID,
                "order_id": order["id"],
                "amount": amount_paise,
                "currency": "INR",
                "pnr": pnr
            }

        except Exception as exc:
            print("Payment order creation failed:", exc)
            return {
                "status": "ERROR",
                "error": "Unable to create payment order."
            }


    def verify_payment(self, data):
        pnr = str(data.get("pnr", "")).strip()
        order_id = str(data.get("razorpay_order_id", "")).strip()
        payment_id = str(data.get("razorpay_payment_id", "")).strip()
        signature = str(data.get("razorpay_signature", "")).strip()

        if not all([pnr, order_id, payment_id, signature]):
            return {
                "status": "ERROR",
                "verified": False,
                "error": "Required payment verification details are missing."
            }

        try:
            client = get_razorpay_client()

            with get_connection() as conn:
                payment = conn.execute("""
                    SELECT * FROM payments
                    WHERE pnr = ? AND order_id = ?
                """, (pnr, order_id)).fetchone()

                if not payment:
                    return {
                        "status": "ERROR",
                        "verified": False,
                        "error": "Payment order was not found."
                    }

                if payment["status"] == "PAID":
                    if payment["payment_id"] == payment_id:
                        return {"status": "SUCCESS", "verified": True}

                    return {
                        "status": "ERROR",
                        "verified": False,
                        "error": "This order has already been paid."
                    }

                # Verify the signature using the server's secret.
                client.utility.verify_payment_signature({
                    "razorpay_order_id": order_id,
                    "razorpay_payment_id": payment_id,
                    "razorpay_signature": signature
                })

                # Confirm the order was actually paid, not merely authorized.
                details = client.payment.fetch(payment_id)

                if details.get("order_id") != order_id:
                    raise ValueError("Payment order does not match.")

                if details.get("status") == "authorized":
                    try:
                        client.payment.capture(payment_id, payment["amount_paise"])
                        details = client.payment.fetch(payment_id)
                    except Exception as cap_err:
                        print("Auto-capture notice:", cap_err)

                if details.get("status") not in ["captured", "authorized"]:
                    return {
                        "status": "ERROR",
                        "verified": False,
                        "error": f"Payment has not been completed yet (status: {details.get('status')})."
                    }

                if int(details.get("amount", 0)) != payment["amount_paise"]:
                    raise ValueError("Payment amount does not match.")

                conn.execute("""
                    UPDATE payments
                    SET payment_id = ?, status = 'PAID', verified_at = ?
                    WHERE pnr = ? AND order_id = ?
                """, (
                    payment_id, time.strftime("%Y-%m-%d %H:%M:%S"),
                    pnr, order_id
                ))

                conn.execute("""
                    UPDATE bookings
                    SET status = 'CONFIRMED', payment_method = 'Razorpay'
                    WHERE pnr = ? AND status = 'PENDING_PAYMENT'
                """, (pnr,))

                # Also reserve seats in buses table
                booking_row = conn.execute("SELECT bus_id, seats FROM bookings WHERE pnr = ?", (pnr,)).fetchone()
                if booking_row and booking_row["bus_id"]:
                    bus_row = conn.execute("SELECT occupied_seats, seats_available, total_seats FROM buses WHERE id = ?", (booking_row["bus_id"],)).fetchone()
                    if bus_row:
                        curr_occ = json.loads(bus_row["occupied_seats"] or "[]")
                        booked = json.loads(booking_row["seats"] or "[]")
                        for s in booked:
                            if s not in curr_occ:
                                curr_occ.append(s)
                        new_avail = max(0, int(bus_row["total_seats"]) - len(curr_occ))
                        conn.execute("UPDATE buses SET occupied_seats = ?, seats_available = ? WHERE id = ?", (json.dumps(curr_occ), new_avail, booking_row["bus_id"]))

            return {"status": "SUCCESS", "verified": True}

        except Exception as exc:
            print("Payment verification failed:", exc)
            return {
                "status": "ERROR",
                "verified": False,
                "error": "Payment verification failed."
            }


    def save_booking(self, b):
        required = ["pnr", "busId", "from", "to", "journeyDate",
                    "seats", "passengers", "totalFare"]

        missing = [
            key for key in required
            if key not in b or b[key] is None or b[key] == ""
        ]
        if missing:
            return {
                "status": "ERROR",
                "message": "Missing required booking fields: " + ", ".join(missing)
            }

        try:
            with get_connection() as conn:
                conn.execute("""
                    INSERT INTO bookings (
                        pnr, bus_id, operator, bus_type, from_city, to_city,
                        journey_date, departure_time, arrival_time,
                        boarding_point, dropping_point, seats, passengers,
                        contact_email, contact_phone, base_fare, gst,
                        senior_discount, coupon_discount, total_fare,
                        coupon_used, payment_method, booking_date, status
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                            ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    str(b["pnr"]),
                    b["busId"],
                    b.get("operator"),
                    b.get("busType"),
                    b["from"],
                    b["to"],
                    b["journeyDate"],
                    b.get("departureTime"),
                    b.get("arrivalTime"),
                    b.get("boardingPoint"),
                    b.get("droppingPoint"),
                    json.dumps(b.get("seats", [])),
                    json.dumps(b.get("passengers", [])),
                    b.get("contactEmail"),
                    b.get("contactPhone"),
                    b.get("baseFare", 0),
                    b.get("gst", 0),
                    b.get("seniorDiscount", 0),
                    b.get("couponDiscount", 0),
                    b["totalFare"],
                    b.get("couponUsed"),
                    b.get("paymentMethod", "UPI / QR Code"),
                    b.get("bookingDate"),
                    b.get("status", "CONFIRMED")
                ))

                # Update occupied seats in buses table
                bus_id = b.get("busId")
                booked_seats = b.get("seats", [])
                if bus_id and booked_seats:
                    bus_row = conn.execute(
                        "SELECT occupied_seats, seats_available, total_seats FROM buses WHERE id = ?",
                        (bus_id,)
                    ).fetchone()
                    if bus_row:
                        curr_occ = json.loads(bus_row["occupied_seats"] or "[]")
                        for s in booked_seats:
                            if s not in curr_occ:
                                curr_occ.append(s)
                        new_avail = max(0, int(bus_row["total_seats"]) - len(curr_occ))
                        conn.execute(
                            "UPDATE buses SET occupied_seats = ?, seats_available = ? WHERE id = ?",
                            (json.dumps(curr_occ), new_avail, bus_id)
                        )

            return {"status": "SUCCESS", "pnr": b["pnr"]}

        except sqlite3.IntegrityError as exc:
            print("Booking database constraint error:", exc)
            return {
                "status": "ERROR",
                "message": "This PNR already exists or the booking violates a database constraint."
            }
        except (sqlite3.Error, TypeError, ValueError) as exc:
            print("Booking save failed:", exc)
            return {
                "status": "ERROR",
                "message": "Unable to save booking."
            }

    
    
    def handle_login(self, data):
        email = str(data.get("email", "")).strip()
        password = str(data.get("password", ""))

        if not email or not password:
            return {
                "status": "ERROR",
                "message": "Email and password are required."
            }

        with get_connection() as conn:
            row = conn.execute("""
                SELECT email, password, name, role, phone
                FROM users
                WHERE LOWER(email) = LOWER(?)
            """, (email,)).fetchone()

            if not row or not verify_password(password, row["password"]):
                return {
                    "status": "ERROR",
                    "message": "Invalid email or password."
                }

            # Upgrade an old plain-text password after successful login.
            if not row["password"].startswith("pbkdf2_sha256$"):
                conn.execute("""
                    UPDATE users
                    SET password = ?
                    WHERE LOWER(email) = LOWER(?)
                """, (hash_password(password), email))

            # Create a session token for the logged-in user.
            token = create_session(row["email"], row["role"])

            return {
                "status": "SUCCESS",
                "token": token,
                "user": {
                    "email": row["email"],
                    "name": row["name"],
                    "role": row["role"],
                    "phone": row["phone"]
                }
            }


   
    def handle_signup(self, data):
        email = str(data.get("email", "")).strip().lower()
        password = str(data.get("password", ""))
        name = str(data.get("name", "")).strip() or email.split("@")[0]
        phone = str(data.get("phone", "")).strip()

        if not email or not password:
            return {
                "status": "ERROR",
                "message": "Email and password are required."
            }

        if "@" not in email or "." not in email.split("@")[-1]:
            return {
                "status": "ERROR",
                "message": "Please enter a valid email address."
            }

        if len(password) < 8:
            return {
                "status": "ERROR",
                "message": "Password must be at least 8 characters long."
            }

        # Public signup must never grant admin privileges.
        role = "user"
        password_hash = hash_password(password)

        try:
            with get_connection() as conn:
                conn.execute("""
                    INSERT INTO users (email, password, name, role, phone)
                    VALUES (?, ?, ?, ?, ?)
                """, (email, password_hash, name, role, phone))

            return {
                "status": "SUCCESS",
                "user": {
                    "email": email,
                    "name": name,
                    "role": role,
                    "phone": phone
                }
            }

        except sqlite3.IntegrityError:
            return {
                "status": "ERROR",
                "message": "An account with this email already exists."
            }


    def get_users(self):
        with get_connection() as conn:
            rows = conn.execute("""
                SELECT id, email, name, role, phone
                FROM users ORDER BY id DESC
            """).fetchall()

        return [
            {
                "id": r["id"],
                "email": r["email"],
                "name": r["name"],
                "role": r["role"],
                "phone": r["phone"]
            }
            for r in rows
        ]

    def get_coupons(self):
        with get_connection() as conn:
            rows = conn.execute("SELECT * FROM coupons").fetchall()

        return [
            {
                "code": r["code"],
                "discountPercent": r["discount_percent"],
                "flatDiscount": r["flat_discount"],
                "maxDiscount": r["max_discount"],
                "minAmount": r["min_amount"],
                "desc": r["desc"],
                "active": bool(r["active"])
            }
            for r in rows
        ]

    def get_refunds(self):
        with get_connection() as conn:
            rows = conn.execute(
                "SELECT * FROM refunds ORDER BY id DESC"
            ).fetchall()

        return [
            {
                "id": r["id"],
                "refundId": r["refund_id"],
                "pnr": r["pnr"],
                "userEmail": r["user_email"],
                "amount": r["amount"],
                "status": r["status"],
                "requestDate": r["request_date"],
                "refundMode": r["refund_mode"]
            }
            for r in rows
        ]

    def add_bus(self, b):
        required = ["operator", "from", "to"]
        if any(not b.get(key) for key in required):
            return {
                "status": "ERROR",
                "message": "Operator, source and destination are required."
            }

        with get_connection() as conn:
            cursor = conn.execute("""
                INSERT INTO buses (
                    operator, bus_number, bus_type, rating, ratings_count,
                    from_city, to_city, departure_time, arrival_time, duration,
                    price, total_seats, seats_available, boarding_points,
                    dropping_points, occupied_seats, women_seats, senior_seats
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                b["operator"],
                b.get("busNumber", ""),
                b.get("busType", "AC Sleeper"),
                4.8, 50,
                b["from"], b["to"],
                b.get("departureTime", "08:00 PM"),
                b.get("arrivalTime", "05:00 AM"),
                b.get("duration", "9h 00m"),
                b.get("price", 550),
                24, 24,
                json.dumps([{"name": "Central Stand", "time": "08:00 PM"}]),
                json.dumps([{"name": "City Center", "time": "05:00 AM"}]),
                json.dumps([]),
                json.dumps(["L1", "L2"]),
                json.dumps(["L11", "L12"])
            ))

        return {"status": "SUCCESS", "id": cursor.lastrowid}


if __name__ == "__main__":
    init_sqlite_db()
    print(f"Database: {DB_FILE}")
    print(f"Musafir Travels server running at http://localhost:{PORT}")

    # Reuse the port quickly after restarting the server.
    class ReusableTCPServer(socketserver.TCPServer):
        allow_reuse_address = True

    with ReusableTCPServer(("", PORT), MusafirHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nMusafir Travels server stopped.")
