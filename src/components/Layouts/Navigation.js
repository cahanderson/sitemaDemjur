import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, { ResponsiveNavButton } from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Avatar, Box, Divider, IconButton, ListItemIcon, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import {Menu as MenuMui} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'

const Navigation = ({ user }) => {
    const router = useRouter()

    const { logout } = useAuth()
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget);
    };
        const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout(){
    logout();
  }

    return (
        <Box component='header' bgcolor='white'>
            {/* Primary Navigation Menu */}
            <Box maxWidth='80rem' width='100%'  mx='auto'>
                <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            comSistema
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                            <Tooltip title="Account settings">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={open ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <MenuMui 
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                                },
                                "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0
                                }
                            }
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon >
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </MenuMui>
                </Toolbar>
            </Box>
            <Divider style={{bgcolor:'red'}}/>    
        </Box>
    )
}

export default Navigation





// {open && (
//     <div className="block sm:hidden">
//     <div className="pt-2 pb-3 space-y-1">
//         <ResponsiveNavLink
//             href="/dashboard"
//             active={router.pathname === '/dashboard'}>
//             Dashboard
//         </ResponsiveNavLink>
//     </div>

//     {/* Responsive Settings Options */}
//     <div className="pt-4 pb-1 border-t border-gray-200">
//         <div className="flex items-center px-4">
//             <div className="flex-shrink-0">
//                 <svg
//                     className="h-10 w-10 fill-current text-gray-400"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor">
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                     />
//                 </svg>
//             </div>

//             <div className="ml-3">
//                 <div className="font-medium text-base text-gray-800">
//                     {user?.name}
//                 </div>
//                 <div className="font-medium text-sm text-gray-500">
//                     {user?.email}
//                 </div>
//             </div>
//         </div>

//         <div className="mt-3 space-y-1">
//             {/* Authentication */}
//             <ResponsiveNavButton onClick={logout}>
//                 Logout
//             </ResponsiveNavButton>
//         </div>
//     </div>
// </div>
// )}