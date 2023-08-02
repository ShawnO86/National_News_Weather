<template>
  <div class="forecastChart">
    <canvas id="chart" width="400px"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';
const props = defineProps(['weatherData', 'dailyWeatherOpen', 'hourlyWeatherOpen']);
const graphLabel = props.dailyWeatherOpen ? '7-Day Temperature Trend' : 'Hourly Temperature Trend';
const weatherArray = Object.keys(props.weatherData);
const weatherTemps = [];
const weatherLabels = [];
const getWeatherData = () =>
  weatherArray.forEach((element) => {
    props.weatherData[element].forEach((arr) => {
      let temp = arr.temp.split('F');
      let label = arr.name ? arr.name : arr.time;
      weatherTemps.push(temp[0]);
      weatherLabels.push(label);
    });
  });
onMounted(() => {
  getWeatherData();
  console.log('temps:', weatherTemps);
  const ctx = document.getElementById('chart');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: weatherLabels,
      datasets: [
        {
          label: graphLabel,
          data: weatherTemps,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  myChart;
});
</script>