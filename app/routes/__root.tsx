import * as React from "react";
import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import { seo } from "@/utils/seo";
import appCss from "@/app.css?url";
import { NotFound } from "@/components/NotFound";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      title: "Josh Rhee portfolio",
    },
    ...seo({
      title: "Josh Rhee portfolio",
      description: "Josh Rhee portfolio website",
      image: "@/images/me.png",
      keywords:
        "Josh Rhee,sang june rhee,josh rhee portfolio,josh rhee web portfolio,josh rhee website,sang june rhee portfolio,sang june rhee web portfolio,sang june rhee website",
    }),
  ],
  links: () => [{ rel: "stylesheet", href: appCss }],
  component: RootComponent,
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => {
    return (
      <RootDocument>
        <NotFound />
      </RootDocument>
    );
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  );
}
