const messages = [
    "Ты уверена?",
    "Ты правда уверена??",
    "Точно точно?",
    "Солнце ну пожалуйста...",
    "Только подумайте об этом!",
    "Если ты скажешь «нет», мне будет очень грустно...",
    "Мне будет очень грустно...",
    "Мне будет очень-очень-очень грустно...",
    "Ладно, ладно, я больше не буду спрашивать...",
    "Шучу, скажи «да», пожалуйста! ❤️"
];

let messageIndex = 0;

async function getIP() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
}

async function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    // Получаем IP-адрес
    const ip = await getIP();

    // Отправка данных на Google Form
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdi9MZXBQMz13_24Bhc1LpQsJFJOrJ5RKBF3nHsqnk2ORefRQ/formResponse"; // Замените на URL вашей формы
    const formData = new URLSearchParams();
    formData.append("entry.1841492064", "Нет"); // Замените на ID поля "Тип нажатия"
    formData.append("entry.1196947216", new Date().toLocaleString()); // Замените на ID поля "Время нажатия"
    formData.append("entry.1278901056", ip); // Замените на ID поля для IP-адреса

    fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors" // Добавьте этот параметр для обхода CORS
    });
}

async function handleYesClick() {
    // Получаем IP-адрес
    const ip = await getIP();

    // Отправка данных на Google Form
    const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSdi9MZXBQMz13_24Bhc1LpQsJFJOrJ5RKBF3nHsqnk2ORefRQ/formResponse"; // Замените на URL вашей формы
    const formData = new URLSearchParams();
    formData.append("entry.1841492064", "Да"); // Замените на ID поля "Тип нажатия"
    formData.append("entry.1196947216", new Date().toLocaleString()); // Замените на ID поля "Время нажатия"
    formData.append("entry.1278901056", ip); // Замените на ID поля для IP-адреса

    fetch(formURL, {
        method: "POST",
        body: formData,
        mode: "no-cors" // Добавьте этот параметр для обхода CORS
    }).then(() => {
        window.location.href = "yes_page.html";
    });
}