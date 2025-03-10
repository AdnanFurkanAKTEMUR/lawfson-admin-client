import React from "react";
import MostClickedProductComp from "./MostClickedProductComp";
import MessagesCount from "./MessagesCountComp";
import LastFiveComp from "./LastFiveComp";

const Dashboard: React.FC = () => {
  return (
    <>
      <MostClickedProductComp />
      <MessagesCount />
      <LastFiveComp />
    </>
  );
};
export default Dashboard;
