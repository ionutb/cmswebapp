import styles from '../styles/Layout.module.css'
import Header from "./Header";
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

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
              {children}
            {/*<div className={styles.nav}>*/}
            {/*  <Nav/>*/}
            {/*</div>*/}
            {/*<div className={styles.main}>*/}
            {/*  */}
            {/*</div>*/}
        </div>
      </>
  )
}

//
// export const getStaticProps = async ({ locale }) => ({
//   props: {
//     ...await serverSideTranslations(locale, ['common']),
//   },
// })
export default Layout
