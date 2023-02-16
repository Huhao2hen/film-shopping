import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/style/normalize.css'
import '@/assets/style/global.css'
import '@/assets/icon/iconfont.css'
import * as ElIcons from '@element-plus/icons'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)
for (const name in ElIcons) {
	app.component(name, (ElIcons)[name])
}
app
	.use(router)
	.use(store)
	.use(ElementPlus, { locale: zhCn })
	.mount('#app')
