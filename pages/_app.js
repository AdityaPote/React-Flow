import '../styles/globals.css'
import {ReactFlowProvider} from 'reactflow';
function MyApp({ Component, pageProps }) {
  return<ReactFlowProvider> <Component {...pageProps} /></ReactFlowProvider>
}

export default MyApp
