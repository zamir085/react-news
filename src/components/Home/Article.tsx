import { IArticle } from "../../models";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import EventIcon from "@mui/icons-material/Event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const Article = ({ data, index }: any & IArticle) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 500, height: 365, m: "0 auto" }} >
        <CardMedia
     
          sx={{ height: 140 }}
          image={data.thumbnailImg}
          title={data.title}
        />
        <CardContent sx={{ paddingTop: "0.5rem" }}>
          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <EventIcon sx={{ fontSize: "medium", mr: ".5rem" }} />
            {data.createdAt && data.createdAt}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: "1.2rem",
              mb: ".5rem",
              mt: ".5rem",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ overflow: "hidden", height: "2.5rem" }}
          >
            {data.newsBody}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to={`/news/${data._id}`}>
            <Button
              variant="text"
              size="small"
              endIcon={<EastIcon />}
              sx={{ fontWeight: "600" }}
            >
              Read more
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
