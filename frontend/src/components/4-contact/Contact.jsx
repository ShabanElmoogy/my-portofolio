import { useForm, ValidationError } from "@formspree/react";
import Lottie from "lottie-react";
import doneAnimation from "../../../public/animations/done.json";
import emailAnimation from "../../../public/animations/email.json";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Stack,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Send as SendIcon
} from "@mui/icons-material";

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [state, handleSubmit] = useForm("xovanoek");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.succeeded) {
      setEmail("");
      setMessage("");
    }
  }, [state.succeeded]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Let's Connect
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: 'auto' }}
        >
          Ready to bring your ideas to life? Let's chat!
        </Typography>
      </Box>

      {/* Centered Form with Animation */}
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        alignItems: 'flex-start',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        {/* Contact Form */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(33,150,243,0.05)',
            border: theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(33,150,243,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            flex: 1,
            width: '100%'
          }}
        >
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />

              <TextField
                fullWidth
                size="small"
                label="Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />

              <Button
                type="submit"
                variant="contained"
                disabled={state.submitting}
                endIcon={<SendIcon />}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  alignSelf: 'flex-start',
                  minWidth: 140
                }}
              >
                {state.submitting ? "Sending..." : "Send"}
              </Button>

              {state.succeeded && (
                <Alert
                  severity="success"
                  sx={{
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Lottie
                    loop={false}
                    style={{ height: 20, width: 20 }}
                    animationData={doneAnimation}
                  />
                  Message sent successfully!
                </Alert>
              )}
            </Stack>
          </Box>
        </Paper>

        {/* Animation - Side by side */}
        {!isMobile && (
          <Box sx={{ flexShrink: 0, alignSelf: 'center' }}>
            <Lottie
              style={{ height: 200, width: 200 }}
              animationData={emailAnimation}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Contact;