# markdown-it-svgbob
[svgbob](https://github.com/ivanceras/svgbob) renderer for [markdown-it](https://github.com/markdown-it/markdown-it).

Example code

An example svgbob diagram:

```bob 
     .---.
    /-o-/--
 .-/ / /->
( *  \/
 '-.  \
    \ /
     '
```
or using the sphinx-svgbob language name:

```svgbob 
     .---.
    /-o-/--
 .-/ / /->
( *  \/
 '-.  \
    \ /
     '
```

## API
The `svgbob-wasm` dependency which provides svgbob support is a wasm module. 
In order to load the dependency asynchronously, this plugin exposes an async function `loadPluginFactory`
which should be awaited to provide the plugin factory:
```typescript
import factory from "@agoose77markdown-it-svgbob";
import * as MarkdownIt from "markdown-it";

factory().then((plugin) => {
    let md = new MarkdownIt({
      html: true,
    }).use(plugin);
    
    let someMarkdown = "``` bob \n" +
            "     .---.\n" +
            "    /-o-/--\n" +
            " .-/ / /->\n" +
            "( *  \\/\n" +
            " '-.  \\\n" +
            "    \\ /\n" +
            "     '\n" +
            "```";
    let html = md.render(someMarkdown);
    console.log(html);
})
```
