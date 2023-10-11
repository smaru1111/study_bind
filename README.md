作成記録:https://zenn.dev/smaru1111/articles/1871bf063dc593

環境構築

- Node18
- [bun](https://bun.sh/)
- Azure のサブスク(できれば AD 認証使えると嬉しい)
- VSCode の[Azure 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
- [Azure Static Web Apps CLI](https://github.com/Azure/static-web-apps-cli)(フロントも作る方は)
- [Azure Functions Core Tools](https://learn.microsoft.com/ja-jp/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-typescript#:~:text=%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82-,Azure%20Functions%20Core%20Tools%20%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB,-Core%20Tools%20%E3%82%92)(必須)
- [Azure Data Studio](https://learn.microsoft.com/ja-jp/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=redhat-install%2Credhat-uninstall)(必須)

bash1  
api ディレクトリをビルドして、カレントディレクトリで localhost を立ち上げる

```
cd api
bun install
bun run build

cd ../
bun install
bun run dev
```

bash2  
カレント直下で`swa start`を実行する

```
swa start http://localhost:5173/ --api-location api
```
