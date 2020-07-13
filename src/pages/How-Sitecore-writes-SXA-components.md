---
title: How the Sitecore SXA team writes SXA components
date: '2020-07-13'
spoiler: When you look at the out-of-the-box Sitecore SXA components you can see that the Sitecore SXA team writes most SXA components using jQuery and a small utility API called XA (eXperience Accelerator). In this post, I will dissect how Sitecore writes components and I will show you how to write a simple clock component in TypeScript using the XA API.
---
*When you look at the out-of-the-box Sitecore SXA components you can see that the Sitecore SXA team writes most SXA components using jQuery and a small utility API called XA (eXperience Accelerator). In this post, I will dissect how Sitecore writes components and I will show you how to write a simple clock component in TypeScript using the XA API.*

## Introduction
If you look at the HTML code of an SXA page you will see something like the following scripts loaded at the end of the page body:

```javascript
<script src="/componentlibrary/-/media/Base-Themes/Core-Libraries/scripts/optimized-min.js?t=20200616T160435Z"></script>
<script src="/componentlibrary/-/media/Base-Themes/XA-API/Scripts/optimized-min.js?t=20200616T160435Z"></script>
<script src="/componentlibrary/-/media/Base-Themes/Main-Theme/scripts/optimized-min.js?t=20200616T160436Z"></script>
<script src="/componentlibrary/-/media/Base-Themes/Components-Theme/Scripts/optimized-min.js?t=20200616T160436Z"></script>
<script src="/componentlibrary/-/media/Themes/DigitalMarketingPlatform/ComponentLibrary/ComponentLibrary/scripts/pre-optimized-min.js?t=20200527T181257Z"></script>
```

Sitecore loads a set of themes as part of an SXA site. These themes can be of type:

