<!DOCTYPE html>
<html>
<head>
  <title></title>
  <base href="/">
  <meta charset="utf-8" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css" />
  <script src="node_modules/html5-history-api/history.min.js"></script>
  <script src="node_modules/classlist.js/classList.min.js"></script>
  <script src="node_modules/core-js/client/shim.min.js"></script>
  <script src="node_modules/intl/dist/Intl.complete.js"></script>
  <script src="node_modules/zone.js/dist/zone.min.js"></script>
  <script src="node_modules/reflect-metadata/Reflect.js"></script>
  <script src="node_modules/systemjs/dist/system.src.js"></script>
  <script src="rxjs.module.min.js"></script>
  <script src="systemjs.config.js"></script>
  <script>
  System.import("app/main").catch(function(err){ console.error(err); });
  </script>
</head>
<body>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span class="navbar-text">
            <button type="button" class="btn btn-primary" routerLink="/auth" name="button">Login</button>
          </span>
        </div>
      </div>
    </nav>
  </div>
  <div class="container mt-4">
    <app>

      <?php include 'application/views/'.$content_view; ?>
      </app>
    </div>
</body>
</html>
