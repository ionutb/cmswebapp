import styles from '../styles/Layout.module.css'
import Header from "./Header";
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'


//main layout component
const Layout = ({ children }) => {


  const router = useRouter();
  const { t } = useTranslation('common');
  const lang = router.locale;


  return (
      <>
        <div className={styles.container}>

            <div className={styles.header}>
              <Header/>
              Lang is {lang} <br/>
            </div>
              {/*page content*/}
              {children}
        </div>
      </>
  )
}
export default Layout
