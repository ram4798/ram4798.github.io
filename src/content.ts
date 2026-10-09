const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

export const profile = {
  name: 'Rama Gangumalla',
  role: 'Data Engineer',
  location: 'Austin, Texas',
  email: 'ramarayudu.g@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rayudu-gangumallaa/',
  resume: asset('Rama-Gangumalla-Resume.pdf'),
  portrait: asset('rama-portrait-about.jpg') + '?v=d31d05b90692',
  hero: asset('hero-scene.jpg') + '?v=8621cea6043d',
  video: asset('rama-introduction.mp4') + '?v=8621cea6043d',
  bio: [
    'I’m a Data Engineer with 4+ years of experience building ETL/ELT pipelines, designing data models, and delivering analytics with Python, PySpark, SQL, and Power BI. My recent work at AMD includes Databricks pipelines that process millions of performance-test results each day and an internal application connecting workflow discovery, test planning, and performance reporting.',
    'My work spans data engineering and the applications that help people use data, from curated lakehouse layers to APIs and interactive dashboards.',
  ],
};

export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export const categories = ['Languages', 'Cloud & Lakehouse', 'Data Engineering', 'Applications', 'BI & Tools'] as const;
export type Category = (typeof categories)[number];
export const categoryIds: Record<Category, string> = {
  Languages: 'languages',
  'Cloud & Lakehouse': 'cloud',
  'Data Engineering': 'data',
  Applications: 'applications',
  'BI & Tools': 'tools',
};
export interface Skill {
  symbol: string;
  name: string;
  category: Category;
  description: string;
  context?: string;
}

