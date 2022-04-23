const express = require("express")
const app = express()
const cors = require("cors")
const db = require("diskdb")

app.use(express.json());
app.use(cors({ origin: '*' }));
db.connect("./data", ['caches']);

app.get('/getCaches', function (req, res) {
    const { lat, lng, radius } = req.query;
    console.log("Searching caches in %d, %d...", parseFloat(lat), parseFloat(lng));
    res.json(db.caches.find());
});

app.get('/getCaches/:id', function (req, res) {
    const cacheId = req.params.id;
    const caches = db.caches.find({ id: cacheId });
    if (caches.length) {
        res.json(caches);
    } else {
        res.json({ message: `item ${cacheId} doesn't exist` });
    }
});

app.post('/newCache', function (req, res) {
    const { label, latitude, longitude } = req.body;
    var cache = { label: label, latitude: latitude, longitude: longitude };
    db.caches.save(cache);
    console.log(db.caches.find());
    res.end("200");
})

var server = app.listen(8081, function () {
    console.log("Listening on 8081...");
})
