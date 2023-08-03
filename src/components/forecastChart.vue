<template>
  <ul>
    <li>Temperature</li>
    <li>|</li>
    <li>Precipitation</li>
    <li>|</li>
    <li>Humidity</li>
  </ul>
  <ul v-if="dailyWeatherOpen">
    <li @click="changeTime('Day')">Daytime</li>
    <li>|</li>
    <li @click="changeTime('Night')">Nighttime</li>
  </ul>
  <div class="forecastChart">
    <div class="chartWrapper"><canvas id="chart"></canvas></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
const props = defineProps(['weatherData', 'dailyWeatherOpen', 'hourlyWeatherOpen', 'theme']);
const time = ref(props.dailyWeatherOpen ? 'Day' : 'Hourly');
const weatherArray = Object.keys(props.weatherData);
const weatherTemps = ref([]);
const weatherLabels = ref([]);
let myChart;
Chart.defaults.color = props.theme == 'Light' ? '#000' : '#fff';

const getDayWeatherTempArr = (type) => {
  weatherTemps.value = [];
  weatherArray.forEach((element) => {
    props.weatherData[element].forEach((arr) => {
      if (type == 'Day') {
        if (arr.isDaytime) {
          let temp = arr.temp.split('F');
          weatherTemps.value.push(temp[0]);
        }
      } else if (type == 'Hourly') {
        let temp = arr.temp.split('F');
        weatherTemps.value.push(temp[0]);
      } else if (type == 'Night') {
        if (!arr.isDaytime) {
          let temp = arr.temp.split('F');
          weatherTemps.value.push(temp[0]);
        }
      }
    });
  });
};

const getWeatherLabelArr = (type) => {
  weatherLabels.value = [];
  weatherArray.forEach((element) => {
    props.weatherData[element].forEach((arr) => {
      if (type == 'Day') {
        if (arr.isDaytime) {
          let label = arr.name ? arr.name : arr.time;
          weatherLabels.value.push(label);
        }
      } else if (type == 'Hourly') {
        let label = arr.name ? arr.name : arr.time;
        weatherLabels.value.push(label);
      } else if (type == 'Night') {
        if (!arr.isDaytime) {
          let label = arr.name ? arr.name : arr.time;
          weatherLabels.value.push(label);
        }
      }
    });
  });
};

const getLowestTemp = (tempsArr) => {
  let lowestTemperature = parseInt(tempsArr[0], 10);
  //parseInt needs number to convert and a base
  for (let i = 1; i < tempsArr.length; i++) {
    const temperature = parseInt(tempsArr[i], 10);
    if (temperature < lowestTemperature) {
      lowestTemperature = temperature;
    }
  }
  return lowestTemperature - 1;
};

const changeTime = (timeOfDay) => {
  if (timeOfDay != time.value) {
    myChart.destroy();
    time.value = timeOfDay;
    getDayWeatherTempArr(time.value);
    getWeatherLabelArr(time.value);
    createGraph();
  }
};

const createGraph = () => {
  const ctx = document.getElementById('chart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weatherLabels.value,
      datasets: [
        {
          label: 'Temperature',
          data: weatherTemps.value,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          min: getLowestTemp(weatherTemps.value) 
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      maintainAspectRatio: false,
      elements: {
        bar: {
          //find what to do
        }
      }
    }
  });
  myChart;
};

//change chart color if color theme changes
watch(
  () => props.theme,
  (newTheme) => {
    Chart.defaults.color = newTheme == 'Light' ? '#000' : '#fff';
    myChart.destroy();
    getDayWeatherTempArr(time.value);
    getWeatherLabelArr(time.value);
    createGraph();
  }
);

watch(
  () => props.weatherData,
  () => {
    myChart.destroy();
    getDayWeatherTempArr(time.value);
    getWeatherLabelArr(time.value);
    createGraph();
  }
);

onMounted(() => {
  getDayWeatherTempArr(time.value);
  getWeatherLabelArr(time.value);
  //console.log('temps:', weatherTemps);
  createGraph();
});
</script>