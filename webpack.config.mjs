import path from "path";
import {fileURLToPath} from "url";
import {CleanWebpackPlugin} from "clean-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: "production",
    target: "node",
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    output: {
        filename: "build.cjs",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new CleanWebpackPlugin()],
};
