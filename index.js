const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();

const port = 8000;

app.use(expressLayouts);
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.listen(port, err => {
    if(err)
        console.log(`Error in running the server: ${err}`);
    else    
        console.log(`Server is running on port: ${port}`);
});