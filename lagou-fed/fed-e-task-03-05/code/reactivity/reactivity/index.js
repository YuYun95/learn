// 判断是否是对象
const isObject = val => val !== null && typeof val === 'object'

const convert = target => isObject(target) ? reactive(target) : target

// 判断对象是否有某个属性
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (target, key) => hasOwnProperty.call(target, key)

export function reactive(target) {
  // reactive函数只能把对象转换为响应式对象
  if (!isObject(target)) return target

  const handler = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)

      const result = Reflect.get(target, key, receiver)
      // 如果返回值是对象，继续转换为响应式对象
      return convert(result)
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver)
      let result = true
      if (oldValue !== value) {
        result = Reflect.set(target, key, value, receiver)
        // 触发更新
        trigger(target, key)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey && result) {
        // 触发更新
        trigger(target, key)
      }
      return result
    }
  }

  return new Proxy(target, handler)
}

let activeEffect = null

export function effect(callback) {
  activeEffect = callback
  callback() // callback会访问响应式对象属性，去收集依赖
  activeEffect = null // 因为收集依赖如果有嵌套属性是一个递归过程
}

let targetMap = new WeakMap() // 字典

export function track(target, key) { // 收集依赖
  if (!activeEffect) return

  let depsMap = targetMap.get(target) // 获取目标对象

  // target添加到targetMap中
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key) // 获取目标对象的属性值

  // dep 添加到depsMap
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 回调添加dep
  dep.add(activeEffect)
}

export function trigger(target, key) { // 触发依赖
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => {
      effect()
    })
  }
}

export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是直接返回
  if (isObject(raw) && raw.__v_isRef) return

  let value = convert(raw) // raw 是对象就转为响应式对象，否则返回 raw 本身
  const r = {
    __v_isRef: true,
    get value() {
      track(r, 'value') // 收集依赖
      return value
    },
    set value(newValue) {
      if (newValue !== value) {
        raw = newValue
        value = convert(raw) // 重新赋值raw 对象就转换为响应式对象，否则返回 raw 本身
        trigger(r, 'value') // 触发依赖
      }
    }
  }
  return r
}

export function toRefs(proxy) {
  const ret = proxy instanceof Array ? new Array(proxy.length) : {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key)
  }

  return ret
}

function toProxyRef(proxy, key) {
  const r = {
    __v_isRef: true,
    get value() {
      return proxy[key] // 这里不用收集依赖，因为这里访问的是响应式对象，当访问属性的时候，内部的getter会去收集依赖(代理对象内容收集依赖)
    },
    set value(newValue) {
      proxy[key] = newValue
    }
  }
  return r
}
