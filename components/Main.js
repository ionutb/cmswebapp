import styles from '../styles/Main.module.css'
import Nav from "./Nav";


//main area that cotains the content and nav element
const Main = ({ content, structure }) => {

  return (
      <>
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
