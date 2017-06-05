import Home from './components/Home';
// Import this if you wish to use CSS in your .vue files.
// See section below for more information.
import "vueify/lib/insert-css";


let App = {
  init() {
      new Vue({
        el: '#app',
        components: {
          'Home': Home
        },
        template: '<div><Home/></div>'
      })
  }
}
module.exports = App;
