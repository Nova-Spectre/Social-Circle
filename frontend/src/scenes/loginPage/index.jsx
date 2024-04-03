import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
import img1 from "../../assets/output.png"


const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <img src={img1} alt="SocialCircle Logo" style={{ marginRight: "1rem" }} />
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocialCircle
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to SocialCircle, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