export const skills: Skill[] = [
  { symbol: 'Py', name: 'Python', category: 'Languages', description: 'A practical language for data processing, automation, and backend applications.', context: 'Python, PySpark, and FastAPI appear throughout my data engineering work.' },
  { symbol: 'SQL', name: 'SQL', category: 'Languages', description: 'Querying, transforming, and modeling data for reliable reporting.', context: 'Used for performance reporting at AMD and clickstream transformations at Wayfair.' },
  { symbol: 'Ts', name: 'TypeScript', category: 'Languages', description: 'Typed JavaScript for maintainable application interfaces.' },
  { symbol: 'C+', name: 'C/C++', category: 'Languages', description: 'Programming languages for lower-level applications.', context: 'Built a C++ pothole-detection application at Kennesaw State University.' },
  { symbol: 'ADF', name: 'Azure Data Factory', category: 'Cloud & Lakehouse', description: 'Orchestrating data movement and transformation across source systems.', context: 'Supported an insurance-data migration to Azure at TCS.' },
  { symbol: 'ADL', name: 'ADLS Gen2', category: 'Cloud & Lakehouse', description: 'Azure Data Lake Storage Gen2 stores raw and curated datasets for analytics.', context: 'Used for performance-test data at AMD and Bronze, Silver, and Gold layers at Wayfair.' },
  { symbol: 'EH', name: 'Azure Event Hubs', category: 'Cloud & Lakehouse', description: 'Ingesting event streams for downstream data processing.', context: 'Ingested web and mobile clickstream events at Wayfair.' },
  { symbol: 'Syn', name: 'Azure Synapse Analytics', category: 'Cloud & Lakehouse', description: 'Serving analytical datasets and reporting workloads.', context: 'Loaded curated clickstream datasets into Synapse at Wayfair.' },
  { symbol: 'Db', name: 'Databricks', category: 'Cloud & Lakehouse', description: 'Building and running data pipelines in a unified lakehouse environment.', context: 'Built scheduled pipelines processing millions of performance-test results daily at AMD.' },
  { symbol: 'Sp', name: 'Apache Spark', category: 'Cloud & Lakehouse', description: 'Distributed processing for large data transformations.' },
  { symbol: 'PSp', name: 'PySpark', category: 'Cloud & Lakehouse', description: 'Python-based distributed data transformations with Spark.', context: 'Optimized transformations at AMD, reducing processing time by 25% versus prior Spark jobs.' },
  { symbol: 'ETL', name: 'ETL/ELT', category: 'Data Engineering', description: 'Moving source data into usable analytical datasets through extraction, loading, and transformation.', context: 'Built and maintained pipelines at AMD, Wayfair, and TCS.' },
  { symbol: 'Med', name: 'Medallion Architecture', category: 'Data Engineering', description: 'Organizing lakehouse data into progressively refined Bronze, Silver, and Gold layers.', context: 'Managed these layers in ADLS Gen2 at Wayfair.' },
  { symbol: 'DM', name: 'Data Modeling', category: 'Data Engineering', description: 'Structuring data around useful entities, relationships, and reporting needs.', context: 'Designed performance-test models at AMD and reporting models at Wayfair.' },
  { symbol: 'DW', name: 'Data Warehousing', category: 'Data Engineering', description: 'Organizing analytical data for consistent reporting and exploration.' },
  { symbol: 'OL', name: 'OLAP', category: 'Data Engineering', description: 'Multidimensional analysis of business and operational data.', context: 'Maintained OLAP reporting for health-insurance metrics at TCS.' },
  { symbol: 'PT', name: 'Performance Tuning', category: 'Data Engineering', description: 'Improving transformations and queries by addressing processing and model bottlenecks.', context: 'Reduced processing time by 25% at AMD and reporting-query runtime by 30% at Wayfair.' },
  { symbol: 'MM', name: 'Metadata Management', category: 'Data Engineering', description: 'Organizing the information that describes datasets and their structure.' },
  { symbol: 'Ng', name: 'Angular', category: 'Applications', description: 'Building interactive, structured web interfaces.', context: 'Built AMD’s workflow-planning interface and GEMM reporting experience.' },
  { symbol: 'Fa', name: 'FastAPI', category: 'Applications', description: 'Building Python APIs with clear request and response contracts.', context: 'Built the backend for workflow discovery, test planning, and GEMM reporting at AMD.' },
  { symbol: 'SA', name: 'SQLAlchemy', category: 'Applications', description: 'Working with relational databases through Python SQL tools and object mapping.' },
  { symbol: 'API', name: 'REST APIs', category: 'Applications', description: 'Connecting applications through resource-oriented HTTP interfaces.', context: 'Exposed Redis-backed synchronization status through REST endpoints at AMD.' },
  { symbol: 'Pg', name: 'PostgreSQL', category: 'Applications', description: 'Relational storage for structured application data.', context: 'Used in AMD’s three-tier workflow and test-planning application.' },
  { symbol: 'My', name: 'MySQL', category: 'Applications', description: 'Relational database management and SQL-based data access.' },
  { symbol: 'Rd', name: 'Redis', category: 'Applications', description: 'Fast in-memory storage for application state and progress tracking.', context: 'Tracked Databricks synchronization progress in AMD’s internal application.' },
  { symbol: 'BI', name: 'Power BI', category: 'BI & Tools', description: 'Developing dashboards, dataflows, datamarts, and analytical models.', context: 'Delivered reporting at AMD, Wayfair, Kennesaw State University, and TCS.' },
  { symbol: 'AAS', name: 'Azure Analysis Services', category: 'BI & Tools', description: 'Providing semantic models for business intelligence.', context: 'Developed analytical models with engineers and analysts at Wayfair.' },
  { symbol: 'Dq', name: 'Databricks SQL', category: 'BI & Tools', description: 'Querying lakehouse data through SQL views and analytical endpoints.', context: 'Backed AMD’s GEMM benchmark reporting with a Databricks SQL view.' },
  { symbol: 'Ob', name: 'OBIEE', category: 'BI & Tools', description: 'Enterprise reporting and analysis of multidimensional datasets.', context: 'Developed insurance and HR reports at TCS.' },
  { symbol: 'Lx', name: 'Linux', category: 'BI & Tools', description: 'Working in Linux-based development and data environments.' },
  { symbol: 'Git', name: 'Git', category: 'BI & Tools', description: 'Tracking code changes and collaborating through version control.' },
  { symbol: 'Dk', name: 'Docker', category: 'BI & Tools', description: 'Packaging applications and their dependencies into containers.', context: 'Containerized AMD’s internal application stack.' },
  { symbol: 'Dc', name: 'Docker Compose', category: 'BI & Tools', description: 'Configuring and running multiple application services together.', context: 'Used for the Angular, FastAPI, PostgreSQL, and Redis application at AMD.' },
  { symbol: 'GH', name: 'GitHub Actions', category: 'BI & Tools', description: 'Automating build and test workflows.', context: 'Set up CI for backend tests and frontend builds at AMD.' },
  { symbol: 'Ok', name: 'Okta', category: 'BI & Tools', description: 'Integrating single sign-on into application access.', context: 'Integrated Okta SSO into AMD’s workflow and test-planning platform.' },
];

