import React, { useState } from "react";
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginStep } from "./steps/LoginStep";
import { CredentialsStep } from "./steps/CredentialsStep";
import { PhoneNumbersStep } from "./steps/PhoneNumbersStep";
import { ConfigurationStep } from "./steps/ConfigurationStep";
import { FinalStep } from "./steps/FinalStep";
const steps = [
  {
    title: "Login",
    path: "/",
  },
  {
    title: "Twilio Credentials",
    path: "/credentials",
  },
  {
    title: "Phone Numbers",
    path: "/phone-numbers",
  },
  {
    title: "Configuration",
    path: "/configuration",
  },
  {
    title: "Complete",
    path: "/complete",
  },
];
export function ConfigurationWizard() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleNext = (stepData: any) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
    const nextStep = activeStep + 1;
    setActiveStep(nextStep);
    navigate(steps[nextStep].path);
  };
  return (
    <Box>
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
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Routes>
        <Route path="/" element={<LoginStep onNext={handleNext} />} />
        <Route
          path="/credentials"
          element={<CredentialsStep onNext={handleNext} />}
        />
        <Route
          path="/phone-numbers"
          element={<PhoneNumbersStep onNext={handleNext} />}
        />
        <Route
          path="/configuration"
          element={<ConfigurationStep onNext={handleNext} />}
        />
        <Route path="/complete" element={<FinalStep formData={formData} />} />
      </Routes>
    </Box>
  );
}
