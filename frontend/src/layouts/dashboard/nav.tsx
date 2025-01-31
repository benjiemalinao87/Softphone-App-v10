import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { alpha } from '@mui/material/styles';
import { usePathname } from 'src/routes/hooks';
import { Scrollbar } from 'src/components/scrollbar';
import { CallWidget } from 'src/sections/overview/call-widget';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

type BaseNavProps = {
  data: any[];
  workspaces?: any[];
};

type NavMobileProps = BaseNavProps & {
  open: boolean;
  onClose: VoidFunction;
};

type NavDesktopProps = BaseNavProps & {
  layoutQuery: any;
};

const renderContent = (
  <Scrollbar
    sx={{
      height: 1,
      '& .simplebar-content': {
        height: 1,
        display: 'flex',
        flexDirection: 'column',
      },
    }}
  >
    <Box sx={{ px: 2.5, py: 3 }}>
      <CallWidget />
    </Box>
  </Scrollbar>
);

export function NavMobile({ open, onClose, data, workspaces }: NavMobileProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose?.();
    }
  }, [pathname, open, onClose]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: NAV_WIDTH,
        },
      }}
    >
      {renderContent}
    </Drawer>
  );
}

export function NavDesktop({ data, layoutQuery, workspaces }: NavDesktopProps) {
  return (
    <Box
      sx={{
        height: 1,
        position: 'fixed',
        width: NAV_WIDTH,
        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderContent}
    </Box>
  );
}
