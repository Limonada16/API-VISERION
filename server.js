const express = require('express');
const app = express();

app.set('port', process.env.PORT || 8000);

//middlewares
app.use(express.json());

//Routes Admin
app.use(require('./models/admin.routes'));
//Routes Client
app.use(require('./models/cliente.routes'));
//Routes Category
app.use(require('./models/categoria.routes'));
//Routes Product
app.use(require('./models/producto.routes'));

//Starting teh server
app.listen(app.get('port'), ()=>{ 
    console.log('Server on on port ', app.get('port'));
})