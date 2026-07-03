import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import BroadcastControlWindow from './components/Broadcast/BroadcastControlWindow'
import BroadcastTool from './components/Broadcast/BroadcastTool'
import ConfigWindow from './components/Broadcast/ConfigWindow'
import GadgetWindow from './components/GadgetWindow'
import { gadgets } from './components/gadgets'
import Launcher from './components/Launcher/Launcher'
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

const launcherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/launcher',
  component: () => <Launcher />,
})

const gadgetWindowRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gadget/$gadgetKey',
  component: () => <GadgetWindow />,
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

const broadcastControlRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/broadcast/control',
  component: () => (
    <GadgetLayout title="Broadcast - Control">
      <BroadcastControlWindow />
    </GadgetLayout>
  ),
})

const configRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/config/$gadgetKey',
  validateSearch: (search: Record<string, unknown>) => ({
    instanceId:
      typeof search.instanceId === 'string' ? search.instanceId : undefined,
  }),
  component: () => (
    <GadgetLayout title="Gadget Config">
      <ConfigWindow />
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
  launcherRoute,
  gadgetWindowRoute,
  broadcastRoute,
  broadcastControlRoute,
  configRoute,
  ...gadgetRoutes,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router
  }
}
