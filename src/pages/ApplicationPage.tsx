import React, { useState, useRef } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
  useIonRouter,
  IonSpinner
} from '@ionic/react';
import {
  personOutline,
  briefcaseOutline,
  schoolOutline,
  cloudUploadOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import './ApplicationPage.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  education: string;
  skills: string;
  resume: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  experience?: string;
  education?: string;
  skills?: string;
  resume?: string;
}

const ApplicationPage: React.FC = () => {
  const router = useIonRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    education: '',
    skills: '',
    resume: null
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) { // 5MB limit
        if (file.type === 'application/pdf' || 
            file.type === 'application/msword' || 
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          setFormData(prev => ({ ...prev, resume: file }));
          setErrors(prev => ({ ...prev, resume: undefined }));
        } else {
          setErrors(prev => ({ ...prev, resume: 'Please upload a PDF or Word document' }));
        }
      } else {
        setErrors(prev => ({ ...prev, resume: 'File size should be less than 5MB' }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.experience.trim()) {
      newErrors.experience = 'Experience is required';
    }

    if (!formData.education.trim()) {
      newErrors.education = 'Education is required';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Skills are required';
    }

    if (!formData.resume) {
      newErrors.resume = 'Resume is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.error-message');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowToast(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        experience: '',
        education: '',
        skills: '',
        resume: null
      });
      
      // Redirect after success
      setTimeout(() => {
        router.push('/home');
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <IonPage className="linkedin-theme">
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Back" />
          </IonButtons>
          <IonTitle>Apply Now</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit} className="application-form">
          {/* Personal Information */}
          <div className="form-group">
            <div className="section-title">
              <IonIcon icon={personOutline} />
              Personal Information
            </div>
            
            <div className="input-container">
              <IonLabel>Full Name</IonLabel>
              <IonInput
                type="text"
                value={formData.fullName}
                onIonChange={e => handleInputChange('fullName', e.detail.value!)}
                className={errors.fullName ? 'has-error' : ''}
              />
              {errors.fullName && <div className="error-message">{errors.fullName}</div>}
            </div>

            <div className="input-container">
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                value={formData.email}
                onIonChange={e => handleInputChange('email', e.detail.value!)}
                className={errors.email ? 'has-error' : ''}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>

            <div className="input-container">
              <IonLabel>Phone</IonLabel>
              <IonInput
                type="tel"
                value={formData.phone}
                onIonChange={e => handleInputChange('phone', e.detail.value!)}
                className={errors.phone ? 'has-error' : ''}
              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}
            </div>

            <div className="input-container">
              <IonLabel>Location</IonLabel>
              <IonInput
                type="text"
                value={formData.location}
                onIonChange={e => handleInputChange('location', e.detail.value!)}
                className={errors.location ? 'has-error' : ''}
              />
              {errors.location && <div className="error-message">{errors.location}</div>}
            </div>
          </div>

          {/* Experience */}
          <div className="form-group">
            <div className="section-title">
              <IonIcon icon={briefcaseOutline} />
              Experience
            </div>
            
            <div className="input-container">
              <IonLabel>Professional Experience</IonLabel>
              <IonTextarea
                value={formData.experience}
                onIonChange={e => handleInputChange('experience', e.detail.value!)}
                className={errors.experience ? 'has-error' : ''}
                rows={4}
                placeholder="Describe your relevant experience"
              />
              {errors.experience && <div className="error-message">{errors.experience}</div>}
            </div>
          </div>

          {/* Education */}
          <div className="form-group">
            <div className="section-title">
              <IonIcon icon={schoolOutline} />
              Education
            </div>
            
            <div className="input-container">
              <IonLabel>Education Background</IonLabel>
              <IonTextarea
                value={formData.education}
                onIonChange={e => handleInputChange('education', e.detail.value!)}
                className={errors.education ? 'has-error' : ''}
                rows={3}
                placeholder="Your educational qualifications"
              />
              {errors.education && <div className="error-message">{errors.education}</div>}
            </div>
          </div>

          {/* Skills */}
          <div className="form-group">
            <div className="section-title">
              <IonIcon icon={briefcaseOutline} />
              Skills
            </div>
            
            <div className="input-container">
              <IonLabel>Key Skills</IonLabel>
              <IonTextarea
                value={formData.skills}
                onIonChange={e => handleInputChange('skills', e.detail.value!)}
                className={errors.skills ? 'has-error' : ''}
                rows={3}
                placeholder="List your relevant skills"
              />
              {errors.skills && <div className="error-message">{errors.skills}</div>}
            </div>
          </div>

          {/* Resume Upload */}
          <div className="form-group">
            <div className="section-title">
              <IonIcon icon={cloudUploadOutline} />
              Resume
            </div>
            
            <div 
              className={`file-upload ${errors.resume ? 'has-error' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <IonIcon icon={cloudUploadOutline} />
              <div className="upload-text">
                {formData.resume ? formData.resume.name : 'Upload Resume (PDF, DOC)'}
              </div>
              {errors.resume && <div className="error-message">{errors.resume}</div>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="button-container">
            <IonButton
              expand="block"
              className="submit-button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <IonSpinner name="crescent" className="button-spinner" />
                  Submitting...
                </>
              ) : (
                'Submit Application'
              )}
            </IonButton>
          </div>
        </form>

        <IonToast
          isOpen={showToast}
          message="Application submitted successfully!"
          duration={2000}
          position="top"
          color="success"
          icon={checkmarkCircleOutline}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default ApplicationPage;