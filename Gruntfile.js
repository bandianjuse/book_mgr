module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //合并文件
        concat: {
            options: {
                separator: ';'
            },
            login: {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/js/components.js',
                    'views/js/login.js'
                ],
                dest: 'views/dist/js/login.js'
            },
            index : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/tether.min.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/page.js',
                    'views/js/search.js',
                    'views/js/logout.js',
                    'views/js/tether.js'
                ],
                dest: 'views/dist/js/index.js'
            },
            details : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/js/components.js',
                    'views/js/logout.js',
                    'views/js/details.js',
                    'views/js/tether.js'
                ],
                dest: 'views/dist/js/details.js'
            },
            share : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/page.js',
                    'views/js/search.js',
                    'views/js/logout.js'
                ],
                dest: 'views/dist/js/share.js'
            },
            user : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/tether.min.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/search.js',
                    'views/js/logout.js',
                    'views/js/tether.js',
                    'views/js/user.js'
                ],
                dest: 'views/dist/js/user.js'
            },
            admin : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/tether.min.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/logout.js',
                    'views/js/tether.js',
                    'views/js/page.js',
                    'views/js/user.js',
                    'views/js/adminLend.js'
                ],
                dest: 'views/dist/js/admin.js'
            },
            adminProcurement : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/tether.min.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/logout.js',
                    'views/js/tether.js',
                    'views/js/page.js',
                    'views/js/user.js',
                    'views/js/adminProcurement.js'
                ],
                dest: 'views/dist/js/adminProcurement.js'
            },
            addInventory : {
                src: [
                    'views/lib/jquery/jquery.js',
                    'views/lib/bootstrap/js/bootstrap.js',
                    'views/lib/arttemplate/template.js',
                    'views/lib/arttemplate/substring.js',
                    'views/js/components.js',
                    'views/js/headTab.js',
                    'views/js/logout.js',
                    'views/js/page.js',
                    'views/js/search.js'
                ],
                dest: 'views/dist/js/addInventory.js'
            }
        },
        //压缩样式
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            login: {
                files: {
                    'views/dist/css/login.min.css': [
                        'views/lib/bootstrap/css/bootstrap.css',
                        'views/css/login.css'
                    ]
                }
            },
            index: {
                files: {
                    'views/dist/css/index.min.css': [
                        'views/lib/bootstrap/css/bootstrap.css',
                        'views/css/index.css'
                    ]
                }
            },
            details: {
                files: {
                    'views/dist/css/details.min.css': [
                        'views/lib/bootstrap/css/bootstrap.css',
                        'views/css/details.css'
                    ]
                }
            },
            share: {
                files: {
                    'views/dist/css/share.min.css': [
                        'views/lib/bootstrap/css/bootstrap.css',
                        'views/css/share.css'
                    ]
                }
            },
            user: {
                files: {
                    'views/dist/css/user.min.css': [
                        'views/lib/bootstrap/css/bootstrap.css',
                        'views/css/user.css'
                    ]
                }
            }
        },
        //压缩文件
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
           login: {
                src: 'views/dist/js/login.js',
                dest: 'views/dist/js/login.min.js'
            },
            index: {
                src: 'views/dist/js/index.js',
                dest: 'views/dist/js/index.min.js'
            },
            details: {
                src: 'views/dist/js/details.js',
                dest: 'views/dist/js/details.min.js'
            },
            share: {
                src: 'views/dist/js/share.js',
                dest: 'views/dist/js/share.min.js'
            },
            user: {
                src: 'views/dist/js/user.js',
                dest: 'views/dist/js/user.min.js'
            },
            admin: {
                src: 'views/dist/js/admin.js',
                dest: 'views/dist/js/admin.min.js'
            },
            adminProcurement: {
                src: 'views/dist/js/adminProcurement.js',
                dest: 'views/dist/js/adminProcurement.min.js'
            },
            addInventory: {
                src: 'views/dist/js/addInventory.js',
                dest: 'views/dist/js/addInventory.min.js'
            }
        },
        //监测文件自动执行任务
        watch: {
            scripts: {
                files: ['views/js/*.js'],
                tasks: ['concat','uglify'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['views/less/*.less'],
                tasks: ['cssmin'],
                options: {
                    livereload: true
                }
            }
        }

    });

    // 加载插件。
    grunt.loadNpmTasks('grunt-contrib-uglify'); //压缩
    grunt.loadNpmTasks('grunt-contrib-concat'); //合并
    grunt.loadNpmTasks('grunt-contrib-watch'); //自动任务
    grunt.loadNpmTasks('grunt-contrib-cssmin');  //css合并

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['watch']);

};