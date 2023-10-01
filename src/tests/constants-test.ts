import { getDefaultNormalizer } from './utils-test';

const JEST_TIMEOUT = 60000;
const DEFAULT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
};

const HELLO_IN_ENGLISH = 'Hello World';
const HELLO_IN_SPANISH = 'Hola Mundo';
const HELLO_IN_FRENCH = 'Bonjour Monde';

//  Eliminates issues with spacing inside test DOM elements
//  Usually occurs with very long text
const NORMALIZER_OPTS = {
  exact: false,
  normalizer: getDefaultNormalizer({ trim: false, collapseWhitespace: false }),
};

//  google-translate-api char limit per request is 5000 chars
//  Below are used for testing no-limit implementation
const CHAR_LIMIT_TEXT_ENGLISH = ('Global warming is one of the most pressing environmental challenges of our time. It refers to the long-term increase in Earth\'s average surface temperature due to human activities, primarily the emission of greenhouse gases such as carbon dioxide (CO2), methane (CH4), and nitrous oxide (N2O) into the atmosphere. This phenomenon has far-reaching consequences for our planet, ecosystems, and the future of humanity. The Earth\'s climate system is complex and interconnected, with various natural factors influencing temperatures. However, the overwhelming scientific consensus is that human activities are the primary drivers of the recent and rapid warming of our planet. Since the late 19th century, the average global temperature has increased by approximately 1.2 degrees Celsius (2.2 degrees Fahrenheit), with significant variations in different regions. The main culprits behind global warming are the burning of fossil fuels for energy, deforestation, and industrial processes. These activities release vast amounts of greenhouse gases into the atmosphere, trapping heat and causing the planet\'s temperature to rise. The consequences of this warming trend are wide-ranging and have profound implications for the environment, ecosystems, and society. One of the most immediate and visible impacts of global warming is the melting of polar ice caps and glaciers. As temperatures rise, these frozen expanses of ice are rapidly shrinking, leading to rising sea levels. Higher sea levels pose a significant threat to coastal communities, causing erosion, flooding, and the displacement of millions of people. Low-lying areas and island nations are particularly vulnerable to the encroaching sea. The warming of the oceans is another critical aspect of global warming. As seawater absorbs heat, it expands, contributing to sea-level rise. Additionally, warmer waters have severe consequences for marine life. Coral reefs, which are among the most diverse ecosystems on Earth, are suffering from coral bleaching events caused by elevated sea temperatures. These events disrupt the delicate balance of these ecosystems, leading to the decline of countless marine species. Extreme weather events are becoming more frequent and severe due to global warming. Hurricanes, droughts, heatwaves, and wildfires are all amplified by higher temperatures. The devastation caused by these events is felt across the globe, from the wildfires in Australia to the hurricanes in the Caribbean. Communities, particularly those in vulnerable regions, are struggling to adapt to these increasingly dangerous conditions. Global warming also has far-reaching consequences for agriculture and food security. Changes in temperature and precipitation patterns can disrupt crop growth and reduce yields. This, in turn, can lead to food shortages and price spikes, affecting the livelihoods of millions of people who depend on agriculture for their survival. The impact of global warming is not limited to the environment and natural disasters; it also has profound societal and economic consequences. Displacement due to rising sea levels and extreme weather events can lead to conflicts and refugee crises. Scarce resources such as water and arable land may become sources of tension and competition among nations. To mitigate the effects of global warming and prevent further escalation, urgent action is required. Governments, industries, and individuals must work together to reduce greenhouse gas emissions. This includes transitioning to renewable energy sources, improving energy efficiency, and implementing sustainable land-use practices. Furthermore, protecting and restoring forests, which act as carbon sinks, is essential. International cooperation is crucial in addressing global warming. The Paris Agreement, adopted in 2015, represents a significant step forward in the global effort to combat climate change. Under the agreement, countries committed to limiting global warming to well below 2 degrees Celsius above pre-industrial levels, with an aspirational goal of limiting it to 1.5 degrees Celsius. Achieving these targets requires substantial reductions in greenhouse gas emissions and the rapid transition to a low-carbon economy. Individuals also play a vital role in the fight against global warming. Simple actions such as reducing energy consumption, conserving water, and minimizing waste can collectively make a difference. Moreover, supporting policies and initiatives that promote sustainability and environmental protection is crucial. In conclusion, global warming is a critical issue that demands immediate attention and concerted action from individuals, governments, and industries worldwide. The consequences of inaction are severe and will affect not only the environment but also the well-being and future of humanity. By taking steps to reduce greenhouse gas emissions, protect natural ecosystems, and adapt to the changing climate, we can mitigate the worst effects of global warming and create a more sustainable and resilient future for generations to come.');
const CHAR_LIMIT_TEXT_FRENCH = ('Le réchauffement climatique est l’un des défis environnementaux les plus urgents de notre époque. Il fait référence à l\'augmentation à long terme de la température moyenne de la surface de la Terre due aux activités humaines, principalement à l\'émission de gaz à effet de serre tels que le dioxyde de carbone (CO2), le méthane (CH4) et l\'oxyde nitreux (N2O) dans l\'atmosphère. Ce phénomène a des conséquences considérables sur notre planète, nos écosystèmes et l’avenir de l’humanité. Le système climatique de la Terre est complexe et interconnecté, et divers facteurs naturels influencent les températures. Cependant, l’immense consensus scientifique est que les activités humaines sont les principales causes du réchauffement récent et rapide de notre planète. Depuis la fin du XIXe siècle, la température moyenne mondiale a augmenté d\'environ 1,2 degrés Celsius (2,2 degrés Fahrenheit), avec des variations significatives selon les régions. Les principaux responsables du réchauffement climatique sont la combustion de combustibles fossiles pour produire de l’énergie, la déforestation et les processus industriels. Ces activités libèrent de grandes quantités de gaz à effet de serre dans l’atmosphère, emprisonnant la chaleur et provoquant une augmentation de la température de la planète. Les conséquences de cette tendance au réchauffement sont vastes et ont de profondes implications sur l’environnement, les écosystèmes et la société. L’un des impacts les plus immédiats et les plus visibles du réchauffement climatique est la fonte des calottes polaires et des glaciers. À mesure que les températures augmentent, ces étendues de glace gelées rétrécissent rapidement, entraînant une élévation du niveau de la mer. La hausse du niveau de la mer constitue une menace importante pour les communautés côtières, provoquant l\'érosion, les inondations et le déplacement de millions de personnes. Les zones de basse altitude et les nations insulaires sont particulièrement vulnérables à l’invasion de la mer. Le réchauffement des océans est un autre aspect critique du réchauffement climatique. À mesure que l’eau de mer absorbe la chaleur, elle se dilate, contribuant ainsi à l’élévation du niveau de la mer. De plus, les eaux plus chaudes ont de graves conséquences sur la vie marine. Les récifs coralliens, qui comptent parmi les écosystèmes les plus diversifiés de la planète, souffrent du blanchissement des coraux provoqué par la température élevée de la mer. Ces événements perturbent l’équilibre délicat de ces écosystèmes, entraînant le déclin d’innombrables espèces marines. Les phénomènes météorologiques extrêmes deviennent de plus en plus fréquents et graves en raison du réchauffement climatique. Les ouragans, les sécheresses, les vagues de chaleur et les incendies de forêt sont tous amplifiés par des températures plus élevées. Les ravages causés par ces événements se font sentir partout dans le monde, depuis les incendies de forêt en Australie jusqu’aux ouragans dans les Caraïbes. Les communautés, en particulier celles des régions vulnérables, ont du mal à s’adapter à ces conditions de plus en plus dangereuses. Le réchauffement climatique a également des conséquences considérables sur l’agriculture et la sécurité alimentaire. Les changements de température et de précipitations peuvent perturber la croissance des cultures et réduire les rendements. Ceci, à son tour, peut entraîner des pénuries alimentaires et des hausses de prix, affectant les moyens de subsistance de millions de personnes dont la survie dépend de l’agriculture. L’impact du réchauffement climatique ne se limite pas à l’environnement et aux catastrophes naturelles ; cela a également de profondes conséquences sociétales et économiques. Les déplacements dus à l’élévation du niveau de la mer et aux événements météorologiques extrêmes peuvent conduire à des conflits et à des crises de réfugiés. Des ressources rares telles que l’eau et les terres arables peuvent devenir des sources de tensions et de compétition entre les nations. Pour atténuer les effets du réchauffement climatique et empêcher une nouvelle escalade, une action urgente est nécessaire. Les gouvernements, les industries et les individus doivent travailler ensemble pour réduire les émissions de gaz à effet de serre. Cela comprend la transition vers des sources d’énergie renouvelables, l’amélioration de l’efficacité énergétique et la mise en œuvre de pratiques d’utilisation durable des terres. Par ailleurs, la protection et la restauration des forêts, qui agissent comme des puits de carbone, sont essentielles. La coopération internationale est cruciale pour lutter contre le réchauffement climatique. L’Accord de Paris, adopté en 2015, représente une avancée significative dans l’effort mondial de lutte contre le changement climatique. Dans le cadre de cet accord, les pays se sont engagés à limiter le réchauffement climatique bien en dessous de 2 degrés Celsius par rapport aux niveaux préindustriels, avec pour objectif ambitieux de le limiter à 1,5 degré Celsius. Atteindre ces objectifs nécessite des réductions substantielles des émissions de gaz à effet de serre et une transition rapide vers une économie à faibles émissions de carbone. Les individus jouent également un rôle essentiel dans la lutte contre le réchauffement climatique. Des actions simples telles que réduire la consommation d’énergie, conserver l’eau et minimiser les déchets peuvent collectivement faire la différence. De plus, il est crucial de soutenir les politiques et les initiatives qui promeuvent la durabilité et la protection de l’environnement. En conclusion, le réchauffement climatique est un problème crucial qui exige une attention immédiate et une action concertée de la part des individus, des gouvernements et des industries du monde entier. Les conséquences de l’inaction sont graves et affecteront non seulement l’environnement mais aussi le bien-être et l’avenir de l’humanité. En prenant des mesures pour réduire les émissions de gaz à effet de serre, protéger les écosystèmes naturels et nous adapter au changement climatique, nous pouvons atténuer les pires effets du réchauffement climatique et créer un avenir plus durable et plus résilient pour les générations à venir.');
const CHAR_LIMIT_REPTD_ENGLISH = ('Be kind to everyone, regardless of their race, religion, gender, or sexual orientation. Help those in need, whether it\'s by volunteering our time, donating to charity, or simply lending a helping hand. Protect our planet by reducing our consumption of resources, recycling, and using renewable energy sources. Educate ourselves about the world around us and the challenges that we face.  Get involved in our communities and make our voices heard. Vote for candidates who share our values and who will work to make the world a better place. ').repeat(10).trim();
const CHAR_LIMIT_REPTD_FRENCH = ('Soyez gentil avec tout le monde, quels que soient leur race, leur religion, leur sexe ou leur orientation sexuelle. Aidez ceux qui en ont besoin, que ce soit en donnant de notre temps, en faisant un don à une œuvre caritative ou simplement en donnant un coup de main. Protégez notre planète en réduisant notre consommation de ressources, en recyclant et en utilisant des sources d\'énergie renouvelables. Instruisons-nous sur le monde qui nous entoure et les défis auxquels nous sommes confrontés. Impliquez-vous dans nos communautés et faites entendre nos voix. Votez pour des candidats qui partagent nos valeurs et qui travailleront à rendre le monde meilleur. ').repeat(10).trim();

export {
  JEST_TIMEOUT,
  DEFAULT_QUERY_OPTIONS,
  HELLO_IN_ENGLISH,
  HELLO_IN_FRENCH,
  HELLO_IN_SPANISH,
  NORMALIZER_OPTS,
  CHAR_LIMIT_TEXT_ENGLISH,
  CHAR_LIMIT_TEXT_FRENCH,
  CHAR_LIMIT_REPTD_ENGLISH,
  CHAR_LIMIT_REPTD_FRENCH,
};
