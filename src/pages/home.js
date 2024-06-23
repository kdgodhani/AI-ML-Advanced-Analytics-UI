// import createdProjects from "../assets/images/createdProj.svg";
// import receivedTasks from "../assets/images/receivedProj.svg";
import styled from "styled-components";
// import { Link } from "react-router-dom";
// import { MDBBtn, MDBCardImage, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { useEffect } from "react";
import {
  setDashboardText,
} from "../features/user/userSlice";

import { useDispatch } from "react-redux";

// const Home = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(setDashboardText("Welcome"));
//   }, []);

//   return (
//     <Wrapper>
//     <MDBRow
//       className="row-cols-1 row-cols-md-2 g-7"
//       style={{ padding: "7%" }}
//     >
//       <MDBCol>
//         <div style={{ display: "grid", marginRight: "10%" }}>
//           <img
//             src={createdProjects}
//             alt="job hunt"
//             className="img main-img"
//             style={{
//               width: "30%",
//               marginTop: "8%",
//               marginLeft: "25%",
//             }}
//           />
//           <div className="info" style={{ alignItems: "center" }}>
//             <h2 style={{ float: "center" }}>
//               Your <span> Projects</span>
//             </h2>
//             <p>
//               Here, you can easily create new projects, add members, assign tasks, and track the progress of each task in real-time. Manage your projects efficiently and collaborate with your team to achieve your goals faster.
//             </p>
//             <div style={{ textAlign: "center" }}>
//               <Link
//                 to="/projects"
//                 className="btn btn-hero"
//                 style={{ backgroundColor: "#0984e3" }}
//               >
//                 my projects
//               </Link>
//             </div>
//           </div>
//         </div>
//       </MDBCol>
//       <MDBCol>
//         <div style={{ marginTop: "3%" }}>
//           <img
//             src={receivedTasks}
//             alt="job hunt"
//             className="img main-img"
//             style={{
//               width: "30%",
//               marginLeft: "25%",
//             }}
//           />
//           <div className="info">
//             <h2>
//               Received <span> Tasks</span>
//             </h2>
//             <p style={{ alignSelf: "left" }}>
//               Here, you can access tasks created by your superiors to better coordinate and collaborate with your team. Track task progress in real-time and ensure each task is completed on time.
//             </p>
//             <div style={{ textAlign: "center" }}>
//               <Link
//                 to="/tasks"
//                 className="btn btn-hero"
//                 style={{ backgroundColor: "#01a3a4" }}
//               >
//                 my tasks
//               </Link>
//             </div>
//           </div>
//         </div>
//       </MDBCol>
//     </MDBRow>
//   </Wrapper>
  
//   );
// };
// const Wrapper = styled.main`
//   nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }
//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }
//   h2 {
//     font-weight: 500;
//     span {
//       color: var(--primary-500);
//     }
//   }
//   p {
//     color: var(--grey-600);
//   }
//   .main-img {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: 1fr 1fr;
//       column-gap: 3rem;
//     }
//     .main-img {
//       display: block;
//     }
//   }
// `;

const Home = () => {
  //   const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(setDashboardText("Welcome"));
  // }, []);
  return (
      <Wrapper>
      <div className="home">
          <main className="main-content">
              <h1>Developer Productivity Solved</h1>
              <p>Build Front-end and Web applications at blazing fast speed without compromising on code-quality and developer-experience.</p>
              <div className="action-buttons">
                  <a href="#" className="sign-up-main">Sign Up for Free</a>
                  <a href="#" className="install-plugin">Install Figma Plugin</a>
              </div>
              <div className="video-container">
                  <a href="#" className="video-link">See how to get started with DhiWise in 60 secs Watch now</a>
              </div>
          </main>
      </div>
      </Wrapper>
  );
};

const Wrapper = styled.main`
.home {
  text-align: center;
  background-color: #9ff528;
}

.main-content {
  padding: 60px 40px;
}

.main-content h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

.main-content p {
  font-size: 1.5em;
  margin-bottom: 40px;
}

.action-buttons {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.action-buttons a {
  color: #fff;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 5px;
}

.sign-up-main {
  background-color: #007bff;
}

.install-plugin {
  background-color: #333;
}

.video-container {
  margin-bottom: 60px;
}

.video-link {
  color: #fff;
  text-decoration: none;
  background-color: #444;
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;
}

.logos {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.logos img {
  width: 100px;
}
`;

export default Home;
