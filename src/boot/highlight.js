import VueHighlightJS from "vue-highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/shades-of-purple.css";

export default ({ Vue }) => {
  Vue.use(VueHighlightJS, {
    languages: { javascript, html }
  });
};
