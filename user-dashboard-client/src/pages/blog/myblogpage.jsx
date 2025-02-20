import { useParams } from "react-router";
import MediaCard from "../../components/blog/blogCard";
import axios from "axios";
import useSWR from "swr";
import CircularIndeterminate from "../../components/general/progress";
import { useState } from "react";

const Myblogs = () => {
  const { userId } = useParams();
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
    <>
      <div>My blogs</div>
      <p>{userId}</p>
    </>
  );
};

export default Myblogs;
