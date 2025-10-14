export type Package = {
    name: string;
    loader: () => Promise<void>;
    dependencies?: Package[];
    loaded: boolean;
    loading: boolean;
};
export declare function loadPackage(p: Package): Promise<void>;
//# sourceMappingURL=index.d.ts.map