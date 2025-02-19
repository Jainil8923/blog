import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import CircularIndeterminate from "../../components/general/progress";

export default function ProfilePage() {
  const [isUserIdLoading, setIsUserIdLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userId = decodedToken[0].userId;
          console.log(decodedToken);
          const response = await axios.get(
            `http://localhost:3000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsUserIdLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isUserIdLoading) {
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

  if (error) return <div>{error.message}</div>;
  if (!data) {
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

  console.log("data:", data);

  return (
    <>
      <h1>Profile Page</h1>
    </>
  );
}