export interface CaseStudy {
  id: string;
  number: string;
  company: string;
  title: string;
  shortTitle: string;
  kind: string;
  description: string;
  technologies: string[];
  outcome?: { value: string; label: string; context: string };
  context: string;
  built: string[];
  pipeline: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'performance-lakehouse', number: '01', company: 'AMD',
    title: 'Performance Data Lakehouse', shortTitle: 'Performance Data Lakehouse', kind: 'DATA ENGINEERING',
    description: 'From millions of daily performance-test results to curated data that engineering teams can use.',
    technologies: ['Databricks', 'PySpark', 'SQL', 'ADLS', 'ETL/ELT'],
    outcome: { value: '25%', label: 'less processing time', context: 'Compared with the previous Spark jobs at AMD.' },
    context: 'Internal performance-test systems produce millions of results each day. The work connects that source data to curated analytics layers in Azure Data Lake Storage.',
    built: [
      'Designed data models and built Databricks ETL/ELT pipelines to ingest daily performance-test results.',
      'Transformed the data into curated analytics layers with PySpark notebooks and scheduled jobs.',
      'Optimized the transformations, reducing processing time by 25% versus the prior Spark jobs.',
      'Developed Power BI dashboards on curated test metrics for performance-engineering teams.',
    ],
    pipeline: ['Test results', 'Databricks', 'Curated lakehouse', 'Analytics'],
  },
  {
    id: 'workflow-platform', number: '02', company: 'AMD',
    title: 'Workflow and Test Planning Platform', shortTitle: 'Workflow & Test Planning', kind: 'APPLICATION DEVELOPMENT',
    description: 'One interface for discovering workflows, planning tests, and submitting Excel intake sheets to lab scheduling.',
    technologies: ['Angular', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker Compose', 'GitHub Actions'],
    context: 'Workflow discovery, test planning, Excel intake, and lab submission needed to be connected through a single internal application.',
    built: [
      'Built a three-tier application with an Angular interface, FastAPI backend, PostgreSQL, and Redis.',
      'Connected Databricks workflow discovery to test planning, Excel intake generation, and lab scheduling submission.',
      'Implemented Okta SSO, cookie-based JWT authentication, CSRF protection, API keys, and tenant-scoped data isolation in the service layer.',
      'Loaded workflow, task, station, and team dimensions into a local cache with an admin-triggered sync and Redis-backed progress tracking.',
      'Containerized the stack with Docker Compose and configured GitHub Actions CI for backend tests and frontend builds.',
    ],
    pipeline: ['Discover workflows', 'Plan tests', 'Generate intake', 'Lab scheduling'],
  },
  {
    id: 'clickstream-analytics', number: '03', company: 'Wayfair',
    title: 'Clickstream Analytics Pipeline', shortTitle: 'Clickstream Analytics', kind: 'STREAMING & ANALYTICS',
    description: 'Web and mobile events, transformed into a clear view of conversion, drop-off, and session abandonment.',
    technologies: ['Azure Event Hubs', 'ADLS Gen2', 'PySpark', 'SQL', 'Azure Synapse', 'Power BI'],
    outcome: { value: '30%', label: 'faster reporting queries', context: 'Runtime reduction versus prior unoptimized reporting models at Wayfair.' },
    context: 'Web and mobile clickstream events support near real-time funnel analysis and downstream reporting across checkout journeys.',
    built: [
      'Ingested web and mobile SDK events through Azure Event Hubs.',
      'Managed daily incremental data in Bronze, Silver, and Gold layers in ADLS Gen2.',
      'Developed PySpark and SQL transformations for conversion, drop-off, and session-abandonment metrics, with cleansing and validation checks.',
      'Loaded curated datasets into Azure Synapse Analytics and tuned reporting models through partitioning, indexing, and join optimization.',
      'Built Power BI dataflows, datamarts, datasets, and Azure Analysis Services models with reporting stakeholders.',
    ],
    pipeline: ['Web & mobile', 'Event Hubs', 'Bronze → Gold', 'Funnel reporting'],
  },
  {
    id: 'gemm-reporting', number: '04', company: 'AMD',
    title: 'GEMM Performance Reporting', shortTitle: 'GEMM Performance Reporting', kind: 'PERFORMANCE ANALYTICS',
    description: 'Interactive benchmark reporting that queries current data and lets engineers explore the metrics that matter.',
    technologies: ['Databricks SQL', 'FastAPI', 'Angular'],
    context: 'General matrix multiply (GEMM) benchmark results need an interface for filtering, inspecting KPIs, and comparing performance.',
    built: [
      'Backed benchmark reporting with a Databricks SQL view, querying current data on each request.',
      'Exposed date and column filters and KPI cards through the reporting interface.',
      'Delivered a configurable chart builder using Angular and FastAPI.',
    ],
    pipeline: ['Benchmark data', 'SQL view', 'FastAPI', 'Interactive reports'],
  },
];

