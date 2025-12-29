const bcrypt = require('bcrypt');

const passwords = Array.from({ length: 13 }, (_, i) => `password${i + 1}`);

async function encryptAll() {
    const times = [];

    for (const pwd of passwords) {
        const start = Date.now();
        const hash = await bcrypt.hash(pwd, 10);
        const end = Date.now();
        const duration = end - start;
        times.push({ pwd, duration });
        console.log(`Пароль "${pwd}" зашифрован за ${duration} мс`);
    }

    const total = times.reduce((sum, t) => sum + t.duration, 0);
    const avg = total / times.length;

    console.log("\n📌 Вывод:");
    console.log(`Среднее время шифрования: ${avg.toFixed(2)} мс`);
    console.log("Разброс времени зависит от случайных вычислений соли и нагрузки на процессор.");
}

encryptAll();