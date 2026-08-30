import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/afdb_core';

const teamColors = ['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-indigo-500', 'bg-teal-500'];

function makeMilestones(base: { name: string; status: 'completed' | 'in-progress' | 'pending'; monthsOffset: number }[], startDate: Date) {
  return base.map(m => ({
    name: m.name,
    status: m.status,
    date: new Date(new Date(startDate).setMonth(startDate.getMonth() + m.monthsOffset)),
  }));
}

function makeTeam(members: { name: string; role: string }[]) {
  return members.map((m, i) => ({
    name: m.name,
    role: m.role,
    initials: m.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
    color: teamColors[i % teamColors.length],
  }));
}

const projects = [
  {
    name: 'East Africa Transport Corridor',
    code: 'AFDB-EAC-001',
    status: 'active',
    country: 'Kenya, Tanzania',
    budget: 120000000,
    currency: 'USD',
    sector: 'Infrastructure',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2027-12-31'),
    manager: 'James Mwangi',
    description: 'Modernizing transport infrastructure across East Africa including roads, railways, and ports to enhance regional connectivity and trade.',
    progress: 62,
    milestones: makeMilestones([
      { name: 'Feasibility Study', status: 'completed', monthsOffset: 2 },
      { name: 'Environmental Assessment', status: 'completed', monthsOffset: 5 },
      { name: 'Design & Engineering', status: 'in-progress', monthsOffset: 12 },
      { name: 'Construction Phase 1', status: 'pending', monthsOffset: 18 },
      { name: 'Testing & Commissioning', status: 'pending', monthsOffset: 36 },
    ], new Date('2024-03-15')),
    team: makeTeam([
      { name: 'James Mwangi', role: 'Project Lead' },
      { name: 'Sarah Kimani', role: 'Civil Engineer' },
      { name: 'David Ochieng', role: 'Environmental Specialist' },
      { name: 'Amina Hassan', role: 'Financial Analyst' },
    ]),
  },
  {
    name: 'West Africa Power Pool',
    code: 'AFDB-WAP-002',
    status: 'active',
    country: 'Ghana, Nigeria',
    budget: 85000000,
    currency: 'USD',
    sector: 'Energy',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2028-06-30'),
    manager: 'Kwame Asante',
    description: 'Developing cross-border power transmission infrastructure to enable electricity trading across West African nations.',
    progress: 38,
    milestones: makeMilestones([
      { name: 'Grid Assessment', status: 'completed', monthsOffset: 3 },
      { name: 'Transmission Line Design', status: 'in-progress', monthsOffset: 10 },
      { name: 'Substation Construction', status: 'pending', monthsOffset: 20 },
      { name: 'Grid Interconnection', status: 'pending', monthsOffset: 36 },
    ], new Date('2024-06-01')),
    team: makeTeam([
      { name: 'Kwame Asante', role: 'Project Lead' },
      { name: 'Fatima Bello', role: 'Electrical Engineer' },
      { name: 'Emeka Nwankwo', role: 'Grid Specialist' },
    ]),
  },
  {
    name: 'Sahel Region Development Program',
    code: 'AFDB-SHL-003',
    status: 'active',
    country: 'Mali, Niger',
    budget: 45000000,
    currency: 'USD',
    sector: 'Multi-sector',
    startDate: new Date('2025-01-10'),
    endDate: new Date('2029-06-30'),
    manager: 'Ibrahim Touré',
    description: 'Comprehensive development program targeting agriculture, water management, and community infrastructure in the Sahel region.',
    progress: 18,
    milestones: makeMilestones([
      { name: 'Community Needs Assessment', status: 'completed', monthsOffset: 2 },
      { name: 'Water Infrastructure Design', status: 'in-progress', monthsOffset: 8 },
      { name: 'Agricultural Pilot Program', status: 'pending', monthsOffset: 14 },
      { name: 'Community Centers Construction', status: 'pending', monthsOffset: 24 },
    ], new Date('2025-01-10')),
    team: makeTeam([
      { name: 'Ibrahim Touré', role: 'Program Director' },
      { name: 'Mariam Traoré', role: 'Agriculture Specialist' },
      { name: 'Ousmane Cissé', role: 'Water Engineer' },
      { name: 'Aïssata Koné', role: 'Social Development' },
    ]),
  },
  {
    name: 'North Africa Infrastructure Modernization',
    code: 'AFDB-NAI-004',
    status: 'active',
    country: 'Egypt, Morocco',
    budget: 200000000,
    currency: 'USD',
    sector: 'Infrastructure',
    startDate: new Date('2023-09-01'),
    endDate: new Date('2026-09-30'),
    manager: 'Hassan Mahmoud',
    description: 'Large-scale infrastructure modernization program including highways, bridges, and urban transit systems across North Africa.',
    progress: 75,
    milestones: makeMilestones([
      { name: 'Master Plan Approval', status: 'completed', monthsOffset: 2 },
      { name: 'Highway Phase 1 Complete', status: 'completed', monthsOffset: 12 },
      { name: 'Bridge Construction', status: 'completed', monthsOffset: 20 },
      { name: 'Urban Transit System', status: 'in-progress', monthsOffset: 28 },
      { name: 'Final Inspection & Handover', status: 'pending', monthsOffset: 36 },
    ], new Date('2023-09-01')),
    team: makeTeam([
      { name: 'Hassan Mahmoud', role: 'Project Lead' },
      { name: 'Laila Benjelloun', role: 'Structural Engineer' },
      { name: 'Omar El-Said', role: 'Transport Planner' },
      { name: 'Nadia Cherkaoui', role: 'Urban Development' },
      { name: 'Youssef Amine', role: 'Quality Assurance' },
    ]),
  },
  {
    name: 'Central Africa Digital Initiative',
    code: 'AFDB-CAD-005',
    status: 'active',
    country: 'DRC, Cameroon',
    budget: 30000000,
    currency: 'USD',
    sector: 'Digital',
    startDate: new Date('2025-06-01'),
    endDate: new Date('2029-12-31'),
    manager: 'Patrick Ndoki',
    description: 'Digital transformation initiative to expand broadband connectivity, e-government services, and digital literacy across Central Africa.',
    progress: 10,
    milestones: makeMilestones([
      { name: 'Digital Readiness Assessment', status: 'completed', monthsOffset: 3 },
      { name: 'Fiber Optic Network Design', status: 'in-progress', monthsOffset: 10 },
      { name: 'E-Government Platform Launch', status: 'pending', monthsOffset: 24 },
      { name: 'Digital Literacy Rollout', status: 'pending', monthsOffset: 36 },
    ], new Date('2025-06-01')),
    team: makeTeam([
      { name: 'Patrick Ndoki', role: 'Program Director' },
      { name: 'Claire Mbeki', role: 'IT Infrastructure' },
      { name: 'Alain Biya', role: 'Digital Policy' },
    ]),
  },
  {
    name: 'Southern Africa Water Sanitation',
    code: 'AFDB-SAW-006',
    status: 'active',
    country: 'Zambia, Zimbabwe',
    budget: 62000000,
    currency: 'USD',
    sector: 'Agriculture',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2027-08-15'),
    manager: 'Tendai Moyo',
    description: 'Improving water sanitation and irrigation infrastructure to support agriculture and public health in Southern Africa.',
    progress: 50,
    milestones: makeMilestones([
      { name: 'Water Source Assessment', status: 'completed', monthsOffset: 2 },
      { name: 'Treatment Plant Design', status: 'completed', monthsOffset: 6 },
      { name: 'Pipeline Construction', status: 'in-progress', monthsOffset: 14 },
      { name: 'Irrigation Network', status: 'pending', monthsOffset: 24 },
      { name: 'Community Distribution', status: 'pending', monthsOffset: 32 },
    ], new Date('2024-02-01')),
    team: makeTeam([
      { name: 'Tendai Moyo', role: 'Project Lead' },
      { name: 'Rudo Chikwanha', role: 'Water Engineer' },
      { name: 'Blessing Ncube', role: 'Public Health' },
      { name: 'Tapiwa Zulu', role: 'Agriculture Specialist' },
    ]),
  },
  {
    name: 'East Africa Health Systems Strengthening',
    code: 'AFDB-EAH-007',
    status: 'completed',
    country: 'Uganda, Rwanda',
    budget: 38000000,
    currency: 'USD',
    sector: 'Health',
    startDate: new Date('2022-04-01'),
    endDate: new Date('2025-03-31'),
    manager: 'Grace Akello',
    description: 'Strengthening health systems through hospital construction, medical equipment procurement, and healthcare worker training.',
    progress: 100,
    milestones: makeMilestones([
      { name: 'Health Needs Assessment', status: 'completed', monthsOffset: 2 },
      { name: 'Hospital Construction', status: 'completed', monthsOffset: 14 },
      { name: 'Equipment Procurement', status: 'completed', monthsOffset: 20 },
      { name: 'Staff Training Program', status: 'completed', monthsOffset: 28 },
      { name: 'Facilities Handover', status: 'completed', monthsOffset: 36 },
    ], new Date('2022-04-01')),
    team: makeTeam([
      { name: 'Grace Akello', role: 'Program Director' },
      { name: 'Dr. Jean Baptiste', role: 'Medical Advisor' },
      { name: 'Florence Uwimana', role: 'Health Systems' },
      { name: 'Samuel Okello', role: 'Infrastructure' },
    ]),
  },
  {
    name: 'West Africa Education Fund',
    code: 'AFDB-WAE-008',
    status: 'active',
    country: 'Senegal, Côte d\'Ivoire',
    budget: 25000000,
    currency: 'USD',
    sector: 'Education',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2028-12-31'),
    manager: 'Aminata Diallo',
    description: 'Expanding access to quality education through school construction, teacher training, and scholarship programs.',
    progress: 25,
    milestones: makeMilestones([
      { name: 'Education Gap Analysis', status: 'completed', monthsOffset: 3 },
      { name: 'School Construction Phase 1', status: 'in-progress', monthsOffset: 12 },
      { name: 'Teacher Training Launch', status: 'pending', monthsOffset: 18 },
      { name: 'Scholarship Program Start', status: 'pending', monthsOffset: 24 },
    ], new Date('2024-09-01')),
    team: makeTeam([
      { name: 'Aminata Diallo', role: 'Program Lead' },
      { name: 'Koffi Yao', role: 'Education Specialist' },
      { name: 'Mariam Sow', role: 'Infrastructure' },
    ]),
  },
  {
    name: 'Pan-African Trade Facilitation',
    code: 'AFDB-PTF-009',
    status: 'on-hold',
    country: 'Pan-African',
    budget: 55000000,
    currency: 'USD',
    sector: 'Finance',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2028-02-28'),
    manager: 'Olusegun Obasanjo',
    description: 'Facilitating intra-African trade through customs modernization, trade corridor development, and AfCFTA implementation support.',
    progress: 8,
    milestones: makeMilestones([
      { name: 'Trade Corridor Assessment', status: 'completed', monthsOffset: 2 },
      { name: 'Customs System Design', status: 'in-progress', monthsOffset: 8 },
      { name: 'Pilot Corridor Launch', status: 'pending', monthsOffset: 18 },
      { name: 'Full AfCFTA Integration', status: 'pending', monthsOffset: 36 },
    ], new Date('2025-03-01')),
    team: makeTeam([
      { name: 'Olusegun Obasanjo', role: 'Program Director' },
      { name: 'Nkechi Adeyemi', role: 'Trade Policy' },
      { name: 'Moussa Faye', role: 'Customs Specialist' },
      { name: 'Lindiwe Dlamini', role: 'Financial Advisor' },
    ]),
  },
  {
    name: 'North Africa Renewable Energy',
    code: 'AFDB-NRE-010',
    status: 'active',
    country: 'Tunisia, Algeria',
    budget: 150000000,
    currency: 'USD',
    sector: 'Energy',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2027-12-31'),
    manager: 'Yasmine Ben Salah',
    description: 'Large-scale solar and wind energy projects to diversify energy mix and reduce carbon emissions across North Africa.',
    progress: 45,
    milestones: makeMilestones([
      { name: 'Solar Site Survey', status: 'completed', monthsOffset: 3 },
      { name: 'Wind Farm Assessment', status: 'completed', monthsOffset: 6 },
      { name: 'Solar Panel Installation', status: 'in-progress', monthsOffset: 16 },
      { name: 'Wind Turbine Setup', status: 'pending', monthsOffset: 24 },
      { name: 'Grid Connection & Testing', status: 'pending', monthsOffset: 36 },
    ], new Date('2024-01-15')),
    team: makeTeam([
      { name: 'Yasmine Ben Salah', role: 'Project Lead' },
      { name: 'Ahmed Khelifi', role: 'Solar Engineer' },
      { name: 'Karim Bouaziz', role: 'Wind Specialist' },
      { name: 'Sofia Mansouri', role: 'Environmental Analyst' },
      { name: 'Rachid Hamdi', role: 'Grid Engineer' },
    ]),
  },
  {
    name: 'Central Africa Forest Conservation',
    code: 'AFDB-CFC-011',
    status: 'active',
    country: 'Gabon, Congo',
    budget: 42000000,
    currency: 'USD',
    sector: 'Multi-sector',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2029-06-30'),
    manager: 'Jean-Pierre Mba',
    description: 'Conservation of the Congo Basin rainforest through sustainable forestry practices, community engagement, and biodiversity protection.',
    progress: 30,
    milestones: makeMilestones([
      { name: 'Biodiversity Baseline Study', status: 'completed', monthsOffset: 4 },
      { name: 'Community Engagement Program', status: 'in-progress', monthsOffset: 10 },
      { name: 'Sustainable Forestry Framework', status: 'pending', monthsOffset: 18 },
      { name: 'Monitoring Systems Deployed', status: 'pending', monthsOffset: 30 },
    ], new Date('2024-07-01')),
    team: makeTeam([
      { name: 'Jean-Pierre Mba', role: 'Program Director' },
      { name: 'Cécile Ondo', role: 'Biodiversity Expert' },
      { name: 'Félix Ngoma', role: 'Forestry Specialist' },
    ]),
  },
  {
    name: 'East Africa Financial Inclusion',
    code: 'AFDB-EFI-012',
    status: 'completed',
    country: 'Ethiopia, Somalia',
    budget: 18000000,
    currency: 'USD',
    sector: 'Finance',
    startDate: new Date('2022-10-01'),
    endDate: new Date('2025-09-30'),
    manager: 'Abdi Mohammed',
    description: 'Promoting financial inclusion through mobile banking infrastructure, microfinance support, and financial literacy programs.',
    progress: 100,
    milestones: makeMilestones([
      { name: 'Market Research', status: 'completed', monthsOffset: 2 },
      { name: 'Mobile Platform Development', status: 'completed', monthsOffset: 10 },
      { name: 'Microfinance Pilot', status: 'completed', monthsOffset: 18 },
      { name: 'Literacy Program Rollout', status: 'completed', monthsOffset: 26 },
      { name: 'Full Scale Deployment', status: 'completed', monthsOffset: 36 },
    ], new Date('2022-10-01')),
    team: makeTeam([
      { name: 'Abdi Mohammed', role: 'Program Lead' },
      { name: 'Hawa Ali', role: 'Mobile Banking' },
      { name: 'Dawit Tesfaye', role: 'Microfinance' },
      { name: 'Amina Yusuf', role: 'Financial Literacy' },
    ]),
  },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to', MONGODB_URI);

    const db = mongoose.connection.db;
    if (!db) throw new Error('Database connection not available');

    // ── Clear & seed projects ──
    const projCol = db.collection('projects');
    const projCount = await projCol.countDocuments();
    if (projCount > 0) { await projCol.deleteMany({}); console.log(`🗑️  Cleared ${projCount} existing projects`); }
    const projResult = await projCol.insertMany(projects);
    console.log(`Seeded ${projResult.insertedCount} projects successfully\n`);

    // ── Clear & seed team members ──
    const teamCol = db.collection('teammembers');
    const teamCount = await teamCol.countDocuments();
    if (teamCount > 0) { await teamCol.deleteMany({}); console.log(`🗑️  Cleared ${teamCount} existing team members`); }

    const teamMembers = [
      {
        firstName: 'Amara', lastName: 'Diallo', email: 'amara.diallo@afdb.org', phone: '+225 20 20 30 00',
        role: 'admin', department: 'Administration', location: 'Abidjan, Côte d\'Ivoire', jobTitle: 'System Administrator',
        bio: 'Oversees platform administration, user management, and system configuration across all modules.',
        permissions: [
          { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'projects', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'reports', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'settings', actions: ['read', 'update'] },
          { resource: 'monitoring', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-28T10:30:00Z'),
      },
      {
        firstName: 'Fatima', lastName: 'Hassan', email: 'fatima.hassan@afdb.org', phone: '+20 2 2528 6800',
        role: 'manager', department: 'Operations', location: 'Cairo, Egypt', jobTitle: 'Operations Manager',
        bio: 'Manages day-to-day operations, coordinates cross-functional teams, and ensures project delivery.',
        permissions: [
          { resource: 'users', actions: ['read'] },
          { resource: 'projects', actions: ['create', 'read', 'update'] },
          { resource: 'reports', actions: ['create', 'read', 'update'] },
          { resource: 'monitoring', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-27T14:15:00Z'),
      },
      {
        firstName: 'Kwame', lastName: 'Asante', email: 'kwame.asante@afdb.org', phone: '+233 30 277 5800',
        role: 'staff', department: 'Engineering', location: 'Accra, Ghana', jobTitle: 'Senior Civil Engineer',
        bio: 'Leads infrastructure design and construction oversight for West Africa projects.',
        permissions: [
          { resource: 'projects', actions: ['read', 'update'] },
          { resource: 'reports', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-26T09:00:00Z'),
      },
      {
        firstName: 'Lina', lastName: 'Benali', email: 'lina.benali@afdb.org', phone: '+212 5 37 68 00 00',
        role: 'viewer', department: 'Finance', location: 'Rabat, Morocco', jobTitle: 'Financial Analyst',
        bio: 'Supports budget tracking and financial reporting for North Africa portfolio.',
        permissions: [
          { resource: 'projects', actions: ['read'] },
          { resource: 'reports', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-25T16:45:00Z'),
      },
      {
        firstName: 'Jean-Pierre', lastName: 'Mbuyi', email: 'jp.mbuyi@afdb.org', phone: '+243 81 555 2200',
        role: 'staff', department: 'Digital', location: 'Kinshasa, DRC', jobTitle: 'IT Infrastructure Specialist',
        bio: 'Manages digital infrastructure deployment and connectivity across Central Africa.',
        permissions: [
          { resource: 'projects', actions: ['read', 'update'] },
          { resource: 'monitoring', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-28T08:20:00Z'),
      },
      {
        firstName: 'Grace', lastName: 'Akello', email: 'grace.akello@afdb.org', phone: '+256 41 423 0400',
        role: 'manager', department: 'Health', location: 'Kampala, Uganda', jobTitle: 'Health Program Manager',
        bio: 'Directs health systems strengthening programs across East Africa with focus on infrastructure and training.',
        permissions: [
          { resource: 'users', actions: ['read'] },
          { resource: 'projects', actions: ['create', 'read', 'update'] },
          { resource: 'reports', actions: ['create', 'read', 'update'] },
          { resource: 'monitoring', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-27T11:30:00Z'),
      },
      {
        firstName: 'Yasmine', lastName: 'Ben Salah', email: 'yasmine.bensalah@afdb.org', phone: '+216 71 156 500',
        role: 'manager', department: 'Energy', location: 'Tunis, Tunisia', jobTitle: 'Renewable Energy Lead',
        bio: 'Leads solar and wind energy projects across North Africa, driving the clean energy transition.',
        permissions: [
          { resource: 'users', actions: ['read'] },
          { resource: 'projects', actions: ['create', 'read', 'update'] },
          { resource: 'reports', actions: ['create', 'read'] },
          { resource: 'monitoring', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-26T13:10:00Z'),
      },
      {
        firstName: 'Tendai', lastName: 'Moyo', email: 'tendai.moyo@afdb.org', phone: '+263 4 702 700',
        role: 'staff', department: 'Agriculture', location: 'Harare, Zimbabwe', jobTitle: 'Water & Sanitation Engineer',
        bio: 'Designs and oversees water sanitation and irrigation infrastructure in Southern Africa.',
        permissions: [
          { resource: 'projects', actions: ['read', 'update'] },
          { resource: 'reports', actions: ['read'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-25T07:50:00Z'),
      },
      {
        firstName: 'Aminata', lastName: 'Diallo', email: 'aminata.diallo@afdb.org', phone: '+221 33 823 62 00',
        role: 'staff', department: 'Education', location: 'Dakar, Senegal', jobTitle: 'Education Program Lead',
        bio: 'Manages education access programs including school construction and scholarship initiatives.',
        permissions: [
          { resource: 'projects', actions: ['read', 'update'] },
          { resource: 'reports', actions: ['read', 'update'] },
        ],
        status: 'active', lastLogin: new Date('2026-08-28T06:30:00Z'),
      },
      {
        firstName: 'Olusegun', lastName: 'Obasanjo', email: 'olusegun.obasanjo@afdb.org', phone: '+234 9 462 2200',
        role: 'viewer', department: 'Trade', location: 'Abuja, Nigeria', jobTitle: 'Trade Policy Advisor',
        bio: 'Advises on intra-African trade facilitation and AfCFTA implementation strategies.',
        permissions: [
          { resource: 'projects', actions: ['read'] },
          { resource: 'reports', actions: ['read'] },
        ],
        status: 'inactive', lastLogin: new Date('2026-07-15T10:00:00Z'),
      },
    ];

    const teamResult = await teamCol.insertMany(teamMembers);
    console.log(`Seeded ${teamResult.insertedCount} team members successfully\n`);

    // ── Display summary ──
    console.log('📋 Project Summary:');
    console.log('─'.repeat(60));
    const byStatus = projects.reduce((acc: Record<string, number>, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});
    Object.entries(byStatus).forEach(([status, count]) => {
      console.log(`   ${status}: ${count}`);
    });
    console.log('─'.repeat(60));
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    console.log(`   Total Budget: $${(totalBudget / 1_000_000).toFixed(0)}M`);
    console.log(`   Countries: ${[...new Set(projects.flatMap(p => p.country.split(', ')))].length}`);
    console.log(`   Sectors: ${[...new Set(projects.map(p => p.sector))].length}`);
    console.log('');

    console.log('📋 Team Members Summary:');
    console.log('─'.repeat(60));
    const byRole = teamMembers.reduce((acc: Record<string, number>, m) => {
      acc[m.role] = (acc[m.role] || 0) + 1;
      return acc;
    }, {});
    Object.entries(byRole).forEach(([role, count]) => {
      console.log(`   ${role}: ${count}`);
    });
    console.log('─'.repeat(60));
    console.log('');

    await mongoose.disconnect();
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
