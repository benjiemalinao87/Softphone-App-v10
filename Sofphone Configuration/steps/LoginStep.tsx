import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
type LoginFormData = {
  email: string;
  password: string;
};
interface LoginStepProps {
  onNext: () => void;
}
export function LoginStep({ onNext }: LoginStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit = (data: LoginFormData) => {
    // Handle login logic here
    onNext();
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={6} align="stretch">
        <Heading size="md">Administrator Login</Heading>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            bg="white"
            borderColor="gray.300"
            _hover={{
              borderColor: "gray.400",
            }}
            _focus={{
              borderColor: "blue.500",
              boxShadow: "outline",
            }}
            {...register("email", {
              required: "Email is required",
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
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
            {...register("password", {
              required: "Password is required",
            })}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Box>
  );
}
