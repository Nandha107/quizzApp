type DepartmentTopics = {
    [key: string]: string[]; // The key is a department (like 'MECH', 'EEE'), and the value is an array of strings (topics)
  };
export const departmentTopics:DepartmentTopics = {
    eee: [
      'Power Systems',
      'Electrical Machines',
      'Control Systems',
      'Circuit Theory',
      'Microprocessors and Microcontrollers',
      'Power Electronics',
      'Digital Electronics',
    ],
    civil: [
      'Structural Analysis',
      'Fluid Mechanics',
      'Geotechnical Engineering',
      'Transportation Engineering',
      'Environmental Engineering',
      'Construction Management',
      'Material Science',
      'Soil Mechanics',
      'Hydraulics',
      'Surveying',
      'Reinforced Concrete Design',
      'Steel Structures',
      'Urban Planning',
      'Sustainable Construction Practices',
    ],
    cse: [
      'Data Structures and Algorithms',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Machine Learning',
      'Artificial Intelligence',
      'Web Development',
      'Cybersecurity',
    ],
    mech: [
      'Thermodynamics',
      'Fluid Mechanics',
      'Heat Transfer',
      'Dynamics of Machines',
      'Manufacturing Technology',
      'Engineering Materials',
      'Machine Design',
      'Automation',
      'Robotics',
    ],
    ece: [
      'Analog Electronics',
      'Digital Signal Processing',
      'Embedded Systems',
      'Communication Systems',
      'VLSI Design',
      'Antenna and Wave Propagation',
      'Microelectronics',
      'Signal Processing',
    ],
  };
  
  