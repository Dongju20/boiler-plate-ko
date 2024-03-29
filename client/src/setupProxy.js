const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            //노드 서버 5000번
            target: 'http://localhost:5000',
            changeOrigin:true,
        })
    )
}