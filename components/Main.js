import styles from '../styles/Main.module.css'
import Nav from "./Nav";

const Main = ({ content, structure }) => {

  return (
      <>
        {/*<div className={styles.nav}>*/}
        {/*  <Nav/>*/}
        {/*</div>*/}
        <div>
          <Nav structure={structure}/>
        </div>
        <div className={styles.main}>
          <h1>{content?.title}</h1>
          <p>{content?.content}</p>
        </div>
      </>
  )
}

export default Main
