import { Button, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Sort } from "iconsax-react";
import { useEffect, useState } from "react";
import handleAPI from "../../apis/handleApi";
import { SupplierForms } from "../../components";
import { GET_SUPPLIERS } from "../../constants/endpoint";
import { useDialog } from "../../hooks/useDialogV2";
import { ISupplier, SuppliersResponse } from "../../interfaces/supplier";
import { titleFromPath } from "../../utils/formater";

const { Title, Text } = Typography;
const SupplierScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  const columns: ColumnProps<ISupplier>[] = [
    {
      key: "name",
      title: "Supplier name",
      dataIndex: "name",
    },
    {
      key: "product",
      title: "Product",
      dataIndex: "product",
    },
    {
      key: "contact",
      title: "Contact number",
      dataIndex: "contact",
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "type",
      title: "Type",
      dataIndex: "isTaking",
      render: (value: number) => (
        <Text type={value ? "success" : "danger"}>
          {value ? "Takling return" : "Not taking return"}
        </Text>
      ),
    },
    {
      key: "onTheWay",
      title: "On the way",
      render: () => <p className="text-center">-</p>,
    },
  ];

  const { isShow, toggle } = useDialog();

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = (await handleAPI(
        GET_SUPPLIERS
      )) as unknown as SuppliersResponse;
      setSuppliers(res.data.items);
    } catch (error) {
      console.log("Error when get suppliers: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const TitlePartial = () => {
    const titleText = titleFromPath();
    return (
      <div className="row">
        <div className="col">
          <Title className="m-0">{titleText}</Title>
        </div>
        <div className="col text-right my-auto">
          <Space>
            <Button type="primary" onClick={toggle}>
              Add Supplier
            </Button>
            <Button icon={<Sort size={20} />}>Filters</Button>
            <Button>Download all</Button>
          </Space>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        dataSource={suppliers}
        columns={columns}
        title={TitlePartial}
        loading={isLoading}
      />

      {/* Supplier forms to add and update information */}
      <SupplierForms visible={isShow} onClose={toggle} onOk={toggle} />
    </div>
  );
};

export default SupplierScreen;
