const express = require('express');
const app = express();
const port = 3000;

//middleware to parse JSON
app.use(express.json());

//port setup
app.listen(port, () => {
    console.log(`server running on ${port}`)
})

let items = []; // a database 

//routes

//POST
app.post('/items', (req, res) => {
    const item = {
        id: items.length + 1,
        name: req.body.name,
        height: req.body.height, 
        width: req.body.width,
        price: req.body.price
    };
    items.push(item);
    res.status(201).json(item);
});

//GET all items
app.get('/items', (req, res) => {
    res.json(items);
});

//GET a single item
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).json({ error: 'item not found' });
    
    res.json(item);
});

//UPDATE an item
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item) return res.status(404).json({ error: 'item not found' });

    item.name = req.body.name;
    item.width = req.body.width,
    item.height = req.body.height,
    item.price = req.body.price
    res.json(item); // Return the updated item
});

//DELETE an item
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).json({ error: 'item not found' });

    items.splice(itemIndex, 1);
    res.status(204).send();
});