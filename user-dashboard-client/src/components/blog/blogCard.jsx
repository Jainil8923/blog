import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { CardActions, Grid2, Stack } from "@mui/material";

export default function MediaCard({ blog }) {
  const truncateContent = (content, maxLength) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <Card
      sx={{
        padding: 3,
        width: 800,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid2 container size={12} spacing={5} sx={{ padding: 0 }}>
        <Grid2 size={4}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "text.primary" }}
          >
            {blog.title}
          </Typography>
        </Grid2>

        <Grid2 size={8}>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {truncateContent(blog.content, 200)}
          </Typography>

          <CardActions
            style={{
              display: "flex",
              padding: 0,
              marginTop: 20,
            }}
          >
            <Button
              size="small"
              color="secondary"
              sx={{ paddingX: 0, marginRight: 2 }}
            >
              Learn More
            </Button>
            <Stack direction="row" spacing={1}>
              <Typography>{blog.totalLikes}</Typography>
              <FavoriteOutlinedIcon />
            </Stack>
          </CardActions>
        </Grid2>
      </Grid2>
    </Card>
  );
}

MediaCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    totalLikes: PropTypes.string.isRequired,
  }).isRequired,
};
