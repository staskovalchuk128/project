(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      // our app is within the app folder
      app: 'src',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      // other libraries
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'rxjs':                      'npm:rxjs',
      'date-fns':                  'npm:date-fns',
      'angularx-flatpickr':                  'npm:angularx-flatpickr',
      'angular-calendar':                  'npm:angular-calendar',
      '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'date-fns': {
        main: 'index.js',
      },
      'angular-calendar': {
        main: 'angular-calendar.d.ts',
        defaultExtension: 'ts'
      },
      'angularx-flatpickr': {
        main: 'index.d.ts',
        defaultExtension: 'ts'
      },
      '@ng-bootstrap/ng-bootstrap': {
        main: 'index.d.ts',
        defaultExtension: 'ts'
      },
      //traceur
      'rxjs/operators': {
        main: 'index.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
