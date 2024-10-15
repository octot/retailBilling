import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button"; // Ensure correct import

// Define a styled button component
const StyledButton = styled(Button)({
  backgroundColor: "#4caf50",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#45a049",
  },
  padding: "10px 20px",
  fontSize: "16px",
  margin: "20px 0",
  // Removed textAlign as it might not affect button text
});

// Export the styled button component
export { StyledButton};
