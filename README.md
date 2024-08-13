# Vehicle Driver Mapping System

## Overview

The Vehicle Driver Mapping System is a comprehensive application designed to facilitate the management and mapping of drivers and their respective locations. The system allows users to search for drivers based on various criteria, view driver profiles, and visualize driver locations on an interactive map.

## Features

- **Driver Search:** Search for drivers based on name, city, state, or contact information.
- **Driver Profiles:** View detailed profiles of drivers, including experience, location, and a brief description.
- **Map Integration:** Visualize the location of selected drivers on an interactive map with search functionality.
- **Responsive Design:** The application is designed to be fully responsive, ensuring a seamless experience across different devices.

## Technologies Used

- **Frontend:**
  - React.js
  - Leaflet (for map integration)
  - Axios (for API requests)
  - Tailwind CSS (for styling)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for storing driver data)

## API Endpoints

- **GET /api/drivers**
  - Retrieves a list of all drivers stored in the database.
  - Example Response:
    ```json
    [
      {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "location": "New York, NY",
        "experience": 5,
        "contact": "555-1234",
        "description": "Experienced driver with over 5 years of professional driving experience."
      },
      ...
    ]
    ```
Set up environment variables:

Create a .env file in the root directory of the server and add the necessary environment variables (e.g., MongoDB connection string).
Start the application:

In the server directory, run:
bash
Copy code
npm start
In the client directory, run:
bash
Copy code
npm start
Access the application:

Open your web browser and navigate to http://localhost:3000.
## Preview

![image](https://github.com/user-attachments/assets/63cdf34c-3c2d-4d96-bdb6-d776e76ea254)


## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/vehicle-driver-mapping-system.git
   cd vehicle-driver-mapping-system
Install dependencies for both the frontend and backend:


2. **In the server directory, run**
   ```bash
   cd client
  
In the client directory, run:
```bash
   npm start
In the client directory, run:

