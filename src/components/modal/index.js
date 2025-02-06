import { Modal, Box, Typography, CardMedia } from "@mui/material";

const ProductModal = ({ open, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          {product.title}
        </Typography>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt="product image"
          sx={{ my: 2 }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${product.price}
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ProductModal;
