var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _worker.js/index.js
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name((_, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name((_, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name((_, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name((_, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var re = Object.create;
var U = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var ae = Object.getOwnPropertyNames;
var ie = Object.getPrototypeOf;
var oe = Object.prototype.hasOwnProperty;
var I = /* @__PURE__ */ __name((e, t) => () => (e && (t = e(e = 0)), t), "I");
var V = /* @__PURE__ */ __name((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name((e, t, r, s) => {
  if (t && typeof t == "object" || typeof t == "function") for (let a of ae(t)) !oe.call(e, a) && a !== r && U(e, a, { get: /* @__PURE__ */ __name(() => t[a], "get"), enumerable: !(s = ne(t, a)) || s.enumerable });
  return e;
}, "ce");
var $ = /* @__PURE__ */ __name((e, t, r) => (r = e != null ? re(ie(e)) : {}, ce(t || !e || !e.__esModule ? U(r, "default", { value: e, enumerable: true }) : r, e)), "$");
var g;
var u = I(() => {
  g = { collectedLocales: [] };
});
var f;
var l = I(() => {
  f = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|sdloVsKzpiioE7ATs0hqA)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404 }, { src: "^/.*$", dest: "/500", status: 500 }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "attachment" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { version: "15.2.4" }, crons: [] };
});
var m;
var p = I(() => {
  m = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/317-9df891f3f957eb87.js": { type: "static" }, "/_next/static/chunks/44530001-9fe5617ddb7db574.js": { type: "static" }, "/_next/static/chunks/4bd1b696-14bf9c4cbd946ff4.js": { type: "static" }, "/_next/static/chunks/782-85ed8c8c03595706.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-fad5afc3f3f30fa3.js": { type: "static" }, "/_next/static/chunks/app/api/auth/signup/route-dc817bb3aa6018f3.js": { type: "static" }, "/_next/static/chunks/app/api/stripe/checkout/route-b0d710195efe5240.js": { type: "static" }, "/_next/static/chunks/app/api/stripe/webhook/route-57d81c8ac6e3e95e.js": { type: "static" }, "/_next/static/chunks/app/api/tools/engineer-pro-ultimate-tool/route-1b23461ae74d41d8.js": { type: "static" }, "/_next/static/chunks/app/layout-e5c4a12f990cf2b6.js": { type: "static" }, "/_next/static/chunks/app/tools/productivity/engineer-pro-ultimate-tool/page-b0f73129f01922bb.js": { type: "static" }, "/_next/static/chunks/framework-6d868e9bc95e10d8.js": { type: "static" }, "/_next/static/chunks/main-app-898417e485a890f1.js": { type: "static" }, "/_next/static/chunks/main-d0690d414fe59483.js": { type: "static" }, "/_next/static/chunks/pages/_app-da15c11dea942c36.js": { type: "static" }, "/_next/static/chunks/pages/_error-cc3f077a18ea1793.js": { type: "static" }, "/_next/static/chunks/polyfills-42372ed130431b0a.js": { type: "static" }, "/_next/static/chunks/webpack-344052f89c544da1.js": { type: "static" }, "/_next/static/css/e46d39730602a62c.css": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/_next/static/sdloVsKzpiioE7ATs0hqA/_buildManifest.js": { type: "static" }, "/_next/static/sdloVsKzpiioE7ATs0hqA/_ssgManifest.js": { type: "static" }, "/api/auth/signup": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/auth/signup.func.js" }, "/api/auth/signup.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/auth/signup.func.js" }, "/api/stripe/checkout": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/stripe/checkout.func.js" }, "/api/stripe/checkout.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/stripe/checkout.func.js" }, "/api/stripe/webhook": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/stripe/webhook.func.js" }, "/api/stripe/webhook.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/stripe/webhook.func.js" }, "/api/tools/engineer-pro-ultimate-tool": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/tools/engineer-pro-ultimate-tool.func.js" }, "/api/tools/engineer-pro-ultimate-tool.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/api/tools/engineer-pro-ultimate-tool.func.js" }, "/tools/productivity/engineer-pro-ultimate-tool": { type: "function", entrypoint: "__next-on-pages-dist__/functions/tools/productivity/engineer-pro-ultimate-tool.func.js" }, "/tools/productivity/engineer-pro-ultimate-tool.rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/tools/productivity/engineer-pro-ultimate-tool.func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } } };
});
var F = V((We, q) => {
  "use strict";
  u();
  l();
  p();
  function x(e, t) {
    e = String(e || "").trim();
    let r = e, s, a = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      s = e[0];
      let o = e.lastIndexOf(s);
      a += e.substring(o + 1), e = e.substring(1, o);
    }
    let n = 0;
    return e = pe(e, (o) => {
      if (/^\(\?[P<']/.test(o)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(o);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(o)}`);
        let h = o.substring(c[0].length, o.length - 1);
        return t && (t[n] = c[1]), n++, `(${h})`;
      }
      return o.substring(0, 3) === "(?:" || n++, o;
    }), e = e.replace(/\[:([^:]+):\]/g, (o, c) => x.characterClasses[c] || o), new x.PCRE(e, a, r, a, s);
  }
  __name(x, "x");
  function pe(e, t) {
    let r = 0, s = 0, a = false;
    for (let i = 0; i < e.length; i++) {
      let n = e[i];
      if (a) {
        a = false;
        continue;
      }
      switch (n) {
        case "(":
          s === 0 && (r = i), s++;
          break;
        case ")":
          if (s > 0 && (s--, s === 0)) {
            let o = i + 1, c = r === 0 ? "" : e.substring(0, r), h = e.substring(o), d = String(t(e.substring(r, o)));
            e = c + d + h, i = r;
          }
          break;
        case "\\":
          a = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(pe, "pe");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      constructor(s, a, i, n, o) {
        super(s, a), this.pcrePattern = i, this.pcreFlags = n, this.delimiter = o;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(x || (x = {}));
  x.prototype = x.PCRE.prototype;
  q.exports = x;
});
var Q = V((N) => {
  "use strict";
  u();
  l();
  p();
  N.parse = Pe;
  N.serialize = ve;
  var be = Object.prototype.toString, M = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Pe(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var r = {}, s = t || {}, a = s.decode || Se, i = 0; i < e.length; ) {
      var n = e.indexOf("=", i);
      if (n === -1) break;
      var o = e.indexOf(";", i);
      if (o === -1) o = e.length;
      else if (o < n) {
        i = e.lastIndexOf(";", n - 1) + 1;
        continue;
      }
      var c = e.slice(i, n).trim();
      if (r[c] === void 0) {
        var h = e.slice(n + 1, o).trim();
        h.charCodeAt(0) === 34 && (h = h.slice(1, -1)), r[c] = Ee(h, a);
      }
      i = o + 1;
    }
    return r;
  }
  __name(Pe, "Pe");
  function ve(e, t, r) {
    var s = r || {}, a = s.encode || Ce;
    if (typeof a != "function") throw new TypeError("option encode is invalid");
    if (!M.test(e)) throw new TypeError("argument name is invalid");
    var i = a(t);
    if (i && !M.test(i)) throw new TypeError("argument val is invalid");
    var n = e + "=" + i;
    if (s.maxAge != null) {
      var o = s.maxAge - 0;
      if (isNaN(o) || !isFinite(o)) throw new TypeError("option maxAge is invalid");
      n += "; Max-Age=" + Math.floor(o);
    }
    if (s.domain) {
      if (!M.test(s.domain)) throw new TypeError("option domain is invalid");
      n += "; Domain=" + s.domain;
    }
    if (s.path) {
      if (!M.test(s.path)) throw new TypeError("option path is invalid");
      n += "; Path=" + s.path;
    }
    if (s.expires) {
      var c = s.expires;
      if (!ke(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      n += "; Expires=" + c.toUTCString();
    }
    if (s.httpOnly && (n += "; HttpOnly"), s.secure && (n += "; Secure"), s.priority) {
      var h = typeof s.priority == "string" ? s.priority.toLowerCase() : s.priority;
      switch (h) {
        case "low":
          n += "; Priority=Low";
          break;
        case "medium":
          n += "; Priority=Medium";
          break;
        case "high":
          n += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (s.sameSite) {
      var d = typeof s.sameSite == "string" ? s.sameSite.toLowerCase() : s.sameSite;
      switch (d) {
        case true:
          n += "; SameSite=Strict";
          break;
        case "lax":
          n += "; SameSite=Lax";
          break;
        case "strict":
          n += "; SameSite=Strict";
          break;
        case "none":
          n += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return n;
  }
  __name(ve, "ve");
  function Se(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(Se, "Se");
  function Ce(e) {
    return encodeURIComponent(e);
  }
  __name(Ce, "Ce");
  function ke(e) {
    return be.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(ke, "ke");
  function Ee(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Ee, "Ee");
});
u();
l();
p();
u();
l();
p();
u();
l();
p();
var b = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
u();
l();
p();
u();
l();
p();
u();
l();
p();
u();
l();
p();
var D = $(F());
function C(e, t, r) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let s = r ? "" : "i", a = [];
  return { match: (0, D.default)(`%${e}%${s}`, a).exec(t), captureGroupKeys: a };
}
__name(C, "C");
function P(e, t, r, { namedOnly: s } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (a, i) => {
    let n = r.indexOf(i);
    return s && n === -1 ? a : (n === -1 ? t[parseInt(i, 10)] : t[n + 1]) || "";
  });
}
__name(P, "P");
function j(e, { url: t, cookies: r, headers: s, routeDest: a }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? A(e.value, s.get(e.key), a) : { valid: s.has(e.key) };
    case "cookie": {
      let i = r[e.key];
      return i && e.value !== void 0 ? A(e.value, i, a) : { valid: i !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? A(e.value, t.searchParams.get(e.key), a) : { valid: t.searchParams.has(e.key) };
  }
}
__name(j, "j");
function A(e, t, r) {
  let { match: s, captureGroupKeys: a } = C(e, t);
  return r && s && a.length ? { valid: !!s, newRouteDest: P(r, s, a, { namedOnly: true }) } : { valid: !!s };
}
__name(A, "A");
u();
l();
p();
function B(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", b), new Request(e, { headers: t });
}
__name(B, "B");
u();
l();
p();
function w(e, t, r) {
  let s = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [a, i] of s) {
    let n = a.toLowerCase(), o = r?.match ? P(i, r.match, r.captureGroupKeys) : i;
    n === "set-cookie" ? e.append(n, o) : e.set(n, o);
  }
}
__name(w, "w");
function v(e) {
  return /^https?:\/\//.test(e);
}
__name(v, "v");
function R(e, t) {
  for (let [r, s] of t.entries()) {
    let a = /^nxtP(.+)$/.exec(r), i = /^nxtI(.+)$/.exec(r);
    a?.[1] ? (e.set(r, s), e.set(a[1], s)) : i?.[1] ? e.set(i[1], s.replace(/(\(\.+\))+/, "")) : (!e.has(r) || !!s && !e.getAll(r).includes(s)) && e.append(r, s);
  }
}
__name(R, "R");
function L(e, t) {
  let r = new URL(t, e.url);
  return R(r.searchParams, new URL(e.url).searchParams), r.pathname = r.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(r, e);
}
__name(L, "L");
function S(e) {
  return new Response(e.body, e);
}
__name(S, "S");
function O(e) {
  return e.split(",").map((t) => {
    let [r, s] = t.split(";"), a = parseFloat((s ?? "q=1").replace(/q *= */gi, ""));
    return [r.trim(), isNaN(a) ? 1 : a];
  }).sort((t, r) => r[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(O, "O");
u();
l();
p();
function H(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(H, "H");
async function k(e, { request: t, assetsFetcher: r, ctx: s }, { path: a, searchParams: i }) {
  let n, o = new URL(t.url);
  R(o.searchParams, i);
  let c = new Request(o, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let h = await import(e.entrypoint);
        try {
          n = await h.default(c, s);
        } catch (d) {
          let y = d;
          throw y.name === "TypeError" && y.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : d;
        }
        break;
      }
      case "override": {
        n = S(await r.fetch(L(c, e.path ?? a))), e.headers && w(n.headers, e.headers);
        break;
      }
      case "static": {
        n = await r.fetch(L(c, a));
        break;
      }
      default:
        n = new Response("Not Found", { status: 404 });
    }
  } catch (h) {
    return console.error(h), new Response("Internal Server Error", { status: 500 });
  }
  return S(n);
}
__name(k, "k");
function G(e, t) {
  let r = "^//?(?:", s = ")/(.*)$";
  return !e.startsWith(r) || !e.endsWith(s) ? false : e.slice(r.length, -s.length).split("|").every((i) => t.has(i));
}
__name(G, "G");
u();
l();
p();
function he(e, { protocol: t, hostname: r, port: s, pathname: a }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(r).test(e.hostname) || s && !new RegExp(s).test(e.port) || a && !new RegExp(a).test(e.pathname));
}
__name(he, "he");
function de(e, t) {
  if (e.method !== "GET") return;
  let { origin: r, searchParams: s } = new URL(e.url), a = s.get("url"), i = Number.parseInt(s.get("w") ?? "", 10), n = Number.parseInt(s.get("q") ?? "75", 10);
  if (!a || Number.isNaN(i) || Number.isNaN(n) || !t?.sizes?.includes(i) || n < 0 || n > 100) return;
  let o = new URL(a, r);
  if (o.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = a.startsWith("//"), h = a.startsWith("/") && !c;
  if (!h && !t?.domains?.includes(o.hostname) && !t?.remotePatterns?.find((_) => he(o, _))) return;
  let d = e.headers.get("Accept") ?? "", y = t?.formats?.find((_) => d.includes(_))?.replace("image/", "");
  return { isRelative: h, imageUrl: o, options: { width: i, quality: n, format: y } };
}
__name(de, "de");
function fe(e, t, r) {
  let s = new Headers();
  if (r?.contentSecurityPolicy && s.set("Content-Security-Policy", r.contentSecurityPolicy), r?.contentDispositionType) {
    let i = t.pathname.split("/").pop(), n = i ? `${r.contentDispositionType}; filename="${i}"` : r.contentDispositionType;
    s.set("Content-Disposition", n);
  }
  e.headers.has("Cache-Control") || s.set("Cache-Control", `public, max-age=${r?.minimumCacheTTL ?? 60}`);
  let a = S(e);
  return w(a.headers, s), a;
}
__name(fe, "fe");
async function K(e, { buildOutput: t, assetsFetcher: r, imagesConfig: s }) {
  let a = de(e, s);
  if (!a) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: i, imageUrl: n } = a, c = await (i && n.pathname in t ? r.fetch.bind(r) : fetch)(n);
  return fe(c, n, s);
}
__name(K, "K");
u();
l();
p();
u();
l();
p();
u();
l();
p();
async function E(e) {
  return import(e);
}
__name(E, "E");
var me = "x-vercel-cache-tags";
var ge = "x-next-cache-soft-tags";
var ye = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${b}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let r = new URL(e.url), s = await we();
    if (r.pathname === "/v1/suspense-cache/revalidate") {
      let i = r.searchParams.get("tags")?.split(",") ?? [];
      for (let n of i) await s.revalidateTag(n);
      return new Response(null, { status: 200 });
    }
    let a = r.pathname.replace("/v1/suspense-cache/", "");
    if (!a.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let i = W(e, ge), n = await s.get(a, { softTags: i });
        return n ? new Response(JSON.stringify(n.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (n.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let i = globalThis[ye], n = /* @__PURE__ */ __name(async () => {
          let o = await e.json();
          o.data.tags === void 0 && (o.tags ??= W(e, me) ?? []), await s.set(a, o);
        }, "n");
        return i ? i.ctx.waitUntil(n()) : await n(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (r) {
    return console.error(r), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
async function we() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? z("kv") : z("cache-api");
}
__name(we, "we");
async function z(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, r = await E(t);
  return new r.default();
}
__name(z, "z");
function W(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(W, "W");
function X() {
  globalThis[Z] || (Re(), globalThis[Z] = true);
}
__name(X, "X");
function Re() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let r = new Request(...t), s = await xe(r);
    return s || (s = await J(r), s) ? s : (_e(r), e(r));
  };
}
__name(Re, "Re");
async function xe(e) {
  if (e.url.startsWith("blob:")) try {
    let r = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, s = (await E(r)).default, a = { async arrayBuffer() {
      return s;
    }, get body() {
      return new ReadableStream({ start(i) {
        let n = Buffer.from(s);
        i.enqueue(n), i.close();
      } });
    }, async text() {
      return Buffer.from(s).toString();
    }, async json() {
      let i = Buffer.from(s);
      return JSON.stringify(i.toString());
    }, async blob() {
      return new Blob(s);
    } };
    return a.clone = () => ({ ...a }), a;
  } catch {
  }
  return null;
}
__name(xe, "xe");
function _e(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(_e, "_e");
var Z = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
u();
l();
p();
var Y = $(Q());
var T = class {
  static {
    __name(this, "T");
  }
  constructor(t, r, s, a, i) {
    this.routes = t;
    this.output = r;
    this.reqCtx = s;
    this.url = new URL(s.request.url), this.cookies = (0, Y.parse)(s.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), R(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = i?.find((n) => n.domain === this.url.hostname), this.locales = new Set(a.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: r, checkIntercept: s }) {
    let a = C(t.src, this.path, t.caseSensitive);
    if (!a.match || t.methods && !t.methods.map((n) => n.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let i = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((n) => {
      let o = j(n, i);
      return o.newRouteDest && (i.routeDest = o.newRouteDest), !o.valid;
    }) && !t.missing?.find((n) => j(n, i).valid) && !(r && t.status !== this.status)) {
      if (s && t.dest) {
        let n = /\/(\(\.+\))+/, o = n.test(t.dest), c = n.test(this.path);
        if (o && !c) return;
      }
      return { routeMatch: a, routeDest: i.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let r = "x-middleware-override-headers", s = t.headers.get(r);
    if (s) {
      let c = new Set(s.split(",").map((h) => h.trim()));
      for (let h of c.keys()) {
        let d = `x-middleware-request-${h}`, y = t.headers.get(d);
        this.reqCtx.request.headers.get(h) !== y && (y ? this.reqCtx.request.headers.set(h, y) : this.reqCtx.request.headers.delete(h)), t.headers.delete(d);
      }
      t.headers.delete(r);
    }
    let a = "x-middleware-rewrite", i = t.headers.get(a);
    if (i) {
      let c = new URL(i, this.url), h = this.url.hostname !== c.hostname;
      this.path = h ? `${c}` : c.pathname, R(this.searchParams, c.searchParams), t.headers.delete(a);
    }
    let n = "x-middleware-next";
    t.headers.get(n) ? t.headers.delete(n) : !i && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), w(this.reqCtx.request.headers, t.headers), w(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let r = t && this.output[t];
    if (!r || r.type !== "middleware") return this.status = 500, false;
    let s = await k(r, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), s.status === 500 ? (this.status = s.status, false) : (this.processMiddlewareResp(s), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, r, s) {
    !t.headers || (w(this.headers.normal, t.headers, { match: r, captureGroupKeys: s }), t.important && w(this.headers.important, t.headers, { match: r, captureGroupKeys: s }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, r, s) {
    if (!t.dest) return this.path;
    let a = this.path, i = t.dest;
    this.wildcardMatch && /\$wildcard/.test(i) && (i = i.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = P(i, r, s);
    let n = /\/index\.rsc$/i.test(this.path), o = /^\/(?:index)?$/i.test(a), c = /^\/__index\.prefetch\.rsc$/i.test(a);
    n && !o && !c && (this.path = a);
    let h = /\.rsc$/i.test(this.path), d = /\.prefetch\.rsc$/i.test(this.path), y = this.path in this.output;
    h && !d && !y && (this.path = this.path.replace(/\.rsc/i, ""));
    let _ = new URL(this.path, this.url);
    return R(this.searchParams, _.searchParams), v(this.path) || (this.path = _.pathname), a;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: s, cookie: a } } = t, i = a && this.cookies[a], n = O(i ?? ""), o = O(this.reqCtx.request.headers.get("accept-language") ?? ""), d = [...n, ...o].map((y) => s[y]).filter(Boolean)[0];
    if (d) {
      !this.path.startsWith(d) && (this.headers.normal.set("location", d), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, r) {
    return !this.locales || r !== "miss" ? t : G(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, r) {
    let s = this.getLocaleFriendlyRoute(r, t), { routeMatch: a, routeDest: i } = this.checkRouteMatch(s, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, n = { ...s, dest: i };
    if (!a?.match || n.middlewarePath && this.middlewareInvoked.includes(n.middlewarePath)) return "skip";
    let { match: o, captureGroupKeys: c } = a;
    if (this.applyRouteOverrides(n), this.applyLocaleRedirects(n), !await this.runRouteMiddleware(n.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(n, o, c), this.applyRouteStatus(n);
    let d = this.applyRouteDest(n, o, c);
    if (n.check && !v(this.path)) if (d === this.path) {
      if (t !== "miss") return this.checkPhase(H(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !n.continue || n.status && n.status >= 300 && n.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let r = true;
    for (let i of this.routes[t]) {
      let n = await this.checkRoute(t, i);
      if (n === "error") return "error";
      if (n === "done") {
        r = false;
        break;
      }
    }
    if (t === "hit" || v(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let i of this.locales) {
      let n = new RegExp(`/${i}(/.*)`), c = this.path.match(n)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let s = this.path in this.output;
    if (!s && this.path.endsWith("/")) {
      let i = this.path.replace(/\/$/, "");
      s = i in this.output, s && (this.path = i);
    }
    if (t === "miss" && !s) {
      let i = !this.status || this.status < 400;
      this.status = i ? 404 : this.status;
    }
    let a = "miss";
    return s || t === "miss" || t === "error" ? a = "hit" : r && (a = H(t)), this.checkPhase(a);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let r = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), r;
  }
};
async function ee(e, t, r, s) {
  let a = new T(t.routes, r, e, s, t.wildcard), i = await te(a);
  return Me(e, i, r);
}
__name(ee, "ee");
async function te(e, t = "none", r = false) {
  return await e.run(t) === "error" || !r && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
async function Me(e, { path: t = "/404", status: r, headers: s, searchParams: a, body: i }, n) {
  let o = s.normal.get("location");
  if (o) {
    if (o !== s.middlewareLocation) {
      let d = [...a.keys()].length ? `?${a.toString()}` : "";
      s.normal.set("location", `${o ?? "/"}${d}`);
    }
    return new Response(null, { status: r, headers: s.normal });
  }
  let c;
  if (i !== void 0) c = new Response(i, { status: r });
  else if (v(t)) {
    let d = new URL(t);
    R(d.searchParams, a), c = await fetch(d, e.request);
  } else c = await k(n[t], e, { path: t, status: r, headers: s, searchParams: a });
  let h = s.normal;
  return w(h, c.headers), w(h, s.important), c = new Response(c.body, { ...c, status: r || c.status, headers: h }), c;
}
__name(Me, "Me");
u();
l();
p();
function se() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Te };
}
__name(se, "se");
function Te(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let r = Ie();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, r), r;
}
__name(Te, "Te");
function Ie() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name((t, r) => e.has(r) ? e.get(r) : Reflect.get(globalThis, r), "get"), set: /* @__PURE__ */ __name((t, r, s) => Ae.has(r) ? Reflect.set(globalThis, r, s) : (e.set(r, s), true), "set") });
}
__name(Ie, "Ie");
var Ae = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var je = Object.defineProperty;
var Le = /* @__PURE__ */ __name((...e) => {
  let t = e[0], r = e[1], s = "__import_unsupported";
  if (!(r === s && typeof t == "object" && t !== null && s in t)) return je(...e);
}, "Le");
globalThis.Object.defineProperty = Le;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var Ss = { async fetch(e, t, r) {
  se(), X();
  let s = await __ALSes_PROMISE__;
  if (!s) {
    let n = new URL(e.url), o = await t.ASSETS.fetch(`${n.protocol}//${n.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = o.ok ? o.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: a, requestContextAsyncLocalStorage: i } = s;
  return a.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: b }, async () => i.run({ env: t, ctx: r, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return K(e, { buildOutput: m, assetsFetcher: t.ASSETS, imagesConfig: f.images });
    let o = B(e);
    return ee({ request: o, ctx: r, assetsFetcher: t.ASSETS }, f, m, g);
  }));
} };
export {
  Ss as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=bundledWorker-0.13702055294554139.mjs.map
