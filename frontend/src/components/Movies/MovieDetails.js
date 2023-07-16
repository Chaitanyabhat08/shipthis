import React from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  console.log("this is id");
  return (
    <div>
      <h1>Movie Details</h1>
    </div>
  )
}
export default MovieDetails;