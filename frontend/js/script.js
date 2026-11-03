/* 
  ================================================================
  Musafir Travels - Application & IndexedDB Database Engine
  Features:
  1. IndexedDB Browser Database API + Python SQLite REST Synchronization
  2. 100% Emoji Free - Uses FontAwesome Vector Icons Exclusively
  3. Women & Senior Citizen Reserved Seats & 10% Concession Discount
  4. Interactive Musafir AI Chatbot Assistant (Vector Icons)
  5. Dual Login (Customer vs. System Admin Portal)
  6. Official m.musafirbus.in Station & Booking Layouts
  ================================================================
*/

// ==========================================
// 1. IndexedDB Database Engine Setup
// ==========================================

// 12 Authentic Musafir Travels Maharashtra Bus Schedules (musafirbus.in)
window.MUSAFIR_DEFAULT_BUSES = [
  {
    "id": 101,
    "operator": "Musafir Travels BharatBenz AC Sleeper (2+1)",
    "busNumber": "MH-20-BT-9921",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 420,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Mumbai",
    "departureTime": "09:30 PM",
    "arrivalTime": "05:30 AM",
    "duration": "8h 00m",
    "price": 850,
    "totalSeats": 30,
    "seatsAvailable": 20,
    "boardingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "09:30 PM"
      },
      {
        "name": "Adalat Road Musafir Head Office",
        "time": "09:50 PM"
      },
      {
        "name": "CIDCO Bus Stand Seven Hills",
        "time": "10:15 PM"
      },
      {
        "name": "Waluj Tirupati Hotel",
        "time": "10:45 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Thane Teen Hath Naka",
        "time": "04:45 AM"
      },
      {
        "name": "Vashi Highway Signal",
        "time": "05:05 AM"
      },
      {
        "name": "Dadar East Asiad Stand",
        "time": "05:30 AM"
      },
      {
        "name": "Borivali East National Park",
        "time": "06:00 AM"
      }
    ],
    "occupiedSeats": [
      "L1",
      "L5",
      "U2",
      "U8"
    ],
    "womenSeats": [
      "L3",
      "L4",
      "U3",
      "U4"
    ],
    "seniorSeats": [
      "L11",
      "L12",
      "U11",
      "U12"
    ]
  },
  {
    "id": 102,
    "operator": "Musafir Travels Volvo 9600 Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-20-VL-8844",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 530,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Mumbai",
    "departureTime": "10:15 PM",
    "arrivalTime": "06:15 AM",
    "duration": "8h 00m",
    "price": 950,
    "totalSeats": 30,
    "seatsAvailable": 18,
    "boardingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "10:15 PM"
      },
      {
        "name": "Adalat Road Musafir Head Office",
        "time": "10:35 PM"
      },
      {
        "name": "CIDCO Bus Stand Seven Hills",
        "time": "10:55 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Thane Teen Hath Naka",
        "time": "05:30 AM"
      },
      {
        "name": "Dadar East Asiad Stand",
        "time": "06:00 AM"
      },
      {
        "name": "Borivali East National Park",
        "time": "06:15 AM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "L6",
      "U1",
      "U5",
      "L9"
    ],
    "womenSeats": [
      "L3",
      "L4",
      "U3",
      "U4"
    ],
    "seniorSeats": [
      "L11",
      "L12",
      "U11",
      "U12"
    ]
  },
  {
    "id": 103,
    "operator": "Musafir Travels Volvo 9600 Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-20-VL-8845",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 490,
    "from": "Mumbai",
    "to": "Chhatrapati Sambhajinagar (Aurangabad)",
    "departureTime": "09:15 PM",
    "arrivalTime": "05:15 AM",
    "duration": "8h 00m",
    "price": 950,
    "totalSeats": 30,
    "seatsAvailable": 22,
    "boardingPoints": [
      {
        "name": "Borivali East National Park",
        "time": "09:15 PM"
      },
      {
        "name": "Dadar East Asiad Stand",
        "time": "09:50 PM"
      },
      {
        "name": "Thane Teen Hath Naka",
        "time": "10:30 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Waluj Tirupati Hotel",
        "time": "04:15 AM"
      },
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "04:45 AM"
      },
      {
        "name": "CIDCO Bus Stand Seven Hills",
        "time": "05:15 AM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "U1",
      "U6",
      "L9"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "L12"
    ]
  },
  {
    "id": 104,
    "operator": "Musafir Express Executive AC Seater (2+2)",
    "busNumber": "MH-20-EX-4410",
    "busType": "AC Seater",
    "rating": 4.7,
    "ratingsCount": 310,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Pune",
    "departureTime": "06:00 AM",
    "arrivalTime": "11:15 AM",
    "duration": "5h 15m",
    "price": 450,
    "totalSeats": 36,
    "seatsAvailable": 28,
    "boardingPoints": [
      {
        "name": "Central Bus Stand (CBS)",
        "time": "06:00 AM"
      },
      {
        "name": "Kranti Chowk Musafir Counter",
        "time": "06:15 AM"
      },
      {
        "name": "Waluj Bajaj Auto Stop",
        "time": "06:40 AM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Kharadi Bypass",
        "time": "10:15 AM"
      },
      {
        "name": "Viman Nagar Metro Stop",
        "time": "10:30 AM"
      },
      {
        "name": "Shivajinagar Musafir Office",
        "time": "11:00 AM"
      },
      {
        "name": "Swargate Musafir Depot",
        "time": "11:15 AM"
      }
    ],
    "occupiedSeats": [
      "S1",
      "S2",
      "S7",
      "S12"
    ],
    "womenSeats": [
      "S3",
      "S4",
      "S5",
      "S6"
    ],
    "seniorSeats": [
      "S33",
      "S34",
      "S35",
      "S36"
    ]
  },
  {
    "id": 105,
    "operator": "Musafir Travels BharatBenz AC Sleeper (2+1)",
    "busNumber": "MH-20-BT-3312",
    "busType": "AC Sleeper",
    "rating": 4.8,
    "ratingsCount": 450,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Pune",
    "departureTime": "02:00 PM",
    "arrivalTime": "07:30 PM",
    "duration": "5h 30m",
    "price": 550,
    "totalSeats": 30,
    "seatsAvailable": 23,
    "boardingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "02:00 PM"
      },
      {
        "name": "CIDCO Bus Stand",
        "time": "02:25 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Wakad Hinjewadi Flyover",
        "time": "07:00 PM"
      },
      {
        "name": "Swargate Musafir Depot",
        "time": "07:30 PM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "U4",
      "L8"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "U11"
    ]
  },
  {
    "id": 106,
    "operator": "Musafir Travels Scania Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-20-SC-7701",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 620,
    "from": "Pune",
    "to": "Chhatrapati Sambhajinagar (Aurangabad)",
    "departureTime": "11:30 PM",
    "arrivalTime": "05:00 AM",
    "duration": "5h 30m",
    "price": 650,
    "totalSeats": 30,
    "seatsAvailable": 21,
    "boardingPoints": [
      {
        "name": "Swargate Musafir Depot",
        "time": "11:30 PM"
      },
      {
        "name": "Shivajinagar Musafir Office",
        "time": "11:50 PM"
      },
      {
        "name": "Viman Nagar Hyatt Hotel",
        "time": "12:15 AM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "04:30 AM"
      },
      {
        "name": "CIDCO Bus Stand Seven Hills",
        "time": "05:00 AM"
      }
    ],
    "occupiedSeats": [
      "L1",
      "L4",
      "U2",
      "U7"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "L12"
    ]
  },
  {
    "id": 107,
    "operator": "Musafir Volvo Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-01-VL-7711",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 580,
    "from": "Mumbai",
    "to": "Pune",
    "departureTime": "07:30 AM",
    "arrivalTime": "11:00 AM",
    "duration": "3h 30m",
    "price": 550,
    "totalSeats": 30,
    "seatsAvailable": 22,
    "boardingPoints": [
      {
        "name": "Dadar East Asiad Stand",
        "time": "07:30 AM"
      },
      {
        "name": "Maitri Park Chembur",
        "time": "07:55 AM"
      },
      {
        "name": "Vashi Highway Signal",
        "time": "08:20 AM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Wakad Hinjewadi Flyover",
        "time": "10:30 AM"
      },
      {
        "name": "Shivajinagar Musafir Office",
        "time": "10:45 AM"
      },
      {
        "name": "Swargate Musafir Depot",
        "time": "11:00 AM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "L6",
      "U1"
    ],
    "womenSeats": [
      "L3",
      "L4"
    ],
    "seniorSeats": [
      "L11",
      "L12"
    ]
  },
  {
    "id": 108,
    "operator": "Musafir Volvo Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-12-VL-7712",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 540,
    "from": "Pune",
    "to": "Mumbai",
    "departureTime": "06:00 PM",
    "arrivalTime": "09:30 PM",
    "duration": "3h 30m",
    "price": 550,
    "totalSeats": 30,
    "seatsAvailable": 24,
    "boardingPoints": [
      {
        "name": "Swargate Musafir Depot",
        "time": "06:00 PM"
      },
      {
        "name": "Shivajinagar Musafir Office",
        "time": "06:15 PM"
      },
      {
        "name": "Wakad Hinjewadi Flyover",
        "time": "06:40 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Vashi Highway Signal",
        "time": "08:45 PM"
      },
      {
        "name": "Maitri Park Chembur",
        "time": "09:05 PM"
      },
      {
        "name": "Dadar East Asiad Stand",
        "time": "09:30 PM"
      }
    ],
    "occupiedSeats": [
      "L1",
      "U3"
    ],
    "womenSeats": [
      "L3",
      "U4"
    ],
    "seniorSeats": [
      "L11",
      "L12"
    ]
  },
  {
    "id": 109,
    "operator": "Musafir Travels BharatBenz AC Sleeper (2+1)",
    "busNumber": "GJ-05-BT-6677",
    "busType": "AC Sleeper",
    "rating": 4.8,
    "ratingsCount": 470,
    "from": "Surat",
    "to": "Mumbai",
    "departureTime": "09:15 PM",
    "arrivalTime": "04:00 AM",
    "duration": "6h 45m",
    "price": 750,
    "totalSeats": 30,
    "seatsAvailable": 20,
    "boardingPoints": [
      {
        "name": "Parvat Patiya Musafir Office",
        "time": "09:15 PM"
      },
      {
        "name": "Kadodara Char Rasta",
        "time": "09:45 PM"
      },
      {
        "name": "Palsana Underbridge",
        "time": "10:10 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Borivali East National Park",
        "time": "03:15 AM"
      },
      {
        "name": "Andheri East Western Express",
        "time": "03:30 AM"
      },
      {
        "name": "Dadar East Asiad Stand",
        "time": "04:00 AM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "L6",
      "U1"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "U11"
    ]
  },
  {
    "id": 110,
    "operator": "Musafir Travels BharatBenz Super Luxury Sleeper (2+1)",
    "busNumber": "MH-20-NG-1122",
    "busType": "AC Sleeper",
    "rating": 4.9,
    "ratingsCount": 510,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Nagpur",
    "departureTime": "09:00 PM",
    "arrivalTime": "05:30 AM",
    "duration": "8h 30m",
    "price": 1150,
    "totalSeats": 30,
    "seatsAvailable": 21,
    "boardingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "09:00 PM"
      },
      {
        "name": "Samruddhi Expressway Jalna Road",
        "time": "09:40 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Dharampeth Musafir Office",
        "time": "05:05 AM"
      },
      {
        "name": "Chatrapati Square Ring Road",
        "time": "05:15 AM"
      },
      {
        "name": "Nagpur Ganeshpeth Stand",
        "time": "05:30 AM"
      }
    ],
    "occupiedSeats": [
      "L1",
      "L5",
      "U2"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "L12"
    ]
  },
  {
    "id": 111,
    "operator": "Musafir Gold Luxury Sleeper (2+1)",
    "busNumber": "MH-12-GL-1008",
    "busType": "AC Sleeper",
    "rating": 4.8,
    "ratingsCount": 390,
    "from": "Pune",
    "to": "Nagpur",
    "departureTime": "05:00 PM",
    "arrivalTime": "07:30 AM",
    "duration": "14h 30m",
    "price": 1350,
    "totalSeats": 30,
    "seatsAvailable": 19,
    "boardingPoints": [
      {
        "name": "Swargate Musafir Office",
        "time": "05:00 PM"
      },
      {
        "name": "Viman Nagar Hyatt",
        "time": "05:35 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "Dharampeth",
        "time": "07:05 AM"
      },
      {
        "name": "Nagpur Ganeshpeth Stand",
        "time": "07:30 AM"
      }
    ],
    "occupiedSeats": [
      "L1",
      "L2",
      "U5"
    ],
    "womenSeats": [
      "L4",
      "U4"
    ],
    "seniorSeats": [
      "L10",
      "U10"
    ]
  },
  {
    "id": 112,
    "operator": "Musafir Travels Volvo Multi-Axle AC Sleeper (2+1)",
    "busNumber": "MH-20-HY-5501",
    "busType": "AC Sleeper",
    "rating": 4.8,
    "ratingsCount": 310,
    "from": "Chhatrapati Sambhajinagar (Aurangabad)",
    "to": "Hyderabad",
    "departureTime": "08:30 PM",
    "arrivalTime": "07:00 AM",
    "duration": "10h 30m",
    "price": 1100,
    "totalSeats": 30,
    "seatsAvailable": 24,
    "boardingPoints": [
      {
        "name": "Baba Petrol Pump Musafir Office",
        "time": "08:30 PM"
      },
      {
        "name": "CIDCO Bus Stand",
        "time": "08:50 PM"
      }
    ],
    "droppingPoints": [
      {
        "name": "KPHB Colony Metro",
        "time": "06:20 AM"
      },
      {
        "name": "Ameerpet Metro",
        "time": "06:40 AM"
      },
      {
        "name": "Lakdikapul Musafir Counter",
        "time": "07:00 AM"
      }
    ],
    "occupiedSeats": [
      "L2",
      "U2"
    ],
    "womenSeats": [
      "L3",
      "U3"
    ],
    "seniorSeats": [
      "L11",
      "U11"
    ]
  }
];

