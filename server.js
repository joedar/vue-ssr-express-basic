const express = require('express')
const path = require('path')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')

// 服务端口
const port = process.env.PORT || 8000

// 引入模版
const tempPath = path.join(__dirname, 'template.html')
const template = require('fs').readFileSync(tempPath,'utf-8')
// 引入客户端-Manifest
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
// 引入服务端-Bundle
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
// 引入静态目录
const staticPath = path.resolve(__dirname, 'dist')

// 服务使用静态目录
server.use('/static', express.static(staticPath))
server.use('/favicon.ico', express.static(`${staticPath}/favicon.ico`))

// 引入routes配置
const routes = require('./src/routes')

server.get('*', (req, res) => {

  //-------------------------------------
  // 根据 req.url 正确匹配 routes 的标题
  // 以保证刷新页面渲染正确的router标题
  //-------------------------------------
  const title = (function(){
    let str = 'hello page'
    for(let i=0; i<routes.length; i++){
      if (req.url === routes[i].path) str = routes[i].meta.title
    }
    return str
  }())

  const context = {
    url : req.url
    ,title : title
  }

  const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  })

  renderer.renderToString(context, (error, html) => {

    if (error) {
      console.error('Controller.render', { error })
    }

    res.send(html)
  })
})

server.listen(port, () => {
    console.log(`Example app listening on ${port}!`)
})
