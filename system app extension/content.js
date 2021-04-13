console.log("I am in chrome extension");

const cpuArchitect = document.getElementById('cpu-architect');
const ModelName = document.getElementById('model');
const processore = document.getElementById('NoOfProcessore');


const Totalram = document.getElementById('total ram');
const UsedRam = document.getElementById('Used ram');
const FreeRam = document.getElementById('free ram');


const selectTimer = document.getElementById('select-timer');

const toGiB = (val) => Math.round((val / (1024 * 1024 * 1024)) * 1e3) / 1e3;

let globalTimeInterval;

const getSystemInfo = (request) => {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(request, (response) => {
        resolve(response);
      });
    });
  };
  
  const setResponse = (request) => {
    const { cpuInfo, memoryInfo } = request;
    cpuArchitect.innerText = cpuInfo.archName;
    ModelName.innerText = cpuInfo.modelName;
    processore.innerText = cpuInfo.numOfProcessors;
  
    const { availableCapacity, capacity } = memoryInfo;
    Totalram.innerText = toGiB(capacity);
    UsedRam.innerText = toGiB(capacity - availableCapacity);
    FreeRam.innerText = toGiB(availableCapacity);
  };

  const init = async () => {
    const request = {
      message: ['GET_CPU_INFO', 'GET_MEMORY_INFO'],
    };
    const systemInfo = await getSystemInfo(request);
    setResponse(systemInfo);
  };
  
  document.addEventListener(
    'DOMContentLoaded',
    async () => {
      await init();
      globalTimeInterval = setInterval(async () => {
        await init();
      }, 1000);
    },
    false
  );
 
selectTimer.addEventListener('change', () => {
    let timerVal = selectTimer.value;
    clearInterval(globalTimeInterval);
    globalTimeInterval = setInterval(async () => {
      await init();
    }, parseInt(timerVal) * 1000);
  });
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});