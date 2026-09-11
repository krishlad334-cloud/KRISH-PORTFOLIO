import { lazy, Suspense } from "react";
import { LoadingProvider } from "../context/LoadingProvider";

const CharacterModel = lazy(() => import("../components/Character"));
const MainContainer = lazy(() => import("../components/MainContainer"));

const Home = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<div style={{ textAlign: "center", padding: "100px", color: "#5eead4" }}>Loading Portfolio...</div>}>
        <MainContainer>
          <Suspense fallback={null}>
            <CharacterModel />
          </Suspense>
        </MainContainer>
      </Suspense>
    </LoadingProvider>
  );
};

export default Home;
