const routes = [
	{ path: '/', meta : { title : '首页Page' } }
	,{ path: '/search', meta : { title : '搜索Page' } }
	,{ path: '/product', meta : { title : '产品Page' } }
	,{ path: '*', meta : { title : '找不到Page' } }
]

module.exports = routes