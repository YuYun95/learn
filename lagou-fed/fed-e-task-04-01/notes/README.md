## React 基础
### 一、React 介绍
1. React 是一个用于构建用户界面的 Javascript 库，它只负责应用的视图层，帮助开发人员构建快速且交互式的 web 应用程序

2. React 使用组件的方式构建用户界面

### 二、JSX语法
1. 在 React 中使用 JSX 语法描述用户界面，它是一种 Javascript 语法扩展

2. 在 React 代码执行之前，Babel 会将 JSX 语法转换为标准的 Javascript API

3. JSX 语法是一种语法糖，让开发人员使用更加舒服的代码构建用户界面

4. 在 JSX 中使用表达式
    ```react
    const user = {
        firstName: 'Harper',
        lastName: 'Perez'
    }
    
    function formatName(user) {
        return user.firstName + ' ' + user.lastName
    }
    
    const element = <h1>Hello, {formatName(user)}!</h1>;
    ```
   JSX 本身其实也是一种表达式，将它赋值给变量，当作参数传入，作为返回值都可以

5. 属性

    如果属性值为字符串类型，需要加引号，属性名称推荐采用驼峰式命名法
    ```react
    const element = <div greeting="hello"></div>
    ```
    
    如果属性值为javascript表达式，属性值外面加大括号
    ```react
    const element = <img src={user.avatarUrl} />
    // 注意大括号外面不能加引号，JSX 会将引号当中的内容识别为字符串而不是表达式
    ```
6. JSX 单标记必须闭合
    
    如果 JSX 是单标记，必须闭合，否则报错
    ```react
    const element = <img src={user.avatarUrl} />
    const element = <input type="text" />
    ```

7. className

    为 JSX 标记添加类名需要使用className，而不是class
    ```react
    const element = <img src={user.avatarUrl className="rounded"}>
    ```

8. JSX 自动展开数组

    ```react
    const arr = [<p>哈哈</p>,<p>哈哈</p>,<p>哈哈</p>]
    const element = (
        <div> {arr} </div>
    )
   // 解析后
   <div>
    <p>哈哈</p>
    <p>哈哈</p>
    <p>哈哈</p>
   </div>
    ```

9. 三元运算
    ```react
    { boolean ? <div>Hello React</div> : null }
    { boolean && <div>Hello React</div> }
    ```

10. 循环
    ```react
    const persons = [{
        id: 1,
        name: '张三',
        age: 20
    },{
        id: 2,
        name: '李四',
        age: 15
    }]
    
    <ul>
    { persons.map(person => <li key={person.id}> { person.name } { person.age } </li>) }
    </ul>
    ```

11. 事件
    ```react
    {/* 第一个参数即是事件对象 不需要传递 */}
    <button onClick={this.eventHandler}>按钮</button>
    {/* 需要传递事件对象 */}
    <button onClick={e => this.eventHandler('arg', e)}>按钮</button>
    {/* 最后一个参数即是事件对象 不需要传递 */}
    <button onClick={this.eventHandler.bind(null, 'arg')}按钮</button>
    ```
    
    ```react
    constructor() {
        this.eventHandler = this.eventHandler.bind(this)
    }
    eventHandler()
    <button onClick={this.eventHandler}>按钮</button>
    ```

12. 样式
    * 行内样式
