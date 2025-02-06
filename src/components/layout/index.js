import React, { useContext, useEffect, useState } from "react";
import {
  Toolbar,
  Drawer,
  List,
  ListItemText,
  Box,
  TextField,
  Button,
  ListItemButton,
  IconButton,
} from "@mui/material";
import { Dashboard } from "../dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getProduct } from "../../redux/slice";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const drawerWidth = 240;

export default function Layout() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [selectedIndex, setSelectedIndex] = React.useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const { categorydata, productdata } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(getProduct("All"));
    dispatch(getCategory());
  }, []);

  const filteredProducts = productdata?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    dispatch(getProduct(event.target.innerText));
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton
              selected={selectedIndex === 5}
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <ListItemText primary="All" />
            </ListItemButton>
            {categorydata?.map((item, key) => (
              <ListItemButton
                selected={selectedIndex === key}
                onClick={(event) => handleListItemClick(event, key)}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <div position="fixed" className="cdss">
          <Toolbar style={{ width: "100%" }}>
            <TextField
              style={{
                marginTop: "25px",
              }}
              fullWidth
              label="Search Products"
              variant="outlined"
              sx={{ mb: 3 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Toolbar>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ height: "50px" }}
          >
            Logout
          </Button>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="inherit"
            style={{ height: "70px", width: "70px" }}
          >
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>

        <Box component="main">
          <Dashboard filteredProducts={filteredProducts} />
        </Box>
      </Box>
    </Box>
  );
}
