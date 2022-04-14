import MarkdownIt from "markdown-it";


// Define interface to await readiness of import
export async function loadPluginFactory() {
    const svgbob = await import("svgbob-wasm");

    return (md: MarkdownIt, options: any) => {

        function getLangName(info: string): string {
            return info.split(/\s+/g)[0];
        }

        // Store reference to original renderer.
        let defaultFenceRenderer = md.renderer.rules.fence;

        // Render custom code types as SVGs, letting the fence parser do all the heavy lifting.
        function svgbobRenderer(tokens: any[], idx: number, options: any, env: any, slf: any) {
            let token = tokens[idx];
            let info = token.info.trim();
            let langName = info ? getLangName(info) : "";
            let imageHTML: string = "";
            let imageAttrs: string[][] = [];

            // Only handle custom token
            switch (langName) {
                case "bob": // spongedown
                case "svgbob": // sphinx-svgbob
                {
                    try {
                        imageHTML = svgbob.render(token.content);
                    } catch (e) {
                        console.log(`Error in running svgbob.convert_string: ${e}`);
                    }
                    break;
                }
                default: {
                    return defaultFenceRenderer(tokens, idx, options, env, slf);
                }

            }

            // If we have an image, let's render it, otherwise return blank img tag
            if (imageHTML.length) {
                // Store encoded image data
                imageAttrs.push(["src", `data:image/svg+xml,${encodeURIComponent(imageHTML)}`]);
                return `<img ${slf.renderAttrs({attrs: imageAttrs})}>`;
            }
            return "<img>"

        }

        md.renderer.rules.fence = svgbobRenderer;
    };
}
