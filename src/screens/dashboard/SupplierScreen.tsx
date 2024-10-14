import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Space, Table, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import { Edit2, Sort, UserRemove } from "iconsax-react";
import { useState } from "react";
import { SupplierForms } from "../../components";
import ExportExcel from "../../components/modals/ExportExcel";
import {
  useDeleteSupplier,
  useGetSuppliers,
} from "../../hooks/tanstackquery/useSupplier";
import { useDialog } from "../../hooks/useDialogV2";
import usePagination from "../../hooks/usePagination";
import { ISupplier } from "../../interfaces/supplier";
import { titleFromPath } from "../../utils/formater";

const { Title, Text } = Typography;
const { confirm } = Modal;

const SupplierScreen = () => {
  const { page, pageSize, setPage, setPageSize } = usePagination();
  // API: Get all suppliers
  const { data: suppliersResponse, isLoading } = useGetSuppliers({
    page,
    pageSize,
  });

  // API: Delete supplier
  const { mutate: deleteSupplier } = useDeleteSupplier();

  const suppliers = suppliersResponse?.data?.items || [];
  const total = suppliersResponse?.data?.total || 0;

  const columns: ColumnProps<ISupplier>[] = [
    {
      key: "index",
      title: "#",
      render: (_value, _record, index) => {
        return (
          <p className="text-center">{(page - 1) * pageSize + index + 1}</p>
        );
      },
    },
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
        <ActionButtonPartial
          key={value._id}
          value={value}
          toggleForm={toggle}
          onRowSelected={setSupplierSelected}
          deleteFn={deleteSupplier}
        />
      ),
    },
  ];

  const { isShow, toggle } = useDialog();
  const { isShow: isDownloadShow, toggle: toggleDownload } = useDialog();
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
            <Button onClick={toggleDownload}>Download all</Button>
          </Space>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Table
        pagination={{
          total: total,
          onChange(page, pageSize) {
            setPage(page);
            setPageSize(pageSize);
          },
          pageSize: pageSize,
          style: { textAlign: "center" },
        }}
        scroll={{ x: "max-content" }}
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

      {/* Supplier download excel */}
      <ExportExcel
        visible={isDownloadShow}
        onClose={toggleDownload}
        columns={
          (columns.map((c) => ({ label: c.title, value: c.key })) as any) || []
        }
        nameReplacer={[
          { previous: "type", new: "isTaking" },
          {
            previous: "onTheWay",
            new: "active",
          },
        ]}
      />
    </div>
  );
};

export default SupplierScreen;

const ActionButtonPartial = ({
  value,
  onRowSelected,
  toggleForm,
  deleteFn,
}: {
  value: ISupplier;
  onRowSelected: (value: ISupplier) => void;
  toggleForm: () => void;
  deleteFn: UseMutateFunction<any, any, any, any>;
}) => {
  const queryClient = useQueryClient();

  return (
    <Space>
      <Button
        icon={<Edit2 size={18} className="text-info" />}
        onClick={() => {
          onRowSelected(value);
          toggleForm();
        }}
      />
      <Button
        icon={<UserRemove size={18} className="text-danger" />}
        onClick={() =>
          confirm({
            title: "Confirm",
            content: "Are you sure you want to delete this supplier?",
            onOk: () =>
              deleteFn(value._id, {
                onSuccess: () =>
                  queryClient.invalidateQueries({
                    queryKey: ["get-suppliers"],
                  }),
              }),
          })
        }
      />
    </Space>
  );
};
