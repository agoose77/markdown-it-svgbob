import MarkdownIt from "markdown-it";
import factory from "@agoose77//markdown-it-svgbob"
import 'bootstrap/js/dist/alert';
import 'bootstrap/dist/css/bootstrap.min.css';

factory().then((plugin) => {
    var md = new MarkdownIt().use(plugin);

    var source = document.getElementById("markdown-source");
    var dest = document.getElementById("markdown-dest");

    function render() {
        dest.innerHTML = md.render(source.value);
    }

    source.addEventListener("input", render, true);

    render();
});
