import { useParams } from "react-router";

const Createblogpage = () => {
  const { userId } = useParams();
  //   console.log(param);
  return (
    <>
      <div>Createblog page</div>
      <p>{userId}</p>
    </>
  );
};

export default Createblogpage;
