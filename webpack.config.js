const fs =                      require("fs");
const path =                    require("path");
const HtmlWebpackPlugin =       require("html-webpack-plugin");
const TerserPlugin =            require("terser-webpack-plugin");
const MiniCssExtractPlugin =    require("mini-css-extract-plugin");
const CopyWebpackPlugin =       require("copy-webpack-plugin");
const {CleanWebpackPlugin} =    require("clean-webpack-plugin");
import 'bootstrap/dist/css/bootstrap.min.css';

function generateHtmlPlugins(tmplDir){
    const tmplFiles = fs.readdirSync(path.resolve(__dirname, tmplDir));
    return tmplFiles.map((file)=>{
        const parts = file.split('.');
        const name = parts[0];
        const ext = parts[1];
        return new HtmlWebpackPlugin({
            filename:name+'.html',
            template:path.resolve(__dirname, tmplDir+'/'+name+'.'+ext),
            inject: false
        });
    });
}

const htmlPlugins = generateHtmlPlugins("./src/pages");

const ASSETS = './src/assets/';
const ASSETS_DIST = 'assets/';
const config = {
    entry:[ASSETS+'js/main.js', ASSETS+'scss/style.scss'],
    output:{
        filename:ASSETS_DIST+'js/all.min.js'
    },
    devServer: {
        port: 9000,
        hot: true,
        liveReload: true,
        watchFiles:['src/pages/**/*.html', 'src/parts/**/*.html']
      },
    devtool:"source-map",
    mode:"production",
    optimization:{
        minimizer:[
            new TerserPlugin({
                extractComments: true
            })
        ]
    },
    module: {
        rules:[
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, ASSETS+'scss'),
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{}
                    },
                    {
                        loader:'css-loader',
                        options:{
                            sourceMap:true,
                            url:false
                        }
                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                include:path.resolve(__dirname, './src/parts/'),
                use:[
                    'raw-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:ASSETS_DIST+'css/all.min.css'
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:ASSETS+'images',
                    to:ASSETS_DIST+'images'
                },

            ]
        })
    ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.plugins.push(new CleanWebpackPlugin());
    }
    return config;
};