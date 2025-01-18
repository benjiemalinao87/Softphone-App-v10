import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { twilioService, type TwilioPhoneNumber } from 'src/services/twilio-service';

import { CredentialsStep } from './steps/CredentialsStep';
import { PhoneNumbersStep } from './steps/PhoneNumbersStep';
import { FinalStep } from './steps/FinalStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { ConfigurationStep } from './steps/ConfigurationStep';

const steps = [
  { label: 'Credentials', subtitle: 'Twilio setup' },
  { label: 'Phone Numbers', subtitle: 'Number selection' },
  { label: 'Configuration', subtitle: 'Call settings' },
  { label: 'Confirmation', subtitle: 'Final setup' }
];

export function ConfigurationWizard() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [availablePhoneNumbers, setAvailablePhoneNumbers] = useState<TwilioPhoneNumber[]>([]);
  const [formData, setFormData] = useState({
    inboundEnabled: true,
    outboundEnabled: true,
    twilioSid: '',
    twilioAuthToken: '',
    selectedPhoneNumbers: [] as string[],
    selectedPhoneNumber: null as TwilioPhoneNumber | null,
    inboundUrl: '',
    outboundUrl: ''
  });
  const [success, setSuccess] = useState(false);

  const loadPhoneNumbers = async () => {
    setLoading(true);
    try {
      const numbers = await twilioService.getPhoneNumbers(
        formData.twilioSid,
        formData.twilioAuthToken
      );
      setAvailablePhoneNumbers(numbers);
    } catch (error) {
      console.error('Failed to load phone numbers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setSuccess(true);
      return;
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    navigate('/');
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSwitchChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handlePhoneNumberSelect = (phoneNumber: TwilioPhoneNumber) => {
    setFormData(prev => ({
      ...prev,
      selectedPhoneNumbers: [...prev.selectedPhoneNumbers, phoneNumber.sid],
      selectedPhoneNumber: phoneNumber
    }));
  };

  const handleCredentialsValidated = () => {
    loadPhoneNumbers();
    handleNext();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CredentialsStep
            twilioSid={formData.twilioSid}
            twilioAuthToken={formData.twilioAuthToken}
            onInputChange={handleInputChange}
            onValidated={handleCredentialsValidated}
          />
        );
      case 1:
        return (
          <PhoneNumbersStep
            phoneNumbers={availablePhoneNumbers}
            onPhoneNumberSelect={handlePhoneNumberSelect}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ConfigurationStep
            twilioSid={formData.twilioSid}
            twilioAuthToken={formData.twilioAuthToken}
            selectedPhoneNumber={formData.selectedPhoneNumber?.sid || ''}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 3:
        return success ? (
          <Stack spacing={3}>
            <Alert severity="success">
              Twilio configuration has been successfully updated
            </Alert>
            <Stack spacing={2}>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} />
                Twilio credentials verified
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} />
                Phone numbers configured
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} />
                Call routing setup complete
              </Typography>
            </Stack>
          </Stack>
        ) : (
          <ConfirmationStep formData={formData} />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardContent>
      <Card sx={{ p: 3 }}>
        <Box sx={{ mb: 5 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(({ label, subtitle }) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="subtitle2">{label}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {subtitle}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ mb: 5 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ 
              mr: 1,
              bgcolor: 'background.neutral',
              '&:hover': { bgcolor: 'background.neutral' }
            }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 && success ? (
            <Button
              variant="contained"
              onClick={handleFinish}
              color="success"
            >
              Finish Setup
            </Button>
          ) : (
            activeStep !== 0 && (
              <Button
                variant="contained"
                onClick={handleNext}
                color="primary"
              >
                {activeStep === steps.length - 1 ? 'Save & Continue' : 'Continue'}
              </Button>
            )
          )}
        </Box>
      </Card>
    </DashboardContent>
  );
} 