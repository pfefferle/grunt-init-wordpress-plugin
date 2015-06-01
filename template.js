/*
 * grunt-init-wordpress-plugin
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 Matthias Pfefferle
 * Licensed under the GPL license.
 */

/* global exports */

'use strict';

// Basic template description.
exports.description = 'Create a WordPress plugin.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('title', 'My Plugin'),
    init.prompt('name', 'my-plugin'),
    init.prompt('description', 'Awesome WordPress plugin'),
    init.prompt('version', '1.0.0'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('github_account', 'none'),
    init.prompt('repository', function(value, data, done) {
      value = 'git://github.com/' + data.github_account + '/wordpress-' + data.name;
      done(null, value);
    }),
    init.prompt('bugs', function(value, data, done) {
      value = 'https://github.com/' + data.github_account + '/wordpress-' + data.name + '/issues';
      done(null, value);
    }),
    init.prompt('homepage'),
    init.prompt('licenses', 'GPL-2.0'),
    init.prompt('keywords'),
    init.prompt('node_version'),
    init.prompt('npm_test', 'grunt nodeunit')
  ], function(err, props) {
    props.keywords_string = props.keywords;
    props.keywords = props.keywords.trim().split(/\s*,\s*/);
    props.class_name = props.title.replace(/\s(.)/g, function($1) { return $1.toUpperCase(); }).replace(/\s/g, '');
    props.devDependencies = {
      'grunt': '^0.4.5',
      'grunt-wp-deploy': '^1.0.3',
      'grunt-wp-i18n': '^0.5.0',
      'grunt-wp-readme-to-markdown': '^0.8.0'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};
