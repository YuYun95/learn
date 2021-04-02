import React, { useState } from 'react'

const MarginLeft = 24
const HeightSep = 66 // 两行之间间隔
const ItemWH = 36 // 元素高度
const SepLine = 22 // 中间竖线高度
const FirstTop = ItemWH + (HeightSep / 2 - SepLine) // 第一次移动
const NextTop = ItemWH + HeightSep // 后面的移动
const STYLE = {
  wrap: { padding: 66, width: '66%' },
  box: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    position: 'relative'
  },
  relative: { psition: 'relative' },
  round: { borderRadius: '50%', background: 'red', margin: `0 ${MarginLeft}px ${HeightSep}px 0` },
  lineWrap: { position: 'absolute', height: SepLine * 2 },
  topLine: { width: '100%', height: SepLine, borderBottom: '1px dashed #ccc', borderRight: '1px dashed #ccc' },
  bottomLine: { width: '100%', height: SepLine, borderLeft: '1px dashed #ccc' }
}


const { wrap, box, round, lineWrap, topLine, bottomLine } = STYLE

const Item = ({ itemWH }) => <div style={{ ...round, height: itemWH, width: itemWH }}></div>

const Line = ({ itemWH, idx }) => (
  <div
    style={{
      width: `calc(100% - ${itemWH + MarginLeft}px)`,
      left: itemWH / 2,
      top: FirstTop + idx * NextTop,
      ...lineWrap
    }}>
    <div style={topLine}></div>
    <div style={bottomLine}></div>
  </div>
)

const Demo = () => {
  const len = Math.ceil(Math.random() * 66)
  const [itemWH, setItemWH] = useState(ItemWH)
  const prop = { itemWH }
  return (
    <div style={wrap}>
      这是一个临时搭建页面, 下面是demo
      <br />
      <br />
      <br />
      <div style={box}>
        {new Array(len).fill('风华').map((i, idx) => (
          <Item key={idx} {...prop} />
        ))}
        {new Array(Math.ceil(len / 3)) // 至少为3根据业务确认数字
          .fill('风华')
          .map((i, idx) => (
            <Line key={idx} {...prop} idx={idx} />
          ))}
      </div>
    </div>
  )
}

export default Demo
