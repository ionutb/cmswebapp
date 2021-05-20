import {getPageContent, getSiteStructure} from "../lib/services/service";
import Main from "../components/Main";

import { useRouter } from 'next/router'
import Nav from "../components/Nav";


function Content(props) {
  debugger;
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


export async function getStaticProps(context) {
  const content = await getPageContent(context.params.name, context.locale);
  const structure = await getSiteStructure(context.locale);
  return {
    props: {content, structure}
  };
}

export async function getStaticPaths() {
  return {
    paths: [

    ],
    fallback: true
  };
}
