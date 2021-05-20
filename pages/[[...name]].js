import {getPageContent, getSiteStructure} from "../lib/services/service";
import Main from "../components/Main";


function Content(props) {


  //check if there is content yet
  var content;
  if (props.content) {
    content = props.content[0];
  }

  return (
    <>
      <Main content={content} structure={props.structure}/>
    </>
  )
}

export default Content

//get site structure (for navigation) and page content at build time
export async function getStaticProps(context) {
  const content = await getPageContent(context.params.name, context.locale);
  const structure = await getSiteStructure(context.locale);
  return {
    props: {content, structure}
  };
}


//no static path for now, but this would be a good idea for caching all db pages
export async function getStaticPaths() {
  return {
    paths: [

    ],
    fallback: true
  };
}
