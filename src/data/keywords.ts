// Standardized keyword canonicalization system
export const CANONICAL_KEYWORDS = {
  // Development
  FRONTEND: ['Frontend Developer', 'Front-end Developer', 'Développeur Front-end', 'Desenvolvedor Front-end', 'React Developer', 'Vue Developer', 'Angular Developer'],
  BACKEND: ['Backend Developer', 'Back-end Developer', 'Développeur Back-end', 'Desenvolvedor Back-end', 'Node.js Developer', 'Python Developer', 'Java Developer'],
  FULLSTACK: ['Full Stack Developer', 'Full-stack Developer', 'Développeur Full-stack', 'Desenvolvedor Full-stack'],
  MOBILE: ['Mobile Developer', 'iOS Developer', 'Android Developer', 'React Native Developer', 'Flutter Developer'],
  DEVOPS: ['DevOps Engineer', 'Ingénieur DevOps', 'Engenheiro DevOps', 'Site Reliability Engineer', 'Cloud Engineer'],
  
  // Design
  UI_UX: ['UI/UX Designer', 'User Experience Designer', 'User Interface Designer', 'Product Designer'],
  GRAPHIC: ['Graphic Designer', 'Visual Designer', 'Brand Designer', 'Graphiste'],
  WEB_DESIGN: ['Web Designer', 'Website Designer', 'Digital Designer'],
  
  // Marketing
  DIGITAL_MARKETING: ['Digital Marketing', 'Online Marketing', 'Internet Marketing', 'Marketing Digital'],
  CONTENT: ['Content Creator', 'Content Writer', 'Copywriter', 'Content Marketing'],
  SEO: ['SEO Specialist', 'Search Engine Optimization', 'SEO Expert'],
  SOCIAL_MEDIA: ['Social Media Manager', 'Social Media Marketing', 'Community Manager'],
  
  // Sales
  SALES_REP: ['Sales Representative', 'Account Executive', 'Sales Executive'],
  BUSINESS_DEV: ['Business Development', 'BD Manager', 'Partnership Manager'],
  
  // Support
  CUSTOMER_SUPPORT: ['Customer Support', 'Customer Service', 'Technical Support'],
  
  // Finance
  ACCOUNTING: ['Accountant', 'Bookkeeper', 'Financial Analyst'],
  FINANCE: ['Finance Manager', 'Financial Controller', 'CFO'],
  
  // Other
  PROJECT_MANAGER: ['Project Manager', 'Product Manager', 'Program Manager'],
  DATA_ANALYST: ['Data Analyst', 'Business Analyst', 'Data Scientist'],
  HR: ['HR Manager', 'Human Resources', 'Talent Acquisition', 'Recruiter']
};

export const INDUSTRIES = [
  { id: 'technology', name: 'Technology', keywords: ['FRONTEND', 'BACKEND', 'FULLSTACK', 'MOBILE', 'DEVOPS'] },
  { id: 'design', name: 'Design & Creative', keywords: ['UI_UX', 'GRAPHIC', 'WEB_DESIGN'] },
  { id: 'marketing', name: 'Marketing & Communications', keywords: ['DIGITAL_MARKETING', 'CONTENT', 'SEO', 'SOCIAL_MEDIA'] },
  { id: 'sales', name: 'Sales & Business Development', keywords: ['SALES_REP', 'BUSINESS_DEV'] },
  { id: 'support', name: 'Customer Support', keywords: ['CUSTOMER_SUPPORT'] },
  { id: 'finance', name: 'Finance & Accounting', keywords: ['ACCOUNTING', 'FINANCE'] },
  { id: 'management', name: 'Management & Operations', keywords: ['PROJECT_MANAGER', 'HR'] },
  { id: 'analytics', name: 'Data & Analytics', keywords: ['DATA_ANALYST'] }
];

export const RESPONSIBILITIES = {
  FRONTEND: [
    'Build responsive web interfaces',
    'Develop React components',
    'Implement UI/UX designs',
    'Optimize web performance',
    'Cross-browser compatibility testing',
    'Mobile-first development',
    'API integration',
    'Code reviews and mentoring'
  ],
  BACKEND: [
    'Design database schemas',
    'Develop REST APIs',
    'Implement authentication systems',
    'Server optimization',
    'Database management',
    'Security implementation',
    'Microservices architecture',
    'Performance monitoring'
  ],
  UI_UX: [
    'User research and analysis',
    'Create wireframes and prototypes',
    'Design user interfaces',
    'Conduct usability testing',
    'Information architecture',
    'Design systems creation',
    'Accessibility compliance',
    'Cross-platform design'
  ],
  DIGITAL_MARKETING: [
    'Campaign strategy development',
    'Social media management',
    'Content creation and curation',
    'SEO optimization',
    'Analytics and reporting',
    'Email marketing campaigns',
    'Paid advertising management',
    'Brand management'
  ]
};

export const EXPERIENCE_LEVELS = [
  { id: 'entry', name: 'Entry Level (0-2 years)', value: 0 },
  { id: 'junior', name: 'Junior (2-4 years)', value: 2 },
  { id: 'mid', name: 'Mid Level (4-7 years)', value: 4 },
  { id: 'senior', name: 'Senior (7-10 years)', value: 7 },
  { id: 'lead', name: 'Lead/Principal (10+ years)', value: 10 }
];

export const WORK_TYPES = [
  { id: 'full-time', name: 'Full-time' },
  { id: 'contract', name: 'Contract' },
  { id: 'freelance', name: 'Freelance' },
  { id: 'internship', name: 'Internship' },
  { id: 'part-time', name: 'Part-time' }
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ru', name: 'Russian' }
];

export const LANGUAGE_LEVELS = [
  { id: 'basic', name: 'Basic' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
  { id: 'native', name: 'Native/Fluent' }
];

// Utility functions
export const canonicalizeKeyword = (keyword: string): string | null => {
  for (const [canonical, variants] of Object.entries(CANONICAL_KEYWORDS)) {
    if (variants.some(variant => variant.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(variant.toLowerCase()))) {
      return canonical;
    }
  }
  return null;
};

export const getKeywordSuggestions = (input: string): string[] => {
  const suggestions: string[] = [];
  const inputLower = input.toLowerCase();
  
  for (const variants of Object.values(CANONICAL_KEYWORDS)) {
    for (const variant of variants) {
      if (variant.toLowerCase().includes(inputLower)) {
        suggestions.push(variant);
      }
    }
  }
  
  return suggestions.slice(0, 8); // Limit to 8 suggestions
};

export const calculateMatch = (jobSeekerKeywords: string[], employerKeywords: string[]): number => {
  if (jobSeekerKeywords.length === 0 || employerKeywords.length === 0) return 0;
  
  const jobSeekerCanonical = jobSeekerKeywords.map(canonicalizeKeyword).filter(Boolean);
  const employerCanonical = employerKeywords.map(canonicalizeKeyword).filter(Boolean);
  
  const intersection = jobSeekerCanonical.filter(keyword => employerCanonical.includes(keyword));
  const union = [...new Set([...jobSeekerCanonical, ...employerCanonical])];
  
  if (intersection.length === 0) return 0; // Automatic exclusion if no match
  
  return Math.round((intersection.length / union.length) * 100);
};
