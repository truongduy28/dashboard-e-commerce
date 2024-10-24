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
