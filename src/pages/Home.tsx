import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel,
} from '@ionic/react';
import {
  locationOutline,
  businessOutline,
  timeOutline,
  filterOutline,
  heartOutline,
  heart,
} from 'ionicons/icons';
import SearchFilters from '../components/SearchFilters';
import './Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  // Mock jobs data
  const [jobs] = useState([
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'TechCorp',
      location: 'Remote',
      salary: '$120k - $150k',
      type: 'Full-time',
      postedDate: '2 days ago',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      title: 'Frontend Developer',
      company: 'WebSolutions',
      location: 'New York, NY',
      salary: '$90k - $110k',
      type: 'Full-time',
      postedDate: '1 week ago',
      skills: ['JavaScript', 'React', 'CSS'],
    },
    {
      id: '3',
      title: 'Backend Developer',
      company: 'CodeWorks',
      location: 'San Francisco, CA',
      salary: '$110k - $130k',
      type: 'Full-time',
      postedDate: '3 days ago',
      skills: ['Node.js', 'Express', 'MongoDB'],
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      salary: '$125k - $155k',
      type: 'Full-time',
      postedDate: '5 days ago',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    },
    {
      id: '5',
      title: 'UI/UX Designer',
      company: 'DesignHub',
      location: 'Remote',
      salary: '$85k - $105k',
      type: 'Full-time',
      postedDate: '1 day ago',
      skills: ['Figma', 'Adobe XD', 'UI Design', 'Prototyping'],
    },
    {
      id: '6',
      title: 'Mobile Developer',
      company: 'AppWorks',
      location: 'Boston, MA',
      salary: '$100k - $130k',
      type: 'Contract',
      postedDate: '2 days ago',
      skills: ['React Native', 'iOS', 'Android', 'TypeScript'],
    },
    {
      id: '7',
      title: 'Data Scientist',
      company: 'DataCorp',
      location: 'Chicago, IL',
      salary: '$130k - $160k',
      type: 'Full-time',
      postedDate: '1 week ago',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    },
    {
      id: '8',
      title: 'Product Manager',
      company: 'ProductLabs',
      location: 'Remote',
      salary: '$115k - $145k',
      type: 'Full-time',
      postedDate: '4 days ago',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    },
    {
      id: '9',
      title: 'Full Stack Developer',
      company: 'StackTech',
      location: 'Austin, TX',
      salary: '$100k - $130k',
      type: 'Full-time',
      postedDate: '3 days ago',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    },
    {
      id: '10',
      title: 'QA Engineer',
      company: 'TestPro',
      location: 'Denver, CO',
      salary: '$80k - $100k',
      type: 'Full-time',
      postedDate: '6 days ago',
      skills: ['Selenium', 'Jest', 'Testing', 'Automation'],
    },
    {
      id: '11',
      title: 'Security Engineer',
      company: 'SecureNet',
      location: 'Remote',
      salary: '$120k - $150k',
      type: 'Full-time',
      postedDate: '2 days ago',
      skills: ['Cybersecurity', 'Network Security', 'Penetration Testing'],
    },
    {
      id: '12',
      title: 'WordPress Developer',
      company: 'WebPress',
      location: 'Miami, FL',
      salary: '$70k - $90k',
      type: 'Part-time',
      postedDate: '1 week ago',
      skills: ['WordPress', 'PHP', 'JavaScript', 'MySQL'],
    },
    {
      id: '13',
      title: 'Technical Writer',
      company: 'DocuTech',
      location: 'Remote',
      salary: '$75k - $95k',
      type: 'Full-time',
      postedDate: '5 days ago',
      skills: ['Technical Writing', 'Documentation', 'API Documentation'],
    },
    {
      id: '14',
      title: 'Blockchain Developer',
      company: 'CryptoTech',
      location: 'San Jose, CA',
      salary: '$140k - $170k',
      type: 'Full-time',
      postedDate: '3 days ago',
      skills: ['Solidity', 'Web3.js', 'Smart Contracts', 'Ethereum'],
    },
    {
      id: '15',
      title: 'Systems Administrator',
      company: 'SysOps',
      location: 'Portland, OR',
      salary: '$85k - $110k',
      type: 'Full-time',
      postedDate: '1 week ago',
      skills: ['Linux', 'Windows Server', 'Networking', 'Shell Scripting'],
    },
    {
      id: '16',
      title: 'AR/VR Developer',
      company: 'RealityLabs',
      location: 'Los Angeles, CA',
      salary: '$110k - $140k',
      type: 'Contract',
      postedDate: '4 days ago',
      skills: ['Unity', 'C#', 'AR Development', 'VR Development'],
    },
    {
      id: '17',
      title: 'Machine Learning Engineer',
      company: 'AI Solutions',
      location: 'Remote',
      salary: '$135k - $165k',
      type: 'Full-time',
      postedDate: '2 days ago',
      skills: ['Python', 'Deep Learning', 'PyTorch', 'Computer Vision'],
    },
  ]);

  // Filter jobs based on search text
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchText.toLowerCase()) ||
      job.company.toLowerCase().includes(searchText.toLowerCase()) ||
      job.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    setShowFilters(false);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Job Listings</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowFilters(!showFilters)}>
              <IonIcon icon={filterOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="search-container">
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search jobs, companies, or locations"
          />
          {showFilters && (
            <SearchFilters onFilterChange={handleFilterChange} onReset={handleResetFilters} />
          )}
        </div>

        <div className="jobs-container">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <IonCard key={job.id} className="job-card">
                <IonCardHeader>
                  <IonCardTitle>{job.title}</IonCardTitle>
                  <div className="company-info">
                    <IonIcon icon={businessOutline} />
                    <span>{job.company}</span>
                  </div>
                </IonCardHeader>

                <IonCardContent>
                  <div className="job-details">
                    <div className="detail-item">
                      <IonIcon icon={locationOutline} />
                      <span>{job.location}</span>
                    </div>
                    <div className="detail-item">
                      <IonIcon icon={timeOutline} />
                      <span>{job.postedDate}</span>
                    </div>
                  </div>

                  <div className="salary-type">
                    <IonChip color="success">{job.salary}</IonChip>
                    <IonChip color="primary">{job.type}</IonChip>
                  </div>

                  <div className="skills-container">
                    {job.skills.map((skill, index) => (
                      <IonChip key={index} color="medium">
                        <IonLabel>{skill}</IonLabel>
                      </IonChip>
                    ))}
                  </div>

                  <div className="action-buttons">
                    <IonButton fill="clear" onClick={() => toggleSaveJob(job.id)}>
                      <IonIcon slot="icon-only" icon={savedJobs.includes(job.id) ? heart : heartOutline} />
                    </IonButton>
                    <IonButton expand="block" routerLink={`/apply/${job.id}`}>
                      Apply Now
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <p className="no-jobs-message">No jobs found</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
