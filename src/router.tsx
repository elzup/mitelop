import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import BroadcastTool from './components/Broadcast/BroadcastTool'
import { gadgets } from './components/gadgets'
import { GadgetLayout, TopLayout } from './components/Layout'
import TopPage from './components/TopPage'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <TopLayout title="Widget makeing tool | Mitelop">
      <TopPage />
    </TopLayout>
  ),
})

const broadcastRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/broadcast',
  component: () => (
    <GadgetLayout title="Broadcast">
      <BroadcastTool />
    </GadgetLayout>
  ),
})

const gadgetRoutes = gadgets.map((g) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: g.path,
    component: () => (
      <GadgetLayout title={g.title}>
        <g.Component windowMode={g.windowMode} />
      </GadgetLayout>
    ),
  })
)

const routeTree = rootRoute.addChildren([
  indexRoute,
  broadcastRoute,
  ...gadgetRoutes,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
