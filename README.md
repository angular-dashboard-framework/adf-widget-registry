# adf-widget-repository

ADF Widgets Registry is the official showcase of widgets available for Angular Dashboard Framework. This site aims promote the production of beautiful widget for the awesome ADF framework.

## Angular Dashboard Framework
> A Dashboard framework with Angular.js and Twitter Bootstrap.

The api of angular-dashboard-framework (adf) is documented [here](http://sdorra.github.io/angular-dashboard-framework/docs/). A getting
started guide can be found [here](https://github.com/sdorra/angular-dashboard-framework/wiki/Getting-started).
Follow me ([@ssdorra](https://twitter.com/ssdorra)) on twitter for latest updates and news about adf.

## Demo

A live demo of the adf can be viewed [here](http://sdorra.github.io/angular-dashboard-framework/). The demo uses html5 localStorage to store the state of the dashboard. The source of the demo can be found [here](https://github.com/sdorra/angular-dashboard-framework/tree/master/sample).

A more dynamic example can be found [here](https://github.com/sdorra/adf-dynamic-example).

## Build adf-widget-repository from source

Install bower and grunt:

```bash
npm install -g bower
npm install -g gulp
```

Clone the repository:

```bash
git clone https://github.com/sdorra/adf-widget-registry
cd adf-widget-registry
```

Install npm and bower dependencies:

```bash
npm install
bower install
```

You can start the repository, by using the serve gulp task:

```bash
gulp serve
```

Now you open the sample in your browser at http://localhost:3000/#/widgets

Or you can create a release build in the ```/dist``` folder.

```bash
gulp build
```

Then you can test the built files with

```bash
gulp serve:dist
```

Finally you can check the built file served by the node server restarting it with

```bash
gulp build
node dist/index.js
```

And pointing your browser to http://localhost:3100/

## License

    The MIT License

    Copyright (c) 2015, Sebastian Sdorra, Ivan Saorin

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
