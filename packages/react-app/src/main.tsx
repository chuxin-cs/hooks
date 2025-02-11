import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

let app = null;
function render() {
  app = createRoot(document.getElementById('root')!);
  app.render(
    <App />
  )
}

// 如果当前不是 qiankun 环境的话 直接启动
if(!window.__POWERED_BY_QIANKUN__){
  render
}


export async function bootstrap(){
  console.log("react app bootstraped!!!")
}

export async function mount(props) {
  console.log(props)
  console.log("react app mount");
  render();
}

// 销毁
export async function unmount() {
  app.unmount() 
}