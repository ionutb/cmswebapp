import {sql_query} from "../db";




export async function getPageContent(name, locale) {
  console.log('get page content '+name+' '+locale);

  if (typeof name === 'undefined') {
    console.log("warning falling back to home page")
    result = await getMainPageContent(locale);
    return prepareResult(result);
  }

  try {
    var result = await sql_query(`
          SELECT * FROM cms WHERE url = ? AND lang = ?
      `, [name, locale]);
    result = prepareResult(result);
    return result;
    console.log(result);
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getSiteStructure(locale) {
  console.log('get site structure  '+locale);
  try {
    const result = await sql_query(`
          SELECT id, url, title, is_main FROM cms WHERE lang = ?
      `, [locale]);

    return prepareResult(result)
  } catch (e) {
    console.log(e);
    return false;
  }
}


async function getMainPageContent(locale) {
  try {
    const result = await sql_query(`
          SELECT * FROM cms WHERE is_main=1 AND lang = ?
      `, [locale]);
    return prepareResult(result)
  } catch (e) {
    console.log(e);
    return false;
  }

}

function prepareResult(result) {
  return JSON.parse(JSON.stringify(result));
}
