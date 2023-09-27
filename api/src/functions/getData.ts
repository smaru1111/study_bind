import { app, HttpRequest, HttpResponseInit, InvocationContext, input } from "@azure/functions";

const sqlInput = input.generic({
    // azure sql databaseの時これ
    type: 'sql',
    commandtype: 'text',
    // SQL文ここに書く
    commandtext: 'select * from dbo.TodoTable',

    // 接続文字列の設定
    connectionStringSetting: 'SqlConnectionString'
})

export async function getData(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    const data = context.extraInputs.get(sqlInput);
    context.log("😇: ", data)
    return {
        status: 200,
        body: JSON.stringify(data)
    };
}

app.http('getData', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraInputs: [sqlInput],
    handler: getData
});
