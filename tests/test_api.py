"""
Musafir Travels - Automated API & Database Test Suite
Run with: python tests/test_api.py
"""

import unittest
import sqlite3
import os
import json
import time
import urllib.request
import urllib.parse

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "database", "musafir_database.sqlite")
SERVER_URL = "http://localhost:5000"

class TestDatabaseIntegrity(unittest.TestCase):
    def test_database_exists(self):
        self.assertTrue(os.path.exists(DB_PATH), f"Database not found at {DB_PATH}")

    def test_database_integrity(self):
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("PRAGMA integrity_check;")
        result = cur.fetchone()[0]
        conn.close()
        self.assertEqual(result, "ok", "Database integrity check failed")

    def test_required_tables_exist(self):
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [r[0] for r in cur.fetchall()]
        conn.close()
        for expected in ["buses", "bookings", "users", "coupons", "payments"]:
            self.assertIn(expected, tables, f"Missing required table: {expected}")

    def test_buses_data_seeded(self):
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM buses;")
        count = cur.fetchone()[0]
        conn.close()
        self.assertGreaterEqual(count, 10, "Buses table has insufficient seeded data")


class TestAPIEndpoints(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server_thread = None
        cls.httpd = None
        # Check if server is already running
        try:
            with urllib.request.urlopen(f"{SERVER_URL}/api/buses", timeout=1):
                return
        except Exception:
            pass

        # Attempt to start in-process background server for test execution
        try:
            import socketserver
            import threading
            import sys
            if BASE_DIR not in sys.path:
                sys.path.insert(0, BASE_DIR)
            from server import MusafirHTTPRequestHandler, init_sqlite_db
            socketserver.TCPServer.allow_reuse_address = True
            init_sqlite_db()
            cls.httpd = socketserver.TCPServer(("127.0.0.1", 5000), MusafirHTTPRequestHandler)
            cls.server_thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
            cls.server_thread.start()
            time.sleep(0.4)
        except Exception:
            cls.httpd = None
            cls.server_thread = None

    @classmethod
    def tearDownClass(cls):
        if cls.httpd:
            try:
                cls.httpd.shutdown()
                cls.httpd.server_close()
            except Exception:
                pass

    def test_buses_search(self):
        url = f"{SERVER_URL}/api/buses?from=Mumbai&to=Pune"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertGreater(len(data), 0)
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_buses_search_valid_route(self):
        # Seeded route: Chhatrapati Sambhajinagar -> Pune (Buses 104 and 105)
        url = f"{SERVER_URL}/api/buses?from=Chhatrapati%20Sambhajinagar&to=Pune"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 2)
                for bus in data:
                    self.assertIn("Sambhajinagar", bus["from"])
                    self.assertEqual(bus["to"], "Pune")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_buses_search_case_whitespace_and_aliases(self):
        # Case, whitespace, and alias: '  aurangabad  ' -> '  pune  '
        url = f"{SERVER_URL}/api/buses?from=%20aurangabad%20&to=%20pune%20"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 2)
                for bus in data:
                    self.assertIn("Sambhajinagar", bus["from"])
                    self.assertEqual(bus["to"], "Pune")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_buses_search_nonexistent_route(self):
        # Route that does not exist in Maharashtra schedule
        url = f"{SERVER_URL}/api/buses?from=Delhi&to=Kolkata"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 0, "Nonexistent route must return an empty list")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_buses_search_same_origin_destination(self):
        # Origin and destination are identical
        url = f"{SERVER_URL}/api/buses?from=Mumbai&to=Mumbai"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 0, "Same origin and destination must return an empty list")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_buses_unfiltered_backward_compatibility(self):
        # Unfiltered /api/buses must return all 12 seeded buses
        url = f"{SERVER_URL}/api/buses"
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertIsInstance(data, list)
                self.assertEqual(len(data), 12, "Unfiltered /api/buses must return all 12 buses")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_user_login(self):
        url = f"{SERVER_URL}/api/login"
        payload = json.dumps({"email": "admin@musafir.com", "password": "admin123"}).encode()
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = json.loads(resp.read().decode())
                self.assertEqual(data.get("status"), "SUCCESS")
                self.assertIn("token", data)
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")

    def test_invalid_login(self):
        url = f"{SERVER_URL}/api/login"
        payload = json.dumps({"email": "admin@musafir.com", "password": "wrongpassword"}).encode()
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"}, method="POST")
        try:
            with urllib.request.urlopen(req, timeout=5) as resp:
                pass
        except urllib.error.HTTPError as e:
            self.assertEqual(e.code, 400)
            data = json.loads(e.read().decode())
            self.assertEqual(data.get("status"), "ERROR")
        except urllib.error.URLError:
            self.skipTest("Server is not currently running on port 5000")


if __name__ == "__main__":
    unittest.main()
