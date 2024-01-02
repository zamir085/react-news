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

export const Article: React.FC<{ data: IArticle }> = ({ data }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 500, height: 365, margin: "0 auto" }}>
        <CardMedia
          component="img"
          height="140"
          image={data.thumbnailImg}
          title={data.title}
        />
        <CardContent sx={{ paddingTop: "0.5rem" }}>
          <Typography
            variant="overline"
            sx={{ display: "flex", alignItems: "center", color: "grey" }}
          >
            <EventIcon sx={{ fontSize: "medium", marginRight: ".5rem" }} />
            {data.createdAt && data.createdAt}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: "1.2rem",
              marginBottom: ".5rem",
              marginTop: ".5rem",
            }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{ overflow: "hidden", height: "2.5rem" }}
            dangerouslySetInnerHTML={{ __html: data.newsBody }}
          />
        </CardContent>

        <CardActions>
          <Link to={`/news/${data._id}`} style={{ textDecoration: 'none' }}>
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
