import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  Box,
  Button,
  Grid2,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CircularIndeterminate from "../../components/general/progress";

const Edituserpage = () => {
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.userId;
          const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsUserIdLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isUserIdLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="40vh">
        <CircularIndeterminate />
      </Box>
    );
  }

  if (error) return <Typography>{error.message}</Typography>;
  if (!data) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" mt="40vh">
        <CircularIndeterminate />
      </Box>
    );
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUser({ ...data, user_image: file });
    if (file) {
      console.log("Selected file:", file);
    }
  };

  async function handleUserUpdate() {
    console.log(user);
  }
  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${data.background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 200,
          borderRadius: 2,
          marginBottom: 5,
        }}
      />
      <Grid2 container spacing={2} size={12}>
        <Grid2
          size={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3} direction="column" width="100%" maxWidth={400}>
            <div>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Button
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                    sx={{ position: "absolute" }}
                  >
                    <EditIcon
                      sx={{
                        height: 30,
                        width: 30,
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "6px",
                        fontSize: "1.2rem",
                        border: "1px solid gray",
                        cursor: "pointer",
                      }}
                    />
                  </Button>
                }
              >
                <Avatar
                  alt="Travis Howard"
                  src={data.user_image}
                  sx={{ height: 100, width: 100 }}
                />
              </Badge>
              <Input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Bio"
              multiline
              rows={6}
              fullWidth
            />
            <Button variant="contained" onClick={handleUserUpdate}>
              Save
            </Button>
          </Stack>
        </Grid2>
        <Grid2 size={6}>
          <Stack
            spacing={3}
            direction="column"
            paddingLeft={5}
            paddingRight={5}
          >
            <Stack direction="row" spacing={3}>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  setUser({ ...data, first_name: event.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={(event) =>
                  setUser({ ...data, last_name: event.target.value })
                }
              />
            </Stack>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setUser({ ...data, email: event.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setUser({ ...data, password: event.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Instagram URL"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setUser({ ...data, instagram_url: event.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Facebook URL"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setUser({ ...data, facebook_url: event.target.value })
              }
            />
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Edituserpage;
