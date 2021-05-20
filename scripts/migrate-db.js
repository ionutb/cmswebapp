const path = require('path')
const envPath = path.resolve(process.cwd(), '.env.local')

console.log({ envPath })

require('dotenv').config({ path: envPath })

const mysql = require('serverless-mysql')

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
})

async function query(q) {
  try {
    const results = await db.query(q)
    await db.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}

// Create "entries" table if doesn't exist
async function migrate() {
  try {
    await query(`
    
CREATE TABLE IF NOT EXISTS \`cms\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`lang\` enum('en','fr','ro','') NOT NULL,
  \`url\` varchar(255) NOT NULL,
  \`title\` text NOT NULL,
  \`content\` text NOT NULL,
  \`is_main\` tinyint(1) NOT NULL,
  \`created_at\` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (\`id\`)
);`);


    await query(`
    

INSERT INTO \`cms\` (\`id\`, \`lang\`, \`url\`, \`title\`, \`content\`, \`is_main\`, \`created_at\`) VALUES
(1, 'en', 'lunar-eclipse', 'Lunar Eclipse', 'This will be 2021\\'s only total lunar eclipse. The phenomenon occurs when the moon and sun are on opposite sides of the Earth, and the moon enters Earth\\'s shadow. During that time, the moon doesn\\'t get any direct sunlight, though it\\'s still exposed to light filtered through Earth\\'s atmosphere. When that light hits the moon\\'s surface, it\\'s reflected back with a red glow because air molecules in the atmosphere tend to scatter blue light.', 1, '2021-05-19 13:24:24'),
(2, 'fr', 'eclipse-lunaire', 'Éclipse lunaire', 'Ce sera la seule éclipse lunaire totale de 2021. Le phénomène se produit lorsque la lune et le soleil sont sur des côtés opposés de la Terre et que la lune pénètre dans l\\'ombre de la Terre. Pendant ce temps, la lune ne reçoit pas de lumière directe du soleil, bien qu\\'elle soit toujours exposée à la lumière filtrée à travers l\\'atmosphère terrestre. Lorsque cette lumière atteint la surface de la lune, elle est réfléchie avec une lueur rouge parce que les molécules d\\'air dans l\\'atmosphère ont tendance à diffuser la lumière bleue.', 1, '2021-05-19 13:24:24'),
(3, 'ro', 'eclipsa-de-lună', 'Eclipsa de lună', 'Aceasta va fi singura eclipsă lunară totală din 2021. Fenomenul apare atunci când luna și soarele se află pe laturile opuse ale Pământului, iar luna intră în umbra Pământului. În acest timp, luna nu primește nicio lumină directă a soarelui, deși este încă expusă la lumina filtrată prin atmosfera Pământului. Când acea lumină lovește suprafața lunii, aceasta se reflectă înapoi cu o strălucire roșie, deoarece moleculele de aer din atmosferă tind să împrăștie lumina albastră.', 1, '2021-05-19 13:24:24'),
(4, 'en', 'venus-views', 'Venus views', 'NASA\\'s Parker Solar Probe launched in August 2018 on a seven-year mission to touch the sun, dancing through our star\\'s corona, the sun\\'s superhot atmosphere that is invisible but shapes conditions across the solar system. That mission requires a trajectory creeping closer to the sun\\'s visible surface with each flyby, achieved by a series of seven swings past Venus. So, before Parker Solar Probe launched, atmospheric scientists made a case for why the spacecraft\\'s scientific instruments should be turned on during Venus flybys. Now, after just four of those Venusian maneuvers, the project\\'s success may point to a new way of studying Venus.', 0, '2021-05-19 13:24:24'),
(5, 'fr', 'vue-de-vénus', 'Vues de Vénus', 'La sonde solaire Parker de la NASA a été lancée en août 2018 pour une mission de sept ans visant à toucher le soleil, dansant à travers la couronne de notre étoile, l\\'atmosphère super chaude du soleil qui est invisible mais façonne les conditions à travers le système solaire. Cette mission nécessite une trajectoire se rapprochant du soleil. surface visible à chaque survol, réalisée par une série de sept balançoires devant Vénus. Ainsi, avant le lancement de Parker Solar Probe, les scientifiques de l\\'atmosphère ont expliqué pourquoi les instruments scientifiques du vaisseau spatial devraient être allumés pendant les survols de Vénus. Maintenant, après seulement quatre de ces manœuvres vénusiennes, le succès du projet peut indiquer une nouvelle façon d\\'étudier Vénus.', 0, '2021-05-19 13:24:24'),
(6, 'fr', 'rover-zhurong', 'Rover Zhurong', 'L\\'agence spatiale chinoise a publié les premières photos prises par le rover Zhurong sur Mars, montrant des parties de son atterrisseur et la planète rouge elle-même. La mission Tianwen-1 est arrivée à destination le 15 mai, faisant de la Chine le deuxième pays à réussir un atterrissage en douceur sur Mars après les États-Unis. L\\'une des photos est une image colorée (ci-dessus) prise par la caméra de navigation montée à l\\'arrière du rover. Il comprend les panneaux solaires et les antennes dépliées de Zhurong, ainsi qu\\'une vue sur le sol rouge et les roches de la planète.', 0, '2021-05-19 13:24:24'),
(7, 'en', 'zhurong-rover', 'Zhurong rover', 'China\\'s space agency has released the first photos taken by the Zhurong rover on Mars, showing parts of its lander and the red planet itself. The Tianwen-1 mission arrived at its destination on May 15th, making China the second nation to successfully soft-land on Mars after the US. One of the photos is a colored image (above) taken by the navigation camera mounted at the rear of the rover. It features Zhurong\\'s solar panels and unfolded antennae, along with a view of the planet\\'s red soil and rocks.', 0, '2021-05-19 13:24:24'),
(8, 'ro', 'vederile-lui-venus', 'Vederi de pe Venus', 'Sonda solară Parker a NASA a fost lansată în august 2018 într-o misiune de șapte ani de atingere a soarelui, dansând prin coroana stelei noastre, atmosfera superhotică a soarelui care este invizibilă, dar modelează condițiile din sistemul solar. Această misiune necesită o traiectorie care se strecoară mai aproape de soare. suprafață vizibilă cu fiecare flyby, realizată de o serie de șapte leagăne pe lângă Venus. Așadar, înainte de lansarea sondei solare Parker, oamenii de știință din atmosferă au argumentat motivul pentru care instrumentele științifice ale navei spațiale ar trebui să fie activate în timpul zborurilor de la Venus. Acum, după doar patru dintre acele manevre venusiene, succesul proiectului ar putea indica un nou mod de a studia Venus.', 0, '2021-05-19 13:24:24'),
(9, 'ro', 'roverul-zhurong', 'Rover-ul Zhurong', 'Agenția spațială a Chinei a lansat primele fotografii făcute de rover-ul Zhurong pe Marte, prezentând părți ale landerului său și planeta roșie în sine. Misiunea Tianwen-1 a ajuns la destinație pe 15 mai, făcând din China a doua națiune care a reușit să aterizeze cu succes pe Marte după SUA. Una dintre fotografii este o imagine colorată (deasupra) făcută de camera de navigație montată în spatele rover-ului. Prezintă panourile solare ale Zhurong și antenele desfăcute, împreună cu o vedere a solului roșu și a rocilor planetei.', 0, '2021-05-19 13:24:24');

    
    `)
    console.log('migration ran successfully')
  } catch (e) {
    console.error('could not run migration, double check your credentials.'+e)
    process.exit(1)
  }
}

migrate().then(() => process.exit())
