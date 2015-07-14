/*global module:false*/
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %>' +
    ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    path: {
      src: './src',
      dist: './dist',
      war: './war'
    },

    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/app.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: 'node_modules/jshint-stylish'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['<%= path.src %>/**/*.js']
      }
    },

    copy: {
      dist: {
        expand: true,
        cwd: '<%= path.src %>/',
        src: ['**/*.html'],
        dest: '<%= path.dist %>/'
      },
      vendor: {
        expand: true,
        src: ['vendor/**/*'],
        dest: '<%= path.dist %>/'
      }
    },

    watch: {
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'concat']
      },
      html: {
        files: '<%= path.src %>/**/*.html',
        tasks: ['copy:dist']
      },
      livereload: {
        files: '<%= path.dist %>/**/*',
        options: {
          livereload: 9090
        }
      }
    },

    clean: {
      dist: ['<%= path.dist %>'],
      war: ['<%= path.war %>']
    },

    connect: {
      live: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          base: '<%= path.dist %>/',
          livereload: 9090,
          keepalive: true
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      live: ['connect:live', 'watch']
    },

    war: {
      dist: {
        options: {
          war_dist_folder: '<%= path.war %>',
          war_name: '<%= pkg.name %>'
        },
        files: [
          {
            expand: true,
            cwd: '<%= path.dist %>',
            src: ['**/*']
          }
        ]
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-war');

  // Default task.
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'copy']);
  grunt.registerTask('make', ['clean:dist', 'jshint', 'concat', 'copy']);
  grunt.registerTask('build', ['make', 'clean:war', 'war']);

  grunt.registerTask('devmode', function () {
    grunt.task.run('make');
    grunt.task.run('concurrent');
  });

};
