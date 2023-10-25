document.addEventListener('DOMContentLoaded', () => {
    const moistureList = document.getElementById('moisture-list');
    const chartContainer = document.getElementById('chart-container');

    function fetchData() {
        const currentTime = Date.now(); // Get the current timestamp in milliseconds
        fetch('/moisture')
            .then(response => response.json())
            .then(data => {
                moistureList.innerHTML = '';
                const chartData = {};
    
                data.forEach(entry => {
                    const { plantname, moisturePercentage, timestamp } = entry;
    
                    // Calculate the difference between current time and entry's timestamp
                    const timeDifference = currentTime - (typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime());
    
                    // Include data only if it is not older than 10 days
                    if (timeDifference <= 60000*60*10) {
                        const listItem = document.createElement('li');
                        listItem.textContent = `Plant: ${plantname}, Moisture: ${moisturePercentage}%, Time: ${new Date(timestamp).toLocaleString()}`;
                        moistureList.appendChild(listItem);
    
                        if (!chartData[plantname]) {
                            chartData[plantname] = [];
                        }
                        const timestampInMillis = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
                        chartData[plantname].push({ x: timestampInMillis, y: moisturePercentage });
    
                        // Keep only the last 10 data points for each plant
                        if (chartData[plantname].length > 100) {
                            chartData[plantname].shift();
                        }
                    }
                });
    
                // Update Chart.js plots
                updateCharts(chartData);
            })
            .catch(error => console.error('Error:', error));
    }
    

    function updateCharts(data) {
        // Destroy existing charts if any
        if (window.myCharts) {
            window.myCharts.forEach(chart => {
                chart.destroy();
            });
        }
    
        const chartContainer = document.getElementById('chart-container');
    
        Object.keys(data).forEach(plantname => {
            const plantData = data[plantname].map(entry => {
                return {
                    x: entry.x,
                    y: entry.y
                };
            });
    
            // Set custom dimensions for the chart
            const chartWidth = 800; // Set your desired width
            const chartHeight = 100; // Set your desired height
    
            const ctx = document.createElement('canvas');
            ctx.width = chartWidth;
            ctx.height = chartHeight;
            chartContainer.appendChild(ctx);
    
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: plantData.map(entry => new Date(entry.x).toLocaleString()),
                    datasets: [{
                        label: plantname,
                        data: plantData,
                        borderColor: getRandomColor(),
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'category',
                            position: 'bottom'
                        }
                    }
                }
            });
    
            if (!window.myCharts) {
                window.myCharts = [];
            }
    
            window.myCharts.push(myChart);
        });
    }
    

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Fetch data every 60 seconds
    setInterval(fetchData, 60000);

    // Fetch data on page load
    fetchData();
});
