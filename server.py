"""
Musafir Travels - Python SQLite Backend REST Server
Serves static web files and provides SQLite REST Database Endpoints:
/api/buses, /api/bookings, /api/users, /api/refunds, /api/coupons
"""

import http.server
import socketserver
import json
import sqlite3
import os
import urllib.parse

PORT = 5000
DB_FILE = os.path.join(os.path.dirname(__file__), "musafir_database.sqlite")

def init_sqlite_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    # 1. Buses Table
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

    # 2. Bookings Table
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

    # 3. Users Table
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

    # 4. Refunds Table
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

    # 5. Coupons Table
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

    # Seed Default Data if Empty
    cursor.execute("SELECT COUNT(*) FROM buses")
    if cursor.fetchone()[0] == 0:
        sample_buses = [
            (
                101, "Musafir Travels Luxury AC Sleeper (2+1)", "MH-20-BT-9921", "AC Sleeper", 4.9, 420,
                "Chhatrapati Sambhajinagar (Aurangabad)", "Mumbai", "09:30 PM", "05:30 AM", "8h 00m", 750, 24, 16,
                json.dumps([{"name": "Baba Petrol Pump Musafir Office", "time": "09:30 PM"}, {"name": "Cidco Bus Stand", "time": "09:50 PM"}]),
                json.dumps([{"name": "Thane Teen Hath Naka", "time": "04:45 AM"}, {"name": "Dadar East Asiad Stand", "time": "05:15 AM"}]),
                json.dumps(["L1", "L5", "U2", "U8"]),
                json.dumps(["L3", "L4", "U3", "U4"]),
                json.dumps(["L11", "L12", "U11", "U12"])
            ),
            (
                102, "Musafir Express Executive Seater (2+2)", "MH-20-EX-4410", "AC Seater", 4.7, 310,
                "Chhatrapati Sambhajinagar (Aurangabad)", "Pune", "06:00 AM", "11:00 AM", "5h 00m", 450, 36, 24,
                json.dumps([{"name": "Central Bus Stand (CBS)", "time": "06:00 AM"}, {"name": "Kranti Chowk", "time": "06:15 AM"}]),
                json.dumps([{"name": "Viman Nagar Metro Stop", "time": "10:30 AM"}, {"name": "Shivajinagar Musafir Office", "time": "11:00 AM"}]),
                json.dumps(["S1", "S2", "S7", "S12"]),
                json.dumps(["S3", "S4", "S5", "S6"]),
                json.dumps(["S33", "S34", "S35", "S36"])
            ),
            (
                103, "Musafir Volvo Multi-Axle AC Sleeper (2+1)", "MH-01-VL-7711", "AC Sleeper", 4.9, 580,
                "Mumbai", "Pune", "07:30 AM", "11:00 AM", "3h 30m", 600, 24, 15,
                json.dumps([{"name": "Dadar East Asiad Stand", "time": "07:30 AM"}, {"name": "Vashi Highway Signal", "time": "08:20 AM"}]),
                json.dumps([{"name": "Wakad Hinjewadi Flyover", "time": "10:30 AM"}, {"name": "Swargate Musafir Depot", "time": "11:00 AM"}]),
                json.dumps(["L2", "L6", "U1"]),
                json.dumps(["L3", "L4"]),
                json.dumps(["L11", "L12"])
            ),
            (
                104, "Musafir Gold Luxury Sleeper (2+1)", "MH-12-GL-1008", "AC Sleeper", 4.8, 390,
                "Pune", "Nagpur", "05:00 PM", "07:30 AM", "14h 30m", 1350, 24, 17,
                json.dumps([{"name": "Swargate Musafir Office", "time": "05:00 PM"}]),
                json.dumps([{"name": "Nagpur Ganeshpeth Stand", "time": "07:30 AM"}]),
                json.dumps(["L1", "L2"]),
                json.dumps(["L4", "U4"]),
                json.dumps(["L10", "U10"])
            )
        ]
        cursor.executemany("INSERT INTO buses VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", sample_buses)

    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        users = [
            ("admin@musafir.com", "admin123", "System Admin", "admin", "8055206206"),
            ("user@musafir.com", "user123", "Rahul Sharma", "user", "9876543210")
        ]
        cursor.executemany("INSERT INTO users (email, password, name, role, phone) VALUES (?,?,?,?,?)", users)

    cursor.execute("SELECT COUNT(*) FROM coupons")
    if cursor.fetchone()[0] == 0:
        coupons = [
            ("MUSAFIR20", 20, 0, 200, 300, "20% OFF up to Rs 200", 1),
            ("FIRSTBUS", 0, 100, 100, 400, "Flat Rs 100 OFF for new users", 1),
            ("SENIOR10", 10, 0, 150, 200, "10% Concession for Senior Citizens", 1)
        ]
        cursor.executemany("INSERT INTO coupons VALUES (?,?,?,?,?,?,?)", coupons)

    conn.commit()
    conn.close()

class MusafirHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/buses":
            self.send_json_response(self.get_buses())
        elif parsed.path == "/api/bookings":
            self.send_json_response(self.get_bookings())
        elif parsed.path == "/api/coupons":
            self.send_json_response(self.get_coupons())
        elif parsed.path == "/api/refunds":
            self.send_json_response(self.get_refunds())
        elif parsed.path == "/api/users":
            self.send_json_response(self.get_users())
        else:
            super().do_GET()

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        body_data = self.rfile.read(content_length).decode('utf-8')
        data = json.loads(body_data) if body_data else {}

        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/api/bookings":
            result = self.save_booking(data)
            self.send_json_response(result)
        elif parsed.path == "/api/login":
            result = self.handle_login(data)
            self.send_json_response(result)
        elif parsed.path == "/api/signup":
            result = self.handle_signup(data)
            self.send_json_response(result)
        elif parsed.path == "/api/buses/add":
            result = self.add_bus(data)
            self.send_json_response(result)
        else:
            self.send_json_response({"error": "Invalid API endpoint"}, 404)

    def send_json_response(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def get_buses(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM buses")
        rows = cursor.fetchall()
        buses = []
        for r in rows:
            buses.append({
                "id": r[0], "operator": r[1], "busNumber": r[2], "busType": r[3],
                "rating": r[4], "ratingsCount": r[5], "from": r[6], "to": r[7],
                "departureTime": r[8], "arrivalTime": r[9], "duration": r[10],
                "price": r[11], "totalSeats": r[12], "seatsAvailable": r[13],
                "boardingPoints": json.loads(r[14]), "droppingPoints": json.loads(r[15]),
                "occupiedSeats": json.loads(r[16]), "womenSeats": json.loads(r[17]),
                "seniorSeats": json.loads(r[18])
            })
        conn.close()
        return buses

    def get_bookings(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM bookings ORDER BY id DESC")
        rows = cursor.fetchall()
        bookings = []
        for r in rows:
            bookings.append({
                "id": r[0], "pnr": r[1], "busId": r[2], "operator": r[3], "busType": r[4],
                "from": r[5], "to": r[6], "journeyDate": r[7], "departureTime": r[8],
                "arrivalTime": r[9], "boardingPoint": r[10], "droppingPoint": r[11],
                "seats": json.loads(r[12]), "passengers": json.loads(r[13]),
                "contactEmail": r[14], "contactPhone": r[15], "baseFare": r[16],
                "gst": r[17], "seniorDiscount": r[18], "couponDiscount": r[19],
                "totalFare": r[20], "couponUsed": r[21], "paymentMethod": r[22],
                "bookingDate": r[23], "status": r[24]
            })
        conn.close()
        return bookings

    def save_booking(self, b):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO bookings (pnr, bus_id, operator, bus_type, from_city, to_city, journey_date, departure_time, arrival_time, boarding_point, dropping_point, seats, passengers, contact_email, contact_phone, base_fare, gst, senior_discount, coupon_discount, total_fare, coupon_used, payment_method, booking_date, status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            b.get("pnr"), b.get("busId"), b.get("operator"), b.get("busType"), b.get("from"),
            b.get("to"), b.get("journeyDate"), b.get("departureTime"), b.get("arrivalTime"),
            b.get("boardingPoint"), b.get("droppingPoint"), json.dumps(b.get("seats", [])),
            json.dumps(b.get("passengers", [])), b.get("contactEmail"), b.get("contactPhone"),
            b.get("baseFare"), b.get("gst"), b.get("seniorDiscount"), b.get("couponDiscount"),
            b.get("totalFare"), b.get("couponUsed"), b.get("paymentMethod"), b.get("bookingDate"), b.get("status")
        ))
        conn.commit()
        conn.close()
        return {"status": "SUCCESS", "pnr": b.get("pnr")}

    def handle_login(self, data):
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT email, name, role, phone FROM users WHERE LOWER(email)=LOWER(?) AND password=?", (email, password))
        row = cursor.fetchone()
        conn.close()
        if row:
            return {"status": "SUCCESS", "user": {"email": row[0], "name": row[1], "role": row[2], "phone": row[3]}}
        return {"status": "ERROR", "message": "Invalid email or password"}

    def handle_signup(self, data):
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        name = data.get("name", "").strip() or email.split("@")[0]
        phone = data.get("phone", "").strip() or "9876543210"
        role = data.get("role", "user")

        if not email or not password:
            return {"status": "ERROR", "message": "Email and password are required."}

        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM users WHERE LOWER(email)=LOWER(?)", (email,))
        if cursor.fetchone():
            conn.close()
            return {"status": "ERROR", "message": "An account with this email already exists."}

        cursor.execute(
            "INSERT INTO users (email, password, name, role, phone) VALUES (?, ?, ?, ?, ?)",
            (email, password, name, role, phone)
        )
        conn.commit()
        conn.close()
        return {"status": "SUCCESS", "user": {"email": email, "name": name, "role": role, "phone": phone}}

    def get_users(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT id, email, name, role, phone FROM users ORDER BY id DESC")
        rows = cursor.fetchall()
        users = []
        for r in rows:
            users.append({"id": r[0], "email": r[1], "name": r[2], "role": r[3], "phone": r[4]})
        conn.close()
        return users

    def get_coupons(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM coupons")
        rows = cursor.fetchall()
        coupons = []
        for r in rows:
            coupons.append({"code": r[0], "discountPercent": r[1], "flatDiscount": r[2], "maxDiscount": r[3], "minAmount": r[4], "desc": r[5], "active": bool(r[6])})
        conn.close()
        return coupons

    def get_refunds(self):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM refunds ORDER BY id DESC")
        rows = cursor.fetchall()
        refunds = []
        for r in rows:
            refunds.append({"id": r[0], "refundId": r[1], "pnr": r[2], "userEmail": r[3], "amount": r[4], "status": r[5], "requestDate": r[6], "refundMode": r[7]})
        conn.close()
        return refunds

    def add_bus(self, b):
        conn = sqlite3.connect(DB_FILE)
        cursor = conn.cursor()
        cursor.execute("""
        INSERT INTO buses (operator, bus_number, bus_type, rating, ratings_count, from_city, to_city, departure_time, arrival_time, duration, price, total_seats, seats_available, boarding_points, dropping_points, occupied_seats, women_seats, senior_seats)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        """, (
            b.get("operator"), b.get("busNumber"), b.get("busType", "AC Sleeper"), 4.8, 50,
            b.get("from"), b.get("to"), b.get("departureTime", "08:00 PM"), b.get("arrivalTime", "05:00 AM"),
            b.get("duration", "9h 00m"), b.get("price", 550), 24, 24,
            json.dumps([{"name": "Central Stand", "time": "08:00 PM"}]),
            json.dumps([{"name": "City Center", "time": "05:00 AM"}]),
            json.dumps([]), json.dumps(["L1", "L2"]), json.dumps(["L11", "L12"])
        ))
        conn.commit()
        conn.close()
        return {"status": "SUCCESS"}

if __name__ == "__main__":
    init_sqlite_db()
    print(f"Musafir Travels SQLite Database Server running at http://localhost:{PORT}")
    with socketserver.TCPServer(("", PORT), MusafirHTTPRequestHandler) as httpd:
        httpd.serve_forever()
