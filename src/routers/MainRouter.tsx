import { Affix, Layout } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomHeader, CustomSider } from "../components";
import {
  AddProductScreen,
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
        <Affix offsetTop={0}>
          <CustomSider />
        </Affix>
        <Layout>
          <Affix offsetTop={0}>
            <CustomHeader />
          </Affix>
          <Content className="pt-3 container-fluid">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="categories" element={<CategoryScreen />} />
              <Route path="report" element={<ReportScreen />} />
              <Route path="suppliers" element={<SupplierScreen />} />
              <Route path="orders" element={<OrderScreen />} />
              <Route path="manage-store" element={<ManagerStoreScreen />} />
              <Route path="inventory" element={<InventoryScreen />} />
              <Route
                path="inventory/add-product"
                element={<AddProductScreen />}
              />
            </Routes>
          </Content>
          {/* <Footer /> */}
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default MainRouter;
