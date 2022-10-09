import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const forumApp = createApp(App)

const requireComponent = require.context(
    './components',
    false,
    /App[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {

    const componentConfig = requireComponent(fileName)

    const componentName = upperFirst(
        camelCase(
            // Gets the file name regardless of folder depth
            fileName
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
        )
    )


    // Register component globally
    forumApp.component(
        componentName,
        componentConfig.default || componentConfig
    )
})

forumApp.use(store).use(router).mount('#app')
