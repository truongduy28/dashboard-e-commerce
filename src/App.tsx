import { ConfigProvider } from "antd";
import Routers from "./screens/routers/Routers";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#1570ef",
        },
      }}
    >
      <Routers />;
    </ConfigProvider>
  );
}

export default App;
