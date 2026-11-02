"""
Musafir Travels - Automated API & Database Test Suite
Run with: python tests/test_api.py
"""

import unittest
import sqlite3
import os
import json
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
