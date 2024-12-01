const express = require('express');
const cors = require('cors'); // Подключаем CORS
const fs = require('fs'); // Для чтения файла
const path = require('path');

const app = express();
const PORT = 3000;

// Включаем CORS для всех маршрутов
app.use(cors());

// Создаем API-роут для отправки JSON-данных
app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'name.json');

  // Читаем данные из файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка сервера');
    }

    // Отправляем данные клиенту
    res.json(JSON.parse(data));
  });
});
app.get('/ships', (req, res) => {
  const filePath = path.join(__dirname, 'ships.json');

  // Читаем данные из файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка сервера');
    }

    // Отправляем данные клиенту
    res.json(JSON.parse(data));
  });
});

app.get('/schedules', (req, res) => {
  const filePath = path.join(__dirname, 'schedules.json');

  // Читаем данные из файла
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).send('Ошибка сервера');
    }

    // Отправляем данные клиенту
    res.json(JSON.parse(data));
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
