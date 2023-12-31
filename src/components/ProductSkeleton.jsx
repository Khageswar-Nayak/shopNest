import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ProductSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={250} height={200} />
      <div className=" flex justify-between max-w-[15.5rem]">
        <Skeleton variant="text" sx={{ fontSize: "20px" }} width={100} />
        <Skeleton variant="text" sx={{ fontSize: "20px" }} width={70} />
      </div>

      <Skeleton variant="text" sx={{ fontSize: "10px" }} width={210} />
      <Skeleton variant="text" sx={{ fontSize: "10px" }} width={210} />
      <Skeleton variant="text" sx={{ fontSize: "15px" }} width={100} />
      <Skeleton variant="text" sx={{ fontSize: "20px" }} width={210} />

      <Skeleton variant="rounded" width={250} height={40} />
    </Stack>
  );
};
export default ProductSkeleton;
