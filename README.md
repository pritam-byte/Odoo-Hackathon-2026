# TransitOps 🚛

TransitOps is a modern, full-stack Fleet Management and Logistics Web Application designed to handle vehicles, drivers, and trip dispatching effortlessly. It provides rich visualizations, strict data validations, and secure role-based access for diverse transit operation teams.

## 🌟 Key Features

* **Real-time Dashboard**: Dynamic KPI cards, fleet utilization charts, and fuel cost tracking powered by Recharts.
* **Vehicle Management**: Register and track vehicles across the fleet with detailed records including max load capacity, odometer readings, and acquisition cost.
* **Driver Management**: Track driver profiles, monitor license categories and expiration dates, and evaluate safety scores.
* **Smart Trip Dispatching**: Calculate available capacity dynamically, assign vehicles and drivers, and track trips from dispatch to completion.
* **Secure Authentication & Roles**: JWT-based secure login mechanism with specific access control for roles like Admin, Fleet Manager, Dispatcher, and Safety Officer.
* **Data Validation**: Strict input validation using Zod on the backend ensures database integrity.

## 🛠 Tech Stack

**Frontend:**
* React (via Vite)
* Tailwind CSS for beautiful, responsive styling
* Context API for global state management
* React Router for navigation
* Lucide React for modern iconography
* Recharts for data visualization

**Backend:**
* Node.js & Express
* Prisma ORM
* PostgreSQL Database
* Zod for schema validation
* JSON Web Tokens (JWT) for authentication (stored securely in cookies)

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* PostgreSQL Database running locally or in the cloud.

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   USER="postgres"
   HOST="localhost"
   DATABASE="fleet-management"
   DBPORT=5432
   PASSWORD="your-postgres-password"
   DATABASE_URL="postgresql://postgres:your-postgres-password@localhost:5432/fleet-management?schema=public"
   CLIENT_URL="http://localhost:5173"
   JWT_SECRET="your-super-secret-jwt-key"
   ```
4. Run Prisma database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The API will be available at `http://localhost:5000`.*

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend/transitOps
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The application will open at `http://localhost:5173`.*

## 🤝 Using the Application

1. Open the frontend URL in your browser.
2. Sign up for a new account (e.g., as an `ADMIN` or `FLEET_MANAGER` to have full access).
3. The system will automatically log you in and route you to the Dashboard.
4. Navigate to the **Vehicles** and **Drivers** tabs to populate your fleet.
5. Create and dispatch new routes from the **Trips** tab.
