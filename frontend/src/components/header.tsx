import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";

import Logo from "../../public/logo.png";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { Badge, Button } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const StyledMenu = styled("a")(() => ({
  paddingLeft: "15px",
}));

type HeaderProps = {
  cartItemsCount?: number;
};

export default function Header({ cartItemsCount }: HeaderProps) {
  const { data: session } = useSession();
  const isConnected = Boolean(session?.user?.email);
  return (
    <AppBar position="static" autoCorrect="">
      <Toolbar>
        <Grid container>
          <Grid item xs={2} container alignItems="center">
            <Image src={Logo} alt={"logo"} height="50px" width="50px" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              QSHOP
            </Typography>
          </Grid>

          <Grid item xs={6} container alignItems="center">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Grid>
          <Grid item xs={4} container alignItems="center">
            <Box
              sx={{
                paddingLeft: "10px",
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {isConnected ? (
                <>
                  <Button color="info" onClick={() => signOut()}>
                    <StyledMenu>Déco</StyledMenu>
                  </Button>
                  <Link href="/profil">
                    <Button color="info">{session?.user?.name}</Button>
                  </Link>
                </>
              ) : (
                <Button color="info" onClick={() => signIn()}>
                  <StyledMenu>Connectez-vous</StyledMenu>
                </Button>
              )}

              <Link href="/commandes">
                <Button color="info">Mes Commandes</Button>
              </Link>
              <Link href="/mon-panier">
                <Button color="info">
                  <Badge badgeContent={cartItemsCount || 0} color="secondary">
                    <CartIcon />
                  </Badge>
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
