import React from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
interface PhoneNumbersStepProps {
  onNext: () => void;
  onBack: () => void;
}
export function PhoneNumbersStep({ onNext, onBack }: PhoneNumbersStepProps) {
  // Mock phone numbers - in real app, these would come from Twilio API
  const phoneNumbers = [
    {
      id: 1,
      number: "+1234567890",
      region: "US",
      capabilities: ["voice", "sms"],
    },
    {
      id: 2,
      number: "+1987654321",
      region: "US",
      capabilities: ["voice"],
    },
  ];
  return (
    <VStack spacing={6} align="stretch">
      <Heading size="md">Available Phone Numbers</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Select</Th>
              <Th>Phone Number</Th>
              <Th>Region</Th>
              <Th>Capabilities</Th>
            </Tr>
          </Thead>
          <Tbody>
            {phoneNumbers.map((number) => (
              <Tr key={number.id}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{number.number}</Td>
                <Td>{number.region}</Td>
                <Td>{number.capabilities.join(", ")}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <HStack spacing={4} justify="flex-end">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext} colorScheme="blue">
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
