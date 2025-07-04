import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router';


interface MenuItemType {
  id: number;
  title: string;
  img: string;
  href: string;
}

const StyledMenu = styled((props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: '#000c29',
    boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
        padding: '16px',  
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles?.('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));

const StyledLink = styled(Link)(() => ({
    textDecoration: 'none',
    color: '#000c29',
    borderRadius: '7px',
    '&:hover': {
        backgroundColor: '#000c290d',
    },
}));

const StyledButton = styled(Button)(() => ({
  border: `1px solid rgba(255,255,255,.4)`,
    fontSize: '16px',
    color: '#ffffff',
    padding: '5px 16px',
    textTransform: 'none',
    display: 'flex',
    borderRadius: '7px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
        backgroundColor: '#8d70f8',
    },
    '& .MuiButton-endIcon': {
        marginLeft: '4px',
    },
}));

const MenuItems: MenuItemType[] = [   
    { id: 1, img: 'src/assets/images/svgs/react-cat-icon.svg', title: 'ReactJs Version', href: 'https://www.wrappixel.com/templates/materialpro-react-admin/?ref=376#demos' },
    { id: 2, img: 'src/assets/images/svgs/next-cat-icon.svg', title: 'NextJs Version', href: 'https://www.wrappixel.com/templates/materialpro-nextjs-admin-dashboard-app-directory/?ref=376#demos' },
    { id: 3, img: 'src/assets/images/svgs/angular-cat-icon.svg', title: 'Angular Version', href: 'https://www.wrappixel.com/templates/materialpro-angular-dashboard/?ref=376#demos' },
    { id: 4, img: 'src/assets/images/svgs/vue-cat-icon.svg', title: 'VueJs Version', href: 'https://www.wrappixel.com/templates/materialpro-vuetify-admin/?ref=376#demos' },
    { id: 5, img: 'src/assets/images/svgs/nuxt-cat-icon.svg', title: 'NuxtJs Version', href: 'https://www.wrappixel.com/templates/materialpro-nuxtjs/?ref=376#demos' },
    { id: 6, img: 'src/assets/images/svgs/bt-cat-icon.svg', title: 'Bootstrap Version', href: 'https://www.wrappixel.com/templates/materialpro/?ref=376#demos' },
];

const LivePreviewDropdown: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
            <StyledButton
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Live Preview
            </StyledButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{ 'aria-labelledby': 'demo-customized-button' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {MenuItems.map((item) => (
                    <StyledLink key={item.id} to={item.href} target='blank'>
                        <MenuItem sx={{ gap: '12px', borderRadius: '7px', padding: '12px 18px', "&:hover": { backgroundColor: "#000c290d" } }} onClick={handleClose} disableRipple>
                            <img src={item.img} width={18} alt="logo" />
                            {item.title} 
                        </MenuItem>
                    </StyledLink>
                ))}
            </StyledMenu>
        </div>
  );
};

export default LivePreviewDropdown;