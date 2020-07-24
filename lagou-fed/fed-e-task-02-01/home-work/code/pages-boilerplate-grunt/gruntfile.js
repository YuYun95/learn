// 实现这个项目的构建任务
// Grunt 的入口文件
const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');
const cwd = process.cwd();
const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

module.exports = grunt => {
  // 配置任务方法
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), //获取 package.json 中的元数据(js代码)
    sass: {  //sass转换
      options: {
        implementation: sass
      },
      main: {
        files: { //目标目录：源目录
          'dist/assets/styles/_icons.css': 'src/assets/styles/_icons.scss',
          'dist/assets/styles/_variables.css': 'src/assets/styles/_variables.scss',
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss',
        }
      }
    },
    babel: {  //js转换
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: { //目标目录：源目录
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    uglify: {  //压缩js
      options: {
        mangle: false,
        //为true表示允许添加头部信息
        stripBanners: true,
        //在头部添加 js文件名和时间的注释
        banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      main: {
        files: {
          'dist/assets/scripts/main.min.js': ['dist/assets/scripts/main.js']
        }
      }
    },
    web_swig: {
      options: {
        swigOptions:{
          cache: false
        },
        getData: data
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.html', '**/*.html'],
          dest: 'dist'
        }]
      },
    },
    htmlmin: { //压缩HTML代码
      options: {
        removeComments: true,           // 去除注释信息
        collapseWhitespace: true,       // 去除空白字符
        removeEmptyAttributes: true,    // 去除标签的空属性
        removeCommentsFromCDATA: true,  // 去除 CDATA 的注释信息
        removeRedundantAttributes: true // 去除标签的冗余属性
      },
      // 具体任务配置
      main: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.html', '**/*.html'],
          dest: 'dist'
        }]
      }
    },
    imagemin: { //图片转换
      main: {
        /* 压缩图片大小 */
        options: {
          optimizationLevel: 7, //定义 PNG 图片优化水平
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'src/assets/',//原图存放的文件夹
          src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
          dest: 'dist/assets/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        }]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'public/',
        src: '**',
        dest: 'dist/',
      },
    },
    // 实时监控文件变化
    watch: {
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/*.html', 'src/**/*.html'],
        tasks: ['htmlmin']
      },
      image: {
        files: ['src/assets/**'],
        tasks: ['imagemin']
      }
    },
    clean: {
      all: ['dist/', 'dist/**'],
    },
    //开启服务
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist/'
        }
      }
    }
  })

  // 自动加载所有的 grunt 插件中的任务
  loadGruntTasks(grunt)

  // 自动化构建任务
  grunt.registerTask('build', ['sass', 'babel', 'uglify', 'web_swig', 'htmlmin', 'copy', 'watch'])
}
