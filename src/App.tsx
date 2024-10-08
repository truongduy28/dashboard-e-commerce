import { ConfigProvider } from "antd";
import Routers from "./screens/routers/Routers";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorTextHeading: "#1570ef",
        },
      }}
    >
      <ReduxProvider store={store}>
        <Routers />
      </ReduxProvider>
    </ConfigProvider>
  );
}

export default App;
