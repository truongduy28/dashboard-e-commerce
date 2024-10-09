import { Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomHeader, CustomSider } from "../components";
import {
  CategoryScreen,
  HomeScreen,
  InventoryScreen,
  ManagerStoreScreen,
  OrderScreen,
  ReportScreen,
  SupplierScreen,
} from "../screens";

const { Content, Footer } = Layout;

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Layout>
        <CustomSider />
        <Layout>
          <CustomHeader />
          <Content className="pt-3 container-fluid">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="categories" element={<CategoryScreen />} />
              <Route path="report" element={<ReportScreen />} />
              <Route path="suppliers" element={<SupplierScreen />} />
              <Route path="orders" element={<OrderScreen />} />
              <Route path="manage-store" element={<ManagerStoreScreen />} />
              <Route path="inventory" element={<InventoryScreen />} />
            </Routes>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
