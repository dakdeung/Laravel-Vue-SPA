window.Vue = require('vue');
import VueLadda from 'vue-ladda'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {MediaQueries} from 'vue-media-queries';

import VueIziToast from 'vue-izitoast'

import 'izitoast/dist/css/iziToast.min.css';

const mediaQueries = new MediaQueries();

window.Vue = require('vue');
window.Vue.use(VueIziToast);
window.Vue.use(mediaQueries);

require('./components/filters.js');

Vue.component('modal-register', require('./components/modal-components/ModalRegister.vue').default);
Vue.component('form-login', require('./components/login-components/FormLogin.vue').default);
Vue.component('error-reference', require('./components/ErrorReference.vue').default);

Vue.component('modal-change-password', require('./components/frontEnd/modal/ModalChangePassword').default);
Vue.component('modal-booking', require('./components/booking/ModalBooking').default);

Vue.component('treatment', require('./components/Treatment').default);
Vue.component('treatment-detail', require('./components/treatment/Detail').default);

Vue.component('contact', require('./components/contact/Contact').default);
Vue.component('cart', require('./components/cart/Cart').default);
Vue.component('cart-shop', require('./components/cart/CartShop').default);
Vue.component('transaction-detail', require('./components/transaction/Detail').default);
Vue.component('order-detail', require('./components/order/Detail').default);
Vue.component('cart-address', require('./components/cart/CartAddress.vue').default);

Vue.component('solution-men',require('./components/solution-men/Index').default);
Vue.component('solution-women',require('./components/solution-women/Index').default);

Vue.component('solution-detail', require('./components/solution/Detail').default);

Vue.component('statue-home', require('./components/StatueHome').default);

Vue.component('banner-product', require('./components/shop/Banner').default);
Vue.component('shop',require('./components/shop/Index').default);
Vue.component('shop-detail', require('./components/shop/Detail').default);

Vue.component('branch', require('./components/branch/Index').default);

Vue.component('slider', require('./components/homepages/Slider').default);
Vue.component('notification', require('./components/homepages/Notification').default);
Vue.component('notification-hover', require('./components/homepages/NotificationHover').default);
Vue.component('order', require('./components/homepages/Order').default);
Vue.component('search', require('./components/homepages/Search').default);
Vue.component('search-solution', require('./components/homepages/SearchSolution').default);
Vue.component('book', require('./components/homepages/Book').default);
Vue.component('wishlist', require('./components/homepages/Wishlist').default);
Vue.component('treatment-wishlist', require('./components/homepages/TreatmentWishlist').default);
Vue.component('mini-slider', require('./components/homepages/MiniSlider').default);
Vue.component('experience', require('./components/homepages/Experience').default);
Vue.component('before-after', require('./components/homepages/BeforeAfter').default);
Vue.component('homepage-video', require('./components/Video').default);

Vue.component('promotion', require('./components/Promotion').default);

Vue.component('media',require('./components/media/Index').default);

Vue.component('video-media', require('./components/Video').default);

Vue.component('artikel',require('./components/artikel321/Index').default);
Vue.component('artikel-detail', require('./components/artikel321/Detail').default);
Vue.component('artikel-detail-big', require('./components/artikel321/DetailBig').default);

Vue.component('doctor',require('./components/doctor/Doctor').default);

Vue.component('vue-ladda', VueLadda);
Vue.component('ladda-reference', require('./components/LaddaReference').default);
Vue.component('error-reference', require('./components/ErrorReference').default);

Vue.component('value', require('./components/Value').default);

Vue.component('best-seller', require('./components/Best').default);

Vue.component('review', require('./components/ModalReview').default);
Vue.component('home-rating', require('./components/HomeRating').default);
Vue.component('subscribe', require('./components/Subscribe').default);
Vue.component('sosmed', require('./components/Sosmed').default);

Vue.use(VueAxios, axios)

