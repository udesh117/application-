import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonChip,
  IonLabel,
  IonList,
  IonItem
} from '@ionic/react';
import {
  checkmarkCircle,
  timeOutline,
  documentTextOutline,
  alertCircleOutline
} from 'ionicons/icons';
import './ApplicationStatusPage.css';

const ApplicationStatusPage: React.FC = () => {
  // Mock application data
  const applicationData = {
    jobTitle: "Senior React Developer",
    company: "TechCorp",
    applicationDate: "2024-03-15",
    status: "under_review",
    applicationId: "APP-2024-001",
    stages: [
      {
        name: "Application Received",
        date: "2024-03-15",
        status: "completed"
      },
      {
        name: "Initial Screening",
        date: "2024-03-16",
        status: "completed"
      },
      {
        name: "Technical Assessment",
        date: "2024-03-18",
        status: "current"
      },
      {
        name: "Interview",
        date: "Pending",
        status: "pending"
      },
      {
        name: "Final Decision",
        date: "Pending",
        status: "pending"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'current':
        return 'primary';
      case 'pending':
        return 'medium';
      default:
        return 'medium';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return checkmarkCircle;
      case 'current':
        return timeOutline;
      case 'pending':
        return alertCircleOutline;
      default:
        return documentTextOutline;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Application Status</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="job-title">{applicationData.jobTitle}</IonCardTitle>
          </IonCardHeader>
          
          <div className="company-info">
            <IonIcon icon={documentTextOutline} />
            <span>{applicationData.company}</span>
          </div>

          <div className="status-info">
            <IonChip color="primary" className="status-chip">
              <IonIcon icon={timeOutline} />
              <IonLabel>Status: {applicationData.status.replace('_', ' ').toUpperCase()}</IonLabel>
            </IonChip>
          </div>

          <div className="application-id">
            ID: {applicationData.applicationId}
          </div>

          <div className="application-date">
            <IonIcon icon={timeOutline} />
            <p>Applied on {new Date(applicationData.applicationDate).toLocaleDateString()}</p>
          </div>

          <div className="status-timeline">
            <h3>Application Progress</h3>
            <IonList>
              {applicationData.stages.map((stage, index) => (
                <IonItem key={index} className="timeline-item">
                  <IonIcon
                    icon={getStatusIcon(stage.status)}
                    slot="start"
                    color={getStatusColor(stage.status)}
                    className="timeline-icon"
                  />
                  <IonLabel>
                    <h2>{stage.name}</h2>
                    <p>{stage.date}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>

          <div className="notification-info">
            <IonIcon icon={alertCircleOutline} />
            <p>We will notify you of any updates via email.</p>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ApplicationStatusPage;