/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LangUnauthImport } from './routes/$lang/_unauth'
import { Route as LangAuthImport } from './routes/$lang/_auth'
import { Route as LangUnauthIndexImport } from './routes/$lang/_unauth.index'
import { Route as LangAuthAnotherImport } from './routes/$lang/_auth.another'
import { Route as LangAuthDashboardIndexImport } from './routes/$lang/_auth.dashboard.index'

// Create Virtual Routes

const LangImport = createFileRoute('/$lang')()

// Create/Update Routes

const LangRoute = LangImport.update({
  path: '/$lang',
  getParentRoute: () => rootRoute,
} as any)

const LangUnauthRoute = LangUnauthImport.update({
  id: '/_unauth',
  getParentRoute: () => LangRoute,
} as any)

const LangAuthRoute = LangAuthImport.update({
  id: '/_auth',
  getParentRoute: () => LangRoute,
} as any)

const LangUnauthIndexRoute = LangUnauthIndexImport.update({
  path: '/',
  getParentRoute: () => LangUnauthRoute,
} as any)

const LangAuthAnotherRoute = LangAuthAnotherImport.update({
  path: '/another',
  getParentRoute: () => LangAuthRoute,
} as any)

const LangAuthDashboardIndexRoute = LangAuthDashboardIndexImport.update({
  path: '/dashboard/',
  getParentRoute: () => LangAuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$lang': {
      id: '/$lang'
      path: '/$lang'
      fullPath: '/$lang'
      preLoaderRoute: typeof LangImport
      parentRoute: typeof rootRoute
    }
    '/$lang/_auth': {
      id: '/$lang/_auth'
      path: '/$lang'
      fullPath: '/$lang'
      preLoaderRoute: typeof LangAuthImport
      parentRoute: typeof LangRoute
    }
    '/$lang/_unauth': {
      id: '/$lang/_unauth'
      path: ''
      fullPath: '/$lang'
      preLoaderRoute: typeof LangUnauthImport
      parentRoute: typeof LangImport
    }
    '/$lang/_auth/another': {
      id: '/$lang/_auth/another'
      path: '/another'
      fullPath: '/$lang/another'
      preLoaderRoute: typeof LangAuthAnotherImport
      parentRoute: typeof LangAuthImport
    }
    '/$lang/_unauth/': {
      id: '/$lang/_unauth/'
      path: '/'
      fullPath: '/$lang/'
      preLoaderRoute: typeof LangUnauthIndexImport
      parentRoute: typeof LangUnauthImport
    }
    '/$lang/_auth/dashboard/': {
      id: '/$lang/_auth/dashboard/'
      path: '/dashboard'
      fullPath: '/$lang/dashboard'
      preLoaderRoute: typeof LangAuthDashboardIndexImport
      parentRoute: typeof LangAuthImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  LangRoute: LangRoute.addChildren({
    LangAuthRoute: LangAuthRoute.addChildren({
      LangAuthAnotherRoute,
      LangAuthDashboardIndexRoute,
    }),
    LangUnauthRoute: LangUnauthRoute.addChildren({ LangUnauthIndexRoute }),
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$lang"
      ]
    },
    "/$lang": {
      "filePath": "$lang",
      "children": [
        "/$lang/_auth",
        "/$lang/_unauth"
      ]
    },
    "/$lang/_auth": {
      "filePath": "$lang/_auth.tsx",
      "parent": "/$lang",
      "children": [
        "/$lang/_auth/another",
        "/$lang/_auth/dashboard/"
      ]
    },
    "/$lang/_unauth": {
      "filePath": "$lang/_unauth.tsx",
      "parent": "/$lang",
      "children": [
        "/$lang/_unauth/"
      ]
    },
    "/$lang/_auth/another": {
      "filePath": "$lang/_auth.another.tsx",
      "parent": "/$lang/_auth"
    },
    "/$lang/_unauth/": {
      "filePath": "$lang/_unauth.index.tsx",
      "parent": "/$lang/_unauth"
    },
    "/$lang/_auth/dashboard/": {
      "filePath": "$lang/_auth.dashboard.index.tsx",
      "parent": "/$lang/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
