const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let items = [
    {
        id: 1,
        title: "Дрель-шуруповерт Makita",
        category: "tools",
        pricePerDay: 500,
        bookedDates: ["2026-09-10", "2026-09-11"] 
    },
    {
        id: 2,
        title: "Вечернее платье Черное",
        category: "apparel",
        pricePerDay: 1500,
        bookedDates: []
    }
];




app.get('/items', (req, res) => {
    res.json(items);
});


app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    

    if (!item) {
        return res.status(404).json({ error: `Вещь с ID ${itemId} не найдена` });
    }
    
    res.json(item);
});

app.post('/items', (req, res) => {
    const { title, category, pricePerDay } = req.body;


    if (!title || !category || !pricePerDay || typeof pricePerDay !== 'number') {
        return res.status(400).json({ error: "Неверные данные запроса. Поля title, category и числовое pricePerDay обязательны." });
    }

    const newItem = {
        id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1,
        title,
        category,
        pricePerDay,
        bookedDates: req.body.bookedDates || [] 
    };

    items.push(newItem);
    res.status(201).json(newItem);
});


app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ error: `Вещь с ID ${itemId} не найдена` });
    }

    const { title, category, pricePerDay, bookedDates } = req.body;


    if (!title || !category || !pricePerDay || !Array.isArray(bookedDates)) {
        return res.status(400).json({ error: "Неверные или неполные данные для обновления." });
    }

    items[itemIndex] = {
        id: itemId,
        title,
        category,
        pricePerDay,
        bookedDates
    };

    res.json(items[itemIndex]);
});


app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ error: `Вещь с ID ${itemId} не найдена` });
    }

    items.splice(itemIndex, 1);
    res.status(200).json({ message: `Вещь с ID ${itemId} успешно удалена` });
});



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Что-то пошло не так на сервере!" });
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

