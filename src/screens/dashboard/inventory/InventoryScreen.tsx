import { Avatar, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/es/table/interface";
import { useMemo, useState } from "react";
import SubProductForms from "../../../components/modals/SubProductForms";
import { CustomFilter } from "../../../components/table/CustomFilter";
import RangeValue from "../../../components/table/RangeValue";
import { antdColors } from "../../../constants/appInfos";
import { useGetCategoryFilters } from "../../../hooks/tanstackquery/useCategory";
import {
  useGetProducts,
  useGetSubProductFilters,
} from "../../../hooks/tanstackquery/useProduct";
import { useDialog } from "../../../hooks/useDialogV2";
import usePagination from "../../../hooks/usePagination";
import useWindow from "../../../hooks/useWindow";
import {
  FilterProductPayload,
  IProduct,
  ISubProduct,
} from "../../../interfaces/product";
import * as TableComponents from "./_components";

const { Text } = Typography;
const {
  ActionsPartial,
  ColorsPartial,
  PricesPartial,
  SizesPartial,
  TitlePartial,
} = TableComponents;

const InventoryScreen = () => {
  const { page, pageSize, setPage, setPageSize } = usePagination();
  const [filters, setFilters] = useState<FilterProductPayload>({
    title: "",
    categories: [],
    colors: [],
    sizes: [],
    price: {
      start: null,
      end: null,
    },
  });

  // API: Get all products
  const { data: products, isLoading } = useGetProducts({
    page,
    size: pageSize,
    filters,
  });
  const { productsData, rangePriceData, total } = useMemo(() => {
    const productsData = products?.data ? products.data.items : [];
    const rangePriceData = products?.data
      ? products.data.rangePrice
      : { min: 100000, max: 10000000000 };
    const total = products?.data ? products.data.total : 0;
    return { productsData, rangePriceData, total };
  }, [products]);

  // API: Get category filters
  const { data: catFilters } = useGetCategoryFilters();

  const catFiltersData = useMemo(
    () =>
      catFilters?.data
        ? catFilters.data.map((i) => ({ text: i.title, value: i._id }))
        : [],
    [catFilters]
  );

  // API: Get sub product filters
  const { data: subProductFilters } = useGetSubProductFilters();
  const { colorsFilters, sizesFilters } = useMemo(() => {
    const colors =
      subProductFilters?.data.colors.map((i) => ({ text: i, value: i })) || [];
    const sizes =
      subProductFilters?.data.sizes.map((i) => ({ text: i, value: i })) || [];
    return { colorsFilters: colors, sizesFilters: sizes };
  }, [subProductFilters]);

  const columns: ColumnsType<IProduct> = [
    {
      key: "title",
      dataIndex: "title",
      title: "Title",
      width: 300,
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 400,
      render: (item: string) => (
        <Tooltip title={item}>
          <Text>
            {item ? (item.length > 50 ? item.slice(0, 50) + "..." : item) : "-"}
          </Text>
        </Tooltip>
      ),
    },
    {
      key: "categories",
      dataIndex: "categories",
      title: "Categories",
      width: 300,
      filters: catFiltersData,
      filtered: !!filters.categories.length,
      filterDropdown: (props) => (
        <CustomFilter
          selected={filters.categories}
          onSelected={(items) => setFilters({ ...filters, categories: items })}
          props={props}
        />
      ),
      render: (item) =>
        item.map((i: { title: string; _id: string }) => (
          <Tag
            key={i._id}
            color={antdColors[Math.floor(Math.random() * antdColors.length)]}
          >
            {i.title}
          </Tag>
        )),
    },
    {
      key: "images",
      dataIndex: "images",
      title: "Images",
      width: 200,
      render: (item) => (
        <Avatar.Group>
          {item.map((i: string) => (
            <Avatar key={i} src={i} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      key: "colors",
      dataIndex: "subProducts",
      title: "Colors",
      width: 150,
      render: (v: ISubProduct[] = []) => {
        const colors = v.map((i) => i.color);
        return <ColorsPartial items={colors} />;
      },
      filters: colorsFilters,
      filtered: !!filters.colors.length,
      filterDropdown: (props) => (
        <CustomFilter
          props={props}
          onSelected={(v) => setFilters({ ...filters, colors: v })}
          selected={filters.colors}
          type="color"
        />
      ),
    },
    {
      key: "sizes",
      dataIndex: "subProducts",
      title: "Sizes",
      width: 150,
      render: (v: ISubProduct[] = []) => {
        const sizes = v.map((i) => i.size);
        return <SizesPartial items={sizes} />;
      },
      filters: sizesFilters,
      filtered: !!filters.sizes.length,
      filterDropdown: (props) => (
        <CustomFilter
          props={props}
          onSelected={(v) => setFilters({ ...filters, sizes: v })}
          selected={filters.sizes}
          type="tag"
        />
      ),
    },
    {
      key: "prices",
      dataIndex: "subProducts",
      title: "Prices",
      width: 150,
      render: (v: ISubProduct[] = []) => {
        const prices = v.map((i) => i.price);
        return <PricesPartial items={prices} />;
      },
      align: "center",
      filtered: !!(filters.price?.start && filters.price?.end),
      filterDropdown: (props) => (
        <RangeValue
          onChange={(v) => setFilters((prev) => ({ ...prev, price: v }))}
          defaultValue={[filters.price?.start, filters.price?.end]}
          max={rangePriceData.max}
          min={rangePriceData.min}
          props={props}
        />
      ),
    },
    {
      key: "stocks",
      dataIndex: "subProducts",
      title: "Stocks",
      width: 150,
      render: (v: ISubProduct[] = []) => {
        const value = v.reduce((a, b) => a + b.qty, 0);
        return value > 0 ? value : "-";
      },
      align: "center",
    },
    {
      key: "actions",
      title: "Actions",
      dataIndex: "",
      fixed: "right",
      width: 120,
      align: "center",
      render: (value) => (
        <ActionsPartial
          item={value}
          setShow={toggleSubProduct}
          setSelectedProduct={setSelectedProduct}
        />
      ),
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const { isShow: isSubProductShow, toggle: toggleSubProduct } = useDialog();
  const { innerHeight } = useWindow();
  return (
    <>
      <Table
        pagination={{
          showSizeChanger: true,
          total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
        size="middle"
        title={() => (
          <TitlePartial
            onchange={(text: string) =>
              setFilters((prev) => ({ ...prev, title: text }))
            }
            value={filters.title}
          />
        )}
        loading={isLoading}
        dataSource={productsData}
        columns={columns}
        scroll={{ x: 1200, y: innerHeight - 250 }}
      />
      <SubProductForms
        visible={isSubProductShow}
        onClose={() => {
          toggleSubProduct();
          setSelectedProduct(undefined);
        }}
        product={selectedProduct}
      />
    </>
  );
};

export default InventoryScreen;