const DB_NAME = "MusafirDatabaseDB";
const DB_VERSION = 1;
let dbInstance = null;

function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("buses")) {
        db.createObjectStore("buses", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("bookings")) {
        db.createObjectStore("bookings", { keyPath: "pnr" });
      }
      if (!db.objectStoreNames.contains("users")) {
        db.createObjectStore("users", { keyPath: "email" });
      }
      if (!db.objectStoreNames.contains("coupons")) {
        db.createObjectStore("coupons", { keyPath: "code" });
      }
      if (!db.objectStoreNames.contains("refunds")) {
        db.createObjectStore("refunds", { keyPath: "refundId" });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      seedIndexedDBIfEmpty().then(() => resolve(dbInstance));
    };

    request.onerror = (event) => {
      console.error("IndexedDB Open Error:", event.target.error);
      resolve(null);
    };
  });
}

function seedIndexedDBIfEmpty() {
  return new Promise((resolve) => {
    const tx = dbInstance.transaction(["buses", "users", "coupons"], "readwrite");
    const busStore = tx.objectStore("buses");
    const countReq = busStore.count();

    countReq.onsuccess = () => {
      if (countReq.result === 0) {
        // Seed default Maharashtra buses from musafirbus.in
        const defaultBuses = window.MUSAFIR_DEFAULT_BUSES || [];
        defaultBuses.forEach(b => busStore.put(b));

        const userStore = tx.objectStore("users");
        userStore.put({ email: "admin@musafir.com", password: "admin123", name: "System Admin", role: "admin", phone: "8055206206" });
        userStore.put({ email: "user@musafir.com", password: "user123", name: "Rahul Sharma", role: "user", phone: "9876543210" });

        const couponStore = tx.objectStore("coupons");
        couponStore.put({ code: "DIWALI20", discountPercent: 20, maxDiscount: 200, minAmount: 300, desc: "Special Diwali Festive Offer - Flat 20% OFF", active: true });
        couponStore.put({ code: "MUSAFIR20", discountPercent: 20, maxDiscount: 200, minAmount: 300, desc: "20% OFF up to Rs 200", active: true });
        couponStore.put({ code: "FIRSTBUS", flatDiscount: 100, minAmount: 400, desc: "Flat Rs 100 OFF for new users", active: true });
        couponStore.put({ code: "SENIOR10", discountPercent: 10, maxDiscount: 150, minAmount: 200, desc: "10% Concession for Senior Citizens", active: true });
      }
      resolve();
    };
  });
}

// Universal API Base URL (Works locally on localhost:5000 and deployed on Render/Cloud)
const API_BASE = (typeof window !== "undefined" && window.location && window.location.origin && window.location.origin.startsWith("http"))
  ? window.location.origin
  : "http://localhost:5000";

