import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';

type LoginStepProps = {
  username: string;
  password: string;
  onInputChange: (field: string) => (event: ChangeEvent<HTMLInputElement>) => void;
};

export function LoginStep({ username, password, onInputChange }: LoginStepProps) {
  return (
    <Stack spacing={3}>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={onInputChange('username')}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={onInputChange('password')}
      />
    </Stack>
  );
} 