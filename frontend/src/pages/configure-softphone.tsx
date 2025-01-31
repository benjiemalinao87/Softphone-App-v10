import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AdminWizard } from 'src/sections/configure-softphone/AdminWizard';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`Configure Softphone - ${CONFIG.appName}`}</title>
      </Helmet>

      <AdminWizard />
    </>
  );
} 