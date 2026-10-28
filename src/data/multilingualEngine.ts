import { CATEGORIES_DATA, CategoryDefinition, LanguageCode } from './categoriesData';

export interface PromptFramework {
  index: number;
  code: string;
  badge: string;
  complexity: 'Foundation' | 'Advanced' | 'Masterclass' | 'Enterprise';
  names: Record<LanguageCode, string>;
  descriptions: Record<LanguageCode, string>;
}

export const PROMPT_FRAMEWORKS: PromptFramework[] = [
  {
    index: 0,
    code: 'CO-STAR',
    badge: 'Master Blueprint',
    complexity: 'Masterclass',
    names: {
      en: 'Master Execution Blueprint (CO-STAR)',
      hi_en: 'Master Execution Blueprint (CO-STAR Strategy)',
      es: 'Plano Maestro de Ejecución (CO-STAR)',
      fr: 'Plan Directeur d’Exécution (CO-STAR)',
      ja: 'マスター実行ブループリント (CO-STAR)',
      it: 'Piano Maestro di Esecuzione (CO-STAR)',
      de: 'Master-Ausführungs-Blueprint (CO-STAR)',
      pt: 'Plano Mestre de Execução (CO-STAR)',
      ar: 'المخطط التنفيذي الرئيسي (CO-STAR)',
      zh: '大师级执行蓝图 (CO-STAR 架构)',
    },
    descriptions: {
      en: 'Complete Context, Objective, Style, Tone, Audience, and Response structured prompt.',
      hi_en: 'Complete Context, Objective, Style, Tone, Audience aur Step-by-Step Result ke liye best prompt.',
      es: 'Estructura completa de Contexto, Objetivo, Estilo, Tono, Audiencia y Respuesta.',
      fr: 'Structure complète : Contexte, Objectif, Style, Ton, Audience et Réponse.',
      ja: '背景・目的・スタイル・トーン・対象読者・出力形式を網羅した完全設計プロンプト。',
      it: 'Struttura completa con Contesto, Obiettivo, Stile, Tono, Pubblico e Risposta.',
      de: 'Vollständige Struktur aus Kontext, Ziel, Stil, Tonfall, Zielgruppe und Antwortformat.',
      pt: 'Estrutura completa de Contexto, Objetivo, Estilo, Tom, Público e Resposta.',
      ar: 'هيكل متكامل يشمل السياق، الهدف، الأسلوب، النبرة، الجمهور، وشكل المخرجات.',
      zh: '涵盖背景、目标、风格、语调、受众与输出格式的完整结构化提示词。',
    },
  },
  {
    index: 1,
    code: 'FIRST-PRINCIPLES',
    badge: 'Deep Audit',
    complexity: 'Enterprise',
    names: {
      en: 'First-Principles Diagnostic & Tear-Down',
      hi_en: 'Root-Cause Audit & Zero-To-One Breakdown',
      es: 'Diagnóstico de Primeros Principios y Auditoría',
      fr: 'Diagnostic des Premiers Principes et Audit Profond',
      ja: '第一原理思考による徹底診断・構造分解',
      it: 'Diagnosi dei Primi Principi e Audit Strategico',
      de: 'First-Principles-Diagnose & Tiefenanalyse',
      pt: 'Diagnóstico de Primeiros Princípios e Auditoria',
      ar: 'التشخيص الجذري والتحليل من المبادئ الأولى',
      zh: '第一性原理深度诊断与拆解方案',
    },
    descriptions: {
      en: 'Deconstructs hidden bottlenecks from first principles and rebuilds an optimal system.',
      hi_en: 'Har problem ki जड़ (root cause) pakad kar zero se best system banane wala prompt.',
      es: 'Deconstruye cuellos de botella ocultos desde cero y reconstruye un sistema óptimo.',
      fr: 'Déconstruit les blocages cachés dès la base et reconstruit un système optimal.',
      ja: '根本原因を第一原理から特定し、最適なシステムをゼロから再構築します。',
      it: 'Scompone i colli di bottiglia nascosti e ricostruisce un sistema ottimale.',
      de: 'Zerlegt versteckte Engpässe von Grund auf und baut ein optimales System neu auf.',
      pt: 'Desconstrói gargalos ocultos do zero e reconstrói um sistema de alta performance.',
      ar: 'تفكيك نقاط الضعف الخفية من الجذور وإعادة بناء نظام مثالي عالي الكفاءة.',
      zh: '从第一性原理剖析深层瓶颈，并从零重构最优系统方案。',
    },
  },
  {
    index: 2,
    code: 'RAPID-SPRINT',
    badge: '7-Day Action',
    complexity: 'Foundation',
    names: {
      en: '7-Day Rapid Implementation & Launch Sprint',
      hi_en: '7-Day Fast Action & Practical Launch Plan',
      es: 'Sprint de Implementación y Lanzamiento en 7 Días',
      fr: 'Sprint de Lancement et Mise en Œuvre en 7 Jours',
      ja: '7日間スピード実装・ローンチスプリント',
      it: 'Sprint di Implementazione e Lancio in 7 Giorni',
      de: '7-Tage-Schnellimplementierungs- & Launch-Sprint',
      pt: 'Sprint de Implementação e Lançamento em 7 Dias',
      ar: 'خطة التنفيذ والإطلاق السريع خلال 7 أيام',
      zh: '7天快速落地与启动冲刺计划',
    },
    descriptions: {
      en: 'Day-by-day execution plan with checklists to go from zero to live outcome in 1 week.',
      hi_en: 'Sirf 7 din ke andar zero se live result paane ka day-by-day practical action plan.',
      es: 'Plan de acción día por día con listas de control para lograr resultados en 1 semana.',
      fr: 'Plan d’action jour par jour avec checklists pour passer de zéro au résultat en 7 jours.',
      ja: '1週間でゼロから実践的な成果を出すための日別アクションプランとチェックリスト。',
      it: 'Piano operativo giorno per giorno per passare da zero al risultato in una settimana.',
      de: 'Tag-für-Tag-Umsetzungsplan mit Checklisten für messbare Ergebnisse in einer Woche.',
      pt: 'Plano prático dia a dia com checklists para sair do zero ao resultado em 1 semana.',
      ar: 'خطة عمل يومية مفصلة مع قوائم تحقق للوصول إلى نتائج فعلية خلال أسبوع واحد.',
      zh: '按天拆解的实战落地清单，助您在7天内从零实现可衡量的成果。',
    },
  },
  {
    index: 3,
    code: 'SWIPE-TEMPLATE',
    badge: 'Copy-Paste Kit',
    complexity: 'Foundation',
    names: {
      en: 'Ready-to-Use Swipe File & Template Generator',
      hi_en: 'Ready-Made Copy-Paste Templates & Scripts Kit',
      es: 'Generador de Plantillas y Guiones Listos para Usar',
      fr: 'Générateur de Modèles et Scripts Prêts à l’Emploi',
      ja: '即戦力テンプレート＆スワイプファイル生成',
      it: 'Generatore di Modelli e Script Pronti all’Uso',
      de: 'Sofort Einsetzbare Vorlagen- & Skript-Matrix',
      pt: 'Gerador de Templates e Scripts Prontos para Uso',
      ar: 'مولد القوالب والنماذج الجاهزة للنسخ والتطبيق',
      zh: '即插即用高转化模板与话术生成器',
    },
    descriptions: {
      en: 'Generates 5 plug-and-play templates, scripts, and fill-in-the-blank frameworks.',
      hi_en: '5 ready-made templates aur scripts jinhe aap turant copy-paste karke use kar sakte hain.',
      es: 'Genera 5 plantillas listas para copiar, pegar y personalizar al instante.',
      fr: 'Génère 5 modèles prêts à copier-coller avec variables personnalisables.',
      ja: 'すぐにコピーして使える5つの実践テンプレートと穴埋めフレームワークを生成。',
      it: 'Genera 5 modelli pronti da copiare e personalizzare immediatamente.',
      de: 'Erstellt 5 sofort nutzbare Copy-Paste-Vorlagen und Lückentext-Skripte.',
      pt: 'Gera 5 modelos prontos para copiar, colar e aplicar imediatamente.',
      ar: 'توليد 5 قوالب ونصوص احترافية جاهزة للتخصيص والتنفيذ الفوري.',
      zh: '生成5套可直接复制套用的实战模板、脚本与填空式框架。',
    },
  },
  {
    index: 4,
    code: 'RED-TEAM',
    badge: 'Stress Test',
    complexity: 'Advanced',
    names: {
      en: 'Adversarial Red-Team & Failure-Proofing Audit',
      hi_en: 'Mistake Finder & Risk-Proofing Stress Test',
      es: 'Auditoría Red-Team y Blindaje contra Errores',
      fr: 'Audit Red-Team et Sécurisation Anti-Échec',
      ja: 'レッドチーム弱点検証・失敗防止ストレステスト',
      it: 'Audit Red-Team e Prevenzione dei Fallimenti',
      de: 'Red-Team-Schwachstellenanalyse & Risiko-Absicherung',
      pt: 'Auditoria Red-Team e Blindagem Contra Falhas',
      ar: 'اختبار التحمل واكتشاف الثغرات والأخطاء المسبقة',
      zh: '红队对抗压力测试与防败局风险审计',
    },
    descriptions: {
      en: 'Exposes blind spots, edge-case failures, and hidden risks with immediate counter-measures.',
      hi_en: 'Har chhupi hui galti aur risk ko pehle hi pakad kar uska pakka solution dene wala prompt.',
      es: 'Detecta puntos ciegos y riesgos ocultos con contramedidas preventivas inmediatas.',
      fr: 'Expose les angles morts et risques cachés avec des contre-mesures immédiates.',
      ja: '見落としがちな死角や失敗リスクを事前に暴き、確実な対策を提示します。',
      it: 'Rivela punti ciechi e rischi nascosti fornendo contromisure immediate.',
      de: 'Deckt blinde Flecken und versteckte Risiken inklusive sofortiger Gegenmaßnahmen auf.',
      pt: 'Revela pontos cegos e riscos ocultos com contramedidas preventivas imediatas.',
      ar: 'كشف النقاط العمياء والمخاطر المحتملة مع تقديم حلول وقائية فورية.',
      zh: '精准暴露盲点、极端边界故障与潜在风险，并提供防御性反制方案。',
    },
  },
  {
    index: 5,
    code: 'AUTOMATION-SOP',
    badge: 'System SOP',
    complexity: 'Enterprise',
    names: {
      en: 'Standard Operating Procedure (SOP) & Automation Pipeline',
      hi_en: 'Step-by-Step Team SOP & AI Automation System',
      es: 'Procedimiento Operativo Estándar (SOP) y Automatización',
      fr: 'Procédure Opérationnelle Standard (SOP) & Automatisation',
      ja: '標準作業手順書 (SOP) ＆ AI自動化パイプライン',
      it: 'Procedura Operativa Standard (SOP) e Automazione',
      de: 'Standard Operating Procedure (SOP) & Automatisierung',
      pt: 'Procedimento Operacional Padrão (SOP) e Automação',
      ar: 'إجراءات التشغيل القياسية (SOP) وأتمتة سير العمل',
      zh: '标准作业程序 (SOP) 与自动化工作流架构',
    },
    descriptions: {
      en: 'Turns complex manual work into a repeatable, delegatable SOP with AI automation hooks.',
      hi_en: 'Mushkil kaam ko aasan step-by-step SOP aur auto-pilot workflow mein badalne wala prompt.',
      es: 'Convierte tareas manuales complejas en un SOP delegable y automatizado con IA.',
      fr: 'Transforme un travail complexe en SOP délégable et automatisé par l’IA.',
      ja: '複雑な手作業を誰でも再現・委任できるSOPとAI自動化フローに変換します。',
      it: 'Trasforma il lavoro manuale complesso in una SOP delegabile e automatizzata.',
      de: 'Verwandelt komplexe Prozesse in delegierbare SOPs mit KI-Automatisierung.',
      pt: 'Transforma processos manuais complexos em um SOP delegável e automatizado.',
      ar: 'تحويل المهام اليدوية المعقدة إلى دليل تشغيلي قياسي قابل للتفويض والأتمتة.',
      zh: '将复杂繁琐的手工流程转化为可复制、可委派的SOP与AI自动化管线。',
    },
  },
  {
    index: 6,
    code: 'MONETIZATION-ROI',
    badge: 'Revenue Engine',
    complexity: 'Masterclass',
    names: {
      en: 'High-Margin Monetization & ROI Multiplier',
      hi_en: 'High-Profit Monetization & Income Growth Plan',
      es: 'Motor de Monetización y Multiplicador de ROI',
      fr: 'Moteur de Monétisation à Haute Marge & ROI',
      ja: '高収益マネタイズ＆ROI最大化エンジン',
      it: 'Motore di Monetizzazione ad Alto Margine e ROI',
      de: 'High-Margin-Monetarisierungs- & ROI-Multiplikator',
      pt: 'Motor de Monetização de Alta Margem e ROI',
      ar: 'محرك تحقيق الدخل ومضاعفة العائد الاستثماري (ROI)',
      zh: '高利润变现引擎与投资回报率 (ROI) 倍增器',
    },
    descriptions: {
      en: 'Designs pricing tiers, unit economics, upsells, and direct conversion pathways.',
      hi_en: 'Pricing tiers, upsells aur high-converting offer bana kar revenue badhane ka blueprint.',
      es: 'Diseña niveles de precios, economía unitaria, upsells y rutas de conversión directa.',
      fr: 'Conçoit les paliers tarifaires, l’économie unitaire et les tunnels de conversion.',
      ja: '価格ティア、ユニットエコノミクス、アップセル、成約導線を緻密に設計します。',
      it: 'Progetta livelli di prezzo, unit economics, upsell e percorsi di conversione.',
      de: 'Entwickelt Preisstufen, Unit Economics, Upsells und direkte Konversionspfade.',
      pt: 'Estrutura níveis de preços, economia unitária, upsells e funis de conversão.',
      ar: 'تصميم شرائح التسعير، اقتصاديات الوحدة، ومسارات التحويل المباشر لزيادة الأرباح.',
      zh: '设计定价阶梯、单客经济模型、追销矩阵与高转化变现路径。',
    },
  },
  {
    index: 7,
    code: 'PSYCHOLOGY-HOOK',
    badge: 'High Conversion',
    complexity: 'Advanced',
    names: {
      en: 'Behavioral Psychology & Persuasion Architecture',
      hi_en: 'Buyer Psychology & High-Trust Persuasion Formula',
      es: 'Psicología del Comportamiento y Arquitectura Persuasiva',
      fr: 'Psychologie Comportementale et Architecture Persuasive',
      ja: '行動心理学＆高反応パースエイジョン設計',
      it: 'Psicologia Comportamentale e Architettura Persuasiva',
      de: 'Verhaltenspsychologie & Überzeugungs-Architektur',
      pt: 'Psicologia Comportamental e Arquitetura de Persuasão',
      ar: 'علم النفس السلوكي وهندسة الإقناع عالية التأثير',
      zh: '行为心理学与高转化说服力架构',
    },
    descriptions: {
      en: 'Applies cognitive biases, emotional triggers, and trust anchors for maximum engagement.',
      hi_en: 'Human psychology aur trust triggers ka use karke audience ko turant convince karne wala prompt.',
      es: 'Aplica disparadores emocionales y anclas de confianza para máxima conversión.',
      fr: 'Applique les leviers psychologiques et ancres de confiance pour un impact maximal.',
      ja: '認知バイアスや感情トリガー、信頼アンカーを活用して最大の反応を引き出します。',
      it: 'Applica leve psicologiche e ancore di fiducia per il massimo coinvolgimento.',
      de: 'Nutzt kognitive Trigger und Vertrauensanker für maximale Überzeugungskraft.',
      pt: 'Aplica gatilhos mentais e âncoras de confiança para máximo engajamento.',
      ar: 'توظيف المحفزات النفسية وركائز الثقة لتحقيق أعلى درجات التفاعل والإقناع.',
      zh: '运用认知心理学、情绪触发器与信任锚点实现极致的受众共鸣与转化。',
    },
  },
  {
    index: 8,
    code: 'SOCRATIC-COACH',
    badge: 'Interactive Coach',
    complexity: 'Advanced',
    names: {
      en: 'Interactive Socratic Simulator & Personalized Mentor',
      hi_en: '1-on-1 Interactive AI Coach & Step-by-Step Mentor',
      es: 'Simulador Socrático Interactivo y Mentor Personalizado',
      fr: 'Simulateur Socratique Interactif & Mentor Personnalisé',
      ja: '対話型ソクラテス式シミュレーター＆専属メンター',
      it: 'Simulatore Socratico Interattivo e Mentore Personale',
      de: 'Interaktiver Sokratischer Simulator & KI-Mentor',
      pt: 'Simulador Socrático Interativo e Mentor Personalizado',
      ar: 'المحاكاة الحوارية التفاعلية والموجه الشخصي الذكي',
      zh: '苏格拉底式交互模拟与一对一专属导师',
    },
    descriptions: {
      en: 'Diagnostic coaching protocol that interviews you, grades responses, and adapts dynamically.',
      hi_en: 'Aap se sawal pooch kar aapke exact level ke hisaab se guide karne wala interactive coach.',
      es: 'Protocolo de coaching que te entrevista, evalúa tus respuestas y se adapta en vivo.',
      fr: 'Protocole de coaching interactif qui pose des questions et s’adapte à votre niveau.',
      ja: '対話を通じて現状を診断し、回答を採点しながら最適解へ導くコーチング設計。',
      it: 'Protocollo di coaching interattivo che ti guida passo dopo passo con feedback mirati.',
      de: 'Interaktives Coaching-Protokoll mit gezielten Rückfragen und Echtzeit-Feedback.',
      pt: 'Protocolo de mentoria interativa que diagnostica seu cenário e adapta o plano.',
      ar: 'بروتوكول توجيه تفاعلي يحاورك خطوة بخطوة ويقيم إجاباتك لتقديم حلول مخصصة.',
      zh: '通过精准提问诊断您的现状，实时评估反馈并动态定制进阶方案。',
    },
  },
  {
    index: 9,
    code: 'SCALE-10X',
    badge: 'Executive Scale',
    complexity: 'Masterclass',
    names: {
      en: '10x Enterprise Scale & Competitive Moat Masterplan',
      hi_en: '10x Growth Scaling & Market Domination Masterplan',
      es: 'Plan Maestro de Escalado 10x y Ventaja Competitiva',
      fr: 'Plan Directeur de Croissance 10x & Avantage Compétitif',
      ja: '10倍スケール拡大＆競争優位性（モート）構築マスタープラン',
      it: 'Masterplan di Scalabilità 10x e Vantaggio Competitivo',
      de: '10x-Skalierungs- & Burggraben-Masterplan',
      pt: 'Plano Mestre de Escala 10x e Fosso Competitivo',
      ar: 'الخطة الشاملة للتوسع 10 أضعاف وبناء الميزة التنافسية',
      zh: '10倍规模化增长与竞争护城河战略总纲',
    },
    descriptions: {
      en: 'Long-horizon 90-day scaling architecture, KPI scorecards, and defensible moat creation.',
      hi_en: '90-day scaling roadmap, KPI dashboard aur long-term market leadership banane ka masterplan.',
      es: 'Arquitectura de escalado a 90 días, cuadro de mando de KPIs y foso defensivo.',
      fr: 'Architecture de croissance sur 90 jours, tableau de bord KPI et avantage défensif.',
      ja: '90日間のスケール戦略、KPIスコアカード、模倣困難な参入障壁を構築します。',
      it: 'Architettura di crescita a 90 giorni, KPI scorecard e creazione di un vantaggio difendibile.',
      de: '90-Tage-Skalierungsarchitektur, KPI-Scorecards und nachhaltiger Wettbewerbsvorteil.',
      pt: 'Arquitetura de escala para 90 dias, painel de KPIs e construção de diferencial competitivo.',
      ar: 'خارطة طريق للتوسع خلال 90 يوماً مع مؤشرات الأداء الرئيسية وبناء ميزة تنافسية مستدامة.',
      zh: '涵盖90天规模化扩张路线图、KPI计分卡与高壁垒护城河构建。',
    },
  },
];

