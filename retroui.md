Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Introduction

Why another UI Library?

If you don't want to put much effort and time into designing your websites, It's hard to build something unique looking these days. Most of the UI libraries out here are very generic and hard to distinguish from each other.

So when I started getting into Retro/Neobrutalist design system, I wanted to build my personal website with this design. But I couldn't find a UI library that fit what I was looking for, So I start building my own!

Welcome to RetroUI, The UI library that let's you build unique and playful websites.

Follow the Installation Guide to get started.

Last Updated: 07 Mar, 2024
Introduction | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Next.js

RetroUI ❤️ Next.js

1. Create Project

Run the init command to create a new Next.js project or to setup an existing one:
pnpm dlx shadcn@latest init

2. Install utilities

If the libs/utils.ts file is not present in your project, you can install it using the following command:
pnpm dlx shadcn@latest add https://retroui.dev/r/utils.json

3. That's it 🚀

Now you can start using RetroUI components in your project. You can install them through CLI or manually.

pnpm dlx shadcn@latest add 'https://retroui.dev/r/button.json'

After installing the component in your project, you can then simply import it like this:

import { Button } from "@/components/retroui/Button";

export default function ButtonExample() {
return <Button>Click Me!</Button>;
}

Optional

You are free to pick your own fonts and theme, but if you'd like to use RetroUI theme then use the following guide.

1. Add Fonts

We are using Archivo Black for headings and Space Grotesk for everything else. You can install them from Nextjs fonts or manually from Google fonts.

import { Archivo_Black, Space_Grotesk } from "next/font/google";

const archivoBlack = Archivo_Black({
subsets: ["latin"],
weight: "400",
variable: "--font-head",
display: "swap",
});

const space = Space_Grotesk({
subsets: ["latin"],
weight: "400",
variable: "--font-sans",
display: "swap",
});

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body className={`${archivoBlack.variable} ${space.variable}`}>
{children}
</body>
</html>
);
}

2. Add Theme

Save your theme as CSS variables in global.css:

@theme {
--font-head: var(--font-head);
--font-sans: var(--font-sans);
--radius: var(--radius);

--shadow-xs: 1px 1px 0 0 var(--border);
--shadow-sm: 2px 2px 0 0 var(--border);
--shadow: 3px 3px 0 0 var(--border);
--shadow-md: 4px 4px 0 0 var(--border);
--shadow-lg: 6px 6px 0 0 var(--border);
--shadow-xl: 10px 10px 0 1px var(--border);
--shadow-2xl: 16px 16px 0 1px var(--border);

--color-background: var(--background);
--color-foreground: var(--foreground);
--color-primary: var(--primary);
--color-primary-foreground: var(--primary-foreground);
--color-secondary: var(--secondary);
--color-secondary-foreground: var(--secondary-foreground);
--color-primary-hover: var(--primary-hover);
--color-card: var(--card);
--color-card-foreground: var(--card-foreground);
--color-muted: var(--muted);
--color-muted-foreground: var(--muted-foreground);
--color-accent: var(--accent);
--color-accent-foreground: var(--accent-foreground);
--color-destructive: var(--destructive);
--color-destructive-foreground: var(--destructive-foreground);
--color-border: var(--border);
}

:root {
--radius: 0;
--background: #fff;
--foreground: #000;
--card: #fff;
--card-foreground: #000;
--primary: #ffdb33;
--primary-hover: #ffcc00;
--primary-foreground: #000;
--secondary: #000;
--secondary-foreground: #fff;
--muted: #aeaeae;
--muted-foreground: #5a5a5a;
--accent: #fae583;
--accent-foreground: #000;
--destructive: #e63946;
--destructive-foreground: #fff;
--border: #000;
}

.dark {
--radius: 0;
--background: #1a1a1a;
--foreground: #f5f5f5;
--card: #242424;
--card-foreground: #f5f5f5;
--primary: #ffdb33;
--primary-hover: #ffcc00;
--primary-foreground: #000;
--secondary: #3a3a3a;
--secondary-foreground: #f5f5f5;
--muted: #3f3f46;
--muted-foreground: #a0a0a0;
--accent: #fae583;
--accent-foreground: #000;
--destructive: #e63946;
--destructive-foreground: #fff;
--border: #3a3a3a;
}

If you need any additional help, you can feel free to ask it in our Discord community.

Last Updated: 06 Mar, 2024
Next.js | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Accordion

This collapsible component let's your users read only the content they care about. 😌
API Reference
Source

"use client";

import { Accordion } from "@/components/retroui/Accordion";

