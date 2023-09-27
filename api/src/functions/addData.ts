import { app, HttpRequest, HttpResponseInit, InvocationContext, output } from "@azure/functions";

// 出力タイプのSQLを定義
const sqlOutput = output.generic({
    type: 'sql',
    commandtext: 'dbo.TodoTable',
    connectionStringSetting: 'SqlConnectionString'
})

export async function addData(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const todo = await request.json()
    context.log("😇: ", todo)
    context.extraOutputs.set(sqlOutput, todo);
    return {
        status: 201,
        body: JSON.stringify(todo)
    };
}

app.http('addData', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [sqlOutput],
    handler: addData
});
