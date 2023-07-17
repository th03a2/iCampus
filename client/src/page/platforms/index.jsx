import React, { useEffect, useState } from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import TopNavigation from "../../components/navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useSelector } from "react-redux";
import { socket } from "../../components/utilities";
import { toast } from "react-toastify";
import Company from "../../fakeDb/company";

const Dashboard = () => {
  const [show, setShow] = useState(false),
    { theme, auth } = useSelector(state => state.auth),
    [dimensions, setDimensions] = useState({
      height: window.innerHeight,
      width: window.innerWidth,
    });

  useEffect(() => {
    function debounce(fn, ms) {
      let timer;

      return _ => {
        clearTimeout(timer);

        timer = setTimeout(_ => {
          timer = null;

          fn.apply(this, arguments);
        }, ms);
      };
    }

    const debounceResize = debounce(
      () =>
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth,
        }),
      500
    );

    window.addEventListener("resize", debounceResize);

    return () => window.removeEventListener("resize", debounceResize);
  }, []);

  useEffect(() => {
    document.title = `${Company.name} | Dashboard`;
    if (auth._id) {
      socket.emit("join_room", auth._id);
    }
  }, [auth]);

  useEffect(() => {
    socket.on("logout", () => {
      toast.info("You were logged out from a different device.");
      localStorage.removeItem("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
    });

    return () => {
      socket.off("logout");
    };
  }, []);

  const handleToggle = () => setShow(!show);

  return (
    <MDBContainer
      fluid
      className={`px-0 dashboard-container pb-5 ${theme.skin} transition-all`}
    >
      <div className="flexible-content">
        <TopNavigation toggle={handleToggle} />
        <main
          style={{
            marginLeft: dimensions.width <= 768 ? 0 : 140,
          }}
          id="content"
          className="p-1 transition-all"
        >
          <Sidebar dimensions={dimensions} show={show} toggle={handleToggle} />
          <MDBContainer fluid className="mt-5 pt-3 px-0 mx-0">
            <Outlet />
          </MDBContainer>
        </main>
      </div>
    </MDBContainer>
  );
};

export default Dashboard;
