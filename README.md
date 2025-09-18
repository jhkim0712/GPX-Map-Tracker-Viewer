# GPX Map Tracker Viewer

A simple and intuitive web application for visualizing GPX tracking data on interactive maps. Upload your GPX files to see your routes, waypoints, and detailed tracking information with reverse geocoding support.

![GPX Tracker Demo](https://img.shields.io/badge/demo-live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)

## ✨ Features

- **📁 Easy File Upload**: Drag & drop or click to upload GPX files
- **🗺️ Interactive Map**: Powered by Leaflet.js and OpenStreetMap
- **📍 Route Visualization**: View your complete tracking route with waypoint markers
- **📊 Detailed Table View**: Track points with coordinates, cumulative distance, and addresses
- **🌍 Reverse Geocoding**: Automatic address lookup for each tracking point
- **📏 Distance Calculation**: Precise distance calculations using Haversine formula
- **🎨 Responsive Design**: Clean, modern interface that works on all devices

## 🚀 Live Demo

Simply open `index.html` in your web browser to start using the application.

## 📋 Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for map tiles and geocoding)
- GPX files to visualize

## 🛠️ Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/jhkim0712/GPX-Map-Tracker-Viewer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd GPX-Map-Tracker-Viewer
   ```

3. Open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

## 📖 Usage

1. **Upload GPX File**: 
   - Click "Open File" button and select your GPX file, or
   - Drag and drop your GPX file into the designated area

2. **View Your Route**:
   - The map will automatically center and zoom to show your complete route
   - Blue polyline shows your path
   - Markers indicate individual tracking points

3. **Explore Details**:
   - Click on any marker to see coordinates and timing information
   - Scroll through the tracker points table for detailed information
   - View cumulative distances and addresses for each point

## 📁 Project Structure

```
gpx-map-tracker-viewer/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
├── style.css           # Styling and layout
├── favicon.ico         # Website icon
└── README.md           # This file
```

## 🔧 Technical Details

### Dependencies
- **Leaflet.js** (v1.x): Interactive maps
- **@tmcw/togeojson** (v5.8.1): GPX to GeoJSON conversion
- **OpenStreetMap**: Map tiles and geocoding via Nominatim API

### Key Features Implementation
- **File Handling**: HTML5 FileReader API for local file processing
- **Map Rendering**: Leaflet.js with OpenStreetMap tiles
- **GPX Parsing**: toGeoJSON library for converting GPX to GeoJSON format
- **Distance Calculation**: Haversine formula for accurate geographic distances
- **Geocoding**: Nominatim API for reverse geocoding (coordinates to addresses)
- **Responsive Design**: CSS Flexbox for adaptive layout

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Internet Explorer (not supported)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) for the amazing mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) for free map data
- [@tmcw/togeojson](https://github.com/tmcw/togeojson) for GPX parsing
- [Nominatim](https://nominatim.org/) for geocoding services

## 📧 Contact

Created by [@jhkim0712](https://github.com/jhkim0712) - feel free to contact me!

Project Link: [https://github.com/jhkim0712/GPX-Map-Tracker-Viewer](https://github.com/jhkim0712/GPX-Map-Tracker-Viewer)

---

⭐ If you found this project helpful, please give it a star on GitHub!