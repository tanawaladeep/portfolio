export interface ProjectData {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  problemSolved: string;
  technologies: string[];
  features: string[];
  category: string;
  image: string;
  githubUrl: string;
  liveUrl?: string;
  projectStatus: 'Completed' | 'In Progress' | 'Active Development' | 'Production Ready';
  featured: boolean;
  order: number;
}

export const initialProjects: ProjectData[] = [
  {
    title: 'QR Code Generator Android App',
    slug: 'qr-code-generator-android-app',
    tagline: 'Native Android App to Generate, Save & Share High-Definition QR Codes',
    description: 'An Android application built using Kotlin and Android Studio that dynamically converts custom text, URLs, and contact data into high-resolution QR codes. Features immediate real-time rendering, saving QR code image bitmaps to external/local storage, and distributing them across messaging and email platforms via Android Intent sharing.',
    problemSolved: 'Provides an offline-first, lightning-fast utility to generate scannable barcodes and QR codes on Android devices without third-party ad clutter or internet reliance.',
    technologies: ['Kotlin', 'Android Studio', 'Android SDK', 'Gradle', 'ZXing Barcode Library', 'Material Design', 'Android Intent API'],
    features: [
      'Real-time QR code generation from text, web URLs, and custom input strings',
      'High-definition bitmap rendering and visual display within an interactive viewport',
      'Direct image saving capability into device storage with file management permissions',
      'One-tap Android Intent distribution to share generated QR codes across installed apps',
      'Responsive Material UI layout optimized for modern Android phone form factors'
    ],
    category: 'Android & Mobile',
    image: '/projects/qr-code-app.png',
    githubUrl: 'https://github.com/tanawaladeep/QR-Code-Generator-Android-App',
    liveUrl: '',
    projectStatus: 'Completed',
    featured: true,
    order: 1,
  },
  {
    title: 'Android Multi-Module Application Suite',
    slug: 'android-multi-app-suite',
    tagline: 'Comprehensive Kotlin & Android Studio Suite of 5 Functional Applications',
    description: 'A modular repository built in Android Studio with Kotlin, housing 5 distinct native mobile applications: E-Commerce Product Catalog, Personal Expense Tracker, Notes Management System, Priority Task Manager, and Weather Forecast App. Demonstrates mastery of Android architecture, Gradle build systems, and UI components.',
    problemSolved: 'Demonstrates end-to-end mobile engineering proficiencies across state management, data modeling, local storage, user input validation, and asynchronous processing across 5 individual applications.',
    technologies: ['Kotlin', 'Android Studio', 'Android SDK', 'Gradle KTS', 'RecyclerView', 'Material Design Components', 'Local Storage'],
    features: [
      'E-Commerce Catalog App: Product grid browsing, category filtering, and item detail views',
      'Expense Tracker App: Daily expense recording, category breakdowns, and financial logging',
      'Notes Management App: Clean text note authoring, updating, and searchable listing',
      'Task Management App: Interactive checklist with priority flags and status toggling',
      'Weather Forecast App: Condition monitoring, atmospheric metrics, and temperature displays'
    ],
    category: 'Android & Mobile',
    image: '/projects/android-suite.png',
    githubUrl: 'https://github.com/tanawaladeep/Task-2--6-',
    liveUrl: '',
    projectStatus: 'Completed',
    featured: true,
    order: 2,
  },
  {
    title: 'Expense Tracker Mobile App',
    slug: 'expense-tracker-app',
    tagline: 'Personal Budgeting & Transaction Ledger with Category Breakdown',
    description: 'A mobile finance companion application developed in Kotlin within Android Studio. Allows users to categorize daily expenditures (Food, Travel, Utilities, Education), track monthly budgets, and analyze spending habits with organized transaction lists.',
    problemSolved: 'Helps users eliminate budget deficits by providing an intuitive, lightweight mobile ledger to record expenses on-the-go without complex accounting jargon.',
    technologies: ['Kotlin', 'Android Studio', 'Android SDK', 'Gradle', 'RecyclerView', 'Material Design', 'SQLite/Storage'],
    features: [
      'Quick transaction entry modal with date, amount, category, and remarks',
      'Categorized ledger view with visual color tagging for expense identification',
      'Total expenditure calculations with remaining budget warnings',
      'Persistent local storage preserving records across app restart cycles'
    ],
    category: 'Android & Mobile',
    image: '/projects/expense-tracker.png',
    githubUrl: 'https://github.com/tanawaladeep/Task-2--6-',
    liveUrl: '',
    projectStatus: 'Completed',
    featured: false,
    order: 3,
  },
  {
    title: 'Weather Forecast Mobile App',
    slug: 'weather-forecast-app',
    tagline: 'Real-Time Atmospheric Metrics, Temperature & Multi-Day Weather Insights',
    description: 'A dedicated Android weather forecasting application built in Android Studio. Features location-based weather monitoring, temperature indices, humidity, wind conditions, and atmospheric visibility forecasting.',
    problemSolved: 'Delivers accurate local meteorological insights with responsive card layouts, helping users plan outdoor travel and commute safely.',
    technologies: ['Kotlin', 'Android Studio', 'Android SDK', 'REST API Integration', 'JSON Parsing', 'Material Design'],
    features: [
      'Dynamic weather status display (Sunny, Rainy, Overcast, Thunderstorm)',
      'Detailed metrics: Current temperature, feels-like temperature, humidity & wind speed',
      'Clean card-based forecast presentation adhering to Android Material guidelines',
      'Graceful offline error state handling when network is unreachable'
    ],
    category: 'Android & Mobile',
    image: '/projects/weather-app.png',
    githubUrl: 'https://github.com/tanawaladeep/Weather-Forecast-App',
    liveUrl: '',
    projectStatus: 'Active Development',
    featured: false,
    order: 4,
  },
  {
    title: 'E-Commerce Product Catalog App',
    slug: 'ecommerce-product-catalog-app',
    tagline: 'Interactive Mobile Shopping Catalog with Filterable Product Displays',
    description: 'A native Android shopping application interface implemented with Kotlin and Android Studio. Provides smooth catalog scrolling using optimized RecyclerView viewholders, category filtering, search, and detailed item cards.',
    problemSolved: 'Demonstrates mobile e-commerce UI patterns with memory-efficient list recycling, preventing UI lag during extensive catalog browsing.',
    technologies: ['Kotlin', 'Android Studio', 'Android SDK', 'RecyclerView', 'ViewBinding', 'Material Components'],
    features: [
      'Memory-efficient RecyclerView implementation with custom adapter & viewholders',
      'Dynamic category filtering for electronics, clothing, and accessories',
      'Product detail modal showing description, price specifications, and stock status',
      'Interactive cart quantity modifier with live price sum computation'
    ],
    category: 'Android & Mobile',
    image: '/projects/ecommerce-catalog.png',
    githubUrl: 'https://github.com/tanawaladeep/Task-2--6-',
    liveUrl: '',
    projectStatus: 'Completed',
    featured: false,
    order: 5,
  }
];
