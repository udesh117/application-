import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonAvatar,
  IonIcon,
  IonChip,
  IonToast,
  IonCard,
  IonCardContent,
  IonItemDivider,
  useIonActionSheet
} from '@ionic/react';
import {
  personCircle,
  camera,
  pencil,
  documentText,
  briefcase,
  school,
  add,
  close
} from 'ionicons/icons';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [present] = useIonActionSheet();

  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    title: 'Senior Software Developer',
    about: 'Experienced software developer with a passion for creating efficient and scalable applications.',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Developer',
        duration: '2020 - Present'
      },
      {
        company: 'Software Inc',
        position: 'Developer',
        duration: '2018 - 2020'
      }
    ],
    education: [
      {
        school: 'University of Technology',
        degree: 'BS Computer Science',
        year: '2018'
      }
    ]
  });

  const [newSkill, setNewSkill] = useState('');

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    setShowToast(true);
  };

  const handleAddSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handlePhotoOptions = () => {
    present({
      buttons: [
        {
          text: 'Take Photo',
          icon: camera,
          handler: () => {
            console.log('Take Photo clicked');
          }
        },
        {
          text: 'Choose from Gallery',
          icon: documentText,
          handler: () => {
            console.log('Choose from Gallery clicked');
          }
        },
        {
          text: 'Cancel',
          icon: close,
          role: 'cancel'
        }
      ]
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
          <IonButton 
            slot="end" 
            fill="clear"
            onClick={isEditing ? handleSaveProfile : handleEditProfile}
          >
            {isEditing ? 'Save' : 'Edit'}
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="profile-header">
          <div className="profile-avatar" onClick={handlePhotoOptions}>
            <IonAvatar>
              <IonIcon icon={personCircle} size="large" />
            </IonAvatar>
            <IonIcon icon={camera} className="camera-icon" />
          </div>
          
          <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
          <p className="profile-title">{profile.title}</p>
        </div>

        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">First Name</IonLabel>
                <IonInput
                  value={profile.firstName}
                  disabled={!isEditing}
                  className={isEditing ? 'ion-input-enabled' : ''}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Last Name</IonLabel>
                <IonInput
                  value={profile.lastName}
                  disabled={!isEditing}
                  className={isEditing ? 'ion-input-enabled' : ''}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  className={isEditing ? 'ion-input-enabled' : ''}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput
                  type="tel"
                  value={profile.phone}
                  disabled={!isEditing}
                  className={isEditing ? 'ion-input-enabled' : ''}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">About</IonLabel>
                <IonTextarea
                  value={profile.about}
                  disabled={!isEditing}
                  className={isEditing ? 'ion-input-enabled' : ''}
                  rows={4}
                />
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="section-header">
              <IonIcon icon={briefcase} />
              <h3>Skills</h3>
            </div>

            <div className="skills-container">
              {profile.skills.map((skill, index) => (
                <IonChip key={index}>
                  <IonLabel>{skill}</IonLabel>
                  {isEditing && (
                    <IonIcon 
                      icon={close} 
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  )}
                </IonChip>
              ))}
              {isEditing && (
                <div className="add-skill">
                  <IonInput
                    placeholder="Add skill"
                    value={newSkill}
                    onIonChange={e => setNewSkill(e.detail.value || '')}
                  />
                  <IonButton 
                    size="small" 
                    fill="clear"
                    onClick={handleAddSkill}
                  >
                    <IonIcon icon={add} />
                  </IonButton>
                </div>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="section-header">
              <IonIcon icon={briefcase} />
              <h3>Experience</h3>
            </div>
            {profile.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h4>{exp.position}</h4>
                <p>{exp.company}</p>
                <p className="duration">{exp.duration}</p>
              </div>
            ))}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <div className="section-header">
              <IonIcon icon={school} />
              <h3>Education</h3>
            </div>
            {profile.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>{edu.degree}</h4>
                <p>{edu.school}</p>
                <p className="year">{edu.year}</p>
              </div>
            ))}
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Profile updated successfully!"
          duration={2000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;