import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
  FormErrorMessage,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { twilioService } from "../../../services/twilio-service";

type CredentialsFormData = {
  twilioSid: string;
  twilioAuthToken: string;
};

interface CredentialsStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function CredentialsStep({ onNext, onBack }: CredentialsStepProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsFormData>();

  const onSubmit = async (data: CredentialsFormData) => {
    try {
      setIsValidating(true);
      setError(null);
      
      const response = await twilioService.validateCredentials(
        data.twilioSid,
        data.twilioAuthToken
      );

      if (response.valid) {
        toast({
          title: "Credentials validated",
          description: `Connected to ${response.accountName || 'Twilio account'}`,
          status: "success",
          duration: 3000,
        });
        onNext();
      } else {
        setError(response.message || "Failed to validate credentials");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">Twilio Credentials</Heading>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <FormControl isInvalid={!!errors.twilioSid}>
          <FormLabel>Twilio SID</FormLabel>
          <Input
            bg="white"
            borderColor="gray.300"
            _hover={{
              borderColor: "gray.400",
            }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "outline",
            }}
            {...register("twilioSid", {
              required: "Twilio SID is required",
              pattern: {
                value: /^AC[0-9a-fA-F]{32}$/,
                message: "Invalid Twilio SID format",
              },
            })}
          />
          <FormErrorMessage>{errors.twilioSid?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.twilioAuthToken}>
          <FormLabel>Twilio Auth Token</FormLabel>
          <Input
            type="password"
            bg="white"
            borderColor="gray.300"
            _hover={{
              borderColor: "gray.400",
            }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "outline",
            }}
            {...register("twilioAuthToken", {
              required: "Auth Token is required",
              minLength: {
                value: 32,
                message: "Auth Token must be at least 32 characters",
              },
            })}
          />
          <FormErrorMessage>{errors.twilioAuthToken?.message}</FormErrorMessage>
        </FormControl>

        <HStack spacing={4} justify="flex-end">
          <Button onClick={onBack} variant="outline" isDisabled={isValidating}>
            Back
          </Button>
          <Button 
            type="submit" 
            colorScheme="blue"
            isLoading={isValidating}
            loadingText="Validating"
          >
            Validate & Continue
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
