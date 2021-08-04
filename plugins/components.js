import Vue from 'vue'
import Datepicker from 'vuejs-datepicker'
import Vue2Editor from 'vue2-editor'
import OverlayLoading from '@/components/OverlayLoading'
import Button from '@/components/Button'
import VTooltip from 'v-tooltip'
// import VueSweetalert2 from 'vue-sweetalert2';

// css
// import 'sweetalert2/dist/sweetalert2.min.css';

// library
// Vue.use(VueSweetalert2, {
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33',
//   confirmButtonText: 'Iya',
//   cancelButtonText: 'Batal'
// });
Vue.use(VTooltip)
Vue.directive('tooltip', VTooltip.VTooltip)
Vue.directive('close-popover', VTooltip.VClosePopover)
Vue.component('VPopover', VTooltip.VPopover)
Vue.use(Vue2Editor)
Vue.component('DatePicker', Datepicker)

// register variable
const components = {
  OverlayLoading,
  Button
}

// vue register global component
Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
