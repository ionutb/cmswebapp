import styles from '../styles/Nav.module.css'
import Link from 'next/link';

import { useRouter } from 'next/router'


export default function Nav ({structure}) {
  const router = useRouter();

  if (!structure) {
    return <div/>;
  }
  return (
      <>
          <nav className={styles.nav}>
            {structure.map((item) => (
                <Link key={item.id} locale={router.locale} href={item.url}>
                  <a className={item.is_main === 0 ? styles.subpage: ''}>{item.title}</a>
                </Link>
            ))}
          </nav>
      </>
  )
}

