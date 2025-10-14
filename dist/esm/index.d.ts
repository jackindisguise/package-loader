export type Package = {
    name: string;
    loader: () => Promise<void>;
    dependencies?: Package[];
};
export declare function isLoaded(p: Package): boolean;
export declare function isLoading(p: Package): boolean;
export declare function loadPackage(p: Package): Promise<void>;
//# sourceMappingURL=index.d.ts.map