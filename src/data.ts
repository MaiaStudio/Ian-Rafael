import { PortfolioItem } from './types';

import imgAndersonKlyvia from '@/assets/fotos_Ian/Anderson e Klyvia.jpg';

import ak1 from '@/assets/Anderson e Klyvia/SaveClip.App_480927742_18489375640010717_7537828951760360850_n.jpg';
import ak2 from '@/assets/Anderson e Klyvia/SaveClip.App_480984915_18489375529010717_5474953613196961010_n.jpg';
import ak3 from '@/assets/Anderson e Klyvia/SaveClip.App_481149461_18489375493010717_3344749614713608731_n.jpg';
import ak4 from '@/assets/Anderson e Klyvia/SaveClip.App_481181943_18489375586010717_4219030523076536258_n.jpg';
import ak5 from '@/assets/Anderson e Klyvia/SaveClip.App_481413883_18489375604010717_4012731527138201161_n.jpg';
import ak6 from '@/assets/Anderson e Klyvia/SaveClip.App_481414003_18489375649010717_5761795205950225728_n.jpg';
import ak7 from '@/assets/Anderson e Klyvia/SaveClip.App_481421052_18489375565010717_8834862243523339225_n.jpg';
import ak8 from '@/assets/Anderson e Klyvia/SaveClip.App_481595485_18489375511010717_1255377982032699783_n.jpg';
import ak9 from '@/assets/Anderson e Klyvia/SaveClip.App_481708831_18489375556010717_3072956480344410206_n.jpg';
import ak10 from '@/assets/Anderson e Klyvia/SaveClip.App_481771922_18489375577010717_6795687046581913494_n.jpg';
import ak11 from '@/assets/Anderson e Klyvia/SaveClip.App_481847920_18489375622010717_4422921248270653248_n.jpg';
import ak12 from '@/assets/Anderson e Klyvia/SaveClip.App_481874107_18489375661010717_4710174409775975253_n.jpg';

import img1 from '@/assets/fotos_Ian/SaveClip.App_472255752_18481086556010717_9018950197896402930_n.jpg';
import img2 from '@/assets/fotos_Ian/SaveClip.App_472456857_18480577090010717_5734255396526301356_n.jpg';
import img3 from '@/assets/fotos_Ian/SaveClip.App_472559883_18481063807010717_4544634318570266108_n.jpg';
import img4 from '@/assets/fotos_Ian/SaveClip.App_472681533_18480905845010717_3393895588382021734_n.jpg';
import img5 from '@/assets/fotos_Ian/SaveClip.App_472757111_18481391071010717_5184724524007054051_n.jpg';
import img6 from '@/assets/fotos_Ian/SaveClip.App_472786927_18481188418010717_5651751588420967169_n.jpg';
import img7 from '@/assets/fotos_Ian/SaveClip.App_472791371_18481091089010717_3397672849790043908_n.jpg';
import img8 from '@/assets/fotos_Ian/SaveClip.App_472916106_18481425244010717_1680775165846175819_n.jpg';
import img9 from '@/assets/fotos_Ian/SaveClip.App_472925531_18481329433010717_8394842321199058211_n.jpg';
import img10 from '@/assets/fotos_Ian/SaveClip.App_473077578_18481381726010717_4332735643569986789_n.jpg';
import img11 from '@/assets/fotos_Ian/SaveClip.App_473078133_18481428097010717_485260939437340402_n.jpg';
import img12 from '@/assets/fotos_Ian/SaveClip.App_475238820_18484282258010717_1710989569878648509_n.jpg';
import img14 from '@/assets/fotos_Ian/SaveClip.App_497057940_18505029145010717_1837790907614773300_n.jpg';
import img15 from '@/assets/fotos_Ian/SaveClip.App_523419416_18518508997010717_2265967443446888083_n.jpg';
import img16 from '@/assets/fotos_Ian/SaveClip.App_526587655_18519746371010717_4159983640468913892_n.jpg';
import img17 from '@/assets/fotos_Ian/SaveClip.App_534831995_18523022800010717_3684545073931345341_n.jpg';
import img18 from '@/assets/fotos_Ian/SaveClip.App_543691985_18526885204010717_2922276755341482849_n.jpg';
import img19 from '@/assets/fotos_Ian/SaveClip.App_550847765_18528855634010717_6090155213401097037_n.jpg';
import img20 from '@/assets/fotos_Ian/SaveClip.App_682787077_18589930627019466_5728829500853194764_n.jpg';

