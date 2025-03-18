import React, { useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonRange,
  IonChip,
  IonIcon,
  IonButton,
  IonAccordion,
  IonAccordionGroup,
  IonList
} from '@ionic/react';
import {
  filterOutline,
  closeCircleOutline,
  locationOutline,
  cashOutline,
  timeOutline,
  briefcaseOutline
} from 'ionicons/icons';
import './SearchFilters.css';

interface FilterState {
  jobType: string[];
  experience: string;
  location: string;
  salary: { lower: number; upper: number };
  skills: string[];
}

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const SearchFilters: React.FC<FilterProps> = ({ onFilterChange, onReset }) => {
  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    experience: '',
    location: '',
    salary: { lower: 40, upper: 200 },
    skills: []
  });

  const [selectedSkill, setSelectedSkill] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Manager'];
  const locations = ['Remote', 'New York, NY', 'San Francisco, CA', 'London, UK', 'Berlin, DE'];
  const skillOptions = ['React', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'Docker', 'SQL'];

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleAddSkill = () => {
    if (selectedSkill && !filters.skills.includes(selectedSkill)) {
      const newSkills = [...filters.skills, selectedSkill];
      handleFilterChange('skills', newSkills);
      setSelectedSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const newSkills = filters.skills.filter(s => s !== skill);
    handleFilterChange('skills', newSkills);
  };

  const handleReset = () => {
    const initialFilters: FilterState = {
      jobType: [],
      experience: '',
      location: '',
      salary: { lower: 40, upper: 200 },
      skills: []
    };
    setFilters(initialFilters);
    setSelectedSkill('');
    onReset();
  };

  return (
    <IonCard className="filters-card">
      <IonCardContent>
        <div className="filters-header">
          <h2>
            <IonIcon icon={filterOutline} /> Filters
          </h2>
          <IonButton fill="clear" onClick={handleReset}>
            Reset All
          </IonButton>
        </div>

        <IonAccordionGroup>
          <IonAccordion value="jobType">
            <IonItem slot="header">
              <IonIcon icon={briefcaseOutline} slot="start" />
              <IonLabel>Job Type</IonLabel>
            </IonItem>
            <div slot="content" className="filter-content">
              <IonItem>
                <IonSelect
                  multiple
                  value={filters.jobType}
                  onIonChange={e => handleFilterChange('jobType', e.detail.value)}
                >
                  {jobTypes.map(type => (
                    <IonSelectOption key={type} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>
          </IonAccordion>

          <IonAccordion value="location">
            <IonItem slot="header">
              <IonIcon icon={locationOutline} slot="start" />
              <IonLabel>Location</IonLabel>
            </IonItem>
            <div slot="content" className="filter-content">
              <IonItem>
                <IonSelect
                  placeholder="Select location"
                  value={filters.location}
                  onIonChange={e => handleFilterChange('location', e.detail.value)}
                >
                  {locations.map(location => (
                    <IonSelectOption key={location} value={location}>
                      {location}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>
          </IonAccordion>

          <IonAccordion value="salary">
            <IonItem slot="header">
              <IonIcon icon={cashOutline} slot="start" />
              <IonLabel>Salary Range (K)</IonLabel>
            </IonItem>
            <div slot="content" className="filter-content">
              <IonItem>
                <IonRange
                  dual-knobs
                  min={40}
                  max={200}
                  value={filters.salary}
                  onIonChange={e => handleFilterChange('salary', e.detail.value)}
                >
                  <IonLabel slot="start">$40K</IonLabel>
                  <IonLabel slot="end">$200K+</IonLabel>
                </IonRange>
              </IonItem>
            </div>
          </IonAccordion>

          <IonAccordion value="experience">
            <IonItem slot="header">
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel>Experience Level</IonLabel>
            </IonItem>
            <div slot="content" className="filter-content">
              <IonItem>
                <IonSelect
                  placeholder="Select experience level"
                  value={filters.experience}
                  onIonChange={e => handleFilterChange('experience', e.detail.value)}
                >
                  {experienceLevels.map(level => (
                    <IonSelectOption key={level} value={level}>
                      {level}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </div>
          </IonAccordion>

          <IonAccordion value="skills">
            <IonItem slot="header">
              <IonIcon icon={briefcaseOutline} slot="start" />
              <IonLabel>Skills</IonLabel>
            </IonItem>
            <div slot="content" className="filter-content">
              <IonItem>
                <IonSelect
                  placeholder="Select skills"
                  value={selectedSkill}
                  onIonChange={e => setSelectedSkill(e.detail.value)}
                >
                  {skillOptions.map(skill => (
                    <IonSelectOption key={skill} value={skill}>
                      {skill}
                    </IonSelectOption>
                  ))}
                </IonSelect>
                <IonButton slot="end" size="small" onClick={handleAddSkill}>
                  Add
                </IonButton>
              </IonItem>
              <div className="selected-skills">
                {filters.skills.map(skill => (
                  <IonChip key={skill} onClick={() => handleRemoveSkill(skill)}>
                    <IonLabel>{skill}</IonLabel>
                    <IonIcon icon={closeCircleOutline} />
                  </IonChip>
                ))}
              </div>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
      </IonCardContent>
    </IonCard>
  );
};

export default SearchFilters;