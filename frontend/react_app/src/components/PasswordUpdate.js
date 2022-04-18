import React from "react";
import axios from "axios";
import * as settings from "../settings";

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function PasswordUpdate(props) {
  const [new_password1, setNewPassword1] = React.useState(null);
  const [new_password2, setNewPassword2] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleFormFieldChange = (event) => {
    setSuccess(false);
    switch (event.target.id) {
      case "new_password1":
        setNewPassword1(event.target.value);
        break;
      case "new_password2":
        setNewPassword2(event.target.value);
        break;
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new_password1 !== new_password2) {
      alert("Passwords don't match");
    } else {
      let headers = { Authorization: `Token ${props.token}` };
      let method = "post";
      let url = settings.API_SERVER + "/api/auth/update_password/";
      let passwordFormData = new FormData();
      passwordFormData.append("new_password1", new_password1);
      passwordFormData.append("new_password2", new_password2);
      let config = { headers, method, url, data: passwordFormData };
      //Axios update_password API call
      axios(config)
        .then((res) => {
          setSuccess(true);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        {success ? (
          <Typography variant="button" gutterBottom>
            Password update successful!
          </Typography>
        ) : null}
        <Avatar>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        {/* <form className={classes.form} noValidate onSubmit={handleSubmit}> */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password1"
            label="Enter New Password"
            type="password"
            id="new_password1"
            onChange={handleFormFieldChange}
            error={new_password1 !== new_password2}
            helperText={
              new_password1 !== new_password2 ? "Passwords don't match" : null
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password2"
            label="Enter Your Password Again"
            type="password"
            id="new_password2"
            onChange={handleFormFieldChange}
            error={new_password1 !== new_password2}
            helperText={
              new_password1 !== new_password2 ? "Passwords don't match" : null
            }
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Update Password
          </Button>
          {/* </form> */}
        </Box>
      </div>
    </Container>
  );
}

export default PasswordUpdate;
