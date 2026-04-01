import React, { useState, useEffect } from "react";
import { Footer } from "../Footer";
import { Categories } from "../Categories";
import { PageInformation } from "../PageInformation";
import { Loader } from "../Loader";

const Home = () => {
  const [isLoader, setIsLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* {isLoader && <Loader />} */}
      <div
        className="content"
        style={
          isLoader
            ? { overflowY: "hidden", height: "100%" }
            : { overflow: "auto", height: "auto" }
        }
      >
        <PageInformation />
        <Categories />
        <Footer />
      </div>
    </>
  );
};

export default Home;
