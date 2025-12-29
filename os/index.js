require('dotenv').config();
const os = require('os');
function showSystemInfo() {
    console.log("Платформа:", os.platform());
    console.log("Свободная память (байт):", os.freemem());
    console.log("Главная директория:", os.homedir());
    console.log("Имя хоста:", os.hostname());
    console.log("Сетевые интерфейсы:", os.networkInterfaces());
}
function checkMemory() {
    const freeGB = os.freemem() / (1024 ** 3);
    if (freeGB > 4) {
        console.log("Свободной памяти больше 4GB:", freeGB.toFixed(2), "GB");
    } else {
        console.log("Недостаточно свободной памяти:", freeGB.toFixed(2), "GB");
    }
}
function accessControlledInfo() {
    if (process.env.MODE === "admin") {
        console.log("Режим доступа: admin — доступ разрешён");
        showSystemInfo();
    } else {
        console.log("Режим доступа:", process.env.MODE, "— доступ запрещён");
    }
}
showSystemInfo();
accessControlledInfo();
checkMemory();