- **Base Themes** - The out-of-the-box building blocks provided by Sitecore
- **Themes** - An either out-of-the-box theme containing styling (Basic2 or Wireframe) or your custom theme that can be assigned to an SXA site
- **Extension Themes** - additional extensions that can be assigned on top of a selected theme through selecting a module in your SXA site. See the blog post [Use Extension Themes in the Sitecore Experience Accelerator](https://www.markvanaalst.com/blog/sxa/use-extension-themes-in-the-sitecore-experience-accelerator/) by Mark van Aalst for more information on extension themes 

## Dissecting
Themes live in the Sitecore `Media Library` folder. If you investigate this folder you will see that Sitecore provides the separate JavaScript files in the `Scripts` folder of a theme. These files are automatically minified and bundled to a file `optimized-min.js` by Sitecore SXA using the [Asset optimizer](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/the-asset-optimizer.html). It is also possible to do the optimization and bundling yourself. In that case a file `pre-optimized-min.js` must be placed in the `Scripts` folder of your theme. When this file is available it will be served, instead of combining the JavaScript files in the folder. This means also that it does not work to add an additional JavaScript file to the `Scripts` folder and expect it to be loaded by the browser because it will not be included in the resulting bundle. It **is** possible to add additional bundles in the `Scripts` folder and reference these bundles explicitly from the HTML code by including a script reference in a page design, a partial design or the [metadata partial design](https://doc.sitecore.com/developers/sxa/93/sitecore-experience-accelerator/en/the-metadata-partial-design.html); we have done this successfully with ReactJS bundles.

*Note that if the theme assigned to an SXA site does not have a CSS bundle, the wireframe CSS bundle will be returned.*

When you look at the out-of-the-box Sitecore SXA components you can see that the Sitecore SXA team writes most SXA components using jQuery (part of the `xaquery.js` file) and that they use a small utility API called `XA` (eXperience Accelerator).

If we look at the above-loaded JavaScript files we will see the following:

### Base Theme: Core-Libraries 
Located at: `/sitecore/media library/Base Themes/Core Libraries`

Consists of the following JavaScript libraries:
- ie-origin-fix
- xaquery
- moment
- lo-dash
- modernizr
- galleria-157
- fullcalendar
- gcal
- jqueryuitouch-punchmin
- hammer
- backbone-min
- typeahead
- jquerymCustomScrollbar
- flash-polyfill
- mediaelement-and-player
- dailymotion
- facebook
- soundcloud
- twitch
- vimeo
 
### Base Theme: XA-API
Located at: `/sitecore/media library/Base Themes/XA API`

Consists of the following JavaScript libraries:
- xa
 
### Base Theme: Main-Theme
Located at: `/sitecore/media library/Base Themes/Main Theme`

Consists of the following JavaScript libraries:
- observer
- partial-design-highlight
 
### Base Theme: Components-Theme
Located at: `/sitecore/media library/Base Themes/Components Theme`

Consists of the following JavaScript libraries:
- accessibility
- component-accordions
- component-archive
- component-breadcrumb
- component-carousel
- component-container
- component-disqus
- component-facebook
- component-flash
- component-flip
- component-fullcalendar
- component-galleria
- component-language-selector
- component-navigation
- component-overlay
- component-snippet
- component-social
- component-tabs
- component-toggle
- component-video
- component-video-playlist
- details-polyfill
- fixheight
- search-fixheight

### Theme: ComponentLibrary
Locates at: `/sitecore/media library/Themes/DigitalMarketingPlatform/ComponentLibrary/ComponentLibrary`

Consists of our own pre-optimized code. See [SXA Umbrella](https://github.com/macaw-interactive/sxa-umbrella) for an example on how to do this.

Especially the `XA API` base theme and the `Component Theme` base theme are of interest to see how an SXA component can be written.

## SXA API
The SXA API is a small utility library for writing a jQuery based SXA component.

The code of `xa.js` is small and provides functionality for:
- initialization, with the ability to register pre-initialization and post-initialization handlers
- cookie functions
- a query string utility function
- a function to register a DOM-changed callback function 

Actually nothing you could not have written yourself.

The code of `xa.js` is as follows:

```javascript
var XA = XA || (function ($, document) {
    var api = {}, onPreInitHandlers, onPostInitHandlers, modules = {};
    onPreInitHandlers = new Array();
    onPostInitHandlers = new Array();
    api.register = function (name, api, init) {
        modules[name] = {
            name: name,
            api: api,
            init: init || api.init || (function () { })
        };
    };
    api.hasPageModes = function () { return !!(window.Sitecore && window.Sitecore.PageModes); };
    api.registerOnPreInitHandler = function (handler) { onPreInitHandlers.push(handler); };
    api.registerOnPostInitHandler = function (handler) { onPostInitHandlers.push(handler); };
    var initScheduled = false;
    api.init = function () {
        if (!initScheduled) {
            initScheduled = true;
            XA.ready(function () {
                try {
                    for (var name in modules)
                        if (modules.hasOwnProperty(name)) {
                            $xa.each(onPreInitHandlers, function (i, h) { h.process(name, modules[name]); });
                            modules[name].init();
                            $xa.each(onPostInitHandlers, function (i, h) { h.process(name, modules[name]); });
                        }
                }
                finally {
                    initScheduled = false;
                }
            });
        }
    };
    api.ready = function (fn) {
        $(document).ready(fn);
    };
    api.component = {};
    api.connector = {};
    api.cookies = {
        createCookie: function (name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toUTCString();
            }
            else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        readCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) == 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        },
        removeCookieWarning: function () {
            var cookieWarning = $xa(".privacy-warning");
            cookieWarning.remove();
        }
    };
    api.queryString = {
        getQueryParam: function (variable) {
            if (variable != null) {
                variable = variable.toLocaleLowerCase();
            }
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (decodeURIComponent(pair[0].toLocaleLowerCase()) === variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
            return null;
        }
    };
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var eventListenerSupported = window.addEventListener;
    api.dom = {
        observeDOM: function (obj, callback) {
            if (MutationObserver) {
                var obs = new MutationObserver(function (mutations) {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                        callback();
                });
                var options = {
                    childList: true,
                    subtree: true
                };
                obs.observe(obj, options);
            }
            else if (eventListenerSupported) {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        }
    };
    return api;
})($, document);
XA.init();
```
## The Flip SXA component
One of the simpler out-of-the-box SXA components is the `Flip` SXA component. It is nice that the SXA team has kept the documentation and comments in the code, which helps in understanding what is going on.

The code for `component-flip.js` is as follows:

```javascript
/**
 * Component Flip
 * @module Flip
 * @param  {jQuery} $ Instance of jQuery
 * @return {Object} List of flip methods
 */
XA.component.flip = (function($) {
    /**
     * This object stores all public api methods
     * @type {Object.<Methods>}
     * @memberOf module:Flip
     * @
     * */
    var api = {
            /**
             * equalSideHeight set css "min-height" property with value that is
             * equal to size of bigger flip side 
             * @param {jQuery<DOMElement>} $el  Root DOM element of Flip component wrapped by jQuery 
             * @memberof module:Flip
             * @method equalSideHeight
             */
            equalSideHeight: function($el) {
                var side0 = $el.find(".Side0"),
                    side1 = $el.find(".Side1"),
                    slide0Height = this.calcSlideSizeInToggle(side0),
                    slide1Height = this.calcSlideSizeInToggle(side1),
                    maxHeight = Math.max(slide0Height, slide1Height);
                $el.find(".flipsides").css({ "min-height": maxHeight + "px" });
                side0.add(side1).css({ bottom: 0 });
            },
            /**
             * calcSlideSizeInToggle calculates size of slide content
             * @param {jQuery<DOMElement>} $slide Slide DOM Element of flip component
             * @memberof module:Flip
             * @method calcSlideSizeInToggle
             * @return {number} size
             */
            calcSlideSizeInToggle: function($slide) {
                var child = $slide.find(">div"),
                    size = 0;
                child.each(function(pos, el) {
                    size += $(el).outerHeight(true);
                });
                size += parseInt($slide.css("padding-top"));
                size += parseInt($slide.css("padding-bottom"));
                return size;
            },
            /**
             * equalSideHeightInToggle method that called from component toggle 
             * to make all slides inside same height
             * @param {jQuery<DOMElement>} $el  Root DOM element of Flip component wrapped by jQuery 
             * @memberof module:Flip
             * @method equalSideHeightInToggle
             */
            equalSideHeightInToggle: function($el) {
                var side0 = $el.find(".Side0"),
                    side1 = $el.find(".Side1"),
                    slide0Height = this.calcSlideSizeInToggle(side0),
                    slide1Height = this.calcSlideSizeInToggle(side1),
                    maxHeight = Math.max(slide0Height, slide1Height);
                $el.find(".flipsides").css({ "min-height": maxHeight + "px" });
                side0.add(side1).css({ bottom: 0 });
            }
        };

    function detectMobile() {
        return "ontouchstart" in window;
    }
    /**
     * calcHeightOnResize method calls
     * ["equalSideHeight"]{@link module:Flip.equalSideHeight} method
     * for all initialized Flip components
     * @memberOf module:Flip
     * @method
     * @alias module:Flip.initInstance
     * @private
     */
    function calcHeightOnResize() {
        var flip = $(".flip.initialized");
        flip.each(function() {
            api.equalSideHeight($(this));
        });
    }
    /**
     * initInstance method binds toggling "active" class for component
     * an Flip element
     * @memberOf module:Flip
     * @method
     * @param {jQuery} component Root DOM element of flip component wrapped by jQuery
     * @alias module:Flip.initInstance
     */
    api.initInstance = function(component) {
        // Set tabindex=0 for first header
        component.find('[class*="Side0"]').attr("tabindex", "0");
        //
        if (component.hasClass("flip-hover") && !detectMobile()) {
            component.hover(
                function() {
                    component.addClass("active");
                },
                function() {
                    component.removeClass("active");
                }
            );
        } else {
            component.on("click", function() {
                component.toggleClass("active");
            });
        }
    };
    /**
     * init method calls in a loop for each
     * flip component on a page and runs Flip's
     * ["initInstance"]{@link module:Flip.api.initInstance},
     * ["equalSideHeight"]{@link module:Flip.equalSideHeight} methods.
     * Added watcher to "resize" event on window that call
     * ["calcHeightOnResize"]{@link module:Flip.calcHeightOnResize}
     *
     * @memberOf module:Flip
     * @alias module:Flip.init
     */
    api.init = function() {
        var flip = $(".flip:not(.initialized)");
        $(window).on("resize", function() {
            calcHeightOnResize();
        });
        flip.each(function() {
            var $flipModule = $(this).find(".flipsides");
            $flipModule.find(".Side0").attr("tabindex", "0");
            api.initInstance($(this));
            $(this).addClass("initialized");
            api.equalSideHeight($(this));
        });
    };
    return api;
})(jQuery, document);

XA.register("flip", XA.component.flip);
```

A nice trick used in the registration of components on the page is how in the `api.init()` function  a check is done for the class `initialized` on each of the elements with the class `flip`, so the component is not initialized twice. This is important when working in the experience editor where new flip components can be added to the page already containing flip components.

## Writing SXA components using TypeScript

Within our company we write almost all of our front-end code using TypeScript. This is also possible for SXA components using the `XA API`. Below I provide a first take for writing a type definition file `xa.d.ts` for the `XA API` library. See https://github.com/macaw-interactive/sxa-umbrella/blob/master/local_modules/sxa-types/xa.d.ts for the latest version:

```typescript
interface HashTable<T> {
    [key: string]: T;
}

export interface XAComponent {
    initInstance?: (component: JQuery, module: JQuery) => void
    init?: () => void;
}

export interface XAStatic {
    //
    register: (name: string, api?: any, init?: () => void) => void;
    hasPageModes: () => boolean;
    registerOnPreInitHandler: (handler: () => void) => void;
    registerOnPostInitHandler: (handler: () => void) => void;
    init: () => void;
    ready: (fn: () => void) => void;

    component: HashTable<XAComponent>;
    connector: any;
    cookies: {
        createCookie: (name: string, value: string, days: number) => void,
        readCookie: (name: string) => string | null,
        removeCookieWarning: () => void
    },
    queryString: {
        getQueryParam: (variable: string) => string
    },
    dom: {
        observeDOM: (obj: Node, callback: () => void) => void
    }
}
```

## Writing an SXA component in TypeScript
As an example of a SXA component written in TypeScript I provide a simple clock component called `xaclock` below. See https://github.com/macaw-interactive/sxa-umbrella/blob/master/Media%20Library/Themes/DigitalMarketingPlatform/ComponentLibrary/ComponentLibrary/src/components/xaclock/xaclock.ts for the latest version:

```typescript
import { XAStatic, XAComponent } from 'sxa-types/xa';
declare var XA: XAStatic;

import './xaclock.scss';

/**
 * Component XaClock
 * @module XaClock
 * @param  {jQuery} $ Instance of jQuery
 * @return {Object} List of XaClock methods
 */
XA.component.xaClock = (function ($) {
    /**
    * This object stores all public api methods
    * @type {Object.<Methods>}
    * @memberOf module:XaClock
    * @
    * */
    var api: XAComponent = {};

    function clockUpdate(component: JQuery) { 
        const stateContainer = component[0]; // unwrap
        const showTwelve: boolean = jQuery.data(stateContainer, "showTwelve");
        const hourShiftData: string | undefined = component.attr("data-hourshift");
        const hourShift = isNaN(parseInt(hourShiftData, 10)) ? 0 : parseInt(hourShiftData, 10);
        var date = new Date();
        component.css({ 'color': '#fff', 'text-shadow': '0 0 6px #ff0' });
        function addZero(x: number | string) {
            if (x < 10) {
                return x = '0' + x;
            } else {
                return x;
            }
        } 
    
        function twelveHour(x: number) {
            if (x > 12) {
                return x = x - 12; 
            } else if (x == 0) {
                return x = 12;
            } else {
                return x; 
            }
        }
    
        var hours = (date.getHours() + hourShift) % 24;
        if (showTwelve) hours = twelveHour(hours);
        var h = addZero(hours);
        var m = addZero(date.getMinutes());
        var s = addZero(date.getSeconds());
    
        component.text(h + ':' + m + ':' + s)
    }

    /**
    * initInstance method of a XaClock element
    * @memberOf module:XaClock
    * @method
    * @param {jQuery} component Root DOM element of XaClock component wrapped by jQuery
    * @param {jQuery} xaClockModule XaClock inner DOM element of XaClock component wrapped by jQuery
    * @alias module:XaClock.initInstance
    */
    api.initInstance = function (component, xaClockModule) { 
        const stateContainer = component[0]; // unwrap
        jQuery.data(stateContainer, "showTwelve", false);
        $(component).click(() => {
            let showTwelve: boolean = jQuery.data(stateContainer, "showTwelve");
            showTwelve = !showTwelve;
            jQuery.data(stateContainer, "showTwelve", showTwelve);
            console.log("showTwelve:", showTwelve);
        });
        clockUpdate(component);
        setInterval(() => clockUpdate(component), 1000);
    };

    /**
     * init method calls in a loop for each
     * XaClock component on a page and runs XaClock's
     * ["initInstance"]{@link module:XaClock.api.initInstance} methods.
     * @memberOf module:XaClock
     * @alias module:XaClock.init
     */
    api.init = function () {
        var $xaClocks = $(".xaClock:not(.initialized)");
        $xaClocks.each(function () {
            var $xaClockModule = $(this);
            // @ts-ignore
            api.initInstance($(this), $xaClockModule);
            $(this).addClass("initialized");
        });
    };

    return api;
})(jQuery);

XA.register("xaclock", XA.component.xaClock);
```

And a SCSS file `xaclock.scss` containing the styling:

```sass
.xaClock {
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 200px;
    height: 60px;
    color: #35e00a;
    border: 2px solid #999;
    border-radius: 4px;
    text-align: center;
    font: 50px/60px Helvetica;
    background: linear-gradient(90deg, #000, #5555);
}
```

## Transpiling and bundling the code
Using TypeScript and SASS is nice, but brings the burden of doing transpilation, minification and bundling. That is why I wrote tooling to support a good front-end developer workflow for Sitecore SXA: [SXA Umbrella](https://github.com/macaw-interactive/sxa-umbrella) - the project structure and tools to optimize the front-end team development workflow in any Sitecore SXA project (plug plug). Have a look at the extensive documentation in the Github repository, try it out and let me know if it works for you.

Note that the `XA API` TypeScript type definitions and the `xaclock` example component are included in the starter template of SXA Umbrella.