import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Livechat - ${CONFIG.appName}`}</title>
      </Helmet>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <iframe
          title="Livechat Portal"
          src="https://app.qonvoai.com"
          style={{
            width: '100%',
            height: 'calc(100vh - 64px)', // Subtract header height
            border: 'none',
          }}
        />
      </Box>
    </>
  );
} 