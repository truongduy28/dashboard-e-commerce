import { useQueryClient } from "@tanstack/react-query";
import { Button, message, Space, Table, Tooltip, Typography } from "antd";
import confirm from "antd/es/modal/confirm";
import { ColumnProps } from "antd/es/table";
import { Edit2, Trash } from "iconsax-react";
import { useMemo } from "react";
import { colors } from "../../constants/appInfos";
import {
  useDeleteCategory,
  useGetCategories,
} from "../../hooks/tanstackquery/useCategory";
import { ICategory } from "../../interfaces/category";

const { Title } = Typography;
const CategoryScreen = () => {
  // API: Get all categories
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories(
    { page: 1, size: 999999 }
  );
  const categoriesData: ICategory[] = useMemo(() => {
    if (categories?.data) {
      return categories?.data;
    }
    return [];
  }, [categories]);

  // Columns of table
  const columns: ColumnProps<ICategory>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      align: "center",
      render: (value: ICategory) => <ActionButtonPartial item={value} />,
    },
  ];

  return (
    <div>
      <Title style={{ fontSize: 30 }}>Category</Title>
      <div className="row">
        <div className="col-4">Forms</div>
        <div className="col-8">
          <Table
            dataSource={categoriesData}
            columns={columns}
            loading={isLoadingCategories}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;

const ActionButtonPartial = ({ item }: { item: ICategory }) => {
  const queryClient = useQueryClient();

  // API: Delete category by id
  const { mutate: deleteMutate, isPending: isLoadingDelete } =
    useDeleteCategory();

  const handleDeleteById = (id: string) => {
    deleteMutate(
      { id, isDeleted: true },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-categories"] });
          message.success("Delete category successfully!");
        },
      }
    );
  };

  return (
    <Space>
      <Tooltip title="Edit categories" key={"btnEdit"}>
        <Button
          onClick={() => {}}
          icon={<Edit2 size={20} color={colors.gray600} />}
          type="text"
        />
      </Tooltip>
      <Tooltip title="Xoá categories" key={"btnDelete"}>
        <Button
          onClick={() =>
            confirm({
              title: "Confirm",
              content: "Are you sure you want to delete this category?",
              onOk: async () => handleDeleteById(item._id),
              okButtonProps: { loading: isLoadingDelete },
            })
          }
          icon={<Trash size={20} className="text-danger" />}
          type="text"
        />
      </Tooltip>
    </Space>
  );
};
