import { Grid2 } from "@mui/material";
import MediaCard from "../../components/user/card";
import useSWR from "swr";
import CircularIndeterminate from "../../components/general/progress";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { useEffect, useState } from "react";

export default function CardlistPage() {
  //   const [users, setUsers] = useState([]);
  //   const [hasMore, setHasMore] = useState(true);
  //   const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3000/users?offset=0&limit=12")
  //       .then((res) => setUsers(res.data))
  //       .catch((err) => console.log(err));
  //   }, []);

  //   const fetchMoreData = () => {
  //     console.log("feching...")
  //     axios
  //       .get(`http://localhost:3000/users?offset=${index}&limit=12`)
  //       .then((res) => {
  //         setUsers((prevItems) => [...prevItems, ...res.data]);
  //         setHasMore(res.data.length > 0);
  //       })
  //       .catch((err) => console.log(err));
  //     setIndex((prevIndex) => prevIndex + 1);
  //   };

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
    "http://localhost:3000/api/users",
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
  console.log("data:",data);

  return (
    <>
      {/* <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<CircularIndeterminate />}
      >
        <Grid2 container spacing={4}>
          {users &&
            users.map((user, index) => (
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} key={index}>
                <MediaCard user={user} key={index} />
              </Grid2>
            ))}
        </Grid2>
      </InfiniteScroll> */}
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
