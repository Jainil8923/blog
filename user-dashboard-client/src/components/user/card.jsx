import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PropTypes from "prop-types";
export default function MediaCard({ user }) {
  console.log(user.follower);
  return (
    <Card sx={{ maxWidth: 300, position: "relative" }}>
      <CardMedia
        sx={{ height: 200 }}
        image={user.backgroundimage}
        title="green iguana"
      />
      <CardContent>
        <Avatar
          alt="Remy Sharp"
          src={user.avatar}
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
          {user.name}
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
        <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
          <FacebookIcon />
          <XIcon />
          <InstagramIcon />
          <LinkedInIcon />
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
            <Typography variant="body2">Follower</Typography>
            <Typography variant="h6">{user.follower}K</Typography>
          </Stack>
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            direction="column"
            spacing={1}
          >
            <Typography variant="body2">Following</Typography>
            <Typography variant="h6">{user.following}K</Typography>
          </Stack>
          <Stack
            sx={{ justifyContent: "center", alignItems: "center" }}
            direction="column"
            spacing={1}
          >
            <Typography variant="body2">Total post</Typography>
            <Typography variant="h6">{user.totalpost}K</Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  user: PropTypes.shape({
    backgroundimage: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    jobtitle: PropTypes.string.isRequired,
    follower: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
    totalpost: PropTypes.number.isRequired,
  }).isRequired,
};
