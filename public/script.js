document.addEventListener('DOMContentLoaded', () => {
    const moistureList = document.getElementById('moisture-list');
    const chartContainer = document.getElementById('chart-container');
    const chartWidth = window.innerWidth * 0.9; // Set width to 90% of the viewport width
    const chartHeight = window.innerHeight * 0.5; // Set height to 50% of the viewport height

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
    
                    // Include data only if it is not older than 20 hours
                    if (timeDifference <= 60000*60*20) {
                        const listItem = document.createElement('li');
                        listItem.textContent = `Plant: ${plantname}, Moisture: ${moisturePercentage}%, Time: ${new Date(timestamp).toLocaleString()}`;
                        moistureList.appendChild(listItem);
    
                        if (!chartData[plantname]) {
                            chartData[plantname] = [];
                        }
                        const timestampInMillis = typeof timestamp === 'number' ? timestamp : new Date(timestamp).getTime();
                        chartData[plantname].push({ x: timestampInMillis, y: moisturePercentage });
    
                        // Keep only the last 10 data points for each plant
                        if (chartData[plantname].length > 120) {
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
        chartContainer.innerHTML = '';
           

        Object.keys(data).forEach(plantname => {
            const plantData = data[plantname].map(entry => {
                return {
                    x: entry.x,
                    y: entry.y
                };
            });

            // Create a new canvas element for each chart
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

    // Fetch data every 10 min
    setInterval(fetchData, 60000*10);

    // Fetch data on page load
    fetchData();
});
