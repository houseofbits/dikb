export interface LocalizedText {
  en: string
  lv: string
}

export interface Project {
  slug: string
  client: LocalizedText
  title: LocalizedText
  category: LocalizedText
  summary: LocalizedText
  year: string
  location: string
  /** Case-study framing — used together, for client/commissioned work. */
  challenge?: LocalizedText
  solution?: LocalizedText
  results?: LocalizedText
  /** Single-narrative framing — used instead of the above for self-initiated
   *  art/installation pieces that don't fit a client challenge/solution shape. */
  narrative?: LocalizedText
  tech: string[]
  accent: 'cyan' | 'violet' | 'mixed'
  featured: boolean
  /** How the case study is presented visually: a touchscreen UI mockup, or
   *  a framed-photo placeholder for physical installations/objects. */
  media: 'device' | 'installation'
  /** Path under /work/<slug>/ — see public/work/. */
  heroImage: string
  gallery: string[]
}

export const projects: Project[] = [
  {
    slug: 'birds-museum-kiosk',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: {
      en: 'The Birds of Latvia — an interactive museum kiosk',
      lv: 'Latvijas putni — interaktīvs muzeja stends',
    },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'A full-screen touchscreen kiosk letting visitors browse 206 Latvian bird species across 10 themed categories, with photos, trilingual text and real field-recorded calls.',
      lv: 'Pilnekrāna skārienekrāna stends, kas ļauj apmeklētājiem pārlūkot 206 Latvijas putnu sugas 10 tematiskās kategorijās — ar fotogrāfijām, trīsvalodu tekstu un reāliem dabā ierakstītiem putnu balsu ierakstiem.',
    },
    year: '2019',
    location: 'Riga, Latvia',
    challenge: {
      en: 'The museum’s physical "Birds of Latvia" display held far more species detail, photography and audio than could fit on the wall panels, and it needed to work for LV/RU/EN-speaking visitors of every age with no staff member standing by to explain it.',
      lv: 'Muzeja fiziskajā ekspozīcijā "Latvijas putni" bija daudz vairāk sugu informācijas, fotogrāfiju un skaņu ierakstu, nekā varēja ietilpt sienas stendos, un tai bija jāstrādā LV/RU/EN valodās runājošiem apmeklētājiem visos vecumos bez personāla klātbūtnes.',
    },
    solution: {
      en: 'We built a full-screen touchscreen companion piece: bird "medallions" floating over a habitat backdrop, grouped into 10 categories with pixel-accurate touch targets hand-authored around each bird’s silhouette. Tapping a bird opens a 3D carousel of species pages with real field-recorded calls, a trilingual flag toggle that switches every string including the audio labels themselves, and an idle "attract" animation that nudges visitors in.',
      lv: 'Izveidojām pilnekrāna skārienekrāna papildinājumu: putnu "medaljoni" peld pār dzīvotnes fonu, sagrupēti 10 kategorijās ar pikseļu precizitātē veidotiem pieskāriena laukumiem katra putna siluetam. Pieskaroties putnam, atveras 3D karuselis ar sugas lapām, reāliem dabā ierakstītiem sauciena ierakstiem, trīsvalodu karodziņu pārslēgu, kas maina ikvienu tekstu — arī audio pogu nosaukumus —, un dīkstāves brīžos aktivizējas "piesaistes" animācija, kas aicina apmeklētājus tuvāk.',
    },
    results: {
      en: 'A fully custom interaction model — carousel navigation, hand-authored hit-testing per bird, live audio-level feedback — running on a deliberately lean stack, shipped and running unattended on the museum floor.',
      lv: 'Pilnībā pielāgots mijiedarbības modelis — karuseļa navigācija, katram putnam individuāli veidota skāriena noteikšana, dzīva audio līmeņa atgriezeniskā saite — darbojas uz apzināti minimālistiska tehnoloģiju kopuma un tagad strādā muzeja zālē bez uzraudzības.',
    },
    tech: ['Vue 2', 'Velocity.js', 'Howler.js', 'Custom touch kiosk'],
    accent: 'cyan',
    featured: true,
    media: 'device',
    heroImage: '/work/birds-museum-kiosk/hero.jpg',
    gallery: [
      '/work/birds-museum-kiosk/gallery-1.jpg',
      '/work/birds-museum-kiosk/gallery-2.jpg',
      '/work/birds-museum-kiosk/gallery-3.jpg',
      '/work/birds-museum-kiosk/gallery-4.jpg',
    ],
  },
  {
    slug: 'sea-life-baltic-sea-exhibit',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: {
      en: 'Sea Life — the Baltic Sea exhibit kiosk',
      lv: 'Jūras dzīvība — Baltijas jūras ekspozīcijas stends',
    },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'The most technically mature of our museum kiosks — a six-section touchscreen exploring the Baltic Sea, built around a hand-built anatomy drag puzzle and a staff-editable content system.',
      lv: 'Tehniski nobriedušākais no mūsu muzeja stendiem — sešu sadaļu skārienekrāns par Baltijas jūru, kura pamatā ir pašu izstrādāta anatomijas velkamā puzle un muzeja darbiniekiem rediģējama satura sistēma.',
    },
    year: '2023',
    location: 'Riga, Latvia',
    challenge: {
      en: 'The museum’s "Baltic Sea" exhibit needed roughly 150 species profiles in four languages, plus a way for curatorial staff to update that content themselves without calling a developer every time something changed.',
      lv: 'Muzeja ekspozīcijai "Baltijas jūra" bija nepieciešami aptuveni 150 sugu apraksti četrās valodās, kā arī veids, kā kuratoriem pašiem atjaunināt saturu, katru reizi nezvanot izstrādātājam.',
    },
    solution: {
      en: 'We built a strongly-typed Vue 3 kiosk with six linked sections — a filterable species catalog with video, a drag-and-drop anatomy puzzle built on a physics/drag engine we wrote from scratch, plus paired animation and educational sequences — all driven by a shared JSON content layer. A lightweight in-browser CMS lets museum staff browse species by language and edit fields directly, saving straight back into that content layer.',
      lv: 'Izveidojām stingri tipizētu Vue 3 stendu ar sešām savstarpēji saistītām sadaļām — filtrējamu sugu katalogu ar video, velkamu anatomijas puzli, kuras pamatā ir pašu no nulles rakstīts fizikas/vilkšanas dzinējs, kā arī animācijas un izglītojošas sekvences — visu balstītu uz kopīgu JSON satura slāni. Vienkāršota pārlūkā integrēta satura pārvaldības sistēma ļauj muzeja darbiniekiem pārlūkot sugas pa valodām un rediģēt laukus tieši, saglabājot izmaiņas tieši satura slānī.',
    },
    results: {
      en: 'The museum now maintains its own species content without developer involvement, and the anatomy puzzle remains the exhibit’s standout interaction — a from-scratch drag-physics system, not a bolted-on library.',
      lv: 'Muzejs tagad pats uztur sugu saturu bez izstrādātāja iesaistes, un anatomijas puzle joprojām ir ekspozīcijas spilgtākā mijiedarbība — no nulles veidota vilkšanas fizikas sistēma, nevis pieslēgta gatava bibliotēka.',
    },
    tech: ['Vue 3', 'TypeScript', 'Hammer.js', 'Custom CMS'],
    accent: 'cyan',
    featured: true,
    media: 'device',
    heroImage: '/work/sea-life-baltic-sea-exhibit/hero.jpg',
    gallery: [
      '/work/sea-life-baltic-sea-exhibit/gallery-1.jpg',
      '/work/sea-life-baltic-sea-exhibit/gallery-2.jpg',
      '/work/sea-life-baltic-sea-exhibit/gallery-3.jpg',
      '/work/sea-life-baltic-sea-exhibit/gallery-4.jpg',
      '/work/sea-life-baltic-sea-exhibit/gallery-5.jpg',
    ],
  },
  {
    slug: 'selfie-booth',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: { en: 'Selfie Booth — a WebGL photo booth kiosk', lv: 'Selfiju stends — WebGL fotobūdas kiosks' },
    category: { en: 'Photo installation', lv: 'Fotoinstalācija' },
    summary: {
      en: 'A self-service photo booth kiosk that tracks a visitor’s face live and composites it into a themed 3D scene with custom shader effects, before they email or QR-download the result.',
      lv: 'Pašapkalpošanās fotobūdas stends, kas reāllaikā izseko apmeklētāja seju un iekļauj to tematiskā 3D ainā ar pašu veidotiem shader efektiem, pirms apmeklētājs rezultātu saņem pa e-pastu vai lejupielādē caur QR kodu.',
    },
    year: '2020',
    location: 'Riga, Latvia',
    challenge: {
      en: 'The museum wanted a shareable, playful photo moment on the exhibition floor — something more than a plain webcam snapshot — that visitors could take home without printing hardware or staff supervision.',
      lv: 'Muzejs vēlējās izklaidējošu, dalāmu foto mirkli izstādes zālē — kaut ko vairāk par parastu tīmekļa kameras uzņēmumu — ko apmeklētāji varētu paņemt līdzi bez drukas iekārtas vai personāla uzraudzības.',
    },
    solution: {
      en: 'A visitor stands in front of a camera; client-side face tracking locates their face in real time, and a set of hand-written GLSL shaders composite the live feed into a themed 3D scene, with six selectable looks from a soft blend to a stylised "big-head" distortion. The captured photo renders as a lit "polaroid" tile in a 3D gallery, and visitors collect it by email or by scanning a QR code that opens a download page with a countdown before the link expires.',
      lv: 'Apmeklētājs nostājas kameras priekšā; sejas izsekošana pārlūkā reāllaikā nosaka sejas atrašanās vietu, un pašu rakstīti GLSL shaderi iekļauj tiešraides attēlu tematiskā 3D ainā, piedāvājot sešus izvēlamus izskatus — no mīksta savienojuma līdz stilizētam "lielās galvas" izkropļojumam. Uzņemtā fotogrāfija tiek attēlota kā apgaismota "polaroid" flīze 3D galerijā, un apmeklētāji to saņem pa e-pastu vai noskenējot QR kodu, kas atver lejupielādes lapu ar atlikušo laiku, pēc kura saite zaudē derīgumu.',
    },
    results: {
      en: 'A working real-time computer-vision-driven booth running unattended on kiosk hardware, with its own admin panel for staff and a public sharing flow with automatic expiry — shipped as a complete, self-contained installation.',
      lv: 'Funkcionējoša, reāllaika datorredzes vadīta fotobūda, kas darbojas bez uzraudzības uz kioska aparatūras, ar savu administrēšanas paneli personālam un publisku koplietošanas plūsmu ar automātisku derīguma termiņu — nodota kā pilnīga, patstāvīga instalācija.',
    },
    tech: ['Vue 2', 'BabylonJS', 'face-api.js', 'Custom GLSL shaders'],
    accent: 'mixed',
    featured: false,
    media: 'device',
    heroImage: '/work/selfie-booth/hero.jpg',
    gallery: [
      '/work/selfie-booth/gallery-1.jpg',
      '/work/selfie-booth/gallery-2.jpg',
      '/work/selfie-booth/gallery-3.jpg',
      '/work/selfie-booth/gallery-4.jpg',
      '/work/selfie-booth/gallery-5.jpg',
    ],
  },
  {
    slug: 'geology-quiz',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: { en: 'Geology Quiz — a three-round rock & landscape game', lv: 'Ģeoloģijas viktorīna' },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'A three-round touchscreen game teaching visitors how rocks form and how to read the landscape around them, from matching rock types to naming real coastal and river landforms.',
      lv: 'Trīs kārtu skārienekrāna spēle, kas māca apmeklētājiem, kā veidojas iežu un kā "lasīt" apkārtējo ainavu — sākot no iežu tipu atpazīšanas līdz reālu piekrastes un upju reljefa formu nosaukšanai.',
    },
    year: '2021',
    location: 'Riga, Latvia',
    challenge: {
      en: 'Geological formation is abstract for most museum visitors, and the museum wanted a hands-on way to teach it that worked for a broad walk-up audience without a guide.',
      lv: 'Iežu veidošanās process lielākajai daļai apmeklētāju ir abstrakts jēdziens, un muzejs vēlējās praktisku veidu, kā to izskaidrot plašai, negidētai auditorijai.',
    },
    solution: {
      en: 'We designed three short rounds built around different ways of learning: matching a rock’s formation story to its name over a photo of scattered stones, identifying real coastal and river landforms hidden behind question marks, and a quickfire hint-driven term round with a progress trail across the bottom. Big, warm photography of real formations and simple check/cross iconography keep it readable at a glance for any age.',
      lv: 'Izstrādājām trīs īsas kārtas, kas balstītas uz dažādiem mācīšanās veidiem: ieža veidošanās stāsta savienošana ar tā nosaukumu pār izkaisītu akmeņu fotogrāfiju, reālu piekrastes un upju reljefa formu atpazīšana zem jautājuma zīmēm, un ātrā tempa kārta ar norādēm un progresa joslu ekrāna apakšā. Lielformāta, silta reālu iežu fotogrāfija un vienkārša ķeksīšu/krustiņu ikonogrāfija padara spēli uztveramu jebkurā vecumā.',
    },
    results: {
      en: 'A self-contained kiosk game that turns passive rock-and-landscape signage into something visitors actively play through, end to end, in a few minutes.',
      lv: 'Patstāvīgs kioska spēle, kas pasīvas iežu un ainavu norādes pārvērš par kaut ko, ko apmeklētāji dažu minūšu laikā aktīvi izspēlē no sākuma līdz beigām.',
    },
    tech: ['Touchscreen kiosk', 'Custom quiz engine'],
    accent: 'violet',
    featured: false,
    media: 'device',
    heroImage: '/work/geology-quiz/hero.jpg',
    gallery: [
      '/work/geology-quiz/gallery-1.jpg',
      '/work/geology-quiz/gallery-2.jpg',
      '/work/geology-quiz/gallery-3.jpg',
      '/work/geology-quiz/gallery-4.jpg',
    ],
  },
  {
    slug: 'solar-system',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: { en: 'Solar System Explorer', lv: 'Saules sistēmas izzinātājs' },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'A trilingual touchscreen app letting visitors fly along the planets’ orbits and tap into each one for a closer look, built for the museum’s astronomy corner.',
      lv: 'Trīsvalodu skārienekrāna lietotne, kas ļauj apmeklētājiem "aizlidot" gar planētu orbītām un pieskarties katrai no tām, lai apskatītu tuvāk — veidota muzeja astronomijas stūrītim.',
    },
    year: '2019',
    location: 'Riga, Latvia',
    challenge: {
      en: 'The museum wanted a simple, visually striking way for younger visitors especially to explore the solar system without reading dense wall text.',
      lv: 'Muzejs vēlējās vienkāršu, vizuāli iespaidīgu veidu, kā tieši jaunākajiem apmeklētājiem iepazīstināt ar Saules sistēmu bez garu sienas tekstu lasīšanas.',
    },
    solution: {
      en: 'We built a single-screen app that lays the sun and planets — including the asteroid belt — along their orbits, with a bottom shelf of tappable planet tiles and a language toggle covering Latvian, English and Russian.',
      lv: 'Izveidojām vienekrāna lietotni, kas izvieto Sauli un planētas — ieskaitot asteroīdu joslu — gar to orbītām, ar planētu flīzēm apakšējā joslā un valodas pārslēgu latviešu, angļu un krievu valodām.',
    },
    results: {
      en: 'A calm, self-explanatory touchscreen that reads clearly at a glance and needs no instructions to use.',
      lv: 'Mierīgs, pašsaprotams skārienekrāns, kas ir uztverams no pirmā acu uzmetiena un nepieprasa nekādu instrukciju lietošanai.',
    },
    tech: ['Touchscreen kiosk', '3D rendering'],
    accent: 'violet',
    featured: false,
    media: 'device',
    heroImage: '/work/solar-system/hero.jpg',
    gallery: [
      '/work/solar-system/gallery-1.jpg',
      '/work/solar-system/gallery-2.jpg',
      '/work/solar-system/gallery-3.jpg',
      '/work/solar-system/gallery-4.jpg',
    ],
  },
  {
    slug: 'volcano-3d',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: { en: 'Volcano3D — an explorable volcanic island', lv: 'Vulkāns3D — izzināma vulkāniskā sala' },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'A rotatable 3D volcanic island whose surface and underground cross-section double as an index into eight short lessons on how different minerals form.',
      lv: 'Griežama 3D vulkāniskā sala, kuras virsma un pazemes šķērsgriezums vienlaikus kalpo kā satura rādītājs astoņām īsām nodarbībām par to, kā veidojas dažādi minerāli.',
    },
    year: '2018',
    location: 'Riga, Latvia',
    challenge: {
      en: 'Mineral formation is a genuinely 3D, underground process that’s hard to convey through flat diagrams and specimen cases alone.',
      lv: 'Minerālu veidošanās ir patiesi trīsdimensiju, pazemes process, ko grūti izskaidrot, izmantojot tikai plakanas shēmas un eksponātu vitrīnas.',
    },
    solution: {
      en: 'We built a desktop 3D scene of a volcanic island with eight tappable hotspots, one per formation process (magmatic, hydrothermal, metamorphic and so on). Tapping one smoothly moves the camera to a close-up view and fades in an underground cross-section revealing the rock layers beneath, alongside an info panel with a draggable photo gallery of real mineral specimens.',
      lv: 'Izveidojām 3D vulkāniskās salas ainu ar astoņiem pieskaramiem punktiem — pa vienam katram veidošanās procesam (magmatiskajam, hidrotermālajam, metamorfajam un citiem). Pieskaroties punktam, kamera plūstoši pārvietojas tuvplānā un parādās pazemes šķērsgriezums ar iežu slāņiem, kā arī informācijas panelis ar velkamu reālu minerālu paraugu foto galeriju.',
    },
    results: {
      en: 'A polished, self-guided "explorable diagram" that turns eight abstract geological processes into a single walkable island, with its own idle-timeout reset for unattended kiosk use.',
      lv: 'Izstrādāta, pašnorādoša "izzināma shēma", kas astoņus abstraktus ģeoloģiskos procesus pārvērš vienā izstaigājamā salā, ar savu dīkstāves taimautu atiestatīšanu neuzraudzītai lietošanai kioskā.',
    },
    tech: ['libGDX', 'Java', 'Custom GLSL shaders'],
    accent: 'mixed',
    featured: false,
    media: 'device',
    heroImage: '/work/volcano-3d/hero.jpg',
    gallery: [
      '/work/volcano-3d/gallery-1.jpg',
      '/work/volcano-3d/gallery-2.jpg',
      '/work/volcano-3d/gallery-3.jpg',
      '/work/volcano-3d/gallery-4.jpg',
    ],
  },
  {
    slug: 'volcano-puzzle',
    client: { en: 'Latvian Museum of Natural History', lv: 'Latvijas Nacionālais dabas muzejs' },
    title: { en: 'Volcano Puzzle — a 3D jigsaw kiosk game', lv: 'Vulkāna puzle' },
    category: { en: 'Interactive exhibit', lv: 'Interaktīvā ekspozīcija' },
    summary: {
      en: 'A touchscreen 3D jigsaw puzzle with organically-shaped pieces cut by a Voronoi diagram rather than straight edges, built for a physical exhibit at the museum.',
      lv: 'Skārienekrāna 3D puzle ar organiskas formas gabaliem, kas veidoti pēc Voronoi diagrammas, nevis taisnām līnijām — izstrādāta muzeja fiziskajai ekspozīcijai.',
    },
    year: '2017',
    location: 'Riga, Latvia',
    challenge: {
      en: 'The museum wanted a tactile, game-like activity for its geology floor that would hold up to constant unattended public use.',
      lv: 'Muzejs vēlējās taustāmu, spēlei līdzīgu aktivitāti savai ģeoloģijas zālei, kas izturētu nepārtrauktu, neuzraudzītu publisku lietošanu.',
    },
    solution: {
      en: 'We generated irregular jigsaw pieces algorithmically, scattered them across a shadow-mapped 3D table, and built full drag-and-drop interaction with shadows cast in real time. An attract mode auto-plays the puzzle after a period of inactivity, and a new nature-themed image loads automatically each time a puzzle is completed.',
      lv: 'Algoritmiski ģenerējām neregulāras puzles detaļas, izkaisījām tās uz 3D galda ar reāllaika ēnu kartēšanu un izveidojām pilnu vilkšanas mijiedarbību ar reāllaika ēnām. Neaktivitātes brīžos ieslēdzas pašspēles režīms, un pēc katras atrisinātas puzles automātiski ielādējas jauns dabas tēmas attēls.',
    },
    results: {
      en: 'A durable, self-resetting kiosk game that keeps demonstrating itself to passers-by and needs no staff intervention between visitors.',
      lv: 'Izturīga, pati sevi atiestatoša kioska spēle, kas turpina demonstrēt sevi garāmgājējiem un starp apmeklētājiem neprasa personāla iesaisti.',
    },
    tech: ['libGDX', 'Java', 'Custom GLSL shaders'],
    accent: 'cyan',
    featured: false,
    media: 'device',
    heroImage: '/work/volcano-puzzle/hero.jpg',
    gallery: [
      '/work/volcano-puzzle/gallery-1.jpg',
      '/work/volcano-puzzle/gallery-2.jpg',
      '/work/volcano-puzzle/gallery-3.jpg',
      '/work/volcano-puzzle/gallery-4.jpg',
      '/work/volcano-puzzle/gallery-5.jpg',
    ],
  },
  {
    // TODO confirm: exact title/date — inferred from folder name and EXIF (Apr 2016); no written brief survives.
    slug: 'dowells-head',
    client: { en: 'Self-initiated', lv: 'Patstāvīgs projekts' },
    title: { en: "Dowell’s Head", lv: 'Dowell galva' },
    category: { en: 'Kinetic sculpture', lv: 'Kinētiskā skulptūra' },
    summary: {
      en: 'A small robotic sculpture — a moulded head with two motorised eyes that shift independently — built as a standalone kinetic piece.',
      lv: 'Neliela robotizēta skulptūra — lieta galva ar divām neatkarīgi kustīgām, motorizētām acīm — veidota kā patstāvīgs kinētisks objekts.',
    },
    year: '2016',
    location: 'Riga, Latvia',
    narrative: {
      en: 'A hand-cast head with a swept, crescent-shaped crest sits on a plinth, its two oversized eyes driven by hobby servos hidden just behind the face. The bare wiring and exposed mechanism are left visible rather than hidden away, so the piece reads openly as a small machine rather than a polished prop — a compact study in bringing an inanimate object to life with the smallest amount of hardware possible.',
      lv: 'Lieta galva ar izliektu, pusmēness formas grebumu atrodas uz pjedestāla, tās divas lielās acis kustina hobija servoierīces, kas paslēptas tieši aiz sejas. Kailā elektroinstalācija un redzamais mehānisms nav slēpti, tāpēc objekts atklāti lasāms kā neliela mašīna, nevis izspodrināts rekvizīts — kompakts pētījums par to, kā ar minimālu aparatūras apjomu iedvest dzīvību nedzīvam objektam.',
    },
    tech: ['Servo motors', 'Arduino', 'Sculpted moulding'],
    accent: 'violet',
    featured: false,
    media: 'installation',
    heroImage: '/work/dowells-head/hero.jpg',
    gallery: [
      '/work/dowells-head/gallery-1.jpg',
      '/work/dowells-head/gallery-2.jpg',
      '/work/dowells-head/gallery-3.jpg',
      '/work/dowells-head/gallery-4.jpg',
    ],
  },
  {
    // TODO confirm: title, exact year and venue — inferred from folder name and EXIF (Oct 2010 / May 2011).
    slug: 'rqr',
    client: { en: 'Self-initiated', lv: 'Patstāvīgs projekts' },
    title: { en: 'RQR', lv: 'RQR' },
    category: { en: 'Kinetic sculpture', lv: 'Kinētiskā skulptūra' },
    summary: {
      en: 'A large red kinetic sculpture — an abstract, winged skeletal form raised on tripod legs — installed outdoors and lit from within at night.',
      lv: 'Liela sarkana kinētiska skulptūra — abstrakta, spārniem līdzīga skeleta forma uz trijkāju balstiem — uzstādīta ārtelpā un naktī apgaismota no iekšpuses.',
    },
    year: '2010',
    location: 'Riga, Latvia',
    narrative: {
      en: 'Laser-cut steel ribs sweep out into a wing-like silhouette, raised above head height on three angled legs and lit from below so the piece reads as a glowing red form against the night sky. Seen after dark against a residential street, it sits somewhere between a skeleton and a flame — an outdoor sculpture built to be seen from a distance as much as up close.',
      lv: 'Lāzergrieztas tērauda ribas veido spārnam līdzīgu siluetu, paceltu virs galvas augstuma uz trim slīpiem balstiem un apgaismotu no apakšas, tāpēc objekts naktī izgaismojas kā sarkana forma pret debesīm. Redzēta pēc krēslas dzīvojamā rajona ielā, tā atrodas kaut kur starp skeletu un liesmu — āra skulptūra, kas domāta skatīšanai gan no tuvuma, gan no attāluma.',
    },
    tech: ['Laser-cut steel', 'LED lighting', 'Outdoor rigging'],
    accent: 'violet',
    featured: false,
    media: 'installation',
    heroImage: '/work/rqr/hero.jpg',
    gallery: [
      '/work/rqr/gallery-1.jpg',
      '/work/rqr/gallery-2.jpg',
      '/work/rqr/gallery-3.jpg',
      '/work/rqr/gallery-4.jpg',
      '/work/rqr/gallery-5.jpg',
    ],
  },
  {
    // TODO confirm: title, exact year and exhibition venue — inferred from folder name and EXIF (Apr 2016, same shoot as dowells-head).
    slug: 'unbalanced-force',
    client: { en: 'Self-initiated', lv: 'Patstāvīgs projekts' },
    title: { en: 'Unbalanced Force', lv: 'Nelīdzsvarots spēks' },
    category: { en: 'Kinetic sculpture', lv: 'Kinētiskā skulptūra' },
    summary: {
      en: 'A pair of suspended, bone-like forms rigged with LED rope light and hung in a gallery space, so their tangled shadow becomes a second, larger sculpture on the wall behind them.',
      lv: 'Pāris pakārtu, kaulveida formu, apvītu ar LED lentu, izstādes telpā pakārti tā, ka to sapinusies ēna uz sienas kļūst par otru, lielāku skulptūru.',
    },
    year: '2016',
    location: 'Riga, Latvia',
    narrative: {
      en: 'Two articulated, bone-like frames hang from the ceiling on rigging cable, wrapped at the base with coiled LED rope light. Lit and positioned to throw an oversized, distorted shadow across the gallery wall, the piece exists twice at once — as a compact suspended object, and as a sprawling silhouette several times its size. The title points at what’s holding it up: two points of tension keeping an asymmetric form in an uneasy kind of balance.',
      lv: 'Divi locīti, kaulveida rāmji karājas no griestiem uz stiepļu troses, pie pamatnes aptīti ar LED gaismas lenti. Apgaismoti un novietoti tā, lai uz izstādes sienas mestu palielinātu, izkropļotu ēnu, objekts eksistē vienlaikus divējādi — kā kompakts pakārts priekšmets un kā vairākas reizes lielāks izplests siluets. Nosaukums norāda uz to, kas to notur — divi spriegojuma punkti, kas nesimetrisku formu tur nedrošā līdzsvarā.',
    },
    tech: ['Steel rigging', 'LED rope light', 'Suspended installation'],
    accent: 'cyan',
    featured: false,
    media: 'installation',
    heroImage: '/work/unbalanced-force/hero.jpg',
    gallery: [
      '/work/unbalanced-force/gallery-1.jpg',
      '/work/unbalanced-force/gallery-2.jpg',
      '/work/unbalanced-force/gallery-3.jpg',
      '/work/unbalanced-force/gallery-4.jpg',
      '/work/unbalanced-force/gallery-5.jpg',
    ],
  },
  {
    // TODO confirm: client/venue and exact year — inferred from filename symmetry with staro-riga-2019 and photo dates (2011, re-photographed 2014).
    slug: 'staro-riga-2011',
    client: { en: 'Staro Rīga Light Festival', lv: 'Festivāls "Staro Rīga"' },
    title: { en: 'Illuminated Cube Cluster', lv: 'Izgaismoto kubu kopa' },
    category: { en: 'Light installation', lv: 'Gaismas instalācija' },
    summary: {
      en: 'A modular cluster of illuminated fabric cubes, shown hanging as a low canopy over a festival crowd and later reconfigured as a freestanding wall-mounted piece.',
      lv: 'Modulāra izgaismotu auduma kubu kopa, kas festivālā tika pakārta kā zems baldahīns virs pūļa un vēlāk pārveidota par patstāvīgu, pie sienas montētu objektu.',
    },
    year: '2011',
    location: 'Riga, Latvia',
    narrative: {
      en: 'Dozens of individually lit, fabric-wrapped cubes are clustered together into a single organic form, each one glowing a different shifting colour so the whole piece reads as a soft, pixelated cloud of light. Photographed both as a hanging canopy over a night-time crowd and, in a later configuration, mounted flat against a gallery wall, the same modular cube system was rebuilt more than once — proof the underlying unit was designed to be reconfigured rather than built for one fixed shape.',
      lv: 'Desmitiem individuāli apgaismotu, auduma pārklātu kubu ir apvienoti vienā organiskā formā, katram mainot krāsu, tāpēc kopumā objekts izskatās kā mīksts, pikselēts gaismas mākonis. Fotografēts gan kā pakārts baldahīns virs nakts pūļa, gan vēlākā konfigurācijā — plakaniski montēts pie izstādes sienas — tā pati modulārā kubu sistēma tika izbūvēta vairākkārt, apliecinot, ka pamata modulis bija veidots pārkonfigurēšanai, nevis vienai fiksētai formai.',
    },
    tech: ['LED lighting', 'Modular fabric enclosures'],
    accent: 'mixed',
    featured: false,
    media: 'installation',
    heroImage: '/work/staro-riga-2011/hero.jpg',
    gallery: [
      '/work/staro-riga-2011/gallery-1.jpg',
      '/work/staro-riga-2011/gallery-2.jpg',
      '/work/staro-riga-2011/gallery-3.jpg',
      '/work/staro-riga-2011/gallery-4.jpg',
    ],
  },
  {
    slug: 'staro-riga-2019',
    client: { en: 'Staro Rīga Light Festival', lv: 'Festivāls "Staro Rīga"' },
    title: { en: 'Light Tree', lv: 'Gaismas koks' },
    category: { en: 'Light installation', lv: 'Gaismas instalācija' },
    summary: {
      en: 'A tall, tree-like light sculpture with a radiating canopy of glowing blades, installed as part of Riga’s Staro Rīga light festival.',
      lv: 'Gara, kokveida gaismas skulptūra ar starojošu, izgaismotu asmeņu vainagu, uzstādīta Rīgas gaismas festivāla "Staro Rīga" ietvaros.',
    },
    year: '2019',
    location: 'Riga, Latvia',
    narrative: {
      en: 'A single steel mast opens into a wide, radiating canopy of illuminated blades, glowing blue-green against the winter night — a dandelion-like form scaled up to tree height and installed along one of the festival’s park routes for visitors to walk past after dark. Credited on-site as the piece’s original idea and design.',
      lv: 'Viens tērauda masts atveras platā, starojošā izgaismotu asmeņu vainagā, kas ziemas naktī spīd zilzaļā tonī — pienenei līdzīga forma, palielināta koka augstumā un uzstādīta gar vienu no festivāla parka maršrutiem, lai apmeklētāji to varētu vērot tumsā ejot garām. Uz vietas kā projekta idejas un dizaina autors norādīts Krists Pudzens.',
    },
    tech: ['Steel fabrication', 'LED lighting', 'Outdoor installation'],
    accent: 'cyan',
    featured: true,
    media: 'installation',
    heroImage: '/work/staro-riga-2019/hero.jpg',
    gallery: [
      '/work/staro-riga-2019/gallery-1.jpg',
      '/work/staro-riga-2019/gallery-2.jpg',
      '/work/staro-riga-2019/gallery-3.jpg',
    ],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function pick(text: LocalizedText, locale: string): string {
  return locale === 'lv' ? text.lv : text.en
}
