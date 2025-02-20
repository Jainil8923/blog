import useSWR from "swr";
import MediaCard from "../../components/blog/blogCard";
import axios from "axios";
import CircularIndeterminate from "../../components/general/progress";
import Grid2 from "@mui/material/Grid2";
import { Pagination, Stack } from "@mui/material";
import { useState } from "react";

const Bloglistpage = () => {
  const [page, setPage] = useState(1);

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
  );
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
  console.log(data);

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Read here
      </h1>
      <Grid2
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {data.blogs.map((blog, index) => (
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
            count={data.pagination.total_page + 1}
            page={page}
            onChange={(event, pageNumber) => setPage(pageNumber)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Bloglistpage;
