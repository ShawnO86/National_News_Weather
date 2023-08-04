<template>
  <div class="forecastNav">
    <ul>
      <li @click="changeDataType('temp'), toggleTempOpen()" :class="tempOpen ? 'active' : ''">
        Temperature
      </li>
      <li>|</li>
      <li @click="changeDataType('precip'), togglePrecipOpen()" :class="precipOpen ? 'active' : ''">
        Precipitation
      </li>
      <li>|</li>
      <li
        @click="changeDataType('humidity'), toggleHumidityOpen()"
        :class="humidityOpen ? 'active' : ''"
      >
        Humidity
      </li>
    </ul>
    <ul v-if="dailyWeatherOpen">
      <li @click="changeTime('Day'), toggleDayOpen()" :class="dayOpen ? 'active' : ''">Daytime</li>
      <li>|</li>
      <li @click="changeTime('Night'), toggleNightOpen()" :class="nightOpen ? 'active' : ''">
        Nighttime
      </li>
    </ul>
  </div>
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
const weatherGraphData = ref([]);
const weatherLabels = ref([]);
const weatherDataType = ref('temp');
const tempOpen = ref(true);
const precipOpen = ref(false);
const humidityOpen = ref(false);
const dayOpen = ref(true);
const nightOpen = ref(false);
let myChart;
Chart.defaults.color = props.theme == 'Light' ? '#000' : '#fff';

function toggleTempOpen() {
  tempOpen.value = true;
  precipOpen.value = false;
  humidityOpen.value = false;
}
function togglePrecipOpen() {
  tempOpen.value = false;
  precipOpen.value = true;
  humidityOpen.value = false;
}
function toggleHumidityOpen() {
  tempOpen.value = false;
  precipOpen.value = false;
  humidityOpen.value = true;
}
function toggleDayOpen() {
  dayOpen.value = true;
  nightOpen.value = false;
}
function toggleNightOpen() {
  dayOpen.value = false;
  nightOpen.value = true;
}
const getDayWeatherDataArr = (time, dataType) => {
  weatherGraphData.value = [];
  weatherArray.forEach((element) => {
    props.weatherData[element].forEach((arr) => {
      if (dataType == 'temp') {
        let temp = arr.temp.split('F');
        if (time == 'Day' && arr.isDaytime) {
          weatherGraphData.value.push(temp[0]);
        } else if (time == 'Night' && !arr.isDaytime) {
          weatherGraphData.value.push(temp[0]);
        } else if (time == 'Hourly') {
          weatherGraphData.value.push(temp[0]);
        }
      } else if (dataType == 'precip') {
        let precip = arr.precip.split('%');
        if (time == 'Day' && arr.isDaytime) {
          weatherGraphData.value.push(precip[0]);
        } else if (time == 'Night' && !arr.isDaytime) {
          weatherGraphData.value.push(precip[0]);
        } else if (time == 'Hourly') {
          weatherGraphData.value.push(precip[0]);
        }
      } else if (dataType == 'humidity') {
        let humidity = arr.humidity.split('%');
        if (time == 'Day' && arr.isDaytime) {
          weatherGraphData.value.push(humidity[0]);
        } else if (time == 'Night' && !arr.isDaytime) {
          weatherGraphData.value.push(humidity[0]);
        } else if (time == 'Hourly') {
          weatherGraphData.value.push(humidity[0]);
        }
      }
    });
  });
};

const changeDataType = (type) => {
  weatherDataType.value = type;
};

const expandDataTypeName = (type) => {
  let dataType;
  switch (type) {
    case 'temp':
      dataType = 'Temperature';
      break;
    case 'precip':
      dataType = '% Precipitation';
      break;
    case 'humidity':
      dataType = '% Humidity';
      break;
  }
  return dataType;
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

const getLowestValue = (arr) => {
  let lowestValue = parseInt(arr[0], 10);
  //parseInt needs number to convert and a base
  for (let i = 1; i < arr.length; i++) {
    const value = parseInt(arr[i], 10);
    if (value < lowestValue) {
      lowestValue = value;
    }
  }
  return lowestValue;
};

const changeTime = (timeOfDay) => {
  if (timeOfDay != time.value) {
    myChart.destroy();
    time.value = timeOfDay;
    getDayWeatherDataArr(time.value, weatherDataType.value);
    getWeatherLabelArr(time.value);
    createGraph(weatherGraphData.value, weatherDataType.value);
  }
};

const createGraph = (data, dataLabel) => {
  const ctx = document.getElementById('chart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: weatherLabels.value,
      datasets: [
        {
          label: expandDataTypeName(dataLabel),
          data: data,
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          min: getLowestValue(data)
        }
      },
      plugins: {
        legend: {
          align: 'start',
          position: 'bottom',
          maxHeight: '32',
          labels: {
            usePointStyle: true,
          }

        },
      },
      maintainAspectRatio: false,
    }
  });
  myChart;
};
//recreate chart to selected version
watch(
  () => weatherDataType.value,
  () => {
    myChart.destroy();
    getDayWeatherDataArr(time.value, weatherDataType.value);
    getWeatherLabelArr(time.value);
    createGraph(weatherGraphData.value, weatherDataType.value);
  }
);
//recreate chart if color theme changes
watch(
  () => props.theme,
  (newTheme) => {
    Chart.defaults.color = newTheme == 'Light' ? '#000' : '#fff';
    myChart.destroy();
    getDayWeatherDataArr(time.value, weatherDataType.value);
    getWeatherLabelArr(time.value);
    createGraph(weatherGraphData.value, weatherDataType.value);
  }
);
//recreate chart if data changes
watch(
  () => props.weatherData,
  () => {
    myChart.destroy();
    getDayWeatherDataArr(time.value, weatherDataType.value);
    getWeatherLabelArr(time.value);
    createGraph(weatherGraphData.value, weatherDataType.value);
  }
);
//create chart on component load
onMounted(() => {
  getDayWeatherDataArr(time.value, weatherDataType.value);
  getWeatherLabelArr(time.value);
  //console.log('temps:', weatherTemps);
  createGraph(weatherGraphData.value, weatherDataType.value);
});
</script>