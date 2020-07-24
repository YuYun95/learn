#!/usr/bin/env node
const fs = require('fs')
const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const symbols = require('log-symbols')
const ora = require('ora')
const downloadGit = require('download-git-repo')
const ejs = require('ejs')

// 命令行交互问题
const prompt = [
	{
		type: 'input',
		name: 'description',
		message: 'Please enter the project description:',
		default: ''
	},
	{
		type: 'input',
		name: 'author',
		message: 'Please enter the author name: '
	},
	{
		type: 'input',
		name: 'version',
		message: 'Please enter the version: ',
		default: '1.0.0'
	},
	{
		type: 'input',
		name: 'license',
		message: 'License',
		default: 'MIT'
	},
	{
		type: 'confirm',
		name: 'confirm',
		message: 'Is this ok?',
		default: true
	}
]

program.version('1.0.0', '-v, --version')
	.command('create <project>')
	.description('Project name')
	.action((project) => {
		// 判断项目是否已经存在
		if (!fs.existsSync(project)) {
			// 命令行交互
			inquirer.prompt(prompt).then(answers => {

				// 命令行交互中It is ok？
				if (!answers.confirm) return

				const loading = ora('downloading templates')
				loading.start()
				const startTime = new Date().getTime()

				// 下载模板
				downloadGit('direct:https://github.com/YuYun95/vue-template.git', project, { clone: true }, function(err) {
					if (err) {
						loading.fail()
						console.log(symbols.error, chalk.red(err))
					} else {
						loading.succeed()
						const fileNameList = [`${project}/package.json`, `${project}/README.md`]

						// 用户命令行交互输入
						const projectInfo = {
							name: project,
							description: answers.description,
							version: answers.version,
							author: answers.author,
							license: answers.license
						}

						// ejs 模板引擎把用户输入填写到相应的目标
						fileNameList.forEach(fileName => {
							if (fs.existsSync(fileName)) {
								ejs.renderFile(fileName, projectInfo, (err, result) => {
									if (err) console.log(symbols.error, chalk.red(err))
									fs.writeFileSync(fileName, result)
								})
							}
						})

						// 控制台提示完成
						const endTime = new Date().getTime()
						console.log(`${chalk.green('success')} Saved lockfile`, '\n', `Done in ${((endTime - startTime) / 1000).toFixed(2)}s`, '\n', chalk.rgb(0, 255, 255)(`$ cd ${project}`))
					}
				})
			})
		} else {
			// 提示项目已经存在
			const path = process.cwd() + '\\' + project
			console.log(`Target directory ${chalk.rgb(0, 255, 255)(path)} already exists`)
		}
	})

program.parse(process.argv)