// Database Read/Write API Abstraction (IndexedDB + Python REST Server)
const DatabaseAPI = {
  getBuses: async function () {
    let buses = [];
    try {
      const res = await fetch(`${API_BASE}/api/buses`);
      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) buses = data;
      }
    } catch (e) {
      console.warn("Backend API not reachable, falling back to local DB");
    }

    if (buses.length === 0 && dbInstance) {
      try {
        buses = await new Promise((resolve) => {
          const tx = dbInstance.transaction(["buses"], "readonly");
          const store = tx.objectStore("buses");
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
      } catch (e) {}
    }

    if (!buses || buses.length === 0) {
      buses = window.MUSAFIR_DEFAULT_BUSES || [];
    }
    return buses;
  },
  getBookings: function () {
    return new Promise((resolve) => {
      fetch(`${API_BASE}/api/bookings`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(() => {
          if (!dbInstance) { resolve([]); return; }
          const tx = dbInstance.transaction(["bookings"], "readonly");
          const store = tx.objectStore("bookings");
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve([]);
        });
    });
  },
  saveBooking: async function (booking) {
    let serverSaved = false;
    try {
      let response = null;
      try {
        response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking)
        });
      } catch (err) {
        response = await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(booking)
        });
      }

      if (response && response.ok) {
        const result = await response.json();
        if (result.status === "SUCCESS") {
          serverSaved = true;
        }
      }
    } catch (error) {
      console.warn("SQLite server sync notice:", error);
    }

    // Always persist to IndexedDB & localStorage
    if (dbInstance) {
      try {
        await new Promise((resolve, reject) => {
          const tx = dbInstance.transaction(["bookings"], "readwrite");
          tx.objectStore("bookings").put(booking);
          tx.oncomplete = resolve;
          tx.onerror = () => resolve();
        });
      } catch (_) {}
    }

    // Save occupied seats in local bus state
    if (booking.busId && Array.isArray(booking.seats)) {
      if (window.MUSAFIR_DEFAULT_BUSES) {
        const b = window.MUSAFIR_DEFAULT_BUSES.find(x => x.id === booking.busId);
        if (b) {
          booking.seats.forEach(s => {
            if (!b.occupiedSeats.includes(s)) b.occupiedSeats.push(s);
          });
          b.seatsAvailable = Math.max(0, b.totalSeats - b.occupiedSeats.length);
        }
      }
    }

    localStorage.setItem("musafir_last_booking", JSON.stringify(booking));
    return true;
  },
  getWalletBalance: function () {
    const bal = localStorage.getItem("musafir_wallet");
    return bal ? parseFloat(bal) : 250;
  },
  updateWalletBalance: function (amount) {
    const current = DatabaseAPI.getWalletBalance();
    const updated = Math.max(0, current + amount);
    localStorage.setItem("musafir_wallet", updated.toString());
    return updated;
  },
  loginUser: async function (email, password) {
    try {
      const res = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.log("Server login error, using IndexedDB fallback:", e);
      return new Promise((resolve) => {
        if (!dbInstance) {
          resolve({ status: "ERROR", message: "Database offline. Please try again." });
          return;
        }
        const tx = dbInstance.transaction(["users"], "readonly");
        const store = tx.objectStore("users");
        const req = store.get(email.toLowerCase());
        req.onsuccess = () => {
          const u = req.result;
          if (u && u.password === password) {
            resolve({ status: "SUCCESS", user: { email: u.email, name: u.name, role: u.role, phone: u.phone } });
          } else {
            resolve({ status: "ERROR", message: "Invalid email or password." });
          }
        };
        req.onerror = () => resolve({ status: "ERROR", message: "User account not found." });
      });
    }
  },
  signupUser: async function (userData) {
    try {
      const res = await fetch(`${API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (data && data.status === "SUCCESS" && dbInstance) {
        const tx = dbInstance.transaction(["users"], "readwrite");
        tx.objectStore("users").put(userData);
      }
      return data;
    } catch (e) {
      console.log("Server signup error, using IndexedDB fallback:", e);
      return new Promise((resolve) => {
        if (!dbInstance) {
          resolve({ status: "ERROR", message: "Database offline. Please try again." });
          return;
        }
        const tx = dbInstance.transaction(["users"], "readwrite");
        const store = tx.objectStore("users");
        const checkReq = store.get(userData.email.toLowerCase());
        checkReq.onsuccess = () => {
          if (checkReq.result) {
            resolve({ status: "ERROR", message: "An account with this email already exists." });
          } else {
            store.put(userData);
            resolve({ status: "SUCCESS", user: { email: userData.email, name: userData.name, role: userData.role || "user", phone: userData.phone } });
          }
        };
        checkReq.onerror = () => resolve({ status: "ERROR", message: "Failed to create user account." });
      });
    }
  },
  getUsers: function () {
    return new Promise((resolve) => {
      fetch(`${API_BASE}/api/users`)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(() => {
          if (!dbInstance) { resolve([]); return; }
          const tx = dbInstance.transaction(["users"], "readonly");
          const store = tx.objectStore("users");
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
    });
  }
};

let currentBookingState = {
  bus: null,
  selectedSeats: [],
  selectedBoarding: "",
  selectedDropping: "",
  appliedCoupon: null,
  couponDiscount: 0,
  seniorDiscount: 0,
  passengers: []
};

// ==========================================
// 2. DOM Ready & Auth Navbar Sync
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {
  await initIndexedDB();
  updateUserAuthNav();

  if (document.getElementById("bus-list-container")) {
    initSearchPage();
  }
  if (document.getElementById("my-bookings-container")) {
    renderMyBookings();
  }
  if (document.getElementById("refund-search-container")) {
    initRefundsPage();
  }
  if (document.getElementById("admin-dashboard-root")) {
    initAdminPanel();
  }

  initChatbotWidget();

  const dateInput = document.getElementById("search-onward-date") || document.getElementById("date");
  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }
});

function updateUserAuthNav() {
  const currentUserStr = localStorage.getItem("musafir_user");
  const navContainer = document.getElementById("nav-auth-links");
  if (!navContainer) return;

  if (currentUserStr) {
    const user = JSON.parse(currentUserStr);
    const isAdmin = user.role === "admin";

    navContainer.innerHTML = `
      <span style="font-weight:600; color:white; font-size:0.9rem;"><i class="${isAdmin ? 'fas fa-user-shield' : 'fas fa-user'}"></i> ${user.name}</span>
      ${isAdmin ? `<a href="admin.html" class="btn-sm-outline" style="background: white; color: var(--primary-red); font-weight: 700; border: 1px solid white;"><i class="fas fa-tachometer-alt"></i> Admin Panel</a>` : ''}
      <span class="wallet-pill" onclick="window.location.href='offers.html'"><i class="fas fa-wallet"></i> Wallet: <strong>Rs ${DatabaseAPI.getWalletBalance()}</strong></span>
      <button class="btn-sm-outline" onclick="logoutUser()">Logout</button>
    `;
  } else {
    navContainer.innerHTML = `
      <a href="login.html" class="btn-nav"><i class="fas fa-sign-in-alt"></i> Login / Signup</a>
    `;
  }
}

function logoutUser() {
  localStorage.removeItem("musafir_user");
  alert("Logged out successfully.");
  window.location.href = "index.html";
}

// ==========================================
// 3. Search & Bus Listing Engine
// ==========================================

function searchBuses() {
  const fromCity = (document.getElementById('search-from-station')?.value || document.getElementById('from')?.value || '').trim();
  const toCity = (document.getElementById('search-to-station')?.value || document.getElementById('to')?.value || '').trim();
  const journeyDate = (document.getElementById('search-onward-date')?.value || document.getElementById('date')?.value || '');

  if (!fromCity || !toCity) {
    alert("Please select both 'From' and 'To' cities.");
    return;
  }

  window.location.href = `search.html?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${journeyDate}`;
}

function swapStations() {
  const fromEl = document.getElementById('search-from-station') || document.getElementById('from');
  const toEl = document.getElementById('search-to-station') || document.getElementById('to');
  if (fromEl && toEl) {
    const temp = fromEl.value;
    fromEl.value = toEl.value;
    toEl.value = temp;
  }
}

function initSearchPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let searchFrom = urlParams.get('from') || '';
  let searchTo = urlParams.get('to') || '';
  let searchDate = urlParams.get('date') || '';

  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  const dateInput = document.getElementById('date');

  if (fromInput) fromInput.value = searchFrom;
  if (toInput) toInput.value = searchTo;
  if (dateInput && searchDate) dateInput.value = searchDate;

  renderBusListings();
}

async function renderBusListings() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchFrom = (urlParams.get('from') || '').trim();
  const searchTo = (urlParams.get('to') || '').trim();
  const searchDate = urlParams.get('date') || '';

  const container = document.getElementById('bus-list-container');
  if (!container) return;

  const routeTitle = document.getElementById('route-title');
  const routeDate = document.getElementById('route-date');

  if (searchFrom && searchTo) {
    if (routeTitle) routeTitle.innerText = `Buses from ${searchFrom} to ${searchTo}`;
    if (routeDate) routeDate.innerText = searchDate ? `Journey Date: ${searchDate}` : 'All Upcoming Schedules';
  } else {
    if (routeTitle) routeTitle.innerText = "All Available Buses in Maharashtra";
  }

  const acFilter = document.getElementById('filter-ac')?.checked;
  const nonAcFilter = document.getElementById('filter-non-ac')?.checked;
  const sleeperFilter = document.getElementById('filter-sleeper')?.checked;
  const seaterFilter = document.getElementById('filter-seater')?.checked;
  const maxPrice = document.getElementById('filter-price')?.value;
  const sortOption = document.getElementById('filter-sort')?.value;

  const allBuses = await DatabaseAPI.getBuses();
  let filtered = [...allBuses];

  // Helper for Maharashtra city aliases
  const normalizeCity = (c) => {
    let s = (c || '').toLowerCase().trim();
    if (s.includes('aurangabad') || s.includes('sambhajinagar')) return 'sambhajinagar';
    if (s.includes('bombay') || s.includes('mumbai')) return 'mumbai';
    if (s.includes('poona') || s.includes('pune')) return 'pune';
    return s;
  };

  const normFrom = normalizeCity(searchFrom);
  const normTo = normalizeCity(searchTo);

  let searchMatches = filtered;
  if (normFrom && normTo) {
    searchMatches = filtered.filter(bus => {
      const bFrom = normalizeCity(bus.from);
      const bTo = normalizeCity(bus.to);
      return bFrom.includes(normFrom) && bTo.includes(normTo);
    });
  } else if (normFrom) {
    searchMatches = filtered.filter(bus => normalizeCity(bus.from).includes(normFrom));
  } else if (normTo) {
    searchMatches = filtered.filter(bus => normalizeCity(bus.to).includes(normTo));
  }

  let showingFallbackNotice = false;
  if (searchMatches.length > 0) {
    filtered = searchMatches;
  } else {
    // If no direct matches for searched pair, show all 12 buses with notice
    filtered = [...allBuses];
    showingFallbackNotice = true;
  }

  if (acFilter || nonAcFilter) {
    filtered = filtered.filter(bus => {
      if (acFilter && bus.busType.includes("AC")) return true;
      if (nonAcFilter && !bus.busType.includes("AC")) return true;
      return false;
    });
  }

  if (sleeperFilter || seaterFilter) {
    filtered = filtered.filter(bus => {
      if (sleeperFilter && bus.busType.includes("Sleeper")) return true;
      if (seaterFilter && bus.busType.includes("Seater")) return true;
      return false;
    });
  }

  if (maxPrice) {
    filtered = filtered.filter(bus => bus.price <= parseInt(maxPrice));
  }

  if (filtered.length === 0) {
    filtered = [...allBuses];
  }

  if (sortOption === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sortOption === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortOption === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const resultsCount = document.getElementById('results-count');
  if (resultsCount) resultsCount.innerText = `${filtered.length} Buses Available`;

  container.innerHTML = "";

  if (showingFallbackNotice && searchFrom && searchTo) {
    const notice = document.createElement("div");
    notice.style.background = "#fffbeb";
    notice.style.border = "1px solid #fde68a";
    notice.style.color = "#92400e";
    notice.style.padding = "12px 18px";
    notice.style.borderRadius = "10px";
    notice.style.marginBottom = "20px";
    notice.style.display = "flex";
    notice.style.alignItems = "center";
    notice.style.gap = "12px";
    notice.innerHTML = `<i class="fas fa-info-circle" style="font-size:1.3rem; color:#d97706;"></i>
      <div>
        <strong>No direct buses found for "${searchFrom} &rarr; ${searchTo}".</strong>
        <div>Showing all ${filtered.length} available daily Musafir Travels Maharashtra schedules below:</div>
      </div>`;
    container.appendChild(notice);
  }
  if (resultsCount) resultsCount.innerText = `${filtered.length} Buses Found`;

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-icon"><i class="fas fa-bus-alt"></i></div>
        <h3>No buses found for this Maharashtra route</h3>
        <p>Try searching for <strong>Chhatrapati Sambhajinagar (Aurangabad) to Mumbai</strong> or <strong>Aurangabad to Pune</strong>.</p>
        <button class="btn-primary" onclick="resetSearchFilters()">View All Buses</button>
      </div>
    `;
    return;
  }

  filtered.forEach(bus => {
    const card = document.createElement('div');
    card.className = 'bus-card shadow-hover';
    card.innerHTML = `
      <div class="bus-main-info">
        <div class="bus-header-row">
          <span class="bus-operator">${bus.operator}</span>
          <span class="bus-type-badge">${bus.busType}</span>
          <span class="rating-badge"><i class="fas fa-star"></i> ${bus.rating} <small>(${bus.ratingsCount})</small></span>
        </div>

        <div class="bus-timing-row">
          <div class="time-block">
            <span class="time-main">${bus.departureTime}</span>
            <span class="city-sub">${bus.from}</span>
          </div>
          <div class="duration-block">
            <span class="duration-line"></span>
            <span class="duration-text">${bus.duration}</span>
          </div>
          <div class="time-block">
            <span class="time-main">${bus.arrivalTime}</span>
            <span class="city-sub">${bus.to}</span>
          </div>
        </div>

        <div class="bus-amenities">
          <span><i class="fas fa-plug"></i> Charging Point</span>
          <span><i class="fas fa-tint"></i> Mineral Water</span>
          <span><i class="fas fa-user-clock"></i> Senior Concession</span>
          <span><i class="fas fa-female"></i> Women Safety</span>
        </div>
      </div>

      <div class="bus-price-section">
        <div class="price-lbl">Starting from</div>
        <div class="bus-price">Rs ${bus.price}</div>
        <div class="bus-seats-left">${bus.seatsAvailable} Seats left</div>
        <button class="btn-primary btn-select-seats" onclick="openSeatSelection(${bus.id})">Select Seats</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function resetSearchFilters() {
  window.location.href = `search.html?from=Chhatrapati Sambhajinagar (Aurangabad)&to=Mumbai&date=${new Date().toISOString().split("T")[0]}`;
}

// ==========================================
// 4. Women & Senior Citizen Seat Map Layout
// ==========================================

async function openSeatSelection(busId) {
  const buses = await DatabaseAPI.getBuses();
  const bus = buses.find(b => b.id === busId);
  if (!bus) return;

  currentBookingState = {
    bus: bus,
    selectedSeats: [],
    selectedBoarding: bus.boardingPoints[0].name + " - " + bus.boardingPoints[0].time,
    selectedDropping: bus.droppingPoints[0].name + " - " + bus.droppingPoints[0].time,
    appliedCoupon: null,
    couponDiscount: 0,
    seniorDiscount: 0,
    passengers: []
  };

  const modal = document.getElementById("seat-modal");
  if (!modal) return;

  document.getElementById("modal-bus-name").innerText = bus.operator;
  document.getElementById("modal-bus-route").innerText = `${bus.from} to ${bus.to} (${bus.departureTime})`;

  const boardingSelect = document.getElementById("boarding-select");
  boardingSelect.innerHTML = bus.boardingPoints.map(bp => `<option value="${bp.name} - ${bp.time}">${bp.name} (${bp.time})</option>`).join("");
  boardingSelect.onchange = (e) => { currentBookingState.selectedBoarding = e.target.value; };

  const droppingSelect = document.getElementById("dropping-select");
  droppingSelect.innerHTML = bus.droppingPoints.map(dp => `<option value="${dp.name} - ${dp.time}">${dp.name} (${dp.time})</option>`).join("");
  droppingSelect.onchange = (e) => { currentBookingState.selectedDropping = e.target.value; };

  renderSeatGrid(bus);
  updateSeatSummary();
  modal.style.display = "flex";
}

function closeSeatModal() {
  const modal = document.getElementById("seat-modal");
  if (modal) modal.style.display = "none";
}

function renderSeatGrid(bus) {
  const container = document.getElementById("seat-layout-container");
  container.innerHTML = "";

  const isSleeper = bus.busType.includes("Sleeper");

  if (isSleeper) {
    container.innerHTML = `
      <div class="deck-container">
        <div class="deck-title"> LOWER DECK (SLEEPER) </div>
        <div class="bus-front-wheel"><i class="fas fa-steering-wheel"></i> Driver Steering</div>
        <div class="sleeper-grid" id="lower-deck-grid"></div>
      </div>
      <div class="deck-container">
        <div class="deck-title"> UPPER DECK (SLEEPER) </div>
        <div class="sleeper-grid" id="upper-deck-grid"></div>
      </div>
    `;

    const lowerGrid = document.getElementById("lower-deck-grid");
    const upperGrid = document.getElementById("upper-deck-grid");

    for (let i = 1; i <= 12; i++) {
      lowerGrid.appendChild(createSeatElement(`L${i}`, bus, true));
      upperGrid.appendChild(createSeatElement(`U${i}`, bus, true));
    }
  } else {
    container.innerHTML = `
      <div class="deck-container full-bus">
        <div class="deck-title"> BUS SEATER LAYOUT (2+2) </div>
        <div class="bus-front-wheel"><i class="fas fa-steering-wheel"></i> Driver Steering</div>
        <div class="seater-grid" id="seater-grid"></div>
      </div>
    `;

    const seaterGrid = document.getElementById("seater-grid");
    for (let i = 1; i <= 36; i++) {
      seaterGrid.appendChild(createSeatElement(`S${i}`, bus, false));
    }
  }
}

function createSeatElement(seatId, bus, isSleeper) {
  const el = document.createElement("div");
  const isOccupied = (bus.occupiedSeats || []).includes(seatId);
  const isWomen = (bus.womenSeats || []).includes(seatId);
  const isSenior = (bus.seniorSeats || []).includes(seatId);

  let className = isSleeper ? "sleeper-berth" : "seater-chair";
  if (isOccupied) className += " occupied";
  else if (isWomen) className += " women-seat";
  else if (isSenior) className += " senior-seat";

  el.className = className;
  el.setAttribute("data-seat", seatId);

  let tagIcon = isSleeper ? '<i class="fas fa-bed"></i>' : '<i class="fas fa-chair"></i>';
  if (isWomen) tagIcon = '<i class="fas fa-female"></i>';
  else if (isSenior) tagIcon = '<i class="fas fa-user-clock"></i>';

  el.innerHTML = `<span class="seat-num">${seatId}</span><span class="seat-icon">${tagIcon}</span>`;

  if (!isOccupied) {
    el.onclick = () => toggleSeatSelection(seatId, el, isSenior);
  }

  return el;
}

function toggleSeatSelection(seatId, el, isSeniorSeat) {
  const idx = currentBookingState.selectedSeats.indexOf(seatId);
  if (idx > -1) {
    currentBookingState.selectedSeats.splice(idx, 1);
    el.classList.remove("selected");
  } else {
    if (currentBookingState.selectedSeats.length >= 6) {
      alert("Maximum 6 seats per booking.");
      return;
    }
    currentBookingState.selectedSeats.push(seatId);
    el.classList.add("selected");
  }
  updateSeatSummary();
}

function updateSeatSummary() {
  const seatsListEl = document.getElementById("selected-seats-list");
  const baseFareEl = document.getElementById("summary-base-fare");
  const gstEl = document.getElementById("summary-gst");
  const seniorDiscEl = document.getElementById("summary-senior-discount");
  const discountEl = document.getElementById("summary-discount");
  const totalEl = document.getElementById("summary-total");

  const count = currentBookingState.selectedSeats.length;

  if (count === 0) {
    if (seatsListEl) seatsListEl.innerText = "None selected";
    if (baseFareEl) baseFareEl.innerText = "Rs 0";
    if (gstEl) gstEl.innerText = "Rs 0";
    if (seniorDiscEl) seniorDiscEl.innerText = "-Rs 0";
    if (discountEl) discountEl.innerText = "-Rs 0";
    if (totalEl) totalEl.innerText = "Rs 0";
    return;
  }

  const pricePerSeat = currentBookingState.bus.price;
  const baseTotal = count * pricePerSeat;
  const gst = Math.round(baseTotal * 0.05);

  let seniorCount = 0;
  currentBookingState.selectedSeats.forEach(s => {
    if ((currentBookingState.bus.seniorSeats || []).includes(s)) seniorCount++;
  });
  const seniorDiscount = Math.round(seniorCount * pricePerSeat * 0.10);
  currentBookingState.seniorDiscount = seniorDiscount;

  let couponDiscount = 0;
  if (currentBookingState.appliedCoupon === "MUSAFIR20") {
    couponDiscount = Math.min(200, Math.round(baseTotal * 0.20));
  } else if (currentBookingState.appliedCoupon === "FIRSTBUS") {
    couponDiscount = 100;
  }
  currentBookingState.couponDiscount = couponDiscount;

  const finalTotal = Math.max(0, baseTotal + gst - seniorDiscount - couponDiscount);

  if (seatsListEl) seatsListEl.innerText = currentBookingState.selectedSeats.join(", ");
  if (baseFareEl) baseFareEl.innerText = `Rs ${baseTotal}`;
  if (gstEl) gstEl.innerText = `Rs ${gst}`;
  if (seniorDiscEl) seniorDiscEl.innerText = `-Rs ${seniorDiscount}`;
  if (discountEl) discountEl.innerText = `-Rs ${couponDiscount}`;
  if (totalEl) totalEl.innerText = `Rs ${finalTotal}`;
}

function applyCouponCode() {
  const input = document.getElementById("coupon-input");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (!code) {
    alert("Please enter a promo code.");
    return;
  }

  if (code === "MUSAFIR20" || code === "FIRSTBUS" || code === "SENIOR10") {
    currentBookingState.appliedCoupon = code;
    alert(`Promo code '${code}' applied successfully!`);
    updateSeatSummary();
  } else {
    alert("Invalid promo code. Try MUSAFIR20 or FIRSTBUS.");
  }
}

function proceedToPassengerDetails() {
  if (currentBookingState.selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  closeSeatModal();

  const passengerModal = document.getElementById("passenger-modal");
  const formContainer = document.getElementById("passenger-inputs-container");

  formContainer.innerHTML = currentBookingState.selectedSeats.map((seat, idx) => {
    const isSeniorSeat = (currentBookingState.bus.seniorSeats || []).includes(seat);
    const isWomenSeat = (currentBookingState.bus.womenSeats || []).includes(seat);

    return `
      <div class="passenger-card-box">
        <h4>Passenger ${idx + 1} (Seat: <span class="badge-seat">${seat}</span>) ${isSeniorSeat ? '<i class="fas fa-user-clock"></i> Senior Concession' : ''} ${isWomenSeat ? '<i class="fas fa-female"></i> Women Reserved' : ''}</h4>
        <div class="input-row">
          <div class="input-group">
            <label>Full Name *</label>
            <input type="text" id="p-name-${idx}" placeholder="Full Name" required>
          </div>
          <div class="input-group" style="max-width: 100px;">
            <label>Age *</label>
            <input type="number" id="p-age-${idx}" min="1" max="100" value="${isSeniorSeat ? '65' : '28'}" required>
          </div>
          <div class="input-group" style="max-width: 140px;">
            <label>Gender *</label>
            <select id="p-gender-${idx}">
              <option value="Male" ${isWomenSeat ? '' : 'selected'}>Male</option>
              <option value="Female" ${isWomenSeat ? 'selected' : ''}>Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }).join("");

  passengerModal.style.display = "flex";
}

function closePassengerModal() {
  const modal = document.getElementById("passenger-modal");
  if (modal) modal.style.display = "none";
}

function submitPassengerForm(e) {
  if (e) e.preventDefault();

  const passengers = [];
  const seatCount = currentBookingState.selectedSeats.length;

  for (let i = 0; i < seatCount; i++) {
    const name = document.getElementById(`p-name-${i}`).value.trim();
    const age = parseInt(document.getElementById(`p-age-${i}`).value.trim());
    const gender = document.getElementById(`p-gender-${i}`).value;

    if (!name || isNaN(age)) {
      alert(`Please complete passenger ${i + 1} details.`);
      return;
    }
    passengers.push({ name, age, gender, isSenior: age >= 60 });
  }

  const currentUserStr = localStorage.getItem("musafir_user");
  const user = currentUserStr ? JSON.parse(currentUserStr) : { email: "guest@musafir.com" };

  currentBookingState.passengers = passengers;
  currentBookingState.contactEmail = document.getElementById("contact-email")?.value.trim() || user.email;
  currentBookingState.contactPhone = document.getElementById("contact-phone")?.value.trim() || "9876543210";

  closePassengerModal();
  openPaymentModal();
}

// ==========================================
// 5. Payment & Booking Finalization
// ==========================================


let upiTimerInterval = null;

function openPaymentModal() {
  const payModal = document.getElementById("payment-modal");
  if (!payModal) return;

  const state = currentBookingState;
  const count = (state.selectedSeats || []).length;
  const baseTotal = count * (state.bus ? state.bus.price : 750);
  const gst = Math.round(baseTotal * 0.05);
  const total = Math.max(
    0,
    baseTotal + gst - (state.seniorDiscount || 0) - (state.couponDiscount || 0)
  );

  const amtEl = document.getElementById("pay-modal-amount");
  if (amtEl) amtEl.innerText = `Rs. ${total}`;

  const qrAmtEl = document.getElementById("qr-payable-amount");
  if (qrAmtEl) qrAmtEl.innerText = `Rs. ${total}`;



  const seatsEl = document.getElementById("pay-modal-seats");
  if (seatsEl) seatsEl.innerText = (state.selectedSeats || []).join(", ") || "None";

  const routeEl = document.getElementById("pay-modal-route");
  if (routeEl && state.bus) {
    routeEl.innerText = `${state.bus.from} to ${state.bus.to}`;
  }

  const pnrCode = state.pnr || `MT${Date.now()}`;

  // Save the selected booking details for payment & confirmation
  window.currentBooking = {
    pnr: pnrCode,
    busId: state.bus ? state.bus.id : 101,
    operator: state.bus ? state.bus.operator : "Musafir Travels Luxury AC Sleeper",
    busType: state.bus ? state.bus.busType : "AC Sleeper",
    busNumber: state.bus ? state.bus.busNumber : "MH-20-BT-9921",
    from: state.bus ? state.bus.from : "Chhatrapati Sambhajinagar (Aurangabad)",
    to: state.bus ? state.bus.to : "Mumbai",
    departureTime: state.bus ? state.bus.departureTime : "09:30 PM",
    arrivalTime: state.bus ? state.bus.arrivalTime : "05:30 AM",
    duration: state.bus ? state.bus.duration : "8h 00m",
    journeyDate: state.journeyDate || new Date().toISOString().slice(0, 10),
    boardingPoint: state.boardingPoint || (state.bus?.boardingPoints?.[0]?.name || "Baba Petrol Pump Musafir Office"),
    droppingPoint: state.droppingPoint || (state.bus?.droppingPoints?.[0]?.name || "Dadar East Asiad Stand"),
    seats: [...(state.selectedSeats || [])],
    passengers: state.passengers || [],
    contactEmail: state.contactEmail || "passenger@musafir.com",
    contactPhone: state.contactPhone || "9876543210",
    baseFare: baseTotal,
    gst: gst,
    seniorDiscount: state.seniorDiscount || 0,
    couponDiscount: state.couponDiscount || 0,
    totalFare: total,
    couponUsed: state.couponUsed || "NONE",
    bookingDate: new Date().toISOString().slice(0, 10)
  };

  // Render Dynamic UPI QR Code
  initUPIPaymentQRCode(total, pnrCode);

  payModal.style.display = "flex";
}

function closePaymentModal() {
  const modal = document.getElementById("payment-modal");
  if (modal) modal.style.display = "none";
  if (upiTimerInterval) {
    clearInterval(upiTimerInterval);
    upiTimerInterval = null;
  }
}

function selectPayTab(tabName) {
  const tabs = document.querySelectorAll(".pay-tab-btn");
  tabs.forEach(t => t.classList.remove("active"));
  document.getElementById(`tab-btn-${tabName}`)?.classList.add("active");

  const contents = document.querySelectorAll(".pay-tab-content");
  contents.forEach(c => c.style.display = "none");
  const target = document.getElementById(`pay-content-${tabName}`);
  if (target) target.style.display = "block";
}

function initUPIPaymentQRCode(amount, pnr) {
  const container = document.getElementById("upi-qrcode-container");
  if (!container) return;

  const upiId = "musafirtravels@okhdfcbank";
  const payeeName = "Musafir Travels";
  const note = `BusTicket-${pnr}`;
  // Standard NPCI UPI URI
  const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${amount.toFixed(2)}&tn=${encodeURIComponent(note)}&cu=INR`;

  container.innerHTML = "";

  if (typeof window.QRCode !== "undefined") {
    try {
      new window.QRCode(container, {
        text: upiUri,
        width: 175,
        height: 175,
        colorDark: "#0f172a",
        colorLight: "#ffffff"
      });
    } catch (e) {
      console.error("QR render error:", e);
      container.innerHTML = `<div style="text-align:center; padding:15px; color:#475569;"><i class="fas fa-qrcode" style="font-size:3.5rem; color:#d31f1f;"></i><br><small style="font-weight:600;">Scan with UPI App</small></div>`;
    }
  } else {
    container.innerHTML = `<div style="text-align:center; padding:15px; color:#475569;"><i class="fas fa-qrcode" style="font-size:3.5rem; color:#d31f1f;"></i><br><small style="font-weight:600;">Scan with UPI App</small></div>`;
  }

  // 5 Minute Dynamic Expiry Timer
  if (upiTimerInterval) clearInterval(upiTimerInterval);
  let timeLeft = 300;
  const timerEl = document.getElementById("qr-timer-seconds");

  function updateTimer() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    if (timerEl) {
      timerEl.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    if (timeLeft <= 0) {
      clearInterval(upiTimerInterval);
      if (timerEl) timerEl.innerText = "Expired (Refresh)";
    }
    timeLeft--;
  }
  updateTimer();
  upiTimerInterval = setInterval(updateTimer, 1000);
}

function copyUPIID() {
  const upi = "musafirtravels@okhdfcbank";
  navigator.clipboard.writeText(upi).then(() => {
    const btn = document.getElementById("btn-copy-upi");
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
      btn.style.background = "#dcfce7";
      btn.style.color = "#15803d";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = "";
        btn.style.color = "";
      }, 2000);
    }
  }).catch(() => {
    alert("UPI ID: " + upi);
  });
}

async function confirmUPIPayment() {
  const booking = window.currentBooking;
  if (!booking || !booking.pnr || !Array.isArray(booking.seats) || booking.seats.length === 0) {
    alert("Booking session expired. Please select your seats again.");
    return;
  }

  const utrInput = document.getElementById("upi-ref-utr");
  const utr = utrInput ? utrInput.value.trim() : "";

  const overlay = document.getElementById("payment-processing-overlay");
  if (overlay) overlay.style.display = "flex";

  booking.paymentMethod = utr ? `UPI Dynamic QR (UTR: ${utr})` : "UPI Dynamic QR";
  booking.status = "CONFIRMED";

  try {
    await DatabaseAPI.saveBooking(booking);
  } catch (err) {
    console.warn("Local storage fallback for booking save:", err);
  }

  localStorage.setItem("musafir_last_booking", JSON.stringify(booking));

  setTimeout(() => {
    if (overlay) overlay.style.display = "none";
    closePaymentModal();
    window.location.href = `confirmation.html?pnr=${encodeURIComponent(booking.pnr)}`;
  }, 1200);
}

async function processPayment(method) {
  const overlay = document.getElementById("payment-processing-overlay");
  const showOverlay = (show) => {
    if (overlay) overlay.style.display = show ? "flex" : "none";
  };

  const booking = window.currentBooking;
  if (!booking || !booking.pnr || !Array.isArray(booking.seats) || booking.seats.length === 0) {
    alert("Booking session missing. Please select your bus and seats again.");
    return;
  }

  // 1. Musafir Cash Wallet
  if (method === "Musafir Cash Wallet") {
    showOverlay(true);
    booking.paymentMethod = "Musafir Cash Wallet";
    booking.status = "CONFIRMED";
    await DatabaseAPI.saveBooking(booking);
    localStorage.setItem("musafir_last_booking", JSON.stringify(booking));
    setTimeout(() => {
      showOverlay(false);
      closePaymentModal();
      window.location.href = `confirmation.html?pnr=${encodeURIComponent(booking.pnr)}`;
    }, 1200);
    return;
  }

  // 3. Net Banking
  if (method === "Net Banking") {
    const bank = document.getElementById("bank-select")?.value || "HDFC";
    showOverlay(true);
    booking.paymentMethod = `Net Banking (${bank})`;
    booking.status = "CONFIRMED";
    await DatabaseAPI.saveBooking(booking);
    localStorage.setItem("musafir_last_booking", JSON.stringify(booking));
    setTimeout(() => {
      showOverlay(false);
      closePaymentModal();
      window.location.href = `confirmation.html?pnr=${encodeURIComponent(booking.pnr)}`;
    }, 1200);
    return;
  }
}

function showETicketModal(booking) {
  const modal = document.getElementById("ticket-modal");
  if (!modal) return;

  const ticketContainer = document.getElementById("ticket-print-area");

  ticketContainer.innerHTML = `
    <div class="e-ticket-card">
      <div class="ticket-header-band">
        <div class="brand">
          <img src="logo.jpg" class="ticket-logo" alt="Musafir">
          <div>
            <h3>MUSAFIR TRAVELS</h3>
            <small>Official E-Ticket Voucher & Booking Receipt</small>
          </div>
        </div>
        <div class="pnr-box">
          <div class="pnr-lbl">PNR NUMBER</div>
          <div class="pnr-code">${booking.pnr}</div>
          <div class="ticket-status-tag ${booking.status.toLowerCase()}">${booking.status}</div>
        </div>
      </div>

      <div class="ticket-route-banner">
        <div>
          <div class="route-city">${booking.from}</div>
          <div class="route-time">Dep: ${booking.departureTime}</div>
        </div>
        <div class="route-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
        <div>
          <div class="route-city">${booking.to}</div>
          <div class="route-time">Arr: ${booking.arrivalTime}</div>
        </div>
      </div>

      <div class="ticket-grid-details">
        <div class="ticket-cell"><label>Bus Operator</label><div><strong>${booking.operator}</strong> (${booking.busType})</div></div>
        <div class="ticket-cell"><label>Journey Date</label><div><strong>${booking.journeyDate}</strong></div></div>
        <div class="ticket-cell"><label>Seats Booked</label><div><strong class="text-red">${booking.seats.join(", ")}</strong></div></div>
        <div class="ticket-cell"><label>Boarding Point</label><div>${booking.boardingPoint}</div></div>
        <div class="ticket-cell"><label>Dropping Point</label><div>${booking.droppingPoint}</div></div>
        <div class="ticket-cell"><label>Payment Mode</label><div>${booking.paymentMethod} (Paid)</div></div>
      </div>

      <div class="ticket-passengers-section">
        <h4>Passenger Details (${booking.passengers.length})</h4>
        <table class="passenger-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Passenger Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${booking.passengers.map((p, i) => `
              <tr>
                <td>${i + 1}</td>
                <td><strong>${p.name}</strong></td>
                <td>${p.age} yrs</td>
                <td>${p.gender}</td>
                <td>${p.isSenior ? 'Senior Citizen Discount' : 'Standard'}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <div class="ticket-fare-breakdown">
        <div class="fare-row"><span>Base Fare:</span> <span>Rs ${booking.baseFare}</span></div>
        <div class="fare-row"><span>GST & Insurance (5%):</span> <span>Rs ${booking.gst}</span></div>
        ${booking.seniorDiscount ? `<div class="fare-row green"><span>Senior Citizen Concession (10%):</span> <span>-Rs ${booking.seniorDiscount}</span></div>` : ''}
        ${booking.couponDiscount ? `<div class="fare-row green"><span>Coupon Discount (${booking.couponUsed}):</span> <span>-Rs ${booking.couponDiscount}</span></div>` : ''}
        <hr>
        <div class="fare-row total"><span>Total Paid:</span> <span>Rs ${booking.totalFare}</span></div>
      </div>

      <div class="ticket-footer-row">
        <div>
          <p>• Please carry valid photo ID during journey.</p>
          <p>• Helpline: 80552 06206 | musafir.travels999@gmail.com</p>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "flex";
}

function closeTicketModal() {
  const modal = document.getElementById("ticket-modal");
  if (modal) modal.style.display = "none";
}

function printTicketVoucher() {
  window.print();
}

// ==========================================
// 7. My Bookings Page Logic (`bookings.html`)
// ==========================================

async function renderMyBookings() {
  const container = document.getElementById("my-bookings-container");
  if (!container) return;

  const bookings = await DatabaseAPI.getBookings();
  container.innerHTML = "";

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card">
        <div class="empty-icon"><i class="fas fa-ticket-alt"></i></div>
        <h3>No bookings found</h3>
        <p>You haven't booked any tickets yet.</p>
        <a href="search.html" class="btn-primary" style="display:inline-block; margin-top:10px;">Search Buses Now</a>
      </div>
    `;
    return;
  }

  bookings.forEach(b => {
    const isCancelled = b.status === "CANCELLED";
    const card = document.createElement("div");
    card.className = `booking-history-card ${isCancelled ? 'cancelled-card' : ''}`;
    card.innerHTML = `
      <div class="history-card-header">
        <div>
          <span class="pnr-tag">PNR: ${b.pnr}</span>
          <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
        </div>
        <div class="booking-date">Booked on: ${b.bookingDate}</div>
      </div>

      <div class="history-body">
        <div class="history-route">
          <h3>${b.from} <i class="fas fa-arrow-right" style="font-size:0.9rem;"></i> ${b.to}</h3>
          <p class="operator-sub">${b.operator} (${b.busType})</p>
        </div>

        <div class="history-details-grid">
          <div><label>Date of Journey:</label> <span>${b.journeyDate}</span></div>
          <div><label>Departure:</label> <span>${b.departureTime}</span></div>
          <div><label>Seats:</label> <span class="seat-highlight">${b.seats.join(", ")}</span></div>
          <div><label>Total Fare:</label> <span class="fare-val">Rs ${b.totalFare}</span></div>
        </div>
      </div>

      <div class="history-actions">
        <button class="btn-secondary-sm" onclick='viewBookingByPNR("${b.pnr}")'><i class="fas fa-file-alt"></i> View Receipt</button>
        ${!isCancelled ? `
          <button class="btn-danger-sm" onclick='window.location.href="refunds.html?pnr=${b.pnr}"'><i class="fas fa-times-circle"></i> Cancel & Refund</button>
        ` : `
          <span class="refund-processed-lbl">Refund Status Processed</span>
        `}
      </div>
    `;
    container.appendChild(card);
  });
}

async function viewBookingByPNR(pnr) {
  const bookings = await DatabaseAPI.getBookings();
  const target = bookings.find(b => b.pnr === pnr);
  if (target) showETicketModal(target);
  else alert("Booking not found.");
}

// ==========================================
// 8. Refunds Engine (`refunds.html`)
// ==========================================

function initRefundsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const pnr = urlParams.get('pnr');
  if (pnr) {
    const input = document.getElementById("pnr-search-input");
    if (input) input.value = pnr;
    searchRefundPNR();
  }
}

async function searchRefundPNR() {
  const pnr = document.getElementById("pnr-search-input").value.trim().toUpperCase();
  const resultBox = document.getElementById("refund-search-result");

  if (!pnr) {
    alert("Please enter a valid PNR.");
    return;
  }

  const bookings = await DatabaseAPI.getBookings();
  const booking = bookings.find(b => b.pnr === pnr);

  if (!booking) {
    resultBox.innerHTML = `<div class="alert-box alert-warning"><i class="fas fa-exclamation-triangle"></i> No booking found with PNR <strong>${pnr}</strong>.</div>`;
    return;
  }

  if (booking.status === "CANCELLED") {
    resultBox.innerHTML = `<div class="alert-box alert-info"><i class="fas fa-info-circle"></i> Ticket PNR <strong>${pnr}</strong> has already been cancelled.</div>`;
    return;
  }

  const policyRefundPct = 90;
  const refundAmount = Math.round(booking.totalFare * (policyRefundPct / 100));
  const cancellationFee = booking.totalFare - refundAmount;

  resultBox.innerHTML = `
    <div class="refund-calculation-card shadow-lg">
      <div class="refund-card-header">
        <h3>Ticket Details (PNR: ${booking.pnr})</h3>
        <span class="status-badge confirmed">CONFIRMED</span>
      </div>

      <div class="refund-ticket-summary">
        <p><strong>Route:</strong> ${booking.from} to ${booking.to}</p>
        <p><strong>Bus:</strong> ${booking.operator}</p>
        <p><strong>Date & Time:</strong> ${booking.journeyDate} at ${booking.departureTime}</p>
        <p><strong>Seats Booked:</strong> ${booking.seats.join(", ")}</p>
      </div>

      <div class="cancellation-policy-box">
        <h4>Cancellation Policy Breakdown</h4>
        <div class="policy-row"><span>Time before departure:</span> <span>More than 24 Hours (90% Refund)</span></div>
        <div class="policy-row"><span>Ticket Paid:</span> <span>Rs ${booking.totalFare}</span></div>
        <div class="policy-row danger"><span>Cancellation Charges (10%):</span> <span>-Rs ${cancellationFee}</span></div>
        <hr>
        <div class="policy-row total-refund"><span>Net Refund Amount:</span> <span class="green-text">Rs ${refundAmount}</span></div>
      </div>

      <div class="refund-destination-select">
        <label>Select Refund Mode:</label>
        <select id="refund-mode-select">
          <option value="Musafir Cash">Musafir Cash Wallet (Instant Transfer + Rs 50 Bonus)</option>
          <option value="Original Payment Source">Original Payment Bank / UPI (2-4 Hours)</option>
        </select>
      </div>

      <button class="btn-danger-block" onclick="processTicketCancellation('${booking.pnr}', ${refundAmount})">Confirm Cancellation & Claim Refund</button>
    </div>
  `;
}

async function processTicketCancellation(pnr, refundAmount) {
  if (!confirm(`Cancel PNR ${pnr} for refund of Rs ${refundAmount}?`)) return;

  const mode = document.getElementById("refund-mode-select").value;
  const bookings = await DatabaseAPI.getBookings();
  const target = bookings.find(b => b.pnr === pnr);

  if (target) {
    target.status = "CANCELLED";
    target.refundAmount = refundAmount;
    await DatabaseAPI.saveBooking(target);

    if (mode.includes("Musafir Cash")) {
      DatabaseAPI.updateWalletBalance(refundAmount + 50);
    }

    const resultBox = document.getElementById("refund-search-result");
    resultBox.innerHTML = `
      <div class="refund-success-card">
        <div class="success-icon"><i class="fas fa-check-circle" style="color:var(--green-success); font-size:3rem;"></i></div>
        <h2>Cancellation Successful & Refund Approved</h2>
        <p>Refund ID: <strong>REF-${Math.floor(100000 + Math.random() * 900000)}</strong></p>
        <p>Amount <strong>Rs ${refundAmount}</strong> processed via <strong>${mode}</strong>.</p>
        <a href="bookings.html" class="btn-primary" style="display:inline-block; margin-top:15px;">View My Bookings</a>
      </div>
    `;
  }
}

// ==========================================
// 9. FontAwesome Vector Chatbot Widget (Zero Emojis)
// ==========================================

function initChatbotWidget() {
  if (document.getElementById("musafir-chatbot-root")) return;

  const botContainer = document.createElement("div");
  botContainer.id = "musafir-chatbot-root";
  botContainer.innerHTML = `
    <div id="chatbot-toggle-btn" onclick="toggleChatbotWindow()">
      <i class="fas fa-headset"></i> <span class="chat-badge">AI</span>
    </div>

    <div id="chatbot-window" style="display:none;">
      <div class="chatbot-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <i class="fas fa-robot" style="font-size:1.3rem;"></i>
          <div>
            <h4 style="margin:0; font-size:0.95rem;">Musafir AI Assistant</h4>
            <small style="opacity:0.8; font-size:0.75rem;">Online 24x7 Helpline</small>
          </div>
        </div>
        <button onclick="toggleChatbotWindow()" style="background:none; border:none; color:white; font-size:1.4rem; cursor:pointer;">&times;</button>
      </div>

      <div id="chatbot-messages" class="chatbot-body">
        <div class="chat-msg bot-msg">
          Welcome to <strong>Musafir Travels</strong>! How can I assist you with your bus booking today?
        </div>
      </div>

      <div class="chat-quick-buttons">
        <button onclick="sendQuickQuestion('Check PNR Status')"><i class="fas fa-search"></i> Check PNR</button>
        <button onclick="sendQuickQuestion('Popular Routes')"><i class="fas fa-route"></i> Popular Routes</button>
        <button onclick="sendQuickQuestion('Senior Citizen Discount')"><i class="fas fa-user-clock"></i> Senior Discount</button>
        <button onclick="sendQuickQuestion('Helpline Number')"><i class="fas fa-phone-alt"></i> Helpline</button>
      </div>

      <div class="chatbot-footer">
        <input type="text" id="chat-input" placeholder="Type query..." onkeypress="if(event.key==='Enter') sendChatMessage()">
        <button onclick="sendChatMessage()">SEND</button>
      </div>
    </div>
  `;
  document.body.appendChild(botContainer);
}

function toggleChatbotWindow() {
  const win = document.getElementById("chatbot-window");
  if (win) win.style.display = (win.style.display === "none") ? "flex" : "none";
}

function sendQuickQuestion(text) {
  const input = document.getElementById("chat-input");
  if (input) {
    input.value = text;
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById("chat-input");
  const msgBox = document.getElementById("chatbot-messages");
  if (!input || !msgBox) return;

  const query = input.value.trim();
  if (!query) return;

  const userDiv = document.createElement("div");
  userDiv.className = "chat-msg user-msg";
  userDiv.innerText = query;
  msgBox.appendChild(userDiv);

  input.value = "";
  msgBox.scrollTop = msgBox.scrollHeight;

  setTimeout(async () => {
    const reply = await getBotReply(query);
    const botDiv = document.createElement("div");
    botDiv.className = "chat-msg bot-msg";
    botDiv.innerHTML = reply;
    msgBox.appendChild(botDiv);
    msgBox.scrollTop = msgBox.scrollHeight;
  }, 500);
}

async function getBotReply(q) {
  const query = q.toLowerCase();

  if (query.includes("pnr") || query.includes("status")) {
    const bookings = await DatabaseAPI.getBookings();
    if (bookings.length > 0) {
      const latest = bookings[0];
      return `Your recent booking PNR is <strong>${latest.pnr}</strong> for <strong>${latest.from} to ${latest.to}</strong>. Status: <strong style="color:green;">${latest.status}</strong>.`;
    }
    return "Enter your 9-digit PNR in the <a href='bookings.html'>My Bookings</a> section.";
  }

  if (query.includes("route") || query.includes("bus")) {
    return "Popular Maharashtra routes: <br>• Chhatrapati Sambhajinagar (Aurangabad) to Mumbai<br>• Aurangabad to Pune<br>• Mumbai to Pune<br>• Pune to Nagpur";
  }

  if (query.includes("senior") || query.includes("old") || query.includes("elder")) {
    return "Senior Citizens (age 60+) receive an automatic <strong>10% Concession Discount</strong> on all Musafir Travels routes! Select seats marked with senior icon or enter age >= 60 in passenger form.";
  }

  if (query.includes("helpline") || query.includes("contact") || query.includes("phone")) {
    return "Helpline: <strong>80552 06206</strong><br>Email: <strong>musafir.travels999@gmail.com</strong>";
  }

  return "I am here to help with bus schedules, PNR lookup, senior citizen discounts, and ticket bookings!";
}

// ==========================================
// 10. Dual Login Authentication System
// ==========================================

async function handleUserLogin(e) {
  if (e) e.preventDefault();

  const emailEl = document.getElementById("login-email");
  const passwordEl = document.getElementById("login-password");
  const roleModeEl = document.getElementById("login-role-mode");
  const errorBox = document.getElementById("login-error-alert");
  const errorMsg = document.getElementById("login-error-msg");
  const submitBtn = document.getElementById("btn-login-submit");

  const email = emailEl?.value.trim();
  const password = passwordEl?.value.trim();
  const targetRole = roleModeEl?.value || "user";

  if (errorBox) errorBox.style.display = "none";

  if (!email || !password) {
    if (errorBox && errorMsg) {
      errorMsg.innerText = "Please enter both your email address and password.";
      errorBox.style.display = "block";
    } else {
      alert("Please enter both your email address and password.");
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Authenticating...`;
  }

  const res = await DatabaseAPI.loginUser(email, password);

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `SIGN IN <i class="fas fa-arrow-right"></i>`;
  }

  if (!res || res.status !== "SUCCESS") {
    const msg = res?.message || "Invalid email or password. Please verify your credentials.";
    if (errorBox && errorMsg) {
      errorMsg.innerText = msg;
      errorBox.style.display = "block";
    } else {
      alert(msg);
    }
    return;
  }

  const user = res.user;

  // Enforce role separation if Admin login tab was chosen
  if (targetRole === "admin" && user.role !== "admin") {
    const roleMsg = "Access Denied: This account is a Customer account and does not have Administrator privileges. Please use Customer Login.";
    if (errorBox && errorMsg) {
      errorMsg.innerText = roleMsg;
      errorBox.style.display = "block";
    } else {
      alert(roleMsg);
    }
    return;
  }

  localStorage.setItem("musafir_user", JSON.stringify(user));
  updateUserAuthNav();

  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "index.html";
  }
}

