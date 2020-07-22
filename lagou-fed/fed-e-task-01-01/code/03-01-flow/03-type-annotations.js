/**
 * 类型注解
 * @flow
 */

function square(n: number) {
    return n * n
}

let num: number = 100
    // num = 'string'

function foo(): number {
    // return 'string'
    return 100
}

function bar(): void {}