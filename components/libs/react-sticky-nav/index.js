/*
 *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
*****************************************************************************/
'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var React = require('react'),
  __assign =
    Object.assign ||
    function (a) {
      for (var d, b = 1, c = arguments.length; b < c; b++) {
        d = arguments[b]
        for (var e in d)
          Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e])
      }
      return a
    }
function __rest(a, d) {
  var b = {},
    c
  for (c in a)
    Object.prototype.hasOwnProperty.call(a, c) &&
      0 > d.indexOf(c) &&
      (b[c] = a[c])
  if (null != a && 'function' === typeof Object.getOwnPropertySymbols) {
    var e = 0
    for (c = Object.getOwnPropertySymbols(a); e < c.length; e++)
      0 > d.indexOf(c[e]) && (b[c[e]] = a[c[e]])
  }
  return b
}
var styles = { position: 'sticky' },
  isChildFn = function (a) {
    return 'function' === typeof a
  },
  useCombinedRefs = function () {
    for (var a = [], d = 0; d < arguments.length; d++) a[d] = arguments[d]
    var b = React.useRef(null)
    React.useEffect(
      function () {
        a.forEach(function (c) {
          c &&
            ('function' === typeof c ? c(b.current) : (c.current = b.current))
        })
      },
      [a]
    )
    return b
  },
  StickyNav = React.forwardRef(function (a, d) {
    var b = a.children,
      c = a.disabled,
      e = a.render
    a = __rest(a, ['children', 'disabled', 'render'])
    var f = React.useState('sticky-unfixed'),
      r = f[0],
      n = f[1],
      p = React.useRef(0),
      t = React.useRef(0),
      g = React.useState(0)
    f = g[0]
    var v = g[1]
    g = React.useRef(null)
    var l = useCombinedRefs(d, g),
      m = React.useRef(null),
      h = React.useCallback(
        function () {
          if (l.current && !c) {
            var a = window.pageYOffset
            if (!(0 > a)) {
              var b = l.current.classList,
                d = 0 < a - p.current ? 'down' : 'up',
                f = t.current + p.current - a,
                g = l.current.getBoundingClientRect(),
                h = g.height
              g = g.top
              var k = 'down' === d ? Math.max(f, -h) : Math.min(f, 0)
              t.current = k
              l.current.style.top = k.toString()
              e && v(k)
              'down' === d &&
                !b.contains('sticky-hidden') &&
                f < -h &&
                (n('sticky-hidden'),
                b.remove('sticky-pinned', 'sticky-unfixed'),
                b.add('sticky-hidden'))
              'up' === d &&
                !b.contains('sticky-pinned') &&
                f > -h &&
                (n('sticky-pinned'),
                b.remove('sticky-hidden', 'sticky-unfixed'),
                b.add('sticky-pinned'))
              !b.contains('sticky-unfixed') &&
                (0 < g || 0 === a) &&
                (n('sticky-unfixed'),
                b.remove('sticky-hidden', 'sticky-pinned'),
                b.add('sticky-unfixed'))
              p.current = a
              m.current = null
            }
          }
        },
        [c, l, e]
      ),
      k = React.useCallback(
        function () {
          m.current && window.cancelAnimationFrame(m.current)
          m.current = window.requestAnimationFrame(h)
        },
        [h]
      ),
      u = React.useCallback(
        function () {
          'undefined' !== typeof window && window.addEventListener('scroll', k)
        },
        [k]
      ),
      q = React.useCallback(
        function () {
          'undefined' !== typeof window &&
            window.removeEventListener('scroll', k)
        },
        [k]
      )
    React.useEffect(
      function () {
        c ? q() : u()
        return function () {
          return q()
        }
      },
      [c, u, q]
    )
    React.useEffect(
      function () {
        c || h()
      },
      [c, h]
    )
    return e
      ? e({ position: r, ref: l, top: f })
      : React.createElement(
          'nav',
          __assign({}, a, { ref: l, style: styles }),
          isChildFn(b) ? b(r) : b
        )
  }),
  index = React.memo(StickyNav)
exports.default = index
exports.styles = styles