async function handleSignup(e) {
  if (e) e.preventDefault();

  const nameEl = document.getElementById("signup-name");
  const emailEl = document.getElementById("signup-email");
  const phoneEl = document.getElementById("signup-phone");
  const passwordEl = document.getElementById("signup-password");
  const confirmPasswordEl = document.getElementById("signup-confirm-password");
  const errorBox = document.getElementById("signup-error-alert");
  const errorMsg = document.getElementById("signup-error-msg");
  const submitBtn = document.getElementById("btn-signup-submit");

  const name = nameEl?.value.trim();
  const email = emailEl?.value.trim();
  const phone = phoneEl?.value.trim();
  const password = passwordEl?.value.trim();
  const confirmPassword = confirmPasswordEl?.value.trim();

  if (errorBox) errorBox.style.display = "none";

  if (!name || !email || !password || !phone) {
    if (errorBox && errorMsg) {
      errorMsg.innerText = "Please fill in all required fields.";
      errorBox.style.display = "block";
    } else {
      alert("Please fill in all required fields.");
    }
    return;
  }

  if (password !== confirmPassword) {
    if (errorBox && errorMsg) {
      errorMsg.innerText = "Passwords do not match. Please re-enter.";
      errorBox.style.display = "block";
    } else {
      alert("Passwords do not match.");
    }
    return;
  }

  if (password.length < 6) {
    if (errorBox && errorMsg) {
      errorMsg.innerText = "Password must be at least 6 characters long.";
      errorBox.style.display = "block";
    } else {
      alert("Password must be at least 6 characters long.");
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Creating Account...`;
  }

  const res = await DatabaseAPI.signupUser({
    name: name,
    email: email,
    phone: phone,
    password: password,
    role: "user"
  });

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `CREATE ACCOUNT <i class="fas fa-user-plus"></i>`;
  }

  if (!res || res.status !== "SUCCESS") {
    const msg = res?.message || "Could not create account. Please try again.";
    if (errorBox && errorMsg) {
      errorMsg.innerText = msg;
      errorBox.style.display = "block";
    } else {
      alert(msg);
    }
    return;
  }

  localStorage.setItem("musafir_user", JSON.stringify(res.user));
  alert(`Account created successfully! Welcome to Musafir Travels, ${res.user.name}.`);
  window.location.href = "index.html";
}

function handleGoogleSignIn() {
  const email = prompt("Enter your Google Account Email for instant sign-in:");
  if (!email || !email.includes("@")) {
    if (email) alert("Please enter a valid Google email address.");
    return;
  }

  const name = email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const user = {
    email: email.toLowerCase(),
    name: name,
    role: "user",
    phone: "9876543210"
  };

  localStorage.setItem("musafir_user", JSON.stringify(user));
  alert(`Successfully signed in with Google as ${user.name} (${user.email})!`);
  window.location.href = "index.html";
}

// ==========================================
// 11. Admin Panel Engine (`admin.html`)
// ==========================================

async function initAdminPanel() {
  const currentUserStr = localStorage.getItem("musafir_user");
  if (!currentUserStr) {
    alert("Admin access restricted. Please log in as Admin.");
    window.location.href = "login.html";
    return;
  }

  const user = JSON.parse(currentUserStr);
  if (user.role !== "admin") {
    alert("Access Denied! Admin credentials required.");
    window.location.href = "index.html";
    return;
  }

  renderAdminDashboard();
  renderAdminBuses();
  renderAdminBookings();
}

async function renderAdminDashboard() {
  const root = document.getElementById("admin-stats-cards");
  if (!root) return;

  const bookings = await DatabaseAPI.getBookings();
  const buses = await DatabaseAPI.getBuses();
  const users = await DatabaseAPI.getUsers();

  const totalRevenue = bookings.reduce((sum, b) => b.status === "CONFIRMED" ? sum + b.totalFare : sum, 0);

  root.innerHTML = `
    <div class="admin-stat-card" style="border-top: 5px solid var(--primary-red); background: white; padding: 1.75rem 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); border-top-width: 5px; border-top-color: var(--primary-red);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <div class="stat-label" style="font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">Total Ticket Revenue</div>
        <div style="width: 42px; height: 42px; border-radius: 8px; background: #fee2e2; color: var(--primary-red); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fas fa-rupee-sign"></i>
        </div>
      </div>
      <div class="stat-num" style="font-size: 2.1rem; font-weight: 800; color: var(--pure-black);">Rs ${totalRevenue.toLocaleString()}</div>
      <small style="color: var(--green-success); font-weight: 600;"><i class="fas fa-arrow-up"></i> Confirmed bookings only</small>
    </div>

    <div class="admin-stat-card" style="border-top: 5px solid var(--primary-dark); background: white; padding: 1.75rem 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); border-top-width: 5px; border-top-color: var(--primary-dark);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <div class="stat-label" style="font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">Customer Bookings</div>
        <div style="width: 42px; height: 42px; border-radius: 8px; background: #fee2e2; color: var(--primary-dark); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fas fa-ticket-alt"></i>
        </div>
      </div>
      <div class="stat-num" style="font-size: 2.1rem; font-weight: 800; color: var(--pure-black);">${bookings.length}</div>
      <small style="color: var(--text-muted); font-weight: 500;">Total PNR tickets issued</small>
    </div>

    <div class="admin-stat-card" style="border-top: 5px solid var(--green-success); background: white; padding: 1.75rem 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); border-top-width: 5px; border-top-color: var(--green-success);">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <div class="stat-label" style="font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">Maharashtra Active Fleet</div>
        <div style="width: 42px; height: 42px; border-radius: 8px; background: #dcfce7; color: var(--green-success); display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fas fa-bus"></i>
        </div>
      </div>
      <div class="stat-num" style="font-size: 2.1rem; font-weight: 800; color: var(--pure-black);">${buses.length}</div>
      <small style="color: var(--green-success); font-weight: 600;"><i class="fas fa-check-circle"></i> Live scheduled routes</small>
    </div>

    <div class="admin-stat-card" style="border-top: 5px solid #475569; background: white; padding: 1.75rem 2rem; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); border-top-width: 5px; border-top-color: #475569;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
        <div class="stat-label" style="font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">Registered Accounts</div>
        <div style="width: 42px; height: 42px; border-radius: 8px; background: #f1f5f9; color: #475569; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
          <i class="fas fa-users"></i>
        </div>
      </div>
      <div class="stat-num" style="font-size: 2.1rem; font-weight: 800; color: var(--pure-black);">${users.length || 2}</div>
      <small style="color: var(--text-muted); font-weight: 500;">User & Admin accounts</small>
    </div>
  `;
}

async function renderAdminBuses() {
  const container = document.getElementById("admin-buses-table-body");
  if (!container) return;

  const buses = await DatabaseAPI.getBuses();
  container.innerHTML = buses.map((b) => `
    <tr>
      <td>#${b.id}</td>
      <td><strong>${b.operator}</strong><br><small>${b.busNumber}</small></td>
      <td>${b.from} to ${b.to}</td>
      <td>${b.departureTime} - ${b.arrivalTime}</td>
      <td>Rs ${b.price}</td>
      <td>${b.seatsAvailable} / ${b.totalSeats || 24}</td>
    </tr>
  `).join("");
}

async function renderAdminBookings() {
  const container = document.getElementById("admin-bookings-table-body");
  if (!container) return;

  const bookings = await DatabaseAPI.getBookings();
  container.innerHTML = bookings.map(b => `
    <tr>
      <td><strong>${b.pnr}</strong></td>
      <td>${b.from} to ${b.to}</td>
      <td>${b.journeyDate} (${b.departureTime})</td>
      <td>${b.passengers.map(p => p.name).join(", ")}</td>
      <td>Rs ${b.totalFare}</td>
      <td><span class="status-badge ${b.status.toLowerCase()}">${b.status}</span></td>
    </tr>
  `).join("");
}

