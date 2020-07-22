// 类型声明

export {} // 确保跟其他示例没有成员冲突

import { camelCase } from 'lodash'
import qs from 'querystring'

qs.parse('?key=value&key2=value2')

declare function camelCase (input: string): string

const res = camelCase('hell world')
