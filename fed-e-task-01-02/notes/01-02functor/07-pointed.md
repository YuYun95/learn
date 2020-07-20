## Pointed函子
* Pointed函子是实现了of静态方法的函子
* of方法是为了避免使用new来创建对象，更深层的含义是of方法用来把值放到上下文Context（把值放到容器中，使用map来处理值）

![](../img/pointed1.jpg)

![](../img/pointed2.jpg)

```javascript
class Container {
  static of(value) {
    return new Container(value)
  }
  ...
}
Container.of(2).map(x => x + 5)
```