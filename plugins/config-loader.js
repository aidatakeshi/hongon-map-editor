import config from '~/config.js';

import Vue from 'vue'

export default ({ app }, inject) => {
  inject('config', Vue.observable(config));
}