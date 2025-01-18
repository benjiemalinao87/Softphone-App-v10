import React from "react";
import { Box, VStack, Text, Button, Icon } from "@chakra-ui/react";
import { CheckCircle } from "lucide-react";
export function FinalStep({ formData }: { formData: any }) {
  return (
    <Box bg="white" p={8} borderRadius="lg" shadow="sm">
      <VStack spacing={6}>
        <Icon as={CheckCircle} w={12} h={12} color="green.500" />
        <Text fontSize="xl" fontWeight="bold">
          Configuration Complete!
        </Text>
        <Text textAlign="center" color="gray.600">
          Your Softphone App has been successfully configured with Twilio. All
          phone numbers are now set up for both inbound and outbound calls.
        </Text>
        <Button colorScheme="blue">Go to Dashboard</Button>
      </VStack>
    </Box>
  );
}
