import { TreeOption } from "../interfaces/common";

export const transformToTreeOptions = <T>(
    products: T[],
    getValue: (item: T) => string,
    getTitle: (item: T) => string,
    getParentId: (item: T) => string | null
): TreeOption[] => {
    console.log(products);
    if (!products || !products.length) return [];

    const productMap: Record<string, TreeOption> = {};

    // Step 1: Create nodes for each product
    products.forEach((product) => {
        const value = getValue(product);
        const title = getTitle(product);

        productMap[value] = {
            value: value,
            title: title,
            children: [],
        };
    });

    const treeData: TreeOption[] = [];

    // Step 2: Assign children to their parents
    products.forEach((product) => {
        const parentId = getParentId(product);
        const value = getValue(product);

        if (parentId) {
            const parent = productMap[parentId];
            if (parent) {
                parent.children?.push(productMap[value]);
            }
        } else {
            // If there's no parentId, it's a root node
            treeData.push(productMap[value]);
        }
    });

    return treeData;
}


type TreeTable<T> = T & {
    key: string | number;
    children?: TreeTable<T>[];
};

export const transformToTreeTable = <T>(
    data: T[],
    idField: keyof T,
    parentIdField: keyof T,
    rootParentValue: any
): TreeTable<T>[] => {
    const map = new Map<string | number, TreeTable<T>>();
    const treeData: TreeTable<T>[] = [];

    data.forEach(item => {
        const key = item[idField] as unknown as string;
        const newItem: TreeTable<T> = { ...item, key };
        map.set(key, newItem);
    });

    data.forEach(item => {
        const parentId = item[parentIdField];
        const key = item[idField] as unknown as string | number;
        if (parentId === rootParentValue) {
            treeData.push(map.get(key)!);
        } else {
            const parentItem = map.get(parentId as unknown as string | number);
            if (parentItem) {
                parentItem.children = parentItem.children || [];
                parentItem.children.push(map.get(key)!);
            }
        }
    });

    return treeData;
};