import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Link, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PropTypes from "prop-types";
export default function MediaCard({ user }) {
  return (
    <Card sx={{ maxWidth: 300, position: "relative" }}>
      <CardMedia
        sx={{ height: 200 }}
        image={user.background_image}
        title="green iguana"
      />
      <CardContent>
        <Avatar
          alt="Remy Sharp"
          src={user.user_image}
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            border: "3px solid white",
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          align="center"
          sx={{ paddingTop: 5 }}
        >
          {user.first_name + " " + user.last_name}
        </Typography>
        <Typography
          gutterBottom
          variant="button"
          component="div"
          align="center"
          sx={{
            paddingBottom: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {user.jobtitle}
        </Typography>
        <Typography
          gutterBottom
          variant="button"
          component="div"
          align="center"
          sx={{
            paddingBottom: 3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {user.email}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <Link
            href={user.facebook_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </Link>
          <Link
            href={user.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </Link>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 3,
          paddingTop: 3,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            direction="column"
            spacing={1}
          >
            <Typography variant="body2">Total Likes</Typography>
            <Typography variant="h6">{user.totalLikes}</Typography>
          </Stack>
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            direction="column"
            spacing={1}
          >
            <Typography variant="body2">Total post</Typography>
            <Typography variant="h6">{user.total_posts}</Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  user: PropTypes.shape({
    background_image: PropTypes.string.isRequired,
    user_image: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    jobtitle: PropTypes.string.isRequired,
    facebook_url: PropTypes.string.isRequired,
    instagram_url: PropTypes.string.isRequired,
    follower: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    total_posts: PropTypes.number.isRequired,
    email:PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
  }).isRequired,
};
