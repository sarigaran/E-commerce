import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../modal";

export const Dashboard = ({ filteredProducts }) => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.productSlice);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {filteredProducts?.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ width: 350, height: 350 }}>
                  <CardActionArea onClick={() => handleOpen(item)}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={item.image}
                      alt="product image"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontSize: "20px" }}
                      >
                        {item.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Price: ${item.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.category}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <ProductModal
        open={open}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </Container>
  );
};