export default function AccordionStyleDefault() {
return (
<Accordion type="single" collapsible className="space-y-4 w-full">
<Accordion.Item value="item-1">
<Accordion.Header>Accordion Item 1</Accordion.Header>
<Accordion.Content>
This is the content of the first accordion item.
</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item-2">
<Accordion.Header>Accordion Item 2</Accordion.Header>
<Accordion.Content>
This is the content of the second accordion item.
</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item-3">
<Accordion.Header>Accordion Item 3</Accordion.Header>
<Accordion.Content>
This is the content of the third accordion item.
</Accordion.Content>
</Accordion.Item>
</Accordion>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/accordion

Examples
Default

"use client";

import { Accordion } from "@/components/retroui/Accordion";

export default function AccordionStyleDefault() {
return (
<Accordion type="single" collapsible className="space-y-4 w-full">
<Accordion.Item value="item-1">
<Accordion.Header>Accordion Item 1</Accordion.Header>
<Accordion.Content>
This is the content of the first accordion item.
</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item-2">
<Accordion.Header>Accordion Item 2</Accordion.Header>
<Accordion.Content>
This is the content of the second accordion item.
</Accordion.Content>
</Accordion.Item>
<Accordion.Item value="item-3">
<Accordion.Header>Accordion Item 3</Accordion.Header>
<Accordion.Content>
This is the content of the third accordion item.
</Accordion.Content>
</Accordion.Item>
</Accordion>
);
}

Last Updated: 19 Oct, 2024
Accordion | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Alert

Notify your users about important events and updates. 📣
Source

import { Alert } from "@/components/retroui/Alert";

export default function AlertStyleDefault() {
return (
<Alert>
<Alert.Title>Heads up!</Alert.Title>
<Alert.Description>
This is where you can write description that no one reads...
</Alert.Description>
</Alert>
);
}

pnpm dlx shadcn@latest add @retroui/alert

Examples
Default

import { Alert } from "@/components/retroui/Alert";

export default function AlertStyleDefault() {
return (
<Alert>
<Alert.Title>Heads up!</Alert.Title>
<Alert.Description>
This is where you can write description that no one reads...
</Alert.Description>
</Alert>
);
}

Solid

import { Alert } from "@/components/retroui/Alert";

export default function AlertStyleDefault() {
return (
<Alert variant="solid">
<Alert.Title>Heads up!</Alert.Title>
<Alert.Description>
This is where you can write description that no one reads...
</Alert.Description>
</Alert>
);
}

With Icon

import { Alert } from "@/components/retroui/Alert";
import { CheckCircle } from "lucide-react";

export default function AlertStyleDefaultIcon() {
return (
<Alert className="flex">
<CheckCircle className="h-5 w-5 mr-4 mt-2" />
<div>
<Alert.Title>Heads up!</Alert.Title>
<Alert.Description>
This is where you can write description that no one reads...
</Alert.Description>
</div>
</Alert>
);
}

Status

import { Alert } from "@/components/retroui/Alert";
import { CheckCircle, InfoIcon, XIcon } from "lucide-react";

export default function AlertAllStatus() {
return (
<div className="space-y-4">
<Alert status="success" className="flex items-center">
<CheckCircle className="h-4 w-4 mr-4" />
<Alert.Title>This is a success alert!</Alert.Title>
</Alert>
<Alert status="info" className="flex items-center">
<InfoIcon className="h-4 w-4 mr-4" />
<Alert.Title>This is an info alert!</Alert.Title>
</Alert>
<Alert status="error" className="flex items-center">
<XIcon className="h-4 w-4 mr-4" />
<Alert.Title>This is an error alert!</Alert.Title>
</Alert>
<Alert status="warning" className="flex items-center">
<InfoIcon className="h-4 w-4 mr-4" />
<Alert.Title>This is an error alert!</Alert.Title>
</Alert>
</div>
);
}

Last Updated: 24 Oct, 2024
Alert | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Avatar

Default rounded avatar that can show your users profile picture. ✨
Source

import { Avatar } from "@/components/retroui/Avatar";

export default function AvatarStyleCircle() {
return (
<Avatar>
<Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
<Avatar.Fallback>AH</Avatar.Fallback>
</Avatar>
);
}

pnpm dlx shadcn@latest add @retroui/avatar

Examples
Size variants

import { Avatar } from "@/components/retroui/Avatar";

export default function AvatarStyleCircleSizes() {
return (
<div className="flex items-center space-x-4">
<Avatar>
<Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
<Avatar.Fallback>AH</Avatar.Fallback>
</Avatar>
<Avatar className="h-16 w-16">
<Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
<Avatar.Fallback>AH</Avatar.Fallback>
</Avatar>
<Avatar className="h-20 w-20">
<Avatar.Image src="/images/avatar.jpeg" alt="Arif Logs" />
<Avatar.Fallback>AH</Avatar.Fallback>
</Avatar>
</div>
);
}

Fallbacks

Fallbacks are helpfull when there ia an error loading the src of the avatar. You can set fallbacks with Avatar.Fallback component.

import { Avatar } from "@/components/retroui/Avatar";

export default function AvatarStyleFallback() {
return (
<Avatar>
<Avatar.Image src="broken-link" alt="Arif Logs" />
<Avatar.Fallback>AH</Avatar.Fallback>
</Avatar>
);
}

Last Updated: 12 Oct, 2024
Avatar | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Badge

The component that looks like a button but isn't clickable!
Source

import { Badge } from "@/components/retroui/Badge";

export default function BadgeStyleDefault() {
return <Badge>Default Badge</Badge>;
}

pnpm dlx shadcn@latest add @retroui/badge

Examples
Default

import { Badge } from "@/components/retroui/Badge";

export default function BadgeStyleDefault() {
return <Badge>Default Badge</Badge>;
}

Variants

import { Badge } from "@/components/retroui/Badge";

export default function BadgeStyleVariants() {
return (
<div className="flex flex-wrap gap-4">
<Badge>Default</Badge>
<Badge variant="outline">Outlined</Badge>
<Badge variant="solid">Solid</Badge>
<Badge variant="surface">Surface</Badge>
</div>
);
}

Rounded

import { Badge } from "@/components/retroui/Badge";

export default function BadgeStyleRounded() {
return (
<div className="space-x-4">
<Badge variant="solid" className="rounded-sm">
Rounded
</Badge>
<Badge variant="solid" className="rounded-full">
Full
</Badge>
</div>
);
}

Sizes

import { Badge } from "@/components/retroui/Badge";

export default function BadgeStyleVariants() {
return (
<div className="space-x-4">
<Badge size="sm">small</Badge>
<Badge>medium</Badge>
<Badge size="lg">large</Badge>
</div>
);
}

Last Updated: 30 Oct, 2024
Badge | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Breadcrumb

A navigation component that shows users where they are within a hierarchy.
Source

import { Breadcrumb } from "@/components/retroui/Breadcrumb";

export default function BreadcrumbStyleDefault() {
return (
<Breadcrumb>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb>
);
}

pnpm dlx shadcn@latest add @retroui/breadcrumb

Examples
Default

import { Breadcrumb } from "@/components/retroui/Breadcrumb";

export default function BreadcrumbStyleDefault() {
return (
<Breadcrumb>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb>
);
}

Custom Separator

import { Breadcrumb } from "@/components/retroui/Breadcrumb";
import { Slash } from "lucide-react";

export default function BreadcrumbCustomSeparator() {
return (
<Breadcrumb>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator>
<Slash />
</Breadcrumb.Separator>
<Breadcrumb.Item>
<Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator>
<Slash />
</Breadcrumb.Separator>
<Breadcrumb.Item>
<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb>
);
}

Collapsed

import Link from "next/link"

import { Breadcrumb } from "@/components/retroui/Breadcrumb";

export default function BreadcrumbCollapsed() {
return (
<Breadcrumb>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link asChild>
<Link href="/">Home</Link>
</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Item>
<Breadcrumb.Ellipsis />
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Link asChild>
<Link href="/docs/components">Components</Link>
</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb>
)
}

Link Component

import Link from "next/link"

import { Breadcrumb } from "@/components/retroui/Breadcrumb"

export default function BreadcrumbLinkComponent() {
return (
<Breadcrumb>
<Breadcrumb.List>
<Breadcrumb.Item>
<Breadcrumb.Link asChild>
<Link href="/">Home</Link>
</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Link asChild>
<Link href="/docs/components">Components</Link>
</Breadcrumb.Link>
</Breadcrumb.Item>
<Breadcrumb.Separator />
<Breadcrumb.Item>
<Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
</Breadcrumb.Item>
</Breadcrumb.List>
</Breadcrumb>
)
}

Last Updated: 12 May, 2025
Breadcrumb | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Button

This bold button makes sure your users click on it and perform the actions you want! 🚀
Source

import { Button } from "@/components/retroui/Button";

export default function ButtonStyleDefault() {
return <Button>Click Me!</Button>;
}

pnpm dlx shadcn@latest add @retroui/button

Examples
Primary

import { Button } from "@/components/retroui/Button";

export default function ButtonStyleDefault() {
return <Button>Click Me!</Button>;
}

Secondary

import { Button } from "@/components/retroui/Button";

export default function ButtonStyleSecondary() {
return <Button variant="secondary">Click Me!</Button>;
}

Outline

import { Button } from "@/components/retroui/Button";

export default function ButtonStyleOutline() {
return <Button variant="outline">Click Me!</Button>;
}

Link

import { Button } from "@/components/retroui/Button";

export default function ButtonStyleLink() {
return <Button variant="link">Click Me!</Button>;
}

Icon

import { Button } from "@/components/retroui/Button";
import { PenIcon } from "lucide-react";

export default function ButtonStyleIcon() {
return (
<Button size="icon">
<PenIcon className="w-4 h-4" />
</Button>
);
}

With Icon

import { Button } from "@/components/retroui/Button";
import { Trash } from "lucide-react";

export default function ButtonStyleWithIcon() {
return (
<Button className="bg-destructive text-white hover:bg-destructive/90">
<Trash className="h-4 w-4 mr-2" /> Delete
</Button>
);
}

Last Updated: 17 Oct, 2025
Button | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Card

A customizable card component to visualize your content. 📝
Source

import { Card } from "@/components/retroui/Card";

export default function BasicCard() {
return (
<Card>
<Card.Header>
<Card.Title>This is Card Title</Card.Title>
<Card.Description>
I can not find what to write here.. so imagine I wrote some good
stuff.
</Card.Description>
</Card.Header>
</Card>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/card

Examples
Title with description

import { Card } from "@/components/retroui/Card";

export default function BasicCard() {
return (
<Card>
<Card.Header>
<Card.Title>This is Card Title</Card.Title>
<Card.Description>
I can not find what to write here.. so imagine I wrote some good
stuff.
</Card.Description>
</Card.Header>
</Card>
);
}

Product card

import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";

export default function CommerceCard() {
return (
<Card className="w-[350px] shadow-none hover:shadow-none">
<Card.Content className="pb-0">
<img
          src="/images/gameboy.jpg"
          className="w-full h-full"
          alt="Gameboy"
        />
</Card.Content>
<Card.Header className="pb-0">
<Card.Title>Classic 8-bit Gameboy</Card.Title>
</Card.Header>
<Card.Content className="flex justify-between items-center">
<p className="text-lg font-semibold">$29.90</p>
<Button>Add to cart</Button>
</Card.Content>
</Card>
);
}

Testimonial card

import { Text } from "@/components/retroui/Text";
import { Card } from "@/components/retroui/Card";
import { Avatar } from "@/components/retroui/Avatar";

export default function TestimonialCard() {
return (
<Card className="w-full max-w-[400px] shadow-none hover:shadow-md">
<Card.Content>
<Text className="text-lg">
&quot; RetroUI is the cooling looking UI library out there! &quot;
</Text>

        <div className="flex items-center space-x-2 mt-6">
          <Avatar className="h-10 w-10">
            <Avatar.Image
              alt="avatar"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            />
          </Avatar>
          <div>
            <div className="font-medium">Leroy Jenkins</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              CEO of Uber
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>

);
}

Retro player card

import { Button, Card } from "@/components/retroui";
import { Slider } from "@/components/retroui/Slider";
import {
ArrowLeft,
Heart,
Pause,
Repeat,
Shuffle,
Sparkle,
StepBack,
StepForward,
} from "lucide-react";

export default function RetroPlayerStyle() {
return (
<Card className="w-full max-w-sm rounded-lg shadow-none">
{/_ header _/}
<Card.Header className="flex flex-row justify-between border-b border-black/50 dark:border-white/50">
<Button variant="ghost" className="p-0">
<ArrowLeft className="size-5" />
</Button>
<p className="text-sm font-bold">Now playing</p>
<Button variant="ghost" className="p-0">
<Heart className="size-5" />
</Button>
</Card.Header>
{/_ card content _/}
<Card.Content className="relative px-4 sm:px-12 py-6 overflow-hidden">
{/_ thumbnail box _/}
<div className="flex items-center gap-4 mb-6">
<img
            src="/images/punk.svg"
            alt="retro player album"
            className="size-12 object-contain rounded-md border"
          />
<div className="flex-1">
<p className="font-semibold">Punk Anthem Music</p>
<p className="text-sm">by Punk</p>
</div>
</div>

        <div className="">
          {/* timeline box */}
          <div>
            <Slider value={[50]} />
            <div className="flex items-center justify-between mt-1.5 select-none">
              <p className="text-xs text-muted-foreground">
                01:10
              </p>
              <p className="text-xs text-muted-foreground">
                02:15
              </p>
            </div>
          </div>
          {/* controls */}
          <div className="flex gap-2 sm:gap-3 items-center justify-between mt-3">
            <Button variant="ghost" className="p-0">
              <Repeat className="size-4" />
            </Button>
            <Button variant="ghost" className="p-0">
              <StepBack className="size-5" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full h-14 w-14"
            >
              <Pause className="size-5" />
            </Button>
            <Button variant="ghost" className="p-0">
              <StepForward className="size-5" />
            </Button>
            <Button variant="ghost" className="p-0">
              <Shuffle className="size-4" />
            </Button>
          </div>
        </div>

        <Sparkle
          size={30}
          strokeWidth={0.5}
          className="absolute sm:block hidden -right-2 top-26 fill-amber-300 rotate-12"
        />
        <Sparkle
          size={20}
          strokeWidth={0.5}
          className="absolute sm:block hidden left-1 bottom-20 fill-slate-500"
        />
      </Card.Content>
    </Card>

);
}

Last Updated: 09 Sep, 2025
Card | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Calendar

Let your users select a date to cancel subscription.

"use client"

import { Calendar } from "@/components/retroui/Calendar"

const start = new Date()

export default function CalendarStyleDefault() {
return (
<div className="max-w-[350px] w-full">
<Calendar
          numberOfMonths={1}
          mode="single"
          defaultMonth={start}
          selected={start}
        />
</div>
)
}

Installation
pnpm dlx shadcn@latest add @retroui/calendar

Examples
Default

"use client"

import { Calendar } from "@/components/retroui/Calendar"

const start = new Date()

export default function CalendarStyleDefault() {
return (
<div className="max-w-[350px] w-full">
<Calendar
          numberOfMonths={1}
          mode="single"
          defaultMonth={start}
          selected={start}
        />
</div>
)
}

Last Updated: 14 Nov, 2025
Calendar | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Carousel

Let your users select a date to cancel subscription.

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleDefault() {
return (
<Carousel className="w-full max-w-xs">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index}>
<div className="p-4">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Installation
pnpm dlx shadcn@latest add @retroui/carousel

Examples
Default

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleDefault() {
return (
<Carousel className="w-full max-w-xs">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index}>
<div className="p-4">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Sizes

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleSizes() {
return (
<Carousel className="w-full max-w-sm">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index} className="md:basis-1/2 lg:basis-1/3">
<div className="p-1">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Vertical

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

const cards = [
{label: "1", color: "purple-300"},
{label: "2", color: "green-300"},
{label: "3", color: "red-300"},
{label: "4", color: "yellow-300"},
{label: "5", color: "blue-300"},
]
export default function CarouselStyleVertical() {
return (
<Carousel opts={{
            align: "start",
        }} className="w-full max-w-xs" orientation="vertical">
<Carousel.Content className="h-[300px]">
{cards.map((card, index) => (
<Carousel.Item key={index} className="md:basis-1/2">
<div className="p-1">
<Card className={`w-full h-[200px] bg-${card.color} rounded-lg`}>
<Card.Content className="flex h-full w-full items-center justify-center p-6">
<span className="text-4xl font-semibold">{card.label}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous className="rounded-full shadow-sm" />
<Carousel.Next className="rounded-full shadow-sm" />
</Carousel>
)
}

Last Updated: 14 Nov, 2025
Carousel | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Carousel

Let your users select a date to cancel subscription.

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleDefault() {
return (
<Carousel className="w-full max-w-xs">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index}>
<div className="p-4">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Installation
pnpm dlx shadcn@latest add @retroui/carousel

Examples
Default

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleDefault() {
return (
<Carousel className="w-full max-w-xs">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index}>
<div className="p-4">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Sizes

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

export default function CarouselStyleSizes() {
return (
<Carousel className="w-full max-w-sm">
<Carousel.Content>
{Array.from({ length: 5 }).map((\_, index) => (
<Carousel.Item key={index} className="md:basis-1/2 lg:basis-1/3">
<div className="p-1">
<Card className="w-full">
<Card.Content className="flex aspect-square items-center justify-center p-6">
<span className="text-4xl font-semibold">{index + 1}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous />
<Carousel.Next />
</Carousel>
)
}

Vertical

import \* as React from "react"

import { Card } from "@/components/retroui/Card"
import {
Carousel,
} from "@/components/retroui/Carousel"

const cards = [
{label: "1", color: "purple-300"},
{label: "2", color: "green-300"},
{label: "3", color: "red-300"},
{label: "4", color: "yellow-300"},
{label: "5", color: "blue-300"},
]
export default function CarouselStyleVertical() {
return (
<Carousel opts={{
            align: "start",
        }} className="w-full max-w-xs" orientation="vertical">
<Carousel.Content className="h-[300px]">
{cards.map((card, index) => (
<Carousel.Item key={index} className="md:basis-1/2">
<div className="p-1">
<Card className={`w-full h-[200px] bg-${card.color} rounded-lg`}>
<Card.Content className="flex h-full w-full items-center justify-center p-6">
<span className="text-4xl font-semibold">{card.label}</span>
</Card.Content>
</Card>
</div>
</Carousel.Item>
))}
</Carousel.Content>
<Carousel.Previous className="rounded-full shadow-sm" />
<Carousel.Next className="rounded-full shadow-sm" />
</Carousel>
)
}

Last Updated: 14 Nov, 2025
Carousel | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Checkbox

Let users confirm or reject an option.
API Reference
Source

import { Checkbox } from "@/components/retroui/Checkbox";
import { Text } from "@/components/retroui/Text";

export default function CheckboxStyleDefault() {
return (
<div className="flex gap-2 items-center">
<Checkbox />
<Text>Accept terms and conditions</Text>
</div>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/checkbox

Examples
Variants

import { Checkbox } from "@/components/retroui/Checkbox";

export default function CheckboxStyleVariants() {
return (
<div className="flex gap-4">
<Checkbox />
<Checkbox variant="outline" />
<Checkbox variant="solid" />
</div>
);
}

Sizes

import { Checkbox } from "@/components/retroui/Checkbox";

export default function CheckboxStyleSizes() {
return (
<div className="flex gap-4">
<Checkbox size="sm" />
<Checkbox />
<Checkbox size="lg" />
</div>
);
}

Last Updated: 13 Feb, 2024
Checkbox | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Command

A command palette component for quick navigation and actions
Source

"use client";

import { Command } from "@/components/retroui/Command";

import {
Settings,
User,
Calendar,
Calculator,
Smile,
CreditCard,
} from "lucide-react";

export default function CommandStyleDefault() {
return (
<div className="space-y-4">
<Command className="border shadow-md md:min-w-[450px] max-w-[500px]">
<Command.Input placeholder="Type a command or search..." />
<Command.List>
<Command.Empty>No results found.</Command.Empty>
<Command.Group heading="Suggestions">
<Command.Item>
<Calendar />
<span>Calendar</span>
</Command.Item>
<Command.Item>
<Smile />
<span>Search Emoji</span>
</Command.Item>
<Command.Item disabled>
<Calculator />
<span>Calculator</span>
</Command.Item>
</Command.Group>
<Command.Separator />
<Command.Group heading="Settings">
<Command.Item>
<User />
<span>Profile</span>
<Command.Shortcut>⌘P</Command.Shortcut>
</Command.Item>
<Command.Item>
<CreditCard />
<span>Billing</span>
<Command.Shortcut>⌘B</Command.Shortcut>
</Command.Item>
<Command.Item>
<Settings />
<span>Settings</span>
<Command.Shortcut>⌘S</Command.Shortcut>
</Command.Item>
</Command.Group>
</Command.List>
</Command>
</div>
);
}

pnpm dlx shadcn@latest add @retroui/command

Examples
Dialog

"use client";

import \* as React from "react";
import { Command } from "@/components/retroui/Command";

import {
Calculator,
Calendar,
CreditCard,
Settings,
Smile,
User,
} from "lucide-react";

export default function Component() {
const [open, setOpen] = React.useState(false);

React.useEffect(() => {
const down = (e: KeyboardEvent) => {
if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
e.preventDefault();
setOpen((open) => !open);
}
};

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);

}, []);

return (
<>
<p className="text-muted-foreground text-sm">
Press{" "}
<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
<span className="text-xs">⌘</span>J
</kbd>
</p>
<Command.Dialog open={open} onOpenChange={setOpen}>
<Command.Input placeholder="Type a command or search..." />
<Command.List>
<Command.Empty>No results found.</Command.Empty>
<Command.Group heading="Suggestions">
<Command.Item>
<Calendar />
<span>Calendar</span>
</Command.Item>
<Command.Item>
<Smile />
<span>Search Emoji</span>
</Command.Item>
<Command.Item>
<Calculator />
<span>Calculator</span>
</Command.Item>
</Command.Group>
<Command.Separator />
<Command.Group heading="Settings">
<Command.Item>
<User />
<span>Profile</span>
<Command.Shortcut>⌘P</Command.Shortcut>
</Command.Item>
<Command.Item>
<CreditCard />
<span>Billing</span>
<Command.Shortcut>⌘B</Command.Shortcut>
</Command.Item>
<Command.Item>
<Settings />
<span>Settings</span>
<Command.Shortcut>⌘S</Command.Shortcut>
</Command.Item>
</Command.Group>
</Command.List>
</Command.Dialog>
</>
);
}

Last Updated: 21 Aug, 2025
Command | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Dialog

An impactful dialog that ensures your important messages and actions get the attention they deserve! 💬✨
API Reference
Source

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";

export default function DialogStyleDefault() {
return (
<Dialog>
<Dialog.Trigger asChild>
<Button>Open Dialog</Button>
</Dialog.Trigger>
<Dialog.Content>
<Dialog.Header>
<Text as="h5">Confirm your action?</Text>
</Dialog.Header>
<section className="flex flex-col gap-4 p-4">
<section className="text-xl">
<p>Are you sure you want to delete this item?</p>
<p>This action cannout be undone.</p>
</section>
<section className="flex w-full justify-end">
<Dialog.Trigger asChild>
<Button>Confirm</Button>
</Dialog.Trigger>
</section>
</section>
</Dialog.Content>
</Dialog>
);
}

Instalation
pnpm dlx shadcn@latest add @retroui/dialog

Example
Confirm dialog message

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";

export default function DialogStyleDefault() {
return (
<Dialog>
<Dialog.Trigger asChild>
<Button>Open Dialog</Button>
</Dialog.Trigger>
<Dialog.Content>
<Dialog.Header>
<Text as="h5">Confirm your action?</Text>
</Dialog.Header>
<section className="flex flex-col gap-4 p-4">
<section className="text-xl">
<p>Are you sure you want to delete this item?</p>
<p>This action cannout be undone.</p>
</section>
<section className="flex w-full justify-end">
<Dialog.Trigger asChild>
<Button>Confirm</Button>
</Dialog.Trigger>
</section>
</section>
</Dialog.Content>
</Dialog>
);
}

With footer

import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Dialog } from "@/components/retroui/Dialog";

export default function DialogStyleWithFooter() {
return (
<Dialog>
<Dialog.Trigger asChild>
<Button>Open Dialog</Button>
</Dialog.Trigger>
<Dialog.Content>
<Dialog.Header position={"fixed"} asChild>
<Text as="h5">Confirm your action?</Text>
</Dialog.Header>
<section className="flex flex-col gap-4 p-4">
<section className="text-xl">
<p>Are you sure you want to delete this item?</p>
<p>This action cannout be undone.</p>
</section>
</section>
<Dialog.Footer>
<Dialog.Trigger asChild>
<Button>Confirm</Button>
</Dialog.Trigger>
<Dialog.Trigger asChild>
<Button variant={"outline"}>Close</Button>
</Dialog.Trigger>
</Dialog.Footer>
</Dialog.Content>
</Dialog>
);
}

Size variants

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useState } from "react";

type Variants =
| "auto"
| "sm"
| "md"
| "lg"
| "xl"
| "2xl"
| "3xl"
| "4xl"
| "screen";

export default function DialogStyleWidthVariant() {
const [variant, setVariant] = useState<Variants>("auto");

const sizes: Variants[] = [
"auto",
"sm",
"md",
"lg",
"xl",
"2xl",
"3xl",
"4xl",
"screen",
];

return (
<Dialog>
<Dialog.Trigger asChild>
<Button>Open Dialog</Button>
</Dialog.Trigger>
<Dialog.Content size={variant}>
<Dialog.Header>
<Text as="h5">Dialog with variants</Text>
</Dialog.Header>
<section className="flex flex-col gap-4 p-4">
<section className="text-xl">
<p>Choose your width size</p>
<section className="flex flex-wrap gap-4">
{sizes.map((singleVariant) => (
<Button
key={"variant-list-" + singleVariant}
type="button"
variant={singleVariant == variant ? "default" : "outline"}
onClick={() => setVariant(singleVariant)} >
{singleVariant}
</Button>
))}
</section>
</section>
</section>
</Dialog.Content>
</Dialog>
);
}

With form

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";

export default function DialogStyleWithForm() {
return (
<Dialog>
<Dialog.Trigger asChild>
<Button>Open Form</Button>
</Dialog.Trigger>
<Dialog.Content size={"md"}>
<Dialog.Header position={"fixed"}>
<Text as="h5">Contact Us</Text>
</Dialog.Header>
<form className="flex flex-col gap-4">
<div className="flex flex-col p-4 gap-4">
<div className="flex-col gap-2">
<label htmlFor="name">
Your name <span className="text-red-500">_</span>
</label>
<Input placeholder="Type your name" required />
</div>
<div className="flex-col gap-2">
<label htmlFor="name">
Your e-email <span className="text-red-500">_</span>
</label>
<Input placeholder="Type your name" required />
</div>
</div>
<Dialog.Footer>
<Dialog.Trigger asChild>
<Button type="submit">Submit</Button>
</Dialog.Trigger>
</Dialog.Footer>
</form>
</Dialog.Content>
</Dialog>
);
}

Last Updated: 09 Sep, 2025
Dialog | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Drawer

A component that can slide in from any side of the screen.
Source

import \* as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"

export default function DrawerStyleDefault() {
return (
<Drawer>
<Drawer.Trigger asChild>
<Button>Submit</Button>
</Drawer.Trigger>
<Drawer.Content>
<Drawer.Header>
<Drawer.Title>Are you absolutely sure?</Drawer.Title>
<Drawer.Description>This action cannot be undone.</Drawer.Description>
</Drawer.Header>
<Drawer.Footer>
<div className="flex justify-center gap-3">
<Button>Submit</Button>
<Drawer.Close>
<Button variant="outline">Cancel</Button>
</Drawer.Close>
</div>

                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    )

}

pnpm dlx shadcn@latest add @retroui/drawer

Examples
Default

import \* as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"

export default function DrawerStyleDefault() {
return (
<Drawer>
<Drawer.Trigger asChild>
<Button>Submit</Button>
</Drawer.Trigger>
<Drawer.Content>
<Drawer.Header>
<Drawer.Title>Are you absolutely sure?</Drawer.Title>
<Drawer.Description>This action cannot be undone.</Drawer.Description>
</Drawer.Header>
<Drawer.Footer>
<div className="flex justify-center gap-3">
<Button>Submit</Button>
<Drawer.Close>
<Button variant="outline">Cancel</Button>
</Drawer.Close>
</div>

                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    )

}

Different Direction

import \* as React from "react"
import { Drawer } from "@/components/retroui/Drawer"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Label } from "@/components/retroui/Label"
import { Textarea } from "@/components/retroui/Textarea"

export default function DrawerStyleRightDirection() {
return (
<Drawer direction="right">
<Drawer.Trigger asChild>
<Button>Review Us</Button>
</Drawer.Trigger>
<Drawer.Content>
<Drawer.Header>
<Drawer.Title>Edit Profile</Drawer.Title>
<Drawer.Description>Make changes to your profile here. Click save when you're done.</Drawer.Description>
</Drawer.Header>

                <form className="flex flex-col space-y-4 p-4">
                    <div className="flex flex-col space-y-2">
                        <Label>Email</Label>
                        <Input placeholder="Enter your email" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label>Comment</Label>
                        <Textarea rows={4} placeholder="Enter your comment" />
                    </div>
                </form>
                <Drawer.Footer>
                    <div className="flex justify-start gap-3">
                        <Button>Submit</Button>
                        <Drawer.Close>
                            <Button variant="outline">Cancel</Button>
                        </Drawer.Close>
                    </div>
                </Drawer.Footer>
            </Drawer.Content>
        </Drawer>
    )

}

Last Updated: 21 Aug, 2025
Drawer | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Input

This pretty input makes your users want to type stuff! ⌨️
Source

import { Input } from "@/components/retroui/Input";

export default function InputStyleDefault() {
return <Input type="text" placeholder="type something..." />;
}

Installation
pnpm dlx shadcn@latest add @retroui/input

Examples
Default

import { Input } from "@/components/retroui/Input";

export default function InputStyleDefault() {
return <Input type="text" placeholder="type something..." />;
}

With label

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

export default function InputStyleWithLabel() {
return (
<div className="grid w-full max-w-sm items-center gap-1.5">
<Label htmlFor="pokemon">Favorite Pokemon</Label>
<Input type="pokemon" id="pokemon" placeholder="Charmander" />
</div>
);
}

Error

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";

export default function InputStyleError() {
return (
<div className="grid w-full max-w-sm items-center gap-1.5">
<Label htmlFor="pokemon">Favorite Pokemon</Label>
<Input
        type="pokemon"
        id="pokemon"
        placeholder="Charmander"
        defaultValue="Son Goku"
        aria-invalid
      />
<p className="text-sm text-red-500">Please provide a valid pokemon!</p>
</div>
);
}

Last Updated: 09 Sep, 2025
Input | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Label

A universal component for labeling various inputs.
Source

import { Input, Label } from "@/components/retroui";

export default function LabelStyleDefault() {
return (
<div className="grid w-full max-w-sm items-center gap-1.5">
<Label htmlFor="pokemon">Favorite Pokemon</Label>
<Input type="pokemon" id="pokemon" placeholder="Charmander" />
</div>
);
}

pnpm dlx shadcn@latest add @retroui/label

Usage

import { Label } from "@/components/retroui/Label";

Last Updated: 09 Sep, 2025
Label | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Loader

A customizable loading indicator with bouncing squares. 🔄
Source

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return <Loader />;
}

pnpm dlx shadcn@latest add @retroui/loader

Examples
Default

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return <Loader />;
}

Secondary

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return <Loader variant="secondary" />;
}

Outline

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return <Loader variant="outline" />;
}

Sizes

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return (
<div className="flex items-end gap-4">
<Loader size="sm" />
<Loader size="md" />
<Loader size="lg" />
</div>
);
}

Custom Configurations

import { Loader } from "@/components/retroui/Loader";

export default function LoaderPreview() {
return (
<div className="flex flex-col gap-4">
<div className="flex items-center gap-4">
<Loader count={4} />
<Loader count={5} delayStep={80} />
</div>
<div className="flex items-center gap-4">
<Loader duration={1.5} />
<Loader variant="secondary" count={4} duration={1.2} delayStep={120} />
</div>
</div>
);
}

Usage

import { Loader } from "@/components/ui/loader"

// Default
<Loader />

// With variants
<Loader variant="secondary" size="lg" />

// Custom configuration
<Loader
count={4} // Number of squares
duration={1.2} // Animation duration in seconds
delayStep={120} // Delay between squares in milliseconds
/>

// Fully customized
<Loader
  variant="secondary"
  size="lg"
  count={4}
  duration={1.2}
  delayStep={120}
  className="my-4"
/>

Props

        variant
        Type: default | secondary | outline
        Default: default
        Description: Defines the style variant for the component

        size
        Type: sm | md | lg
        Default: md
        Description: Controls the size of the loader squares

        count
        Type: number
        Default: 3
        Description: Sets the number of bouncing squares

        duration
        Type: number
        Default: 0.5
        Description: Controls the animation duration in seconds

        delayStep
        Type: number
        Default: 100
        Description: Defines the delay between squares in milliseconds

        className
        Type: string
        Default: undefined
        Description: Allows for adding additional CSS classes for custom styling
        asChild
        Type: boolean
        Default: false
        Description: When true, merges the component's props onto its immediate child element

Accessibility

The Loader component includes the following attributes:

    role="status"
    aria-label="Loading..."

This ensures screen readers can properly announce the loading state to users.

Last Updated: 20 Aug, 2025
Loader | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Menu

Show your users a list of actions they can take. 📋
API Reference
Source

import { Button } from "@/components/retroui/Button";
import { Menu } from "@/components/retroui/Menu";

export default function MenuDefault() {
return (
<Menu>
<Menu.Trigger asChild>
<Button>Menu</Button>
</Menu.Trigger>
<Menu.Content className="min-w-36">
<Menu.Item>Menu Item 1</Menu.Item>
<Menu.Item>Menu Item 2</Menu.Item>
<Menu.Item>Menu Item 3</Menu.Item>
</Menu.Content>
</Menu>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/menu

Examples
Default

import { Button } from "@/components/retroui/Button";
import { Menu } from "@/components/retroui/Menu";

export default function MenuDefault() {
return (
<Menu>
<Menu.Trigger asChild>
<Button>Menu</Button>
</Menu.Trigger>
<Menu.Content className="min-w-36">
<Menu.Item>Menu Item 1</Menu.Item>
<Menu.Item>Menu Item 2</Menu.Item>
<Menu.Item>Menu Item 3</Menu.Item>
</Menu.Content>
</Menu>
);
}

Last Updated: 09 Sep, 2025
Menu | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Context Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a button.
Source

"use client";

import { ContextMenu } from "@/components/retroui/ContextMenu";

export default function ContextMenuStyleDefault() {
return (
<div className="flex items-center justify-center min-h-[200px] p-8">
<ContextMenu>
<ContextMenu.Trigger
className="flex h-[150px] w-[300px] items-center justify-center
border-2 border-dashed border-border text-sm bg-background
transition-all" >
Right click here
</ContextMenu.Trigger>
<ContextMenu.Content>
<ContextMenu.Item>Copy</ContextMenu.Item>
<ContextMenu.Item>Cut</ContextMenu.Item>
<ContextMenu.Item>Paste</ContextMenu.Item>
<ContextMenu.Separator />
<ContextMenu.Item>Share</ContextMenu.Item>
<ContextMenu.Sub>
<ContextMenu.SubTrigger>More options</ContextMenu.SubTrigger>
<ContextMenu.SubContent>
<ContextMenu.Item>Archive</ContextMenu.Item>
<ContextMenu.Item>Delete</ContextMenu.Item>
</ContextMenu.SubContent>
</ContextMenu.Sub>
<ContextMenu.Separator />
<ContextMenu.CheckboxItem checked>
Show hidden files
</ContextMenu.CheckboxItem>
<ContextMenu.RadioGroup value="one">
<ContextMenu.Label>View mode</ContextMenu.Label>
<ContextMenu.RadioItem value="one">List</ContextMenu.RadioItem>
<ContextMenu.RadioItem value="two">Grid</ContextMenu.RadioItem>
</ContextMenu.RadioGroup>
</ContextMenu.Content>
</ContextMenu>
</div>
);
}

pnpm dlx shadcn@latest add @retroui/context-menu

Last Updated: 09 Sep, 2025
Context Menu | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Popover

A handy small component for your little input needs...😉
Source

"use client";

import { Popover, Label, Button, Input } from "@/components/retroui";

export default function PopoverStyleDefault() {
return (
<Popover>
<Popover.Trigger asChild>
<Button>Open Popover</Button>
</Popover.Trigger>
<Popover.Content className="w-80 font-sans">
<div className="grid gap-4">
<div className="space-y-2">
<h4 className="font-medium leading-none">Dimensions</h4>
<p className="text-sm text-muted-foreground">
Set the dimensions for the layer.
</p>
</div>

          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>

              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>

              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>

);
}

pnpm dlx shadcn@latest add @retroui/popover

Usage

import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/retroui/Popover";

<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>

Examples
Default

"use client";

import { Popover, Label, Button, Input } from "@/components/retroui";

export default function PopoverStyleDefault() {
return (
<Popover>
<Popover.Trigger asChild>
<Button>Open Popover</Button>
</Popover.Trigger>
<Popover.Content className="w-80 font-sans">
<div className="grid gap-4">
<div className="space-y-2">
<h4 className="font-medium leading-none">Dimensions</h4>
<p className="text-sm text-muted-foreground">
Set the dimensions for the layer.
</p>
</div>

          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>

              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>

              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>

);
}

Shadowed

"use client";

import { Popover, Label, Button, Input } from "@/components/retroui";

export default function PopoverStyleDefaultShadow() {
return (
<Popover>
<Popover.Trigger asChild>
<Button>Open Popover</Button>
</Popover.Trigger>
<Popover.Content className="w-80 shadow-md">
<div className="grid gap-4">
<div className="space-y-2">
<h4 className="font-medium leading-none">Dimensions</h4>
<p className="text-sm text-muted-foreground">
Set the dimensions for the layer.
</p>
</div>

          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>

              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>

              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>

);
}

Last Updated: 09 Sep, 2025
Popover | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Progress

Let's you users know how long to wait.
API Reference
Source

"use client";

import \* as React from "react";

import { Progress } from "@/components/retroui/Progress";

export default function ProgressDemo() {
const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
const timer = setTimeout(() => setProgress(66), 500);
return () => clearTimeout(timer);
}, []);

return <Progress value={progress} className="w-[60%]" />;
}

Installation
pnpm dlx shadcn@latest add @retroui/progress

Examples
Default

"use client";

import \* as React from "react";

import { Progress } from "@/components/retroui/Progress";

export default function ProgressDemo() {
const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
const timer = setTimeout(() => setProgress(66), 500);
return () => clearTimeout(timer);
}, []);

return <Progress value={progress} className="w-[60%]" />;
}

Last Updated: 09 Sep, 2025
Progress | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Radio

Sometimes you need to pick multiple options! That's where the Radio component comes into play.
API Reference
Source

import { RadioGroup } from "@/components/retroui/Radio";

export default function RadioStyleSizes() {
return (
<RadioGroup>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="1" />
<label htmlFor="1"> Option 1</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="2" />
<label htmlFor="2"> Option 2</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="3" />
<label htmlFor="3"> Option 3</label>
</div>
</RadioGroup>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/radio

Examples
Variants

import { RadioGroup } from "@/components/retroui/Radio";

export default function RadioStyleVariants() {
return (
<div className="flex gap-4">
<RadioGroup>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="default" variant="default" />
<label htmlFor="default">Default Style</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="outline" variant="outline" />
<label htmlFor="outline">Outline Style</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="solid" variant="solid" />
<label htmlFor="solid">Solid Style</label>
</div>
</RadioGroup>
</div>
);
}

Sizes

import { RadioGroup } from "@/components/retroui/Radio";

export default function RadioStyleSizes() {
return (
<div className="flex gap-4">
<RadioGroup>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="sm" size="sm" />
<label htmlFor="sm" className="text-sm">
Small
</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="md" size="md" />
<label htmlFor="md">Medium</label>
</div>
<div className="flex items-center space-x-2">
<RadioGroup.Item value="lg" size="lg" />
<label htmlFor="lg" className="text-lg">
Large Size
</label>
</div>
</RadioGroup>
</div>
);
}

Last Updated: 09 Sep, 2025
Radio | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Select

Let your users pick what they want.
API Reference
Source

import { Select } from "@/components/retroui/Select";
import React from "react";

export default function SelectStyleDefault() {
return (
<Select>
<Select.Trigger className="w-60">
<Select.Value placeholder="Pick your Pokemon" />
</Select.Trigger>
<Select.Content>
<Select.Group>
<Select.Item value="pikachu">Pikachu</Select.Item>
<Select.Item value="charizard">Charizard</Select.Item>
<Select.Item value="bulbasaur">Bulbasaur</Select.Item>
<Select.Item value="squirtle">Squirtle</Select.Item>
</Select.Group>
</Select.Content>
</Select>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/select

Examples
Default

import { Select } from "@/components/retroui/Select";
import React from "react";

export default function SelectStyleDefault() {
return (
<Select>
<Select.Trigger className="w-60">
<Select.Value placeholder="Pick your Pokemon" />
</Select.Trigger>
<Select.Content>
<Select.Group>
<Select.Item value="pikachu">Pikachu</Select.Item>
<Select.Item value="charizard">Charizard</Select.Item>
<Select.Item value="bulbasaur">Bulbasaur</Select.Item>
<Select.Item value="squirtle">Squirtle</Select.Item>
</Select.Group>
</Select.Content>
</Select>
);
}

Last Updated: 09 Sep, 2025
Select | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Slider

A customizable slider component with two variants.
API Reference
Source

import { Slider } from "@/components/retroui/Slider";

export default function SliderDefault() {
return (
<div className="w-[400px]">
<Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        aria-label="Slider Control"
      />
</div>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/slider

Examples
Default

import { Slider } from "@/components/retroui/Slider";

export default function SliderDefault() {
return (
<div className="w-[400px]">
<Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
        aria-label="Slider Control"
      />
</div>
);
}

Last Updated: 09 Sep, 2025
Slider | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Sonner

A beautiful toast component that can grab audience attention from any place.
API Reference
Source

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleDefault() {
const onClick = () => {
toast("Event has been created", {
description: "Sunday, December 03, 2025",
cancel: {
label: "Undo",
onClick: () => {},
},
});
};

return <Button onClick={onClick}>Show Toast</Button>;
}

About

Sonner is built and maintained by Emil Kowalski

Installation
pnpm dlx shadcn@latest add @retroui/sonner

Examples
Default

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleDefault() {
const onClick = () => {
toast("Event has been created", {
description: "Sunday, December 03, 2025",
cancel: {
label: "Undo",
onClick: () => {},
},
});
};

return <Button onClick={onClick}>Show Toast</Button>;
}

Status

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleStatus() {
const onClick = () => {
toast.success("Congrats man 🎉 (Plain)");
};

return <Button onClick={onClick}>Congratulate Me</Button>;
}

Colored Status

import { Button } from "@/components/retroui";
import { toast } from "sonner";

export default function SonnerStyleRichColors() {
const onClick = () => {
toast.success("Congrats man (Colored) 🎉", {
richColors: true,
});
};

return <Button onClick={onClick}>Congratulate Me</Button>;
}

Last Updated: 09 Sep, 2025
Sonner | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Switch

Let users to turn on or off your marketing emails or notifications.
API Reference
Source

import { Switch } from "@/components/retroui/Switch";
import React from "react";

export default function SwitchStyleDefault() {
return (
<div className="flex items-center space-x-2">
<Switch id="notification" />
<label htmlFor="notification">Email Notifications</label>
</div>
);
}

Installation
pnpm dlx shadcn@latest add @retroui/switch

Examples
Default

import { Switch } from "@/components/retroui/Switch";
import React from "react";

export default function SwitchStyleDefault() {
return (
<div className="flex items-center space-x-2">
<Switch id="notification" />
<label htmlFor="notification">Email Notifications</label>
</div>
);
}

Disabled

import { Switch } from "@/components/retroui/Switch";
import React from "react";

export default function SwitchStyleDisabled() {
return (
<div className="flex items-center space-x-2">
<Switch id="notification" disabled />
</div>
);
}

Last Updated: 09 Sep, 2025
Switch | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Tabs

Switch between different views using tabs.
Source
Default

import { Tabs, TabsPanels, TabsTrigger, TabsContent, TabsTriggerList } from "@/components/retroui/Tab";

export default function TabStyleDefault() {
return (
<Tabs className="w-full">
<TabsTriggerList>
<TabsTrigger>Home</TabsTrigger>
<TabsTrigger>About</TabsTrigger>
<TabsTrigger>Contact</TabsTrigger>
</TabsTriggerList>
<TabsPanels>
<TabsContent>
Welcome to RetroUI, a retro styled UI library built with React,
Tailwind CSS & Headless UI.
</TabsContent>
<TabsContent>This is the about section!</TabsContent>
<TabsContent>And, this is the contact section!</TabsContent>
</TabsPanels>
</Tabs>
);
}

Last Updated: 08 Oct, 2024
Tabs | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Table

Display your data in a structured tabular format.
Source

import { Badge } from "@/components/retroui"
import {
Table,
} from "@/components/retroui/Table"

const invoices = [
{
invoice: "INV001",
customer: "John Doe",
paymentStatus: "Paid",
totalAmount: "$250.00",
paymentMethod: "Credit Card",
},
{
invoice: "INV002",
customer: "Jane Doe",
paymentStatus: "Pending",
totalAmount: "$150.00",
paymentMethod: "PayPal",
},
{
invoice: "INV003",
customer: "Mark Doe",
paymentStatus: "Unpaid",
totalAmount: "$350.00",
paymentMethod: "Bank Transfer",
},
{
invoice: "INV004",
customer: "Robert Doe",
paymentStatus: "Paid",
totalAmount: "$450.00",
paymentMethod: "Credit Card",
},
{
invoice: "INV005",
customer: "Isabella Doe",
paymentStatus: "Paid",
totalAmount: "$550.00",
paymentMethod: "PayPal",
},
{
invoice: "INV006",
customer: "Mrs. Doe",
paymentStatus: "Pending",
totalAmount: "$200.00",
paymentMethod: "Bank Transfer",
},
{
invoice: "INV007",
customer: "Mr. Doe",
paymentStatus: "Unpaid",
totalAmount: "$300.00",
paymentMethod: "Credit Card",
},
]

export default function TableStyleDefault() {
return (
<Table className="max-w-lg mb-6 mx-auto">
<Table.Header>
<Table.Row>
<Table.Head className="w-[100px]">Invoice</Table.Head>
<Table.Head>Customer</Table.Head>
<Table.Head>Status</Table.Head>
<Table.Head>Method</Table.Head>
<Table.Head className="text-right">Amount</Table.Head>
</Table.Row>
</Table.Header>
<Table.Body>
{invoices.map((invoice) => (
<Table.Row key={invoice.invoice}>
<Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
<Table.Cell>{invoice.customer}</Table.Cell>
<Table.Cell><Badge variant="solid" size="sm">{invoice.paymentStatus}</Badge></Table.Cell>
<Table.Cell>{invoice.paymentMethod}</Table.Cell>
<Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
</Table.Row>
))}
</Table.Body>
<Table.Footer>
<Table.Row>
<Table.Cell colSpan={4}>Total</Table.Cell>
<Table.Cell className="text-right">$2,500.00</Table.Cell>
</Table.Row>
</Table.Footer>
</Table>
)
}

pnpm dlx shadcn@latest add @retroui/table

Examples
Default

import { Badge } from "@/components/retroui"
import {
Table,
} from "@/components/retroui/Table"

const invoices = [
{
invoice: "INV001",
customer: "John Doe",
paymentStatus: "Paid",
totalAmount: "$250.00",
paymentMethod: "Credit Card",
},
{
invoice: "INV002",
customer: "Jane Doe",
paymentStatus: "Pending",
totalAmount: "$150.00",
paymentMethod: "PayPal",
},
{
invoice: "INV003",
customer: "Mark Doe",
paymentStatus: "Unpaid",
totalAmount: "$350.00",
paymentMethod: "Bank Transfer",
},
{
invoice: "INV004",
customer: "Robert Doe",
paymentStatus: "Paid",
totalAmount: "$450.00",
paymentMethod: "Credit Card",
},
{
invoice: "INV005",
customer: "Isabella Doe",
paymentStatus: "Paid",
totalAmount: "$550.00",
paymentMethod: "PayPal",
},
{
invoice: "INV006",
customer: "Mrs. Doe",
paymentStatus: "Pending",
totalAmount: "$200.00",
paymentMethod: "Bank Transfer",
},
{
invoice: "INV007",
customer: "Mr. Doe",
paymentStatus: "Unpaid",
totalAmount: "$300.00",
paymentMethod: "Credit Card",
},
]

export default function TableStyleDefault() {
return (
<Table className="max-w-lg mb-6 mx-auto">
<Table.Header>
<Table.Row>
<Table.Head className="w-[100px]">Invoice</Table.Head>
<Table.Head>Customer</Table.Head>
<Table.Head>Status</Table.Head>
<Table.Head>Method</Table.Head>
<Table.Head className="text-right">Amount</Table.Head>
</Table.Row>
</Table.Header>
<Table.Body>
{invoices.map((invoice) => (
<Table.Row key={invoice.invoice}>
<Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
<Table.Cell>{invoice.customer}</Table.Cell>
<Table.Cell><Badge variant="solid" size="sm">{invoice.paymentStatus}</Badge></Table.Cell>
<Table.Cell>{invoice.paymentMethod}</Table.Cell>
<Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
</Table.Row>
))}
</Table.Body>
<Table.Footer>
<Table.Row>
<Table.Cell colSpan={4}>Total</Table.Cell>
<Table.Cell className="text-right">$2,500.00</Table.Cell>
</Table.Row>
</Table.Footer>
</Table>
)
}

With Checkbox Selection

import { Badge, Checkbox } from "@/components/retroui"
import {
Table,
} from "@/components/retroui/Table"
import { useState } from "react"

const employees = [
{
id: "1",
name: "Alice Johnson",
department: "Engineering",
status: "Active",
salary: "85,000",
},
{
id: "2",
name: "Bob Smith",
department: "Product",
status: "Active",
salary: "95,000",
},
{
id: "3",
name: "Carol Williams",
department: "Design",
status: "On Leave",
salary: "70,000",
},
{
id: "4",
name: "David Brown",
department: "Engineering",
status: "Active",
salary: "90,000",
},
{
id: "5",
name: "Eve Davis",
department: "Engineering",
status: "Active",
salary: "75,000",
},
{
id: "6",
name: "Frank Wilson",
department: "Marketing",
status: "Inactive",
salary: "80,000",
},
]

export default function TableWithCheckbox() {
const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set())

const handleSelectAll = (checked: boolean) => {
if (checked) {
setSelectedEmployees(new Set(employees.map(emp => emp.id)))
} else {
setSelectedEmployees(new Set())
}
}

const handleSelectEmployee = (employeeId: string, checked: boolean) => {
const newSelected = new Set(selectedEmployees)
if (checked) {
newSelected.add(employeeId)
} else {
newSelected.delete(employeeId)
}
setSelectedEmployees(newSelected)
}

const isAllSelected = selectedEmployees.size === employees.length

return (
<Table className="max-w-lg mb-6 mx-auto">
<Table.Header>
<Table.Row>
<Table.Head className="w-[50px]">
<Checkbox
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
</Table.Head>
<Table.Head>Name</Table.Head>
<Table.Head>Department</Table.Head>
<Table.Head>Status</Table.Head>
<Table.Head className="text-right">Salary</Table.Head>
</Table.Row>
</Table.Header>
<Table.Body>
{employees.map((employee) => (
<Table.Row key={employee.id}>
<Table.Cell>
<Checkbox
checked={selectedEmployees.has(employee.id)}
onCheckedChange={(checked) => handleSelectEmployee(employee.id, Boolean(checked))}
/>
</Table.Cell>
<Table.Cell className="font-medium">{employee.name}</Table.Cell>
<Table.Cell>{employee.department}</Table.Cell>
<Table.Cell>
<Badge
variant={employee.status === 'Active' ? 'default' : employee.status === 'On Leave' ? 'outline' : 'solid'}
size="sm" >
{employee.status}
</Badge>
</Table.Cell>
<Table.Cell className="text-right">$ {employee.salary}</Table.Cell>
</Table.Row>
))}
</Table.Body>
<Table.Footer>
<Table.Row>
<Table.Cell colSpan={4}>Selected: {selectedEmployees.size} / {employees.length}</Table.Cell>
<Table.Cell className="text-right font-semibold">$ {employees.reduce((total, employee) => total + Number(employee.salary.replace(',', '')), 0)}</Table.Cell>
</Table.Row>
</Table.Footer>
</Table>
)
}

With Sticky Header

import { Badge } from "@/components/retroui";
import { Table } from "@/components/retroui/Table";

const transactions = [
{
id: "TXN001",
date: "2024-01-15",
description: "Payment from Customer A",
amount: "$1,250.00",
category: "Revenue",
},
{
id: "TXN002",
date: "2024-01-15",
description: "Office Supplies Purchase",
amount: "-$85.50",
category: "Expense",
},
{
id: "TXN003",
date: "2024-01-16",
description: "Software License Renewal",
category: "Expense",
amount: "-$299.99",
},
{
id: "TXN004",
date: "2024-01-16",
description: "Payment from Customer B",
category: "Revenue",
amount: "$750.00",
},
{
id: "TXN005",
date: "2024-01-17",
description: "Marketing Campaign",
category: "Expense",
amount: "-$500.00",
},
{
id: "TXN006",
date: "2024-01-17",
description: "Freelancer Payment",
category: "Expense",
amount: "-$400.00",
},
{
id: "TXN007",
date: "2024-01-18",
description: "Payment from Customer C",
category: "Revenue",
amount: "$2,100.00",
},
{
id: "TXN008",
date: "2024-01-18",
description: "Equipment Purchase",
category: "Expense",
amount: "-$1,200.00",
},
{
id: "TXN009",
date: "2024-01-19",
description: "Subscription Fee",
category: "Expense",
amount: "-$49.99",
status: "Pending",
},
{
id: "TXN010",
date: "2024-01-19",
description: "Payment from Customer D",
category: "Revenue",
amount: "$890.00",
},
{
id: "TXN011",
date: "2024-01-20",
description: "Travel Expenses",
category: "Expense",
amount: "-$350.00",
},
{
id: "TXN012",
date: "2024-01-20",
description: "Payment from Customer E",
category: "Revenue",
amount: "$1,500.00",
},
];

export default function TableWithStickyHeader() {
return (
<div className="h-96 border-2">
<Table className="border-0 shadow-none">
<Table.Header className="sticky top-0">
<Table.Row className="bg-secondary hover:bg-secondary">
<Table.Head className="w-[100px] text-secondary-foreground">
ID
</Table.Head>
<Table.Head className="text-secondary-foreground">Date</Table.Head>
<Table.Head className="text-secondary-foreground">
Description
</Table.Head>
<Table.Head className="text-secondary-foreground">
Category
</Table.Head>
<Table.Head className="text-right text-secondary-foreground">
Amount
</Table.Head>
</Table.Row>
</Table.Header>
<Table.Body>
{transactions.map((transaction) => (
<Table.Row key={transaction.id}>
<Table.Cell className="font-medium">{transaction.id}</Table.Cell>
<Table.Cell>{transaction.date}</Table.Cell>
<Table.Cell>{transaction.description}</Table.Cell>
<Table.Cell>
<Badge
variant={
transaction.category === "Revenue" ? "default" : "outline"
}
size="sm" >
{transaction.category}
</Badge>
</Table.Cell>
<Table.Cell
className={`text-right font-medium ${transaction.amount.startsWith("-") ? "text-destructive" : "text-foreground"}`} >
{transaction.amount}
</Table.Cell>
</Table.Row>
))}
</Table.Body>
</Table>
</div>
);
}

API Reference

The Table component is composed of several sub-components:

    Table - The main table wrapper
    Table.Header - Table header section (<thead>)
    Table.Body - Table body section (<tbody>)
    Table.Footer - Table footer section (<tfoot>)
    Table.Row - Table row (<tr>)
    Table.Head - Table header cell (<th>)
    Table.Cell - Table data cell (<td>)

Last Updated: 14 Nov, 2025
Table | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Table of Contents

Generate a table of contents for your markdown content.
Source

import { TableOfContents } from "@/components/retroui/TableOfContents";

export default function TocStyleDefault() {
return <TableOfContents />
}

Installation
pnpm dlx shadcn@latest add @retroui/toc

Examples
Default

import { TableOfContents } from "@/components/retroui/TableOfContents";

export default function TocStyleDefault() {
return <TableOfContents />
}

Adjust depth

import { TableOfContents } from "@/components/retroui/TableOfContents";
import { Text } from "@/components/retroui/Text";

export default function TocStyleDepth() {
return <TableOfContents depth={3} className="w-80 h-96">
<Text className="mb-3 border-b pb-2">On this page</Text>
</TableOfContents>
}

Manual data

import { TableOfContents } from "@/components/retroui/TableOfContents";
import { Text } from "@/components/retroui/Text";

export default function TocStyleManual() {
const manualData = [
{ id: 'introduction', title: 'Introduction', depth: 1 },
{ id: 'getting-started', title: 'Getting Started', depth: 2 },
{ id: 'installation', title: 'Installation', depth: 3 },
{ id: 'configuration', title: 'Configuration', depth: 3 },
{ id: 'advanced-usage', title: 'Advanced Usage', depth: 1 },
{ id: 'api-reference', title: 'API Reference', depth: 2 },
{ id: 'examples', title: 'Examples', depth: 2 },
{ id: 'troubleshooting', title: 'Troubleshooting', depth: 1 },
];

    return <TableOfContents
        data={manualData}
        className="w-80 h-96"
    >
        <Text className="mb-3 border-b pb-2">Manual TOC</Text>
    </TableOfContents>

}

Last Updated: 08 Oct, 2024
Table of Contents | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Textarea

This pretty input makes your users want to type lots of stuff! ⌨️ ⌨️
Source
Default

import { Textarea } from "@/components/retroui/Textarea";

export default function TextareaStyleDefault() {
return (
<Textarea
      rows={4}
      placeholder="type something..."
      className="px-4 py-2 w-full border-2 shadow-md transition focus:outline-hidden focus:shadow-xs"
    />
);
}

Last Updated: 08 Oct, 2024
Textarea | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Text

Show your texts in different styles. 💅
Source
Headings

The Text component is a versatile React component that provides various heading styles. It leverages class-variance-authority for managing variants and allows for the customization of heading elements.

import { Text } from "@/components/retroui/Text";

export default function TextHeadings() {
return (
<div className="space-y-4">
<Text as="h1">This is H1</Text>
<Text as="h2">This is H2</Text>
<Text as="h3">This is H3</Text>
<Text as="h4">This is H4</Text>
<Text as="h5">This is H5</Text>
<Text as="h6">This is H6</Text>
</div>
);
}

Props

className: Additional CSS classes to customize the component's styling.

as: Determines the heading and text style. Default is p. Variants include:

    "h1", "h2", "h3", "h4", "h5", "h6", "p"

Installation
pnpm dlx shadcn@latest add @retroui/text

Paragraph

import { Text } from "@/components/retroui/Text";

export default function TextParagraph() {
return (
<Text className="font-sans text-base">
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat eos,
doloremque inventore nesciunt quo sequi veniam impedit alias libero
dolorem tempore quia esse fugit fuga iste aliquam expedita molestias
iusto?
</Text>
);
}

Last Updated: 09 Sep, 2025
Text | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Toggle

This crazy toggling button keeps people toggling...😃
Source

import { Toggle } from "@/components/retroui";
import { Bold } from "lucide-react";

export default function ToggleStyleDefault() {
return (
<Toggle>
<Bold />
</Toggle>
);
}

pnpm dlx shadcn@latest add @retroui/toggle

Examples
Default

import { Toggle } from "@/components/retroui";
import { Bold } from "lucide-react";

export default function ToggleStyleDefault() {
return (
<Toggle>
<Bold />
</Toggle>
);
}

Outlined

import { Toggle } from "@/components/retroui";
import { Bold } from "lucide-react";

export default function ToggleStyleOutlined() {
return (
<Toggle variant="outlined">
<Bold />
</Toggle>
);
}

Solid

import { Toggle } from "@/components/retroui";
import { Italic } from "lucide-react";

export default function ToggleStyleSolid() {
return (
<Toggle variant="solid">
<Italic /> Italics
</Toggle>
);
}

Outline Muted

import { Toggle } from "@/components/retroui";
import { Bold } from "lucide-react";

export default function ToggleStyleOutlineMuted() {
return (
<Toggle variant="outline-muted">
<Bold />
</Toggle>
);
}

Last Updated: 09 Sep, 2025
Toggle | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Toggle Group

Group of toggling buttons...🤙
Source

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleDefault() {
return (
<ToggleGroup type="multiple" variant="default">
<ToggleGroupItem value="bold">
<Bold className="h-4 w-4" />
</ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>

);
}

pnpm dlx shadcn@latest add @retroui/toggle-group

Usage

import {
ToggleGroup,
ToggleGroupItem,
} from "@/components/retroui/toggle-group";

<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>

Examples
Default

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleDefault() {
return (
<ToggleGroup type="multiple" variant="default">
<ToggleGroupItem value="bold">
<Bold className="h-4 w-4" />
</ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>

);
}

Outlined

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleOutlined() {
return (
<ToggleGroup type="multiple" variant="outlined">
<ToggleGroupItem value="bold">
<Bold className="h-4 w-4" />
</ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>

);
}

Solid

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleSolid() {
return (
<ToggleGroup type="multiple" variant="solid">
<ToggleGroupItem value="bold">
<Bold className="h-4 w-4" />
</ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>

);
}

Outline Muted

"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/retroui";
import { Bold, Italic, Underline } from "lucide-react";

export default function ToggleGroupStyleOutlineMuted() {
return (
<ToggleGroup type="multiple" variant="outline-muted">
<ToggleGroupItem value="bold">
<Bold className="h-4 w-4" />
</ToggleGroupItem>

      <ToggleGroupItem value="italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>

);
}

Last Updated: 09 Sep, 2025
Toggle Group | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Tooltip

A cool way to give your users a hint of what a component does...😉
API Reference
Source

"use client";

import { Button, Tooltip } from "@/components/retroui";

export default function TooltipStyleDefault() {
return (
<Tooltip.Provider>
<Tooltip>
<Tooltip.Trigger asChild>
<Button variant="outline">Hover</Button>
</Tooltip.Trigger>
<Tooltip.Content variant="default">Add to Library</Tooltip.Content>
</Tooltip>
</Tooltip.Provider>
);
}

pnpm dlx shadcn@latest add @retroui/tooltip

Examples
Default

"use client";

import { Button, Tooltip } from "@/components/retroui";

export default function TooltipStyleDefault() {
return (
<Tooltip.Provider>
<Tooltip>
<Tooltip.Trigger asChild>
<Button variant="outline">Hover</Button>
</Tooltip.Trigger>
<Tooltip.Content variant="default">Add to Library</Tooltip.Content>
</Tooltip>
</Tooltip.Provider>
);
}

Primary

"use client";

import { Button, Tooltip } from "@/components/retroui";

export default function TooltipStylePrimary() {
return (
<Tooltip.Provider>
<Tooltip>
<Tooltip.Trigger asChild>
<Button variant="outline">Hover</Button>
</Tooltip.Trigger>
<Tooltip.Content variant="primary">Add to Library</Tooltip.Content>
</Tooltip>
</Tooltip.Provider>
);
}

Solid

"use client";

import { Button, Tooltip } from "@/components/retroui";

export default function TooltipStyleSolid() {
return (
<Tooltip.Provider>
<Tooltip>
<Tooltip.Trigger asChild>
<Button variant="outline">Hover</Button>
</Tooltip.Trigger>
<Tooltip.Content variant="solid">Add to Library</Tooltip.Content>
</Tooltip>
</Tooltip.Provider>
);
}

Last Updated: 09 Sep, 2025
Tooltip | Retro UI
0

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Bar Chart

A customizable bar chart component to visualize your data with support for multiple categories, custom colors, and horizontal alignment. 📊
Source

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function BarChartStyleDefault() {
return (
<BarChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Installation
pnpm dlx shadcn@latest add 'https://retroui.dev/r/bar-chart.json'

Examples
Default

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function BarChartStyleDefault() {
return (
<BarChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Grouped Data

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12, cancel: 9 }, { name: 'Feb', orders: 32, cancel: 19 }, { name: 'Mar', orders: 19, cancel: 8 }, { name: 'Apr', orders: 35, cancel: 14 }, { name: 'May', orders: 40, cancel: 12 }, { name: 'Jun', orders: 25, cancel: 5 }];

export default function BarChartStyleMultiple() {
return (
<BarChart
data={data}
index="name"
categories={["orders", "cancel"]}
strokeColors={["var(--foreground)", "var(--destructive)"]}
fillColors={["var(--primary)", "var(--destructive)"]}
/>
)
}

Stacked Data

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [{ name: 'Jan', orders: 12, cancel: 2 }, { name: 'Feb', orders: 32, cancel: 9 }, { name: 'Mar', orders: 19, cancel: 5 }, { name: 'Apr', orders: 35, cancel: 8 }, { name: 'May', orders: 40, cancel: 17 }, { name: 'Jun', orders: 15, cancel: 12 }];

export default function BarChartStyleStacked() {
return (
<BarChart
data={data}
index="name"
stacked
categories={["orders", "cancel"]}
fillColors={["var(--primary)", "var(--destructive)"]}
/>
)
}

Horizontal Alignment

import { BarChart } from "@/components/retroui/charts/BarChart";

const data = [
{ category: 'Sales', value: 400 },
{ category: 'Marketing', value: 300 },
{ category: 'Support', value: 200 },
{ category: 'Development', value: 500 },
{ category: 'HR', value: 100 }
];

export default function BarChartStyleHorizontal() {
return (
<BarChart
data={data}
index="category"
categories={["value"]}
alignment="horizontal"
fillColors={["var(--primary)"]}
className="h-96"
/>
)
}

API Reference
Prop Type Default Description
data Record<string, any>[] [] Array of data objects to display
index string - Key for the x-axis (category) data
categories string[] [] Array of keys for the data values to display as bars
alignment "vertical" | "horizontal" "vertical" Orientation of the bars
strokeColors string[] ["var(--foreground)"] Array of stroke colors for the bars
fillColors string[] ["var(--primary)"] Array of fill colors for the bars
tooltipBgColor string "var(--background)" Background color for tooltips
tooltipBorderColor string "var(--border)" Border color for tooltips
gridColor string "var(--muted)" Color for the grid lines
valueFormatter (value: number) => string (value) => value.toString() Function to format values
showGrid boolean true Whether to show grid lines
showTooltip boolean true Whether to show tooltips on hover
stacked boolean false Whether to stack the bars
className string - Additional CSS classes

Last Updated: 02 Jan, 2026
Bar Chart | Retro UI
150

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Line Chart

A customizable line chart component to visualize trends and data over time with smooth curves and data points. 📉
Source

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function LineChartStyleDefault() {
return (
<LineChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Installation
pnpm dlx shadcn@latest add 'https://retroui.dev/r/line-chart.json'

Examples
Default

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function LineChartStyleDefault() {
return (
<LineChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Multiple Lines

import { LineChart } from "@/components/retroui/charts/LineChart";

const data = [{ name: 'Jan', orders: 12, cancel: 9 }, { name: 'Feb', orders: 32, cancel: 19 }, { name: 'Mar', orders: 19, cancel: 8 }, { name: 'Apr', orders: 35, cancel: 14 }, { name: 'May', orders: 40, cancel: 12 }, { name: 'Jun', orders: 25, cancel: 5 }];

export default function LineChartStyleMultiple() {
return (
<LineChart
data={data}
index="name"
categories={["orders", "cancel"]}
strokeColors={["var(--foreground)", "var(--destructive)"]}
/>
)
}

API Reference
Prop Type Default Description
data Record<string, any>[] [] Array of data objects to display
index string - Key for the x-axis (category) data
categories string[] [] Array of keys for the data values to display as lines
strokeColors string[] ["var(--foreground)"] Array of stroke colors for the lines
strokeWidth number 2 Width of the line strokes
dotSize number 4 Size of the data point dots
tooltipBgColor string "var(--background)" Background color for tooltips
tooltipBorderColor string "var(--border)" Border color for tooltips
gridColor string "var(--muted)" Color for the grid lines
valueFormatter (value: number) => string (value) => value.toString() Function to format values
showGrid boolean true Whether to show grid lines
showTooltip boolean true Whether to show tooltips on hover
className string - Additional CSS classes

Last Updated: 12 Aug, 2025
Line Chart | Retro UI
150

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Area Chart

A customizable area chart component to visualize your data with gradient fills and smooth curves. 📈
Source

// import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function ChartStyleDefault() {
return (
<AreaChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Installation
pnpm dlx shadcn@latest add 'https://retroui.dev/r/area-chart.json'

Examples
Default

// import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [{ name: 'Jan', orders: 12 }, { name: 'Feb', orders: 32 }, { name: 'Mar', orders: 19 }, { name: 'Apr', orders: 35 }, { name: 'May', orders: 40 }, { name: 'Jun', orders: 25 }];

export default function ChartStyleDefault() {
return (
<AreaChart
data={data}
index="name"
categories={["orders"]}
/>
)
}

Multiple Categories

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [{ name: 'Jan', orders: 12, cancel: 9 }, { name: 'Feb', orders: 32, cancel: 19 }, { name: 'Mar', orders: 19, cancel: 8 }, { name: 'Apr', orders: 35, cancel: 14 }, { name: 'May', orders: 40, cancel: 12 }, { name: 'Jun', orders: 25, cancel: 5 }];

export default function ChartStyleMultiple() {
return (
<AreaChart
data={data}
index="name"
categories={["orders", "cancel"]}
strokeColors={["var(--foreground)", "var(--destructive)"]}
fillColors={["var(--primary)", "var(--destructive)"]}
/>
)
}

Stacked Areas

import { AreaChart } from "@/components/retroui/charts/AreaChart";

const data = [
{ name: 'Jan', mobile: 20, desktop: 30, tablet: 10 },
{ name: 'Feb', mobile: 25, desktop: 35, tablet: 15 },
{ name: 'Mar', mobile: 22, desktop: 28, tablet: 12 },
{ name: 'Apr', mobile: 30, desktop: 40, tablet: 18 },
{ name: 'May', mobile: 28, desktop: 38, tablet: 16 },
{ name: 'Jun', mobile: 32, desktop: 42, tablet: 20 }
];

export default function AreaChartStyleStacked() {
return (
<AreaChart
data={data}
index="name"
showGrid={false}
categories={["mobile", "desktop", "tablet"]}
strokeColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
fillColors={["var(--primary)", "var(--secondary)", "var(--accent)"]}
fill="solid"
/>
)
}

API Reference
Prop Type Default Description
data Record<string, any>[] [] Array of data objects to display
index string - Key for the x-axis (category) data
categories string[] [] Array of keys for the data values to display as areas
fill "gradient" | "solid" "gradient" Fill style for the areas
strokeColors string[] ["var(--foreground)"] Array of stroke colors for the areas
fillColors string[] ["var(--primary)"] Array of fill colors for the areas
tooltipBgColor string "var(--background)" Background color for tooltips
tooltipBorderColor string "var(--border)" Border color for tooltips
gridColor string "var(--muted)" Color for the grid lines
valueFormatter (value: number) => string (value) => value.toString() Function to format values
showGrid boolean true Whether to show grid lines
showTooltip boolean true Whether to show tooltips on hover
className string - Additional CSS classes

Last Updated: 12 Aug, 2025
Area Chart | Retro UI
150

Ship faster with premium blocks and templates!
retro ui logo
RetroUI
Docs
Components
Themes
Blog
Showcase
Pie Chart

A customizable pie chart component to visualize proportional data with support for donut charts. 🍰
Source

import { PieChart } from "@/components/retroui/charts/PieChart";

const data = [
{ name: 'Desktop', value: 400 },
{ name: 'Mobile', value: 300 },
{ name: 'Tablet', value: 200 },
{ name: 'Other', value: 100 }
];

export default function PieChartStyleDefault() {
return (
<PieChart
            data={data}
            dataKey="value"
            nameKey="name"
        />
)
}

Installation
pnpm dlx shadcn@latest add 'https://retroui.dev/r/pie-chart.json'

Examples
Default

import { PieChart } from "@/components/retroui/charts/PieChart";

const data = [
{ name: 'Desktop', value: 400 },
{ name: 'Mobile', value: 300 },
{ name: 'Tablet', value: 200 },
{ name: 'Other', value: 100 }
];

export default function PieChartStyleDefault() {
return (
<PieChart
            data={data}
            dataKey="value"
            nameKey="name"
        />
)
}

Donut Chart

import { PieChart } from "@/components/retroui/charts/PieChart";

const data = [
{ name: 'Desktop', value: 400 },
{ name: 'Mobile', value: 300 },
{ name: 'Tablet', value: 200 },
{ name: 'Other', value: 100 }
];

export default function PieChartStyleDonut() {
return (
<PieChart
data={data}
dataKey="value"
nameKey="name"
innerRadius={70}
colors={["var(--primary)", "var(--secondary)", "var(--destructive)", "var(--muted)"]}
/>
)
}

API Reference
Prop Type Default Description
data Record<string, any>[] [] Array of data objects to display
dataKey string - Key for the data values
nameKey string - Key for the category names
colors string[] ["var(--chart-1)", ...] Array of colors for the pie segments
innerRadius number 0 Inner radius (use > 0 for donut chart)
outerRadius number 80 Outer radius of the pie
tooltipBgColor string "var(--background)" Background color for tooltips
tooltipBorderColor string "var(--border)" Border color for tooltips
valueFormatter (value: number) => string (value) => value.toString() Function to format values
showTooltip boolean true Whether to show tooltips on hover
className string - Additional CSS classes

Last Updated: 12 Aug, 2025
Pie Chart | Retro UI
150

red theme
:root {
--radius: 0.5rem;
--background: #FCFFE7;
--foreground: #000000;
--muted: #EFD0D5;
--muted-foreground: #A42439;
--card: #FFFFFF;
--card-foreground: #000000;
--popover: #FFFFFF;
--popover-foreground: #000000;
--border: #000000;
--input: #FFFFFF;
--primary: #EA435F;
--primary-hover: #D00000;
--primary-foreground: #FFFFFF;
--secondary: #FFDA5C;
--secondary-foreground: #000000;
--accent: #CEEBFC;
--accent-foreground: #000000;
--destructive: #D00000;
--destructive-foreground: #FFFFFF;
--ring: #000000;
}

.dark {
--background: #0f0f0f;
--foreground: #f5f5f5;
--muted: #3a1f24;
--muted-foreground: #f2a7b2;
--card: #1a1a1a;
--card-foreground: #ffffff;
--popover: #1a1a1a;
--popover-foreground: #ffffff;
--border: #2a2a2a;
--input: #2a2a2a;
--primary: #EA435F;
--primary-hover: #D00000;
--primary-foreground: #ffffff;
--secondary: #FFDA5C;
--secondary-foreground: #000000;
--accent: #2a3b45;
--accent-foreground: #CEEBFC;
--destructive: #D00000;
--destructive-foreground: #ffffff;
--ring: #EA435F;
}

lavender

:root {
--radius: 0.5rem;
--background: #F9F5F2;
--foreground: #000000;
--muted: #EDE3FF;
--muted-foreground: #5B3B98;
--card: #FFFFFF;
--card-foreground: #000000;
--popover: #FFFFFF;
--popover-foreground: #000000;
--border: #000000;
--input: #FFFFFF;
--primary: #C4A1FF;
--primary-hover: #9678FF;
--primary-foreground: #000000;
--secondary: #E7F193;
--secondary-foreground: #000000;
--accent: #FE91E9;
--accent-foreground: #000000;
--destructive: #FE3B3B;
--destructive-foreground: #FFFFFF;
--ring: #000000;
}

.dark {
--background: #121014;
--foreground: #f5f5f5;
--muted: #2d2440;
--muted-foreground: #c7b6f3;
--card: #1a1820;
--card-foreground: #ffffff;
--popover: #1a1820;
--popover-foreground: #ffffff;
--border: #2a2a2e;
--input: #2a2a2e;
--primary: #C4A1FF;
--primary-hover: #9678FF;
--primary-foreground: #000000;
--secondary: #E7F193;
--secondary-foreground: #000000;
--accent: #FE91E9;
--accent-foreground: #000000;
--destructive: #FE3B3B;
--destructive-foreground: #ffffff;
--ring: #C4A1FF;
}

lime
:root {
--radius: 0.5rem;
--background: #F9F5F2;
--foreground: #000000;
--muted: #EDE3FF;
--muted-foreground: #5B3B98;
--card: #FFFFFF;
--card-foreground: #000000;
--popover: #FFFFFF;
--popover-foreground: #000000;
--border: #000000;
--input: #FFFFFF;
--primary: #C4A1FF;
--primary-hover: #9678FF;
--primary-foreground: #000000;
--secondary: #E7F193;
--secondary-foreground: #000000;
--accent: #FE91E9;
--accent-foreground: #000000;
--destructive: #FE3B3B;
--destructive-foreground: #FFFFFF;
--ring: #000000;
}

.dark {
--background: #121014;
--foreground: #f5f5f5;
--muted: #2d2440;
--muted-foreground: #c7b6f3;
--card: #1a1820;
--card-foreground: #ffffff;
--popover: #1a1820;
--popover-foreground: #ffffff;
--border: #2a2a2e;
--input: #2a2a2e;
--primary: #C4A1FF;
--primary-hover: #9678FF;
--primary-foreground: #000000;
--secondary: #E7F193;
--secondary-foreground: #000000;
--accent: #FE91E9;
--accent-foreground: #000000;
--destructive: #FE3B3B;
--destructive-foreground: #ffffff;
--ring: #C4A1FF;
}

orange
:root {
--radius: 0.5rem;
--background: #F9F5F2;
--foreground: #000000;
--muted: #EFD0D5;
--muted-foreground: #A42439;
--card: #FFFFFF;
--card-foreground: #000000;
--popover: #FFFFFF;
--popover-foreground: #000000;
--border: #000000;
--input: #FFFFFF;
--primary: #EA435F;
--primary-hover: #D00000;
--primary-foreground: #FFFFFF;
--secondary: #FFDA5C;
--secondary-foreground: #000000;
--accent: #CEEBFC;
--accent-foreground: #000000;
--destructive: #D00000;
--destructive-foreground: #FFFFFF;
--ring: #000000;
}

.dark {
--background: #12100e;
--foreground: #f5f5f5;
--muted: #3a2617;
--muted-foreground: #ffb679;
--card: #1a1a1a;
--card-foreground: #ffffff;
--popover: #1a1a1a;
--popover-foreground: #ffffff;
--border: #2a2a2a;
--input: #2a2a2a;
--primary: #F07200;
--primary-hover: #ff8011;
--primary-foreground: #FDEAD9;
--secondary: #EF8C27;
--secondary-foreground: #000000;
--accent: #FF6B6B;
--accent-foreground: #000000;
--destructive: #FE3B3B;
--destructive-foreground: #ffffff;
--ring: #F07200;
}

green
:root {
--radius: 0.5rem;
--background: #F9F5F2;
--foreground: #000000;
--muted: #EFD0D5;
--muted-foreground: #A42439;
--card: #FFFFFF;
--card-foreground: #000000;
--popover: #FFFFFF;
--popover-foreground: #000000;
--border: #000000;
--input: #FFFFFF;
--primary: #EA435F;
--primary-hover: #D00000;
--primary-foreground: #FFFFFF;
--secondary: #FFDA5C;
--secondary-foreground: #000000;
--accent: #CEEBFC;
--accent-foreground: #000000;
--destructive: #D00000;
--destructive-foreground: #FFFFFF;
--ring: #000000;
}

.dark {
--background: #0f1210;
--foreground: #f5f5f5;
--muted: #1f3a2d;
--muted-foreground: #9cd9b8;
--card: #181c19;
--card-foreground: #ffffff;
--popover: #181c19;
--popover-foreground: #ffffff;
--border: #2a2e2b;
--input: #2a2e2b;
--primary: #599D77;
--primary-hover: #39654c;
--primary-foreground: #ffffff;
--secondary: #3a6f52;
--secondary-foreground: #ffffff;
--accent: #FFE75A;
--accent-foreground: #000000;
--destructive: #F05D5D;
--destructive-foreground: #ffffff;
--ring: #599D77;
}

yellow
:root {
--radius: 0.5rem;
--background: #fff;
--foreground: #000;
--card: #fff;
--card-foreground: #000;
--primary: #ffdb33;
--primary-hover: #ffcc00;
--primary-foreground: #000;
--secondary: #000;
--secondary-foreground: #fff;
--muted: #cccccc;
--muted-foreground: #5a5a5a;
--accent: #fae583;
--accent-foreground: #000;
--destructive: #e63946;
--destructive-foreground: #fff;
--border: #000;
}

.dark {
--background: #1a1a1a;
--foreground: #f5f5f5;
--card: #242424;
--card-foreground: #f5f5f5;
--primary: #ffdb33;
--primary-hover: #ffcc00;
--primary-foreground: #000;
--secondary: #3a3a3a;
--secondary-foreground: #f5f5f5;
--muted: #3f3f46;
--muted-foreground: #a0a0a0;
--accent: #fae583;
--accent-foreground: #000;
--destructive: #e63946;
--destructive-foreground: #fff;
--border: #5c5c5c;
}
