/* eslint-disable prefer-const */
import useNews from "../hooks/news";
import Loading from "../components/Home/Loading";
import Error from "../components/Home/Error";
import  {Article}  from "../components/Home/Article";
import {  useState } from "react";
import { IArticle } from "../models";
import {
  TextField,
  Container,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";

export const Home: React.FC = () => {
  const { error, news, loading } = useNews();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [query, setQuery] = useState<any>('');
  const [newData, setNewData] = useState<IArticle[]>([]);
  const [queryArray, setQueryArray] = useState<string[]>([]);

  function searchNews() {
    setQueryArray(query?.toLowerCase().match(/\S+/g));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newArray: IArticle[] | any = [];

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.title.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }

    if (queryArray !== undefined) {
      queryArray.forEach((element) => {
        news?.forEach((item) => {
          if (
            element.includes(" ") === false &&
            item.newsBody.toLowerCase().includes(element) &&
            newArray.indexOf(item) === -1
          ) {
            newArray.push(item);
          }
        });
      });
    }
    setNewData(newArray);
  }

  return (
    <>
      <Container sx={{ padding: {xs: '2rem', md: '2rem'} }}>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Filter by keywords
          </Typography>
          
          <TextField
            type="search"
            placeholder="I'm searching for..."
            onChange={(e) => {
              setQuery(e.target.value);
              searchNews();
            }}
            variant="outlined"
            sx={{
              my: "1rem",
              maxWidth: "30rem",
            }}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {loading && <Loading />}
        {error && <Error error={error} />}

        <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
          Results:{" "}
          {query === '' ? news?.length : newData.length}
        </Typography>
        
        <Grid container spacing={3} my={1}>
          {query === ''
            ? news?.map((item) => (
                <Article key={item._id} data={item} index={item._id} />
              ))
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            : newData.map((item) => (
                <Article key={item._id} data={item} index={item._id} />
              ))}
        </Grid>
      </Container>
    </>
  );
};
