# Plant Moisture Monitoring System

## Overview

The Plant Moisture Monitoring System is a web-based application that helps users monitor the moisture levels of different plants. The system collects moisture data from various plants and displays it in real-time through an intuitive web interface. It consists of an ESP32 microcontroller that reads moisture data from sensors attached to different plants and sends this data to a remote server. The server stores the received data and serves it to the frontend, where users can view the moisture levels for each plant.

## Components

### 1. ESP32 Microcontroller

The ESP32 microcontroller is responsible for reading moisture data from sensors attached to plants. It sends this data to the backend server for storage and processing.

### 2. Backend Server (Node.js & Express.js)

The backend server is built using Node.js and Express.js. It receives moisture data from the ESP32 devices, stores it in a database, and provides this data to the frontend upon request.

### 3. Frontend Interface (HTML, CSS, JavaScript & Chart.js)

The frontend interface is a web application built with HTML, CSS, and JavaScript. It uses Ajax to fetch moisture data from the backend server and displays the data in a user-friendly manner. Chart.js is used to create visual representations of the moisture levels for each plant, allowing users to easily track changes over time.

## Features

- **Real-time Data:** The system provides real-time moisture data for multiple plants.
- **Plant Identification:** Each plant is identified by its name, and its moisture data is displayed separately.
- **Interactive Charts:** Users can visualize moisture data using interactive line charts, making it easy to interpret trends and patterns.
- **User-Friendly Interface:** The frontend has a simple and intuitive design, ensuring a seamless user experience.

## Usage

1. **ESP32 Setup:** Connect moisture sensors to the ESP32 microcontroller and program it to send data to the specified backend endpoint.
2. **Backend/Frontend Deployment:** Deploy the Docker container or adjust the code to your tailored needs.
3. **Access the Interface:** Users can access the web interface through a browser, view moisture levels for different plants, and track changes over time.

## Testing

Instead of using a real esp32 to send data it is advised to test first. Test it with `for n in {1..50}; do curl -X POST -H "Content-Type: application/json" -d '{"plantname":"Plant A", "moisturePercentage": 11}' http://localhost:3001/moisture; done`

## Future Enhancements

- **User Authentication:** Implement user authentication to allow multiple users to monitor their own set of plants securely.
- **Alert System:** Integrate an alert system to notify users when the moisture levels of specific plants fall below or exceed a certain threshold.
- **Historical Data:** Store historical moisture data to allow users to view trends over extended periods.

---

*This project is designed to provide an efficient and user-friendly solution for monitoring plant moisture levels, enabling users to ensure the well-being of their plants and take timely actions based on the data provided.*
