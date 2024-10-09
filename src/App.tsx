import { ConfigProvider } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import Routers from "./routers/Routers";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <ReduxProvider store={store}>
        <Routers />
      </ReduxProvider>
    </ConfigProvider>
  );
}

export default App;
