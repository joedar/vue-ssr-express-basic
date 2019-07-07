const Home = () => import('./Home.vue')
const Search = () => import('./Search.vue')
const Product = () => import('./Product.vue')
const NotFound = () => import('./NotFound.vue')

const routes = [
	{ path: '/', component: Home, meta : { title : '首页Page' } }
	,{ path: '/search', component: Search, meta : { title : '搜索Page' } }
	,{ path: '/product', component: Product, meta : { title : '产品Page' } }
	,{ path: '*', component: NotFound, meta : { title : '找不到Page' } }
]

module.exports = routes