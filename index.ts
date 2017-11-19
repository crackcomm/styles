/**
 * Tachyons Styles module.
 */
import * as variables from './theme/variables'

declare var require

/**
 * CSS Imports.
 */
const normalize: any = require('./css/normalize.css')
const particles: any = require('./css/particles.css')

export {
  normalize,
  variables,
  variables as $v,
  particles,
  particles as $p,
}

export * from './css';
export * from './theme/variables';
