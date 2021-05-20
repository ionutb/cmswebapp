import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'

const Header = ({ children }) => {

  const router = useRouter();

  function changeLanguage(lang) {
      router.push(router.asPath, null, {locale: lang});
  }
  return (
      <div className={styles.header}>
        <select onChange={(e) => changeLanguage(e.target.value)} className={styles.langSwitcher}>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ro">Romanian</option>
        </select>

      </div>
  )
}

export default Header
