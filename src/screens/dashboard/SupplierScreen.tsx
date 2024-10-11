import { Button, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit2, Sort, UserRemove } from "iconsax-react";
import { useState } from "react";
import { SupplierForms } from "../../components";
import { useGetSuppliers } from "../../hooks/tanstackquery/useSupplier";
import { useDialog } from "../../hooks/useDialogV2";
import { ISupplier } from "../../interfaces/supplier";
import { titleFromPath } from "../../utils/formater";

const { Title, Text } = Typography;
const SupplierScreen = () => {
  // API: Get all suppliers
  const { data: suppliersResponse, isLoading } = useGetSuppliers();

  const suppliers = suppliersResponse?.data?.items || [];

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
      dataIndex: "active",
      render: (value: number) => <Text>{value || "-"}</Text>,
      align: "center",
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      dataIndex: "",
      render: (value: ISupplier) => (
        <Space>
          <Button
            icon={<Edit2 size={18} className="text-info" />}
            onClick={() => {
              setSupplierSelected(value);
              toggle();
            }}
          />
          <Button icon={<UserRemove size={18} className="text-danger" />} />
        </Space>
      ),
    },
  ];

  const { isShow, toggle } = useDialog();
  const [supplierSelected, setSupplierSelected] = useState<
    ISupplier | undefined
  >();

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
      <SupplierForms
        visible={isShow}
        onClose={() => {
          setSupplierSelected(undefined);
          toggle();
        }}
        supplier={supplierSelected}
      />
    </div>
  );
};

export default SupplierScreen;