export const experience = [
  { company: 'AMD', role: 'Data Engineer', dates: 'Apr 2025 – Present', current: true, bullets: [
    'Built Databricks pipelines processing millions of performance-test results daily.',
    'Optimized PySpark transformations, reducing processing time by 25% versus previous Spark jobs.',
    'Built an internal workflow and test-planning application with Angular and FastAPI.',
    'Delivered GEMM performance reporting and Power BI dashboards.',
  ], tags: ['Databricks', 'PySpark', 'Azure', 'FastAPI', 'Power BI'] },
  { company: 'Wayfair', role: 'Data Engineer', dates: 'Oct 2023 – Mar 2025', current: false, bullets: [
    'Built web and mobile clickstream ingestion through Azure Event Hubs.',
    'Managed Bronze, Silver, and Gold lakehouse layers in ADLS Gen2.',
    'Developed funnel-conversion, drop-off, and session-abandonment transformations.',
    'Optimized reporting models, reducing query runtime by 30%.',
    'Built reporting models with Power BI and Azure Analysis Services.',
  ], tags: ['Event Hubs', 'ADLS Gen2', 'Synapse', 'Power BI'] },
  { company: 'Kennesaw State University', role: 'Graduate Research and Teaching Assistant', dates: 'Aug 2022 – May 2023', current: false, bullets: [
    'Configured V2X devices for traffic monitoring and emergency-vehicle preemption.',
    'Modeled traffic scenarios and vehicle flow using SUMO.',
    'Built a C++ pothole-detection application with SQL reporting.',
    'Created Power BI dashboards for emergency-vehicle flow and signal status.',
  ], tags: ['C++', 'SQL', 'SUMO', 'Power BI'] },
  { company: 'Tata Consultancy Services', role: 'System Engineer', dates: 'Feb 2020 – Dec 2021', current: false, bullets: [
    'Maintained ETL operations and OLAP reporting for health-insurance data.',
    'Developed Power BI dashboards and OBIEE reports.',
    'Supported Azure migration using Data Factory and ADLS Gen2.',
  ], tags: ['ETL', 'OLAP', 'ADF', 'Power BI'] },
];

export const education = [
  { degree: 'Master of Science', field: 'Computer Science', school: 'Kennesaw State University', dates: 'Jan 2022 – May 2023' },
  { degree: 'Bachelor of Technology', field: 'Mechanical Engineering', school: 'R.V.R. & J.C. College of Engineering', dates: 'Jun 2015 – May 2019' },
];
export const certifications = ['AWS Certified Data Engineer – Associate', 'Microsoft Certified: Azure Database Administrator Associate'];
