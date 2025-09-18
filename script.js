// Map initialization (using Leaflet and OpenStreetMap)
let map = L.map('map').setView([37.5128889, 127.0526509], 13); // Centered on the office
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap contributors'
}).addTo(map);

// Function to get address from coordinates (reverse geocoding)
async function getAddress(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
        const data = await response.json();
        return data.display_name || 'Address not found';
    } catch (error) {
        console.error('Error fetching address:', error);
        return 'Address unavailable';
    }
}

// Function to calculate distance between two points (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
}

// Function to calculate cumulative distances
function calculateCumulativeDistances(coords) {
    const distances = [0]; // First point has 0 distance
    let cumulativeDistance = 0;
    
    for (let i = 1; i < coords.length; i++) {
        const [lat1, lon1] = coords[i-1];
        const [lat2, lon2] = coords[i];
        const distance = calculateDistance(lat1, lon1, lat2, lon2);
        cumulativeDistance += distance;
        distances.push(cumulativeDistance);
    }
    
    return distances;
}

// Function to populate tracker points table
async function populateTrackPointsTable(coords) {
    const tableBody = document.getElementById('trackPointsBody');
    const tableContainer = document.getElementById('trackPointsTable');
    
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Show table
    tableContainer.style.display = 'block';
    
    // Calculate cumulative distances
    const distances = calculateCumulativeDistances(coords);
    
    // Add rows with address lookup
    for (let i = 0; i < coords.length; i++) {
        const [lat, lon] = coords[i];
        const row = document.createElement('tr');
        
        // Add loading row first
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${lat.toFixed(6)}</td>
            <td>${lon.toFixed(6)}</td>
            <td>${distances[i].toFixed(3)}</td>
            <td>Loading...</td>
        `;
        tableBody.appendChild(row);
        
        // Get address asynchronously
        const address = await getAddress(lat, lon);
        row.cells[4].textContent = address;
        
        // Small delay to avoid overwhelming the API
        if (i < coords.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
}

// Parse GPX file and display on the map
function handleGPXFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const parser = new DOMParser();
        const xml = parser.parseFromString(e.target.result, "application/xml");
        
        // Convert GPX to GeoJSON
        const geojson = toGeoJSON.gpx(xml);
        if (!geojson.features.length) {
            alert("No location data found in the GPX file.");
            return;
        }

        // Add route (Polyline) and markers (Pins) to the map
        let coords = [];
        geojson.features.forEach(feature => {
            if (feature.geometry.type === "LineString") {
                coords = feature.geometry.coordinates.map(c => [c[1], c[0]]); // [lat, lon]
            }
        });

        if (coords.length) {
            const polyline = L.polyline(coords, {color: 'blue'}).addTo(map);
            map.fitBounds(polyline.getBounds());

            // Add markers
            coords.forEach((latlng, idx) => {
                const marker = L.marker(latlng).addTo(map);
                
                // Extract information (e.g., coordinates, sequence number, time)
                let info = `Sequence: ${idx + 1}<br>Location: ${latlng[0].toFixed(6)}, ${latlng[1].toFixed(6)}`;
                
                // Try to get time if available
                let time = null;
                try {
                    const trkpt = xml.getElementsByTagName('trkpt')[idx];
                    time = trkpt && trkpt.getElementsByTagName('time')[0]?.textContent;
                } catch (e) {}

                if (time) info += `<br>Time: ${time}`;
                marker.bindTooltip(info, {permanent: false, direction: "top"});
            });
            
            // Populate tracker points table
            populateTrackPointsTable(coords);
        }
        document.getElementById('fileInfo').innerHTML = `File: ${file.name}<br>Tracker Points: ${coords.length}`;
    };
    reader.readAsText(file);
}

// Open file button
document.getElementById('openBtn').onclick = function() {
    const fileInput = document.getElementById('gpxFile');
    if (fileInput.files.length) {
        handleGPXFile(fileInput.files[0]);
    } else {
        alert("Please select a GPX file.");
    }
};

// Drag and drop functionality
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    dropZone.classList.add('dragover');
});
dropZone.addEventListener('dragleave', function(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
});
dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.gpx')) {
        handleGPXFile(file);
    } else {
        alert("Please drop a GPX file.");
    }
});