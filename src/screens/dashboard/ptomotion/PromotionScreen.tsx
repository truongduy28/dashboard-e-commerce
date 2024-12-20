import { Avatar, Button, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit2, Trash } from "iconsax-react";
import { useMemo, useState } from "react";
import { useGetPromotions } from "../../../hooks/tanstackquery/usePromotion";
import { useDialog } from "../../../hooks/useDialogV2";
import { IPromotion } from "../../../interfaces/promotion";
import TitleOfTable from "./_components/TitleOfTable";

const { Title } = Typography;

const PromotionScreen = () => {
  // API: Get all promotions
  const { data, isLoading } = useGetPromotions();

  const dataTable = useMemo(() => data?.data || [], [data]);

  const { isShow: openForms, toggle: toggleForms } = useDialog();
  const [selectedPromotionId, setSelectedPromotionId] = useState<
    string | undefined
  >(undefined);

  const handleToggleForms = () => {
    if (openForms) {
      toggleForms();
      setSelectedPromotionId(undefined);
      return;
    }
    toggleForms();
  };

  const columns: ColumnProps<IPromotion>[] = [
    {
      key: "image",
      dataIndex: "imageURL",
      title: "Image",
      render: (img: string) => <Avatar src={img} size={50} />,
    },
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
    },
    {
      key: "available",
      dataIndex: "numOfAvailable",
      title: "Available",
    },

    {
      key: "value",
      dataIndex: "value",
      title: "Value",
    },
    {
      key: "type",
      dataIndex: "type",
      title: "Type",
    },
    {
      key: "btn",
      dataIndex: "",
      align: "right",
      fixed: "right",
      render: (item: IPromotion) => (
        <Space>
          <Button
            onClick={() => {
              setSelectedPromotionId(item._id);
              toggleForms();
            }}
            type="text"
            icon={<Edit2 variant="Bold" size={20} className="text-info" />}
          />
          <Button
            // onClick={() =>
            // 	confirm({
            // 		title: 'Confirm',
            // 		content: 'Are you sure you want to remove this promotion?',
            // 		onOk: () => handleRemovePromotion(item._id),
            // 	})
            // }
            type="text"
            icon={<Trash variant="Bold" size={20} className="text-danger" />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        //   pagination={{
        //     total: total,
        //     onChange(page, pageSize) {
        //       setPage(page);
        //       setPageSize(pageSize);
        //     },
        //     pageSize: pageSize,
        //     style: { textAlign: "center" },
        //   }}
        scroll={{ x: "max-content" }}
        dataSource={dataTable}
        columns={columns}
        title={
          (() => (
            <TitleOfTable
              promotionId={selectedPromotionId}
              openForms={openForms}
              toggleForms={handleToggleForms}
            />
          )) as any
        }
        loading={isLoading}
      />
    </div>
  );
};

export default PromotionScreen;
