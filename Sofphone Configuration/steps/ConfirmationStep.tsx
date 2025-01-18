import React from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Check } from "lucide-react";
interface ConfirmationStepProps {
  onBack: () => void;
}
export function ConfirmationStep({ onBack }: ConfirmationStepProps) {
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="md">Configuration Complete</Heading>
      <Alert status="success">
        <AlertIcon />
        Twilio configuration has been successfully updated
      </Alert>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Check size={20} color="green" />
          <Text>Twilio credentials verified</Text>
        </HStack>
        <HStack>
          <Check size={20} color="green" />
          <Text>Phone numbers configured</Text>
        </HStack>
        <HStack>
          <Check size={20} color="green" />
          <Text>Call routing setup complete</Text>
        </HStack>
      </VStack>
      <HStack spacing={4} justify="flex-end">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button colorScheme="green">Finish Setup</Button>
      </HStack>
    </VStack>
  );
}
