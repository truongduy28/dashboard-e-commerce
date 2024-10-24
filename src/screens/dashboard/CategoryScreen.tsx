import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Space,
  Table,
  Tooltip,
  TreeSelect,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import confirm from "antd/es/modal/confirm";
import { ColumnProps } from "antd/es/table";
import { Edit2, Trash } from "iconsax-react";
import { useEffect, useMemo, useState } from "react";
import { colors } from "../../constants/appInfos";
import {
  useAddCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "../../hooks/tanstackquery/useCategory";
import { CategoryPayload, ICategory } from "../../interfaces/category";
import {
  transformToTreeOptions,
  transformToTreeTable,
} from "../../utils/data-transfer";
import { formatSlug, sanitizePayload } from "../../utils/formater";

const { Title } = Typography;

const CategoryScreen = () => {
  // API: Get all categories
  const { data: categories, isLoading: isLoadingCategories } = useGetCategories(
    { page: 1, size: 999999 }
  );
  const categoriesData: ICategory[] = useMemo(() => {
    if (categories?.data) {
      return transformToTreeTable(categories.data, "_id", "parentId", "");
    }
    return [];
  }, [categories]);

  // Columns of table
  const columns: ColumnProps<ICategory>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 250,
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
      render: (value: ICategory) => (
        <ActionButtonPartial item={value} setSelected={setSelected} />
      ),
    },
  ];

  // State
  const [selected, setSelected] = useState<ICategory | undefined>(undefined);

  return (
    <div>
      <Title style={{ fontSize: 30 }}>Category</Title>
      <div className="row">
        <div className="col-8">
          <Table
            dataSource={categoriesData}
            columns={columns}
            loading={isLoadingCategories}
          />
        </div>
        <div className="col-4">
          <FormPartial
            categories={categories?.data || []}
            selectedCategory={selected}
            setSelectedCategory={setSelected}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryScreen;

const ActionButtonPartial = ({
  item,
  setSelected,
}: {
  item: ICategory;
  setSelected: React.Dispatch<React.SetStateAction<ICategory | undefined>>;
}) => {
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
      <Tooltip title="Edit" key={"btnEdit"}>
        <Button
          onClick={() => setSelected(item)}
          icon={<Edit2 size={20} color={colors.gray600} />}
          type="text"
        />
      </Tooltip>
      <Tooltip title="Delete" key={"btnDelete"}>
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

const FormPartial = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}: {
  categories: ICategory[];
  selectedCategory: ICategory | undefined;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ICategory | undefined>
  >;
}) => {
  const isUpdated = useMemo(() => !!selectedCategory, [selectedCategory]);

  const queryClient = useQueryClient();

  // API: Add category
  const addApi = useAddCategory();
  // API: Update category
  const updateApi = useUpdateCategory(selectedCategory?._id);

  const { mutate, isPending } = isUpdated ? updateApi : addApi;

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue(selectedCategory);
    }
  }, [selectedCategory]);

  const options = transformToTreeOptions(
    categories,
    (item) => item._id,
    (item) => item.title,
    (item) => item.parentId
  );
  const [form] = Form.useForm();

  const handleSubmit = (value: CategoryPayload) => {
    value.slug = formatSlug(value.title);
    mutate(sanitizePayload(value), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
        resetFields();
      },
    });
  };

  const resetFields = () => {
    setSelectedCategory(undefined);
    form.resetFields();
  };

  return (
    <Card>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        disabled={isPending}
      >
        <Form.Item label="Parent category" name={"parentId"}>
          <TreeSelect treeData={options} allowClear />
        </Form.Item>
        <Form.Item
          name={"title"}
          label="Title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="" allowClear />
        </Form.Item>
        <Form.Item name={"description"} label="Description">
          <TextArea rows={4} maxLength={350} showCount allowClear />
        </Form.Item>
        <Form.Item>
          <Space align="center">
            <Button onClick={resetFields}>Reset form</Button>
            <Button type="primary" onClick={form.submit} loading={isPending}>
              {isUpdated ? "Update" : "Create"} category
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
