import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import CircularIndeterminate from "../../components/general/progress";
import { Avatar, Box, Link, Typography, Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

export default function ProfilePage() {
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
            },
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

  return (
    <>
      <Container>
        <Box
          sx={{
            backgroundImage: `url(${data.background_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: 200,
            borderRadius: 2,
          }}
        />
        <Box mt={10} display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt={`${data.first_name} ${data.last_name}`}
            src={data.user_image}
            sx={{
              width: 100,
              height: 100,
              border: "2px solid white",
              zIndex: 1,
              mt: -5,
            }}
          />
          <Box mt={5} textAlign="center">
            <Typography variant="h4">{`${data.first_name} ${data.last_name}`}</Typography>
            <Link mt={1} href={`mailto:${data.email}`} variant="body1">
              {data.email}
            </Link>
            <Box mt={2}>
              <Link
                href={data.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </Link>
              <Link
                href={data.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                ml={1}
              >
                <InstagramIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
