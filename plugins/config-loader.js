import Vue from 'vue';
import config from '~/map.config.js';

export default ({ app }, inject) => {
  inject('config', Vue.observable(config));
}