export interface PromptItem {
  id: string;
  numericId: number;
  categoryId: number;
  categoryName: string;
  categoryShortTitle: string;
  cluster: string;
  subTopicIndex: number;
  subTopic: string;
  frameworkIndex: number;
  frameworkCode: string;
  frameworkBadge: string;
  complexity: 'Foundation' | 'Advanced' | 'Masterclass' | 'Enterprise';
  recommendedModel: string;
  defaultVariables: {
    targetAudience: string;
    primaryGoal: string;
    toneOrStyle: string;
    constraints: string;
  };
}

export interface CustomVariableOverrides {
  customTopic?: string;
  targetAudience?: string;
  primaryGoal?: string;
  toneOrStyle?: string;
  constraints?: string;
}

// Build all 10,500 deterministic prompt descriptors in memory for instant <2ms offline search and filtering
let cachedPrompts: PromptItem[] | null = null;

export function getAllPrompts(): PromptItem[] {
  if (cachedPrompts) return cachedPrompts;

  const list: PromptItem[] = [];
  let counter = 1;

  for (const cat of CATEGORIES_DATA) {
    for (let sIdx = 0; sIdx < cat.subTopics.length; sIdx++) {
      const subTopic = cat.subTopics[sIdx];
      for (let fIdx = 0; fIdx < PROMPT_FRAMEWORKS.length; fIdx++) {
        const fw = PROMPT_FRAMEWORKS[fIdx];
        const paddedId = String(counter).padStart(5, '0');
        list.push({
          id: `RP-${paddedId}`,
          numericId: counter,
          categoryId: cat.id,
          categoryName: cat.name,
          categoryShortTitle: cat.shortTitle,
          cluster: cat.cluster,
          subTopicIndex: sIdx,
          subTopic,
          frameworkIndex: fIdx,
          frameworkCode: fw.code,
          frameworkBadge: fw.badge,
          complexity: fw.complexity,
          recommendedModel: cat.recommendedModel,
          defaultVariables: cat.defaultVariables,
        });
        counter++;
      }
    }
  }

  cachedPrompts = list;
  return list;
}

const CATEGORY_MAP = new Map<number, CategoryDefinition>(
  CATEGORIES_DATA.map((c) => [c.id, c])
);

const CLUSTER_ROLE_TRANSLATIONS: Record<
  string,
  Record<LanguageCode, { rolePrefix: string; domainLabel: string }>
> = {
  'Creative & Media AI': {
    en: { rolePrefix: 'Principal Creative AI Director', domainLabel: 'Generative Media & Creative Direction' },
    hi_en: { rolePrefix: 'Senior Creative AI Director & Visual Strategist', domainLabel: 'Generative AI Media & Content' },
    es: { rolePrefix: 'Director Principal de IA Creativa y Producción Visual', domainLabel: 'Medios Generativos y Dirección Creativa' },
    fr: { rolePrefix: 'Directeur Principal en IA Créative et Production Multimédia', domainLabel: 'Médias Génératifs & Direction Artistique' },
    ja: { rolePrefix: 'エグゼクティブ・クリエイティブAIディレクター', domainLabel: '生成AIメディア＆クリエイティブ制作' },
    it: { rolePrefix: 'Direttore Principale di IA Creativa e Produzione Multimediale', domainLabel: 'Media Generativi e Direzione Creativa' },
    de: { rolePrefix: 'Principal Creative AI Director & Medienarchitekt', domainLabel: 'Generative Medien & Kreative Direktion' },
    pt: { rolePrefix: 'Diretor Principal de IA Criativa e Produção Audiovisual', domainLabel: 'Mídia Generativa e Direção Criativa' },
    ar: { rolePrefix: 'المدير التنفيذي الأول للذكاء الاصطناعي الإبداعي والإنتاج المرئي', domainLabel: 'الإعلام التوليدي والإخراج الإبداعي' },
    zh: { rolePrefix: '首席生成式AI创意总监与多模态架构师', domainLabel: '生成式视觉媒体与创意创作' },
  },
  'Tech, Coding & Cyber': {
    en: { rolePrefix: 'Distinguished Principal Systems & Security Architect', domainLabel: 'Software Engineering & Cybersecurity' },
    hi_en: { rolePrefix: 'Principal Software Architect & Cyber Security Specialist', domainLabel: 'Tech, Coding & Systems Architecture' },
    es: { rolePrefix: 'Arquitecto Principal de Sistemas, Software y Ciberseguridad', domainLabel: 'Ingeniería de Software y Tecnología' },
    fr: { rolePrefix: 'Architecte Principal Systèmes, Logiciels et Cybersécurité', domainLabel: 'Ingénierie Logicielle & Technologie' },
    ja: { rolePrefix: 'プリンシパル・システム＆セキュリティアーキテクト', domainLabel: 'ソフトウェア工学＆サイバーセキュリティ' },
    it: { rolePrefix: 'Architetto Principale di Sistemi, Software e Cybersecurity', domainLabel: 'Ingegneria del Software e Tecnologia' },
    de: { rolePrefix: 'Principal Systems-, Software- & Cybersecurity-Architekt', domainLabel: 'Software-Engineering & Sicherheitstechnik' },
    pt: { rolePrefix: 'Arquiteto Principal de Sistemas, Software e Cibersegurança', domainLabel: 'Engenharia de Software e Tecnologia' },
    ar: { rolePrefix: 'كبير مهندسي البرمجيات والأمن السيبراني والنظم المتقدمة', domainLabel: 'هندسة البرمجيات والأمن السيبراني' },
    zh: { rolePrefix: '首席系统架构师与网络安全专家', domainLabel: '软件工程、技术架构与安全防御' },
  },
  'Business, Finance & Legal': {
    en: { rolePrefix: 'Managing Partner & Chief Strategy Officer', domainLabel: 'Executive Business, Finance & Legal Strategy' },
    hi_en: { rolePrefix: 'Chief Business Strategist, Finance & Legal Advisor', domainLabel: 'Business Growth, Finance & Legal' },
    es: { rolePrefix: 'Socio Director y Estratega Ejecutivo de Negocios, Finanzas y Legal', domainLabel: 'Estrategia Empresarial, Finanzas y Legal' },
    fr: { rolePrefix: 'Associé Directeur & Stratège Exécutif Affaires, Finance et Juridique', domainLabel: 'Stratégie d’Entreprise, Finance & Juridique' },
    ja: { rolePrefix: 'マネージングパートナー兼最高戦略責任者 (CSO)', domainLabel: 'ビジネス戦略・財務・法務ガバナンス' },
    it: { rolePrefix: 'Managing Partner e Consulente Strategico Direzionale', domainLabel: 'Strategia Aziendale, Finanza e Legale' },
    de: { rolePrefix: 'Managing Partner & Chief Strategy Officer (Wirtschaft, Finanzen & Recht)', domainLabel: 'Unternehmensstrategie, Finanzen & Recht' },
    pt: { rolePrefix: 'Sócio-Diretor e Estrategista Executivo de Negócios, Finanças e Jurídico', domainLabel: 'Estratégia Empresarial, Finanças e Jurídico' },
    ar: { rolePrefix: 'الشريك الإداري وكبير المستشارين الاستراتيجيين والماليين والقانونيين', domainLabel: 'إدارة الأعمال والمالية والشؤون القانونية' },
    zh: { rolePrefix: '首席商业战略官兼财务与法务执行合伙人', domainLabel: '商业战略、财税规划与法务合规' },
  },
  'Career, Study & Wellness': {
    en: { rolePrefix: 'Master Executive Coach & Human Performance Scientist', domainLabel: 'Career Acceleration, Education & Holistic Wellness' },
    hi_en: { rolePrefix: 'Master Career Coach, Education & Wellness Expert', domainLabel: 'Career, Study & Personal Mastery' },
    es: { rolePrefix: 'Coach Ejecutivo Maestro y Especialista en Alto Rendimiento', domainLabel: 'Desarrollo Profesional, Educación y Bienestar' },
    fr: { rolePrefix: 'Maître Coach Exécutif & Spécialiste de la Performance Humaine', domainLabel: 'Carrière, Éducation & Bien-être Global' },
    ja: { rolePrefix: 'エグゼクティブ・キャリア＆ヒューマンパフォーマンス導師', domainLabel: 'キャリア開発・学習科学・ウェルネス' },
    it: { rolePrefix: 'Master Executive Coach e Specialista in Alte Prestazioni', domainLabel: 'Carriera, Formazione e Benessere Integrale' },
    de: { rolePrefix: 'Master Executive Coach & Experte für Spitzenleistung', domainLabel: 'Karriere, Bildung & Ganzheitliche Gesundheit' },
    pt: { rolePrefix: 'Master Coach Executivo e Especialista em Alta Performance', domainLabel: 'Carreira, Educação e Bem-Estar Integral' },
    ar: { rolePrefix: 'كبير خبراء التطوير المهني والتعليم والأداء البشري المتقدم', domainLabel: 'التطور الوظيفي، التعليم، والصحة الشاملة' },
    zh: { rolePrefix: '首席职业发展导师与人类潜能表现专家', domainLabel: '职业晋升、高效学习与身心健康' },
  },
  'Monetization & Online Income': {
    en: { rolePrefix: 'Chief Digital Revenue Architect & Growth Monetization Strategist', domainLabel: 'Digital Monetization & Scalable Online Income' },
    hi_en: { rolePrefix: 'Digital Monetization Expert & Online Income Strategist', domainLabel: 'Online Earning, Funnels & Digital Business' },
    es: { rolePrefix: 'Arquitecto Jefe de Monetización Digital y Crecimiento de Ingresos', domainLabel: 'Monetización Digital y Negocios Online' },
    fr: { rolePrefix: 'Architecte en Chef de la Monétisation Digitale et de la Croissance', domainLabel: 'Monétisation Numérique & Revenus en Ligne' },
    ja: { rolePrefix: 'チーフ・デジタル収益化アーキテクト＆グロース戦略家', domainLabel: 'デジタル収益化＆オンラインビジネス構築' },
    it: { rolePrefix: 'Chief Digital Revenue Architect e Stratega di Monetizzazione', domainLabel: 'Monetizzazione Digitale e Business Online' },
    de: { rolePrefix: 'Chief Digital Revenue Architect & Monetarisierungs-Stratege', domainLabel: 'Digitale Monetarisierung & Online-Einkommen' },
    pt: { rolePrefix: 'Arquiteto-Chefe de Receita Digital e Estrategista de Monetização', domainLabel: 'Monetização Digital e Renda Online Escalável' },
    ar: { rolePrefix: 'كبير مهندسي تحقيق الدخل الرقمي واستراتيجيات نمو الأرباح عبر الإنترنت', domainLabel: 'تحقيق الدخل الرقمي ومشاريع الإنترنت المربحة' },
    zh: { rolePrefix: '首席数字商业变现架构师与增长专家', domainLabel: '数字产品变现与高利润在线商业' },
  },
  'Next-Gen & Specialized AI': {
    en: { rolePrefix: 'Frontier AI Systems Researcher & Prompt Engineering Architect', domainLabel: 'Next-Gen AI Agents & Advanced Prompt Engineering' },
    hi_en: { rolePrefix: 'Advanced Prompt Engineer & Next-Gen AI Systems Expert', domainLabel: 'Advanced AI Tools, Automation & Prompt Hacks' },
    es: { rolePrefix: 'Investigador de Sistemas de IA de Frontera y Arquitecto de Prompts', domainLabel: 'IA de Próxima Generación e Ingeniería de Prompts' },
    fr: { rolePrefix: 'Chercheur en Systèmes d’IA Avancés & Architecte Prompt Engineering', domainLabel: 'IA de Nouvelle Génération & Ingénierie de Prompts' },
    ja: { rolePrefix: '次世代AIシステム研究者兼プロンプトエンジニアリング最高責任者', domainLabel: '次世代AIエージェント＆高度プロンプト設計' },
    it: { rolePrefix: 'Ricercatore di Sistemi IA di Frontiera e Architetto di Prompt Engineering', domainLabel: 'IA di Nuova Generazione e Prompt Engineering' },
    de: { rolePrefix: 'Frontier-KI-Systemforscher & Prompt-Engineering-Architekt', domainLabel: 'Next-Gen-KI & Fortgeschrittenes Prompt Engineering' },
    pt: { rolePrefix: 'Pesquisador de Sistemas de IA de Fronteira e Arquiteto de Engenharia de Prompts', domainLabel: 'IA de Próxima Geração e Engenharia de Prompts' },
    ar: { rolePrefix: 'كبير الباحثين في أنظمة الذكاء الاصطناعي المتقدمة وهندسة الأوامر الاحترافية', domainLabel: 'تقنيات الذكاء الاصطناعي للجيل القادم وهندسة الأوامر' },
    zh: { rolePrefix: '前沿AI系统研究员与首席提示词工程架构师', domainLabel: '下一代AI智能体与高阶提示词工程' },
  },
};

export function getTranslatedTitle(item: PromptItem, lang: LanguageCode): string {
  const fw = PROMPT_FRAMEWORKS[item.frameworkIndex];
  const fwName = fw.names[lang] || fw.names.en;
  return `${item.subTopic} — ${fwName}`;
}

export function getTranslatedDescription(item: PromptItem, lang: LanguageCode): string {
  const fw = PROMPT_FRAMEWORKS[item.frameworkIndex];
  const cat = CATEGORY_MAP.get(item.categoryId)!;
  const fwDesc = fw.descriptions[lang] || fw.descriptions.en;

  switch (lang) {
    case 'hi_en':
      return `${cat.shortTitle} ke andar "${item.subTopic}" ke liye ${fwDesc} (Recommended AI: ${cat.recommendedModel})`;
    case 'es':
      return `Enfoque especializado en "${item.subTopic}" (${cat.shortTitle}). ${fwDesc} [IA recomendada: ${cat.recommendedModel}]`;
    case 'fr':
      return `Architecture dédiée à « ${item.subTopic} » (${cat.shortTitle}). ${fwDesc} [IA recommandée : ${cat.recommendedModel}]`;
    case 'ja':
      return `【${cat.shortTitle}】「${item.subTopic}」特化型プロンプト。${fwDesc}（推奨AI: ${cat.recommendedModel}）`;
    case 'it':
      return `Protocollo specializzato per "${item.subTopic}" (${cat.shortTitle}). ${fwDesc} [IA consigliata: ${cat.recommendedModel}]`;
    case 'de':
      return `Spezialisiertes Prompt-System für „${item.subTopic}“ (${cat.shortTitle}). ${fwDesc} [Empfohlene KI: ${cat.recommendedModel}]`;
    case 'pt':
      return `Arquitetura especializada em "${item.subTopic}" (${cat.shortTitle}). ${fwDesc} [IA recomendada: ${cat.recommendedModel}]`;
    case 'ar':
      return `بروتوكول احترافي مخصص لـ "${item.subTopic}" ضمن فئة (${cat.shortTitle}). ${fwDesc} [النموذج الموصى به: ${cat.recommendedModel}]`;
    case 'zh':
      return `针对【${cat.shortTitle}】中“${item.subTopic}”的专业级提示词。${fwDesc}（推荐模型：${cat.recommendedModel}）`;
    case 'en':
    default:
      return `Specialized ${fw.code} prompt for "${item.subTopic}" under ${cat.shortTitle}. ${fwDesc}`;
  }
}

/**
 * Generates the complete, 100% grammatically accurate, copy-ready prompt in any of the 10 languages.
 */
export function renderPromptInLanguage(
  item: PromptItem,
  lang: LanguageCode,
  overrides?: CustomVariableOverrides
): string {
  const cat = CATEGORY_MAP.get(item.categoryId)!;
  const fw = PROMPT_FRAMEWORKS[item.frameworkIndex];
  const clusterLoc =
    CLUSTER_ROLE_TRANSLATIONS[cat.cluster]?.[lang] ||
    CLUSTER_ROLE_TRANSLATIONS['Creative & Media AI'][lang];

  const topic = overrides?.customTopic?.trim() || item.subTopic;
  const audience = overrides?.targetAudience?.trim() || cat.defaultVariables.targetAudience;
  const goal = overrides?.primaryGoal?.trim() || cat.defaultVariables.primaryGoal;
  const style = overrides?.toneOrStyle?.trim() || cat.defaultVariables.toneOrStyle;
  const constraints = overrides?.constraints?.trim() || cat.defaultVariables.constraints;
  const specA = cat.deliverableSpecs[item.frameworkIndex % cat.deliverableSpecs.length];
  const specB = cat.deliverableSpecs[(item.frameworkIndex + 2) % cat.deliverableSpecs.length];

  switch (lang) {
    case 'hi_en':
      return `### [ROLE & EXPERT PERSONA]
Aap ek world-class **${clusterLoc.rolePrefix} (${cat.roleTitle})** hain jinke paas **${cat.shortTitle} (${clusterLoc.domainLabel})** aur specially **"${topic}"** mein 15+ saal ka deep practical experience hai.

### [PRIMARY OBJECTIVE & MISSION]
Mera main focus **"${topic}"** ke liye ek complete, production-ready **${fw.names.hi_en}** taiyaar karna hai.
- **Target Audience / Niche:** [TARGET_AUDIENCE: ${audience}]
- **Core Goal & Outcome:** [PRIMARY_GOAL: ${goal}]
- **Tone & Execution Style:** [TONE_STYLE: ${style}]

### [STEP-BY-STEP EXECUTION PROTOCOL]
Kripya bina kisi generic fluff ya incomplete placeholder ke neeche diye gaye 5 steps mein apna output dein:
1. **Strategic Diagnosis & Core Framework:** Sabse pehle "${topic}" ke sabse important levers, hidden bottlenecks aur high-impact opportunities ko breakdown karein.
2. **Complete Actionable Blueprint (${fw.code}):** Ekdum detail mein step-by-step system, exact copy-paste scripts, formulas, ya technical parameters likhein jise aaj hi implement kiya ja sake.
3. **Domain Specific Deliverables:**
   - ${specA}
   - ${specB}
4. **Common Mistakes & Risk Proofing:** Top 3 galtiyan jo log is process mein karte hain aur unse bachne ka exact step-by-step solution batayein.
5. **7-Day Quick-Win Execution Checklist:** Ek table aur numbered checklist dein jisse pehle 7 din mein measurable result aur ROI mile.

### [QUALITY CONSTRAINTS & LANGUAGE LOCK]
- **Strict Rule:** ${constraints}
- Kisi bhi section ko "[Insert here]" likh kar adhura mat chhodiye; 100% complete examples dein.
- **LANGUAGE LOCK:** Apna poora final response natural, high-converting **Hinglish (Hindi + Professional English terms)** mein likhein taaki har step crystal clear samajh aaye.`;

    case 'es':
      return `### [ROL Y PERFIL DE EXPERTO]
Actúa como un **${clusterLoc.rolePrefix} (${cat.roleTitle})** de élite mundial con más de 15 años de experiencia comprobada en **${clusterLoc.domainLabel} (${cat.shortTitle})**, especializado profundamente en **"${topic}"**.

### [OBJETIVO PRINCIPAL Y CONTEXTO]
Tu misión es diseñar y desarrollar un **${fw.names.es}** completo, riguroso y listo para producción enfocado en **"${topic}"**.
- **Público Objetivo / Sector:** [PÚBLICO_OBJETIVO: ${audience}]
- **Meta Principal de Negocio/Proyecto:** [META_PRINCIPAL: ${goal}]
- **Estilo y Tono Requerido:** [ESTILO_Y_TONO: ${style}]

### [PROTOCOLO DE EJECUCIÓN EN 5 FASES]
Desarrolla tu respuesta íntegramente en español siguiendo estrictamente esta arquitectura de 5 fases sin omitir detalles:
1. **Diagnóstico Estratégico de Primeros Principios:** Analiza las palancas críticas de éxito para "${topic}", los cuellos de botella ocultos y cómo superar el estándar actual del mercado.
2. **Arquitectura Práctica Completa (${fw.code}):** Entrega el sistema paso a paso, guiones palabra por palabra, parámetros técnicos o plantillas operativas listas para copiar y aplicar hoy mismo.
3. **Entregables Especializados del Dominio (Traducidos y Adaptados al Español):**
   - ${specA}
   - ${specB}
4. **Blindaje de Riesgos y Prevención de Errores:** Identifica los 3 errores más costosos en esta área y proporciona contramedidas preventivas exactas.
5. **Plan de Implementación de 7 Días + KPIs:** Tabla de ejecución diaria con métricas cuantificables para validar el éxito desde la primera semana.

### [RESTRICCIONES DE CALIDAD Y BLOQUEO DE IDIOMA]
- **Regla Estricta:** ${constraints}
- Prohibido usar texto de relleno o marcadores truncados como "[Insertar aquí]".
- **IDIOMA DE SALIDA OBLIGATORIO:** Genera el 100% de tu respuesta final, incluyendo tablas, guiones y ejemplos, en **Español profesional e impecable**.`;

    case 'fr':
      return `### [RÔLE ET POSTURE D’EXPERT]
Agissez en tant que **${clusterLoc.rolePrefix} (${cat.roleTitle})** de renommée mondiale, disposant de plus de 15 ans d’expertise pratique dans le domaine **${clusterLoc.domainLabel} (${cat.shortTitle})**, avec une spécialisation pointue en **« ${topic} »**.

### [OBJECTIF PRINCIPAL ET CONTEXTE]
Votre mission est de concevoir un **${fw.names.fr}** exhaustif, rigoureux et directement exploitable en production pour **« ${topic} »**.
- **Audience Cible / Marché :** [AUDIENCE_CIBLE : ${audience}]
- **Objectif Stratégique Principal :** [OBJECTIF_PRINCIPAL : ${goal}]
- **Style et Ton d’Exécution :** [TON_ET_STYLE : ${style}]

### [PROTOCOLE D’EXÉCUTION EN 5 ÉTAPES]
Veuillez structurer votre réponse intégralement en français selon les 5 piliers suivants, sans aucune troncature ni généralité superficielle :
1. **Diagnostic Stratégique & Fondamentaux :** Déconstruisez les leviers déterminants de « ${topic} » et identifiez l’avantage compétitif majeur.
2. **Architecture Opérationnelle Complète (${fw.code}) :** Fournissez la méthodologie exacte, les scripts mot à mot, les formules ou les paramètres techniques prêts pour une mise en œuvre immédiate.
3. **Livrables Spécifiques au Domaine (Adaptés en Français) :**
   - ${specA}
   - ${specB}
4. **Analyse des Risques & Contre-Mesures :** Présentez les 3 pièges critiques les plus fréquents et le protocole exact pour les neutraliser.
5. **Feuille de Route sur 7 Jours & Indicateurs (KPIs) :** Dressez un plan d’action quotidien sous forme de tableau assorti de métriques de performance vérifiables.

### [CONTRAINTES DE QUALITÉ & VERROUILLAGE LINGUISTIQUE]
- **Exigence Impérative :** ${constraints}
- Interdiction formelle d’utiliser des espaces réservés inachevés du type « [Insérer ici] ».
- **LANGUE DE SORTIE OBLIGATOIRE :** Rédigez l’intégralité de votre réponse finale, y compris tous les modèles et tableaux, en **Français professionnel, précis et fluide**.`;

    case 'ja':
      return `### 【役割と専門ペルソナ】
あなたは**${clusterLoc.domainLabel}（${cat.shortTitle}）**分野、とりわけ**「${topic}」**において15年以上の最前線での実績を持つ世界トップクラスの**${clusterLoc.rolePrefix}（${cat.roleTitle}）**です。

### 【主要目的とコンテキスト設定】
あなたの任務は、**「${topic}」**に関する完全かつ即座に実務導入可能な**${fw.names.ja}**を構築することです。
- **対象読者・ターゲット市場：** [対象読者: ${audience}]
- **達成すべき最重要ゴール：** [最重要目標: ${goal}]
- **トーン＆スタイル要件：** [トーン＆スタイル: ${style}]

### 【5段階の体系的実行プロトコル】
抽象的な一般論や省略（「[ここに入力]」などの未完成プレースホルダー）を一切排除し、以下の5つのステップで日本語にて詳細に出力してください：
1. **第一原理に基づく戦略診断：** 「${topic}」における最重要の成功レバレッジ、隠れたボトルネック、および競合優位性を構造的に分解してください。
2. **完全実装ブループリント (${fw.code})：** 今すぐ現場に導入できる具体的なステップバイステップ手順、完全なスクリプト、技術パラメータ、または設計図を詳細に記述してください。
3. **専門領域別デリバラブル要件（日本語で完全に作成）：**
   - ${specA}
   - ${specB}
4. **失敗リスクの事前検証と対策（レッドチーム監査）：** 実務者が陥りやすい3大失敗パターンと、それを確実に防ぐ具体的な防御策を明示してください。
5. **7日間クイックウィン実行計画＆KPIスコアカード：** 初週で確実に成果を測定するための日別アクションプランと定量評価指標（KPI）をMarkdown表形式で提示してください。

### 【品質制約および出力言語ロック】
- **厳守事項：** ${constraints}
- **出力言語の完全固定：** すべての解説、テンプレート、スクリプト、表を含む最終出力の100%を、自然で格調高い**プロフェッショナルな日本語**で記述してください。`;

    case 'it':
      return `### [RUOLO E PROFILO ESPERTO]
Agisci come un **${clusterLoc.rolePrefix} (${cat.roleTitle})** di livello internazionale con oltre 15 anni di esperienza sul campo in **${clusterLoc.domainLabel} (${cat.shortTitle})** e una specializzazione verticale in **"${topic}"**.

### [OBIETTIVO PRINCIPALE E CONTESTO]
Il tuo compito è progettare un **${fw.names.it}** completo, dettagliato e immediatamente applicabile in produzione per **"${topic}"**.
- **Pubblico di Riferimento / Settore:** [PUBBLICO_TARGET: ${audience}]
- **Obiettivo Primario:** [OBIETTIVO_PRINCIPALE: ${goal}]
- **Stile e Tono di Voce:** [STILE_E_TONO: ${style}]

### [PROTOCOLLO DI ESECUZIONE IN 5 FASI]
Fornisci un’analisi approfondita e operativa interamente in italiano seguendo rigorosamente questi 5 passaggi:
1. **Diagnosi Strategica dai Primi Principi:** Identifica le leve ad alto impatto per "${topic}", i colli di bottiglia nascosti e il vantaggio competitivo.
2. **Architettura Operativa Completa (${fw.code}):** Sviluppa il sistema passo dopo passo con script completi parola per parola, parametri tecnici, formule o template pronti all’uso.
3. **Deliverable Specifici di Settore (Tradotti e Adattati in Italiano):**
   - ${specA}
   - ${specB}
4. **Prevenzione Errori e Gestione del Rischio:** Evidenzia i 3 errori più critici commessi nel settore e fornisci le soluzioni preventive esatte.
5. **Roadmap di Lancio in 7 Giorni e KPI:** Cronoprogramma giornaliero in tabella con metriche numeriche per misurare il ritorno sull’investimento.

### [VINCOLI DI QUALITÀ E LINGUA DI OUTPUT]
- **Regola Tassativa:** ${constraints}
- Non abbreviare il contenuto e non utilizzare segnaposto incompleti come "[Inserisci qui]".
- **LINGUA OBBLIGATORIA:** Genera il 100% della tua risposta finale, inclusi template, script e tabelle, in **Italiano professionale, incisivo e grammaticalmente impeccabile**.`;

    case 'de':
      return `### [ROLLE & EXPERTEN-PERSONA]
Handeln Sie als weltweit führender **${clusterLoc.rolePrefix} (${cat.roleTitle})** mit über 15 Jahren Praxiserfahrung im Bereich **${clusterLoc.domainLabel} (${cat.shortTitle})** und tiefgehender Spezialisierung auf **„${topic}“**.

### [HAUPTZIEL & KONTEXT]
Ihre Aufgabe ist die Entwicklung eines vollständigen, produktionsreifen **${fw.names.de}** für **„${topic}“**.
- **Zielgruppe / Marktsegment:** [ZIELGRUPPE: ${audience}]
- **Primäres Ergebnisziel:** [HAUPTZIEL: ${goal}]
- **Tonalität & Ausführungsstil:** [STIL_UND_TON: ${style}]

### [5-STUFEN-AUSFÜHRUNGSPROTOKOLL]
Erstellen Sie die gesamte Ausarbeitung auf Deutsch ohne oberflächliche Floskeln oder Platzhalter exakt nach dieser 5-teiligen Struktur:
1. **Strategische First-Principles-Diagnose:** Analysieren Sie die entscheidenden Erfolgshebel, Engpässe und Wettbewerbsvorteile für „${topic}“.
2. **Vollständige System-Architektur (${fw.code}):** Liefern Sie den exakten Schritt-für-Schritt-Leitfaden, wortgetreue Skripte, technische Parameter oder sofort einsetzbare Vorlagen.
3. **Fachspezifische Ergebnis-Spezifikationen (Vollständig auf Deutsch ausgeführt):**
   - ${specA}
   - ${specB}
4. **Risiko-Audit & Fehlerprävention:** Benennen Sie die 3 häufigsten Kardinalfehler in der Praxis sowie konkrete präventive Gegenmaßnahmen.
5. **7-Tage-Umsetzungsfahrplan & KPI-Scorecard:** Definieren Sie einen täglichen Aktionsplan als Tabelle mit präzisen, messbaren Erfolgsindikatoren.

### [QUALITÄTSVORGABEN & SPRACHFESTLEGUNG]
- **Strikte Vorgabe:** ${constraints}
- Keine Auslassungen oder unvollständigen Platzhalter wie „[Hier einfügen]“.
- **VERBINDLICHE AUSGABESPRACHE:** Verfassen Sie 100 % Ihrer gesamten Antwort, einschließlich aller Vorlagen, Tabellen und Skripte, in **präzisem, professionellem Deutsch**.`;

    case 'pt':
      return `### [PAPEL E PERSONA DE ESPECIALISTA]
Atue como um **${clusterLoc.rolePrefix} (${cat.roleTitle})** de elite global, com mais de 15 anos de experiência prática comprovada em **${clusterLoc.domainLabel} (${cat.shortTitle})** e domínio profundo em **"${topic}"**.

### [OBJETIVO PRINCIPAL E CONTEXTO]
Sua missão é estruturar um **${fw.names.pt}** completo, acionável e pronto para produção focado em **"${topic}"**.
- **Público-Alvo / Nicho:** [PÚBLICO_ALVO: ${audience}]
- **Objetivo Principal e Meta:** [META_PRINCIPAL: ${goal}]
- **Tom e Estilo de Execução:** [TOM_E_ESTILO: ${style}]

### [PROTOCOLO DE EXECUÇÃO EM 5 ETAPAS]
Desenvolva sua resposta integralmente em português seguindo rigorosamente estas 5 etapas, sem resumos superficiais:
1. **Diagnóstico Estratégico de Primeiros Princípios:** Mapeie as alavancas de maior impacto para "${topic}", gargalos ocultos e diferenciais competitivos.
2. **Arquitetura Prática Completa (${fw.code}):** Entregue o passo a passo exato, roteiros palavra por palavra, parâmetros técnicos ou modelos prontos para copiar e aplicar imediatamente.
3. **Entregáveis Específicos da Área (Adaptados Integralmente para o Português):**
   - ${specA}
   - ${specB}
4. **Blindagem de Erros e Mitigação de Riscos:** Aponte os 3 erros mais graves cometidos no mercado e como evitá-los completamente.
5. **Plano de Ação de 7 Dias e Indicadores (KPIs):** Cronograma diário de implementação em tabela com métricas claras de sucesso.

### [RESTRIÇÕES DE QUALIDADE E TRAVA DE IDIOMA]
- **Regra Obrigatória:** ${constraints}
- Nunca trunque a resposta nem utilize espaços genéricos como "[Inserir aqui]".
- **IDIOMA DE SAÍDA OBRIGATÓRIO:** Gere 100% da sua resposta final, incluindo todos os templates, scripts e tabelas, em **Português impecável, claro e altamente persuasivo**.`;

    case 'ar':
      return `### [الدور والهوية المهنية للخبير]
تصرف بصفتك **${clusterLoc.rolePrefix} (${cat.roleTitle})** عالمي المستوى يتمتع بخبرة عملية تتجاوز 15 عاماً في مجال **${clusterLoc.domainLabel} (${cat.shortTitle})**، مع تخصص دقيق وعميق في **"${topic}"**.

### [الهدف الرئيسي والسياق العام]
مهمتك هي تصميم وبناء **${fw.names.ar}** متكامل وقابل للتنفيذ الفوري حول موضوع **"${topic}"**.
- **الجمهور المستهدف / القطاع:** [الجمهور_المستهدف: ${audience}]
- **الهدف الأساسي والنتيجة المطلوبة:** [الهدف_الرئيسي: ${goal}]
- **الأسلوب ونبرة الصياغة:** [الأسلوب_والنبرة: ${style}]

### [بروتوكول التنفيذ المنهجي من 5 مراحل]
يرجى تقديم مخرجات شاملة وعملية باللغة العربية وفق المراحل الخمس التالية دون أي اختصار مخل أو عبارات عامة:
1. **التشخيص الاستراتيجي من المبادئ الأولى:** تحليل العوامل الحاسمة لنجاح "${topic}"، كشف نقاط الاختناق الخفية، وتحديد الفرص ذات الأثر الأعلى.
2. **المخطط التطبيقي الكامل (${fw.code}):** تقديم خطوات تنفيذية مفصلة، نصوص جاهزة للاستخدام الفوري، معادلات، أو إعدادات تقنية دقيقة.
3. **المخرجات التخصصية المطلوبة (مترجمة ومصاغة بالكامل باللغة العربية):**
   - ${specA}
   - ${specB}
4. **تدقيق المخاطر وتجنب الأخطاء الشائعة:** تحديد أخطر 3 أخطاء يقع فيها الممارسون في هذا المجال مع تقديم الحلول الوقائية الدقيقة.
5. **خطة العمل خلال 7 أيام ومؤشرات الأداء (KPIs):** جدول تنفيذي يومي مرفق بمعايير قياس رقمية واضحة.

### [ضوابط الجودة وتثبيت لغة المخرجات]
- **شرط إلزامي:** ${constraints}
- يمنع ترك أي فراغات ناقصة مثل "[أدخل هنا]"؛ قدم محتوى كاملاً وجاهزاً للتطبيق.
- **إلزامية اللغة العربية:** قدم كامل إجابتك النهائية (بنسبة 100% شاملة الجداول، النماذج، والنصوص) **باللغة العربية الفصحى الاحترافية، الدقيقة، والواضحة**.`;

    case 'zh':
      return `### 【专家角色与核心身份】
请扮演一位拥有15年以上一线实战经验的世界级 **${clusterLoc.rolePrefix}（${cat.roleTitle}）**，专精于 **${clusterLoc.domainLabel}（${cat.shortTitle}）** 领域，尤其在 **“${topic}”** 方向具备深厚的架构与落地能力。

### 【核心目标与任务背景】
您的任务是围绕 **“${topic}”** 构建一套完整、可直接投入生产环境的 **${fw.names.zh}**。
- **目标受众 / 细分赛道：** [目标受众: ${audience}]
- **核心业务/项目目标：** [核心目标: ${goal}]
- **基调与执行风格：** [语调与风格: ${style}]

### 【五步系统化执行协议】
请严格按照以下5个模块使用中文输出完整方案，杜绝空洞套话与省略号占位符：
1. **第一性原理战略诊断：** 深度剖析“${topic}”的核心增长杠杆、关键瓶颈与差异化破局点。
2. **完整实战执行蓝图 (${fw.code})：** 提供手把手的分步操作流程、逐字稿话术、技术参数或可直接复制套用的框架模板。
3. **领域专属交付标准（请完全使用中文编写并落地）：**
   - ${specA}
   - ${specB}
4. **红队风险审计与避坑指南：** 揭示该领域最致命的3个常见错误，并给出具体的防御性解决方案。
5. **7天快速落地清单与KPI计分卡：** 制定按天推进的执行时间表及可量化的核心评估指标（使用Markdown表格呈现）。

### 【质量约束与输出语言锁定】
- **硬性约束：** ${constraints}
- 严禁使用“[在此插入]”等未完成占位符，所有模板与案例必须100%完整编写。
- **输出语言强制锁定：** 请确保您输出的全部内容（包含所有表格、话术脚本、框架与案例）100%使用**专业、精炼、逻辑严密的简体中文**。`;

    case 'en':
    default:
      return `### [ROLE & EXPERT PERSONA]
Act as an elite, world-class **${cat.roleTitle}** with 15+ years of hands-on mastery in **${cat.shortTitle}**, specifically architected around **"${topic}"**.

### [PRIMARY OBJECTIVE & CONTEXT]
Your mission is to engineer a complete, production-ready **${fw.names.en}** tailored specifically for **"${topic}"**.
- **Target Audience / ICP:** [TARGET_AUDIENCE: ${audience}]
- **Primary Objective & Outcome:** [PRIMARY_GOAL: ${goal}]
- **Tone & Execution Style:** [TONE_STYLE: ${style}]

### [5-STAGE EXECUTION PROTOCOL]
Execute this deliverable systematically across the following 5 stages with zero generic fluff or truncated placeholders:
1. **First-Principles Strategic Diagnostic:** Deconstruct the highest-leverage drivers, hidden bottlenecks, and asymmetric opportunities inside "${topic}".
2. **Complete Production Blueprint (${fw.code}):** Provide the exact step-by-step system, word-for-word scripts, technical parameters, or operational templates ready for immediate deployment.
3. **Domain-Specific Deliverable Specifications:**
   - ${specA}
   - ${specB}
4. **Adversarial Risk Audit & Failure Prevention:** Identify the top 3 costly mistakes practitioners make in this workflow and supply exact preventive guardrails.
5. **7-Day Quick-Win Implementation Roadmap & KPIs:** Deliver a day-by-day execution table paired with quantifiable performance benchmarks.

### [QUALITY CONSTRAINTS & OUTPUT GUARDRAILS]
- **Mandatory Constraint:** ${constraints}
- Never truncate output or insert lazy placeholders like "[Insert rest here]".
- Format with clean Markdown hierarchy, comparison tables, and copy-ready blocks in **100% Professional English**.`;
  }
}

