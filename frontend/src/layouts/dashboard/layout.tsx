import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { _langs, _notifications } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { FloatingCallUI } from 'src/sections/overview/calls/components/floating-call-ui';

import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
};

export function DashboardLayout({ sx, children, header }: DashboardLayoutProps) {
  const theme = useTheme();
  const router = useRouter();

  const [navOpen, setNavOpen] = useState(false);
  const [gridMenuAnchor, setGridMenuAnchor] = useState<null | HTMLElement>(null);

  const layoutQuery: Breakpoint = 'lg';

  const handleGridMenuClick = (option: string) => {
    setGridMenuAnchor(null);
    
    switch (option) {
      case 'main':
        router.push('/');
        break;
      case 'configure-softphone':
        router.push('/configure-softphone');
        break;
      case 'agent-tools':
        router.push('/agent-tools');
        break;
      case 'livechat':
        router.push('/livechat');
        break;
      default:
        break;
    }
  };

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={_workspaces}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <IconButton
                  onClick={(event) => setGridMenuAnchor(event.currentTarget)}
                  sx={{ color: 'text.primary' }}
                >
                  <Iconify icon="solar:widget-2-bold-duotone" width={24} />
                </IconButton>

                <Menu
                  anchorEl={gridMenuAnchor}
                  open={Boolean(gridMenuAnchor)}
                  onClose={() => setGridMenuAnchor(null)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{
                    sx: { width: 240, mt: 0.5 },
                  }}
                >
                  <MenuItem onClick={() => handleGridMenuClick('main')}>
                    <ListItemIcon>
                      <Iconify icon="solar:home-2-bold-duotone" width={24} />
                    </ListItemIcon>
                    <ListItemText primary="Main" />
                  </MenuItem>
                  <MenuItem onClick={() => handleGridMenuClick('agent-tools')}>
                    <ListItemIcon>
                      <Iconify icon="solar:widget-bold-duotone" width={24} />
                    </ListItemIcon>
                    <ListItemText primary="Agent Tools" />
                  </MenuItem>
                  <MenuItem onClick={() => handleGridMenuClick('configure-softphone')}>
                    <ListItemIcon>
                      <Iconify icon="solar:phone-bold-duotone" width={24} />
                    </ListItemIcon>
                    <ListItemText primary="Configure Softphone" />
                  </MenuItem>
                  <MenuItem onClick={() => handleGridMenuClick('livechat')}>
                    <ListItemIcon>
                      <Iconify icon="solar:chat-round-dots-bold-duotone" width={24} />
                    </ListItemIcon>
                    <ListItemText primary="Livechat" />
                  </MenuItem>
                </Menu>

                <FloatingCallUI />
                <AccountPopover
                  data={[
                    {
                      label: 'Home',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Profile',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Settings',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
