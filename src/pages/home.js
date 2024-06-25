import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <div className="home">
        <main className="main-content">
          <h1>Welcome To Analytics Dashboard </h1>
          <p>Powered By Dhiwise</p>
        </main>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .home {
    text-align: center;
    background-color: #cccccc;
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
`;

export default Home;
