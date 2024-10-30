import { TreeOption } from "../interfaces/common";

export const transformToTreeOptions = <T>(
    products: T[],
    getValue: keyof T,
    getTitle: keyof T,
    getParentId: keyof T
): TreeOption[] => {
    if (!products || !products.length) return [];

    const productMap: Record<string, TreeOption> = {};

    // Step 1: Create nodes for each product
    products.forEach((product) => {
        const value = product[getValue] as unknown as string;
        const title = product[getTitle] as unknown as string;

        productMap[value] = {
            value: value,
            title: title,
            children: [],
        };
    });

    const treeData: TreeOption[] = [];

    // Step 2: Assign children to their parents
    products.forEach((product) => {
        const parentId = product[getParentId] as unknown as string | null;
        const value = product[getValue] as unknown as string;

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