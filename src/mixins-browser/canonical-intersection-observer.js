import _ from 'lodash';
import globalThis from './.global-this';

export class CanonicalIntersectionObserver {
  _cb = undefined;

  _observerPairs = [];

  constructor(cb) {
    this._cb = cb;
  }

  observe(element, options) {
    let alreadyObserving = _.some(this._observerPairs, {
      element,
      options
    });
    if (alreadyObserving) {
      return;
    }

    let observerPair = _.find(this._observerPairs, {
      options
    });
    let observer;
    if (_.isUndefined(observerPair)) {
      observer = new globalThis.IntersectionObserver((entries) => {
        this._cb(entries, this);
      }, options);
    } else {
      ({
        observer
      } = observerPair);
    }

    observer.observe(element);
    this._observerPairs.push({
      element,
      options,
      observer
    });
  }

  unobserve(element, options) {
    let observerPairs = _.filter(this._observerPairs, {
      element,
      options
    });

    _.forEach(observerPairs, function({element, _options, observer}) {
      observer.unobserve(element);
    });

    // eslint-disable-next-line lodash/prefer-immutable-method
    _.remove(this._observerPairs, {
      element,
      options
    });
  }

  disconnect() {
    let observers = _.map(this._observerPairs, 'observers');
    observers = _.uniq(observers);
    _.forEach(observers, function(observer) {
      observer.disconnect();
    });
    this._observerPairs = [];
  }
}
