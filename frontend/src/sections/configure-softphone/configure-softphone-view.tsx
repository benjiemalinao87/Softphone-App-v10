import { useState, type ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';

const steps = [
  'Configure Call Settings',
  'Twilio Credentials',
  'Phone Numbers',
  'Final Configuration'
];

export function ConfigureSoftphoneView() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    inboundEnabled: true,
    outboundEnabled: true,
    twilioSid: '',
    twilioAuthToken: '',
    selectedPhoneNumber: '',
    ngrokUrl: ''
  });

  const handleNext = async () => {
    if (activeStep === 1) {
      // Simulate fetching phone numbers from Twilio
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLoading(false);
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSwitchChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.inboundEnabled}
                  onChange={handleSwitchChange('inboundEnabled')}
                />
              }
              label="Enable Inbound Calls"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.outboundEnabled}
                  onChange={handleSwitchChange('outboundEnabled')}
                />
              }
              label="Enable Outbound Calls"
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Twilio Account SID"
              value={formData.twilioSid}
              onChange={handleInputChange('twilioSid')}
            />
            <TextField
              fullWidth
              label="Twilio Auth Token"
              type="password"
              value={formData.twilioAuthToken}
              onChange={handleInputChange('twilioAuthToken')}
            />
          </Stack>
        );
      case 2:
        if (loading) {
          return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          );
        }
        return (
          <Stack spacing={3}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Available Phone Numbers:
            </Typography>
            {/* Mock phone numbers - replace with actual Twilio numbers */}
            {['+1 (555) 123-4567', '+1 (555) 234-5678', '+1 (555) 345-6789'].map((number) => (
              <FormControlLabel
                key={number}
                control={
                  <Switch
                    checked={formData.selectedPhoneNumber === number}
                    onChange={() => setFormData(prev => ({ ...prev, selectedPhoneNumber: number }))}
                  />
                }
                label={number}
              />
            ))}
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Ngrok URL (for demos)"
              value={formData.ngrokUrl}
              onChange={handleInputChange('ngrokUrl')}
              placeholder="https://your-ngrok-url.ngrok.io"
            />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              This URL will be used to handle incoming calls and messages during development.
            </Typography>
          </Stack>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardContent>
      <Card sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Configure Softphone
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 5 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? <Iconify icon="eva:checkmark-circle-2-fill" /> : <Iconify icon="eva:arrow-forward-fill" />}
          >
            {activeStep === steps.length - 1 ? 'Save Configuration' : 'Next'}
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
} 