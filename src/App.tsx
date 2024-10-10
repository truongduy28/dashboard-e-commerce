import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import store from "./redux/store";
import Routers from "./routers/Routers";

function App() {
  const queryClient = new QueryClient();

  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <Routers />
        </ReduxProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
