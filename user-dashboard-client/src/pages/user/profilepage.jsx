import { useParams } from "react-router";
export default function ProfilePage() {
  const params = useParams();
  return (
    <>
      <h1>Profile Page</h1>
      <p>{params.userId}</p>
    </>
  );
}
