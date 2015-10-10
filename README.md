# Oldie [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[Oldie] tranforms CSS to be compatible with old Internet Explorer.

```html
<!--[if gt IE 8]><!--><link href="style.css" rel="stylesheet"><!--<![endif]-->
<!--[if lte IE 8]><link href="style.oldie.css" rel="stylesheet"><![endif]-->
```

If you’re like me, you stopped supporting IE8 years ago. Yet, here you are, satisfying another client that somehow managed to get this requirement past you.

### Flatten Media Queries

Resolve media queries for a desktop experience.

```css
/* before */

body {
    font-size: 12px;
}

@media screen and (max-width: 767px) {
    body {
        font-size: 16px;
    }
}

@media screen and (min-width: 768px) {
    body {
        color: #444;
    }
}

/* after */

body {
    font-size: 12px;
}

body {
    color: #444;
}
```

### Replace :root

Swap `:root` selectors with `html` selectors.

```css
/* before */

:root {
    background-color: black;
    color: white;
}

/* after */

html {
    background-color: black;
    color: white;
}
```

### Reduce calc()

Reduce `calc()` references whenever possible.

```css
/* before */

.banner {
    font-size: calc(16px * 3);
}

/* after */

.banner {
    font-size: 48px;
}
```

### Resolve rem

Resolve `rem` values as standard pixels.

```css
/* before */

.container {
    margin-top: 2.5rem;
}

/* after */

.container {
   margin-top: 40px;
}
```

### Uphold opacity

Swap `opacity` properties with IE8 compatible `filter` properties.

```css
/* before */

.figure {
    opacity: .5;
}

/* after */

.figure {
    filter: alpha(opacity=50);
}
```

### Patch pseudo-elements

Swap `::` selectors with IE8 compatible `:` selectors.

```css
/* before */

a::after {
    content: " (" attr(href) ")";
}

/* after */

a:after {
    content: " (" attr(href) ")";
}
```

### Retain rgba colors

Swap `rgba` values with IE8 compatible hex values and filter properties.

```css
/* before */

.hero {
    background-color: rgba(153, 221, 153, .8);
    border: solid 1px rgba(100, 102, 103, .3);
}

/* after */

.hero {
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr='#8099dd99',endColorstr='#8099dd99');
    border: solid 1px #646667;
}
```

### Forget :not

Remove `:not()` selectors while preserving the other selectors in a rule.

```css
/* before */

.a, .b:not(.c), d {
    color: red;
}

/* after */

.a, .d {
    color: red;
}
```

### Salvage :nth-child

Swap `:nth-child` selectors with `:first-child`.

```css
/* before */

.container > p:nth-child(4).specific > span {
   font-weight: bold;
}
 
/* after */
 
.container > :first-child + * + * + p.specific > span {
    font-weight: bold;
}
```

## Plugins

[Oldie] is powered by the following plugins:

- [PostCSS Calc](https://github.com/postcss/postcss-calc)
- [PostCSS UnMQ](https://github.com/jonathantneal/postcss-unmq)
- [PostCSS UnRoot](https://github.com/jonathantneal/postcss-unroot)
- [PostCSS UnNth](https://github.com/jonathantneal/postcss-unnth)
- [PostCSS UnNot](https://github.com/jonathantneal/postcss-unnot)
- [PostCSS UnOpacity](https://github.com/jonathantneal/postcss-unopacity)
- [PostCSS UnRGBA](https://github.com/jonathantneal/postcss-unrgba)
- [PostCSS Pixrem](https://github.com/robwierzbowski/node-pixrem)
- [PostCSS Pseudo Elements](https://github.com/axa-ch/postcss-pseudoelements)

Some of these plugins have more features than are described here. Visit their project pages to learn more about them individually.

## Usage

Follow these steps to use [Oldie].

Add [Oldie] to your build tool:

```bash
npm install oldie --save-dev
```

#### Node

```js
require('oldie')({ /* options */ }).process(YOUR_CSS);
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Oldie] as a PostCSS plugin:

```js
postcss([
    require('oldie')({ /* options */ })
]);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Oldie] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
    return gulp.src('./css/src/*.css').pipe(
        postcss([
            require('oldie')({ /* options */ })
        ])
    ).pipe(
        gulp.dest('./css')
    );
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Oldie] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('oldie')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

## Options

Each plugin’s options may be configured by targeting the plugin’s namespace. Any plugins may be disabled by giving them a `disable` property.

Example:
```js
require('oldie')({
    rgba: {
        filter: true
    },
    rem: {
        replace: false
    },
    unmq: {
        disable: true
    }
})
```

[ci]: https://travis-ci.org/jonathantneal/oldie
[ci-img]: https://travis-ci.org/jonathantneal/oldie.svg
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[Oldie]: https://github.com/jonathantneal/oldie
