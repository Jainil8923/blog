import useSWR from "swr";
import MediaCard from "../../components/blog/blogCard";
import axios from "axios";
import CircularIndeterminate from "../../components/general/progress";
import Grid2 from "@mui/material/Grid2";
import { Pagination, Stack } from "@mui/material";
import { useState, useEffect } from "react";

const Bloglistpage = () => {
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((response) => response.json())
      .then((data) => setLength(data.data));
  }, []);

  const fetcher = async (url) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/blogs?page=${page}&per_page=10`,
    fetcher,
    { revalidateOnFocus: false },
  );

  useEffect(() => {
    console.log(page);
  }, [page]);

  if (error) return <div>{error.message}</div>;
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40vh",
        }}
      >
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Blog Page
      </h1>
      <Grid2
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {data.data.map((blog, index) => (
          <Grid2 item xs={12} key={index}>
            <MediaCard blog={blog} />
          </Grid2>
        ))}
      </Grid2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={Math.ceil(length / 10) + 1}
            page={page}
            onChange={(event, pageNumber) => setPage(pageNumber)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Bloglistpage;
