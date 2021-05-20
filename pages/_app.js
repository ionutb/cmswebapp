import Layout from '../components/Layout'
import '../styles/globals.css'

import {sql_query} from "../lib/db";


import {appWithTranslation} from "next-i18next";


function MyApp({ Component, pageProps}) {

  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}

//export default appWithTranslation(MyApp)
export default MyApp

