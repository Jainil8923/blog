import { Grid2 } from "@mui/material";
import MediaCard from "../../components/user/card";
import CircularIndeterminate from "../../components/general/progress";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CardlistPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcher = async (url) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher("http://localhost:3000/api/users");
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <>
      <h2>User card</h2>
      <Grid2 container spacing={4}>
        {data.map((user, index) => (
          <Grid2 size={{ md: 4 }} key={index}>
            <MediaCard user={user} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
