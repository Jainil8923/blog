import useSWR from "swr";
import MediaCard from "../../components/blog/blogCard";
import axios from "axios";
import CircularIndeterminate from "../../components/general/progress";
import { Grid2 } from "@mui/material";

const Bloglistpage = () => {
  const fetcher = async (url) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
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
    "http://localhost:3000/api/blogs?page=1&per_page=10",
    fetcher
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
  console.log(data.data);
  return (
    <>
    <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Blog Page</h1>
      <Grid2 container spacing={4}>
        {data.data.map((blog, index) => (
          <Grid2 size={{ md: 12 }} key={index}>
            <MediaCard blog={blog} /> 
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Bloglistpage;
