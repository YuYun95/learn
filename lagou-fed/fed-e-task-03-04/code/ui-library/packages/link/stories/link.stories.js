import ZyhLink from '../src/link.vue'

export default {
  title: 'ZyhLink',
  component: ZyhLink
}

export const Link = _ => ({
  components: {ZyhLink},
  template: `
    <div>
      <zyh-link href="http://www.baidu.com">百度</zyh-link>
    </div>
  `
})