window.eventHub = new Vue();
const app = new Vue({
    el: '#app',
    data: {
        notifications : [],
        carts : [],
        base_url: process.env.MIX_APP_URL,
        notificationSystem: {
            options: {
                show    : {
                    theme           : 'dark',
                    icon            : 'icon-person',
                    position        : 'topCenter',
                    progressBarColor: 'rgb(0, 255, 184)',
                    buttons         : [
                        ['<button>Ok</button>', function (instance, toast) {
                            alert("Hello world!");
                        }, true],
                        ['<button>Close</button>', function (instance, toast) {
                            instance.hide({
                                transitionOut: 'fadeOutUp',
                                onClosing    : function (instance, toast, closedBy) {
                                    console.info('closedBy: ' + closedBy);
                                }
                            }, toast, 'buttonName');
                        }]
                    ],
                    onOpening       : function (instance, toast) {
                        console.info('callback abriu!');
                    },
                    onClosing       : function (instance, toast, closedBy) {
                        console.info('closedBy: ' + closedBy);
                    }
                },
                ballon  : {
                    balloon : true,
                    position: 'bottomCenter'
                },
                info    : {
                    position: 'bottomLeft'
                },
                success : {
                    position: 'bottomRight'
                },
                warning : {
                    position: 'topLeft'
                },
                error   : {
                    position: 'topRight'
                },
                general : {
                    position: 'topRight'
                },
                checkout: {
                    position: 'topRight',
                    buttons : [
                        ['<button>Checkout Now</button>', function (instance, toast) {
                            window.location.href = base_url + "/cart";
                        }, true],
                    ],
                },
                question: {
                    timeout  : 20000,
                    close    : false,
                    overlay  : true,
                    toastOnce: true,
                    id       : 'question',
                    zindex   : 999,
                    position : 'center',
                    buttons  : [
                        ['<button><b>YES</b></button>', function (instance, toast) {
                            instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
                        }, true],
                        ['<button>NO</button>', function (instance, toast) {
                            instance.hide({transitionOut: 'fadeOut'}, toast, 'button');
                        }]
                    ],
                    onClosing: function (instance, toast, closedBy) {
                        console.info('Closing | closedBy: ' + closedBy);
                    },
                    onClosed : function (instance, toast, closedBy) {
                        console.info('Closed | closedBy: ' + closedBy);
                    }
                }
            }
        },
    },
    mounted() {
       this.GetNotifications();
       this.GetCarts();
    },
    methods: {
        GetNotifications(){
            var params = {
                read : true
            }
            Vue.axios
            .get(this.base_url + "/api/notifications",{params : params})
            .then(response => {
                this.notifications = response.data.data;
            })
            .catch(errors => {
            //   this.errors = errors.response.data.errors;
            });
        },
        GetCarts(){
            var params = {

            }
            Vue.axios
            .get(this.base_url + "/api/carts",{params : params})
            .then(response => {
                this.carts = response.data.data;
            })
            .catch(errors => {
            //   this.errors = errors.response.data.errors;
            });
        },
       makeNotification: function (message, title, type = "success") {
           if (type == "success")
               this.$toast.success(message, title, this.notificationSystem.options.general);
           if (type == "danger")
               this.$toast.error(message, title, this.notificationSystem.options.general);
           if (type == "warning")
               this.$toast.warning(message, title, this.notificationSystem.options.general);
           if (type == "info")
               this.$toast.info(message, title, this.notificationSystem.options.general);
           if (type == "checkout")
               this.$toast.success(message, title, this.notificationSystem.options.checkout);
       },
       makeNotificationError: function (message, title, type = "danger") {
           if (type == "success")
               this.$toast.success(message, title, this.notificationSystem.options.general);
           if (type == "danger")
               this.$toast.error(message, title, this.notificationSystem.options.general);
           if (type == "warning")
               this.$toast.warning(message, title, this.notificationSystem.options.general);
           if (type == "info")
               this.$toast.info(message, title, this.notificationSystem.options.general);
           if (type == "checkout")
               this.$toast.success(message, title, this.notificationSystem.options.checkout);
       }
    },
    mediaQueries: mediaQueries
});