// Curated 20 images matching the exact editorial/warm-beige aesthetic in Clares reference
export const RAW_IMAGES = [
  {
    title: 'Anderson e Klyvia',
    projectName: 'Anderson e Klyvia',
    url: imgAndersonKlyvia,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Cumbuco • CE',
    description: 'Ensaio ao pôr do sol nas dunas e praia com luz natural e brisa marinha.',
  },
  {
    title: 'Sombra & Dourado',
    projectName: 'Solitude',
    url: img1,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Fortaleza • CE',
    description: 'Momentos espontâneos de carinho e elegância no grande dia.',
  },
  {
    title: 'Brisa de Verão',
    projectName: 'Vague',
    url: img2,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Jericoacoara • CE',
    description: 'A poesia do encontro com a imensidão do mar.',
  },
  {
    title: 'Jogos de Luz',
    projectName: 'Luz',
    url: img3,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Estúdio Autoral',
    description: 'O contraste da luz natural revelando contornos e sensibilidade.',
  },
  {
    title: 'Presença Etérea',
    projectName: 'Serene',
    url: img4,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Guaramiranga • CE',
    description: 'Registros emotivos e poéticos em meio à serra.',
  },
  {
    title: 'Formas Refinadas',
    projectName: 'Silhouette',
    url: img5,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Fortaleza • CE',
    description: 'Silhuetas e linguagem editorial sofisticada.',
  },
  {
    title: 'Editorial Quente',
    projectName: 'Aura',
    url: img6,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Praia do Japão • CE',
    description: 'Expressão livre e conexão autêntica de casais.',
  },
  {
    title: 'Contornos do Sol',
    projectName: 'Classic',
    url: img7,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Fortaleza • CE',
    description: 'A elegância clássica atemporal do olhar.',
  },
  {
    title: 'Anatomia da Luz',
    projectName: 'Frame',
    url: img8,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Luz Natural',
    description: 'Fotografia crua, viva e cheia de sentimento.',
  },
  {
    title: 'Clássico Moderno',
    projectName: 'Line',
    url: img9,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Taíba • CE',
    description: 'Geometria natural e sorrisos verdadeiros.',
  },
  {
    title: 'Essência Pura',
    projectName: 'Minimal',
    url: img10,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Fortaleza • CE',
    description: 'Sem fórmulas prontas, apenas a verdade do momento.',
  },
  {
    title: 'Linho & Céu',
    projectName: 'Form',
    url: img11,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Paracuru • CE',
    description: 'Textura, linho e a imensidão do horizonte.',
  },
  {
    title: 'Olhar Luminoso',
    projectName: 'Focus',
    url: img12,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Estúdio Autoral',
    description: 'O poder do olhar e da expressão pura.',
  },
  {
    title: 'Sussurro do Silêncio',
    projectName: 'Sombra',
    url: img14,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Aquiraz • CE',
    description: 'A tranquilidade do amor nos pequenos detalhes.',
  },
  {
    title: 'Horizonte Suave',
    projectName: 'Nuance',
    url: img15,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Icapuí • CE',
    description: 'Paisagens poéticas e o abraço do fim de tarde.',
  },
  {
    title: 'Retrato Atemporal',
    projectName: 'Monologue',
    url: img16,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Fortaleza • CE',
    description: 'Fotografia com propósito e sensibilidade técnica.',
  },
  {
    title: 'Harmonia Suave',
    projectName: 'Chroma',
    url: img17,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Fortaleza • CE',
    description: 'A celebração do amor registrada com sensibilidade.',
  },
  {
    title: 'Poesia do Olhar',
    projectName: 'Poetry',
    url: img18,
    type: 'portrait' as const,
    category: 'Pré-Wedding',
    location: 'Cumbuco • CE',
    description: 'Sensações reais eternizadas em imagem.',
  },
  {
    title: 'Espaço Esculpido',
    projectName: 'Dimension',
    url: img19,
    type: 'portrait' as const,
    category: 'Ensaio Autoral',
    location: 'Estúdio Autoral',
    description: 'Composição de luz e profundidade de cor.',
  },
  {
    title: 'Eco Infinito',
    projectName: 'Ethereal',
    url: img20,
    type: 'portrait' as const,
    category: 'Casamento',
    location: 'Fortaleza • CE',
    description: 'A emoção das histórias reais gravadas no tempo.',
  },
];

export function getFibonacciSphereItems(): PortfolioItem[] {
  const N = RAW_IMAGES.length;
  // Golden angle in radians
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  return RAW_IMAGES.map((img, i) => {
    // Distribute y evenly from 1 to -1
    // Add a tiny offset to avoid exact polar division singularities (even though 12 is small)
    const y0 = 1 - (i / (N - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y0 * y0);
    const theta = goldenAngle * i;

    const x0 = Math.cos(theta) * radiusAtY;
    const z0 = Math.sin(theta) * radiusAtY;

    // Phase offset for randomized bobbing
    const bobOffset = i * (Math.PI / 6);

    return {
      id: i,
      url: img.url,
      title: img.title,
      projectName: img.projectName,
      type: img.type,
      x0,
      y0,
      z0,
      bobOffset,
    };
  });
}

export const PROJECT_GALLERIES: Record<string, string[]> = {
  'Anderson e Klyvia': [ak1, ak2, ak3, ak4, ak5, ak6, ak7, ak8, ak9, ak10, ak11, ak12],
};

export function getProjectGallery(projectName: string): string[] {
  if (PROJECT_GALLERIES[projectName]) {
    return PROJECT_GALLERIES[projectName];
  }
  // Fallback: use a selection of the core template images so other cards still showcase beautifully
  return [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
  ];
}

// ═══════════════════════════════════
// Section Content Data
// ═══════════════════════════════════

export const MANIFESTO_TEXT =
  'Acredito na fotografia viva, autêntica e emocional. Cada casal e cada momento possuem uma poesia única — que merece ser eternizada sem fórmulas prontas, sem padrões rígidos. Apenas a verdade do instante.';

export const ABOUT_QUOTE =
  'Meu olhar busca a essência de cada história. Não fotografo poses — fotografo sentimentos, sorrisos que escapam, olhares que dizem tudo.';

export const ABOUT_BIO =
  'Fotógrafo baseado em Fortaleza – CE, especializado em casamentos, pré-weddings e ensaios autorais. Cada projeto é uma jornada única, pensada para refletir a personalidade e a emoção de quem está diante das lentes.';

export const GALLERY_IMAGES = RAW_IMAGES.slice(1);

export const WHATSAPP_NUMBER = '5511976459136';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1%20Ian!%20Gostaria%20de%20saber%20mais%20sobre%20seu%20trabalho%20de%20fotografia.`;

