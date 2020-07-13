var express = require('express');
var app = express();

app.use(express.static('./dist/my-app'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/my-app/' }
    );
});

const port = process.env.PORT || 8080
app.listen(port, function () {
    console.log("Pubmed-map-Angular is running on port " + port)
});