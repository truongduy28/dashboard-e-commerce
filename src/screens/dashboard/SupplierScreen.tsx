import { Button, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { titleFromPath } from "../../utils/formater";
import { Sort } from "iconsax-react";
import { SupplierForms } from "../../components";
import { useDialog } from "../../hooks/useDialogV2";

const { Title } = Typography;
const SupplierScreen = () => {
  const columns: ColumnProps<any>[] = [];

  const { isShow, toggle } = useDialog();

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
      <Table dataSource={[]} columns={columns} title={TitlePartial} />

      {/* Supplier forms to add and update information */}
      <SupplierForms visible={isShow} onClose={toggle} onOk={toggle} />
    </div>
  );
};

export default SupplierScreen;
