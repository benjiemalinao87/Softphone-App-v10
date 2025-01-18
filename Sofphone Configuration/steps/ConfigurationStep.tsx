import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  HStack,
  Heading,
  Switch,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
type ConfigurationFormData = {
  inboundUrl: string;
  outboundUrl: string;
  autoConfigureInbound: boolean;
  autoConfigureOutbound: boolean;
};
interface ConfigurationStepProps {
  onNext: () => void;
  onBack: () => void;
}
export function ConfigurationStep({ onNext, onBack }: ConfigurationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigurationFormData>();
  const onSubmit = (data: ConfigurationFormData) => {
    // Handle configuration saving logic here
    onNext();
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">Call Configuration</Heading>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Auto-configure inbound calls</FormLabel>
          <Switch {...register("autoConfigureInbound")} />
        </FormControl>
        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">Auto-configure outbound calls</FormLabel>
          <Switch {...register("autoConfigureOutbound")} />
        </FormControl>
        <FormControl>
          <FormLabel>Inbound URL</FormLabel>
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
            placeholder="e.g., https://your-ngrok-url/inbound"
            {...register("inboundUrl")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Outbound URL</FormLabel>
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
            placeholder="e.g., https://your-ngrok-url/outbound"
            {...register("outboundUrl")}
          />
        </FormControl>
        <HStack spacing={4} justify="flex-end">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button type="submit" colorScheme="blue">
            Save & Continue
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
