const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST' && req.url === '/report/') {
        const data = req.body;
        if (data.name === 'ERROR ERROR') {
            res.status(400).jsonp({status: '400', message: 'Error!!! Bad name'});
        } else {
            res.jsonp({status: 'success', message: 'Успешно отправлено'});
        }
    } else {
        res.jsonp({status: 'error', message: 'Unknown request'});
    }
    next()
})

server.use(router)
server.listen(3001, () => {
    console.log('JSON Server is running ')
})