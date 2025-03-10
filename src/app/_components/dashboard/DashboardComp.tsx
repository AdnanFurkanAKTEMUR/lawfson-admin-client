import React from "react";
import MostClickedProductComp from "./MostClickedProductComp";
import MessagesCount from "./MessagesCountComp";

const Dashboard: React.FC = () => {
  return (
    <>
      <MostClickedProductComp />
      <MessagesCount />
    </>
  );
};
export default Dashboard;
