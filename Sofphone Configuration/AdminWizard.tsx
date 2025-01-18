import React, { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { LoginStep } from "./steps/LoginStep";
import { CredentialsStep } from "./steps/CredentialsStep";
import { PhoneNumbersStep } from "./steps/PhoneNumbersStep";
import { ConfigurationStep } from "./steps/ConfigurationStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";
const steps = [
  {
    title: "Login",
    description: "Admin authentication",
  },
  {
    title: "Credentials",
    description: "Twilio setup",
  },
  {
    title: "Phone Numbers",
    description: "Number selection",
  },
  {
    title: "Configuration",
    description: "Call settings",
  },
  {
    title: "Confirmation",
    description: "Final setup",
  },
];
export function AdminWizard() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <LoginStep onNext={() => setActiveStep(1)} />;
      case 1:
        return (
          <CredentialsStep
            onNext={() => setActiveStep(2)}
            onBack={() => setActiveStep(0)}
          />
        );
      case 2:
        return (
          <PhoneNumbersStep
            onNext={() => setActiveStep(3)}
            onBack={() => setActiveStep(1)}
          />
        );
      case 3:
        return (
          <ConfigurationStep
            onNext={() => setActiveStep(4)}
            onBack={() => setActiveStep(2)}
          />
        );
      case 4:
        return <ConfirmationStep onBack={() => setActiveStep(3)} />;
      default:
        return null;
    }
  };
  return (
    <Box bg="white" p={8} borderRadius="lg" shadow="sm">
      <Stepper index={activeStep} mb={8}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {renderStep()}
    </Box>
  );
}
