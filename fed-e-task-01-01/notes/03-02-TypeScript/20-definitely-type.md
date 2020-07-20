## 类型声明
如果第三方库没有类型声明文件，可以安装一个对应的类型声明模块

如果第三方没有类型声明文件，那么可以使用declare声明对应的类型，对传入第三方库的参数和返回值做声明

```typescript
import { camelCase } from 'lodash'

declare function camelCase (input: string): string

const res = camelCase('hell world')

```
