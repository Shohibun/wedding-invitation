"use client";

import * as React from "react";
import { ThemeSwitcher } from "@/components/design-system/theme-switcher";
import { useWeddingTheme } from "@/providers/wedding-theme-provider";

// Typography
import { Display } from "@/components/typography/display";
import { Heading } from "@/components/typography/heading";
import { SectionTitle } from "@/components/typography/section-title";
import { Paragraph } from "@/components/typography/paragraph";
import { Caption } from "@/components/typography/caption";
import { Label } from "@/components/typography/label";
import { GradientText } from "@/components/typography/gradient-text";
import { Text } from "@/components/typography/text";

// Layout
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Grid } from "@/components/layout/grid";
import { Stack } from "@/components/layout/stack";
import { Flex } from "@/components/layout/flex";
import { Divider } from "@/components/layout/divider";
import { Spacer } from "@/components/layout/spacer";

// Shared
import { AnimatedButton } from "@/components/shared/animated-button";
import { IconButton } from "@/components/shared/icon-button";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/shared/badge";
import { Tag } from "@/components/shared/tag";
import { Chip } from "@/components/shared/chip";
import { Pill } from "@/components/shared/pill";

// Feedback
import { Spinner } from "@/components/feedback/spinner";
import { Skeleton } from "@/components/feedback/skeleton";
import { Loading } from "@/components/feedback/loading";
import { EmptyState } from "@/components/feedback/empty-state";
import { ErrorState } from "@/components/feedback/error-state";

// Icons
import { Heart, Star } from "lucide-react";

// Animations
import { motion } from "framer-motion";
import {
  fadeVariants,
  slideUpVariants,
  scaleVariants,
  staggerContainer,
} from "@/lib/animations/variants";

export default function DesignSystemPlayground() {
  const { theme: weddingTheme, setTheme: setWeddingTheme } = useWeddingTheme();
  const [viewport, setViewport] = React.useState("desktop");

  const viewportStyles = {
    desktop: "w-full",
    laptop: "w-[1024px] border-x border-border mx-auto shadow-2xl",
    tablet: "w-[768px] border-x border-border mx-auto shadow-2xl",
    mobile: "w-[375px] border-x border-border mx-auto shadow-2xl overflow-hidden",
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Dev Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border p-4 shadow-sm">
        <Flex justify="between" align="center" className="max-w-7xl mx-auto">
          <Heading level={4}>🎨 Design System Playground</Heading>

          <Flex gap="4" align="center">
            {/* Viewport Toggles */}
            <div className="flex bg-secondary rounded-md p-1 mr-4">
              {["desktop", "laptop", "tablet", "mobile"].map((v) => (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${viewport === v ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"}`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>

            {/* Theme Toggles */}
            <select
              value={weddingTheme}
              onChange={(e) =>
                setWeddingTheme(e.target.value as Parameters<typeof setWeddingTheme>[0])
              }
              className="bg-secondary text-secondary-foreground text-sm rounded-md px-3 py-1.5 border border-border"
            >
              <option value="elegant">Theme: Elegant</option>
              <option value="minimal">Theme: Minimal</option>
              <option value="luxury">Theme: Luxury</option>
              <option value="floral">Theme: Floral</option>
            </select>

            <ThemeSwitcher />
          </Flex>
        </Flex>
      </div>

      {/* Viewport Container */}
      <div
        className={`transition-all duration-500 ease-in-out bg-background min-h-screen ${(viewportStyles as Record<string, string>)[viewport]}`}
      >
        <Container>
          <Section>
            <SectionTitle
              title="Typography System"
              subtitle="Comprehensive typographic scale using polymorphic components."
              align="left"
            />
            <Divider />
            <Stack>
              <Display>Display Text</Display>
              <Heading level={1}>Heading 1: The Quick Brown Fox</Heading>
              <Heading level={2}>Heading 2: Jumps Over The Lazy Dog</Heading>
              <Heading level={3}>Heading 3: Sphynx of black quartz</Heading>
              <Heading level={4}>Heading 4: Judge my vow</Heading>
              <Paragraph lead>
                This is a lead paragraph. It is slightly larger and muted to draw attention to
                introductory content.
              </Paragraph>
              <Paragraph>
                This is a standard paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Flex gap="4" align="center">
                <Text size="lg" weight="bold">
                  Large Bold Text
                </Text>
                <Text size="sm" muted>
                  Small Muted Text
                </Text>
                <Label>Form Label</Label>
                <Caption>Image Caption</Caption>
              </Flex>
              <Heading level={2}>
                <GradientText>Beautiful Gradient Text</GradientText>
              </Heading>
            </Stack>
          </Section>

          <Section>
            <SectionTitle
              title="Buttons & Interactions"
              subtitle="Framer Motion powered interactive elements."
              align="left"
            />
            <Divider />
            <Flex wrap="wrap" gap="4">
              <AnimatedButton variant="primary">Primary Button</AnimatedButton>
              <AnimatedButton variant="secondary">Secondary Button</AnimatedButton>
              <AnimatedButton variant="outline">Outline Button</AnimatedButton>
              <AnimatedButton variant="ghost">Ghost Button</AnimatedButton>
            </Flex>
            <Spacer size="md" />
            <Flex gap="4" align="center">
              <AnimatedButton size="sm">Small</AnimatedButton>
              <AnimatedButton size="md">Medium</AnimatedButton>
              <AnimatedButton size="lg">Large Button</AnimatedButton>
              <IconButton>
                <Heart size={18} />
              </IconButton>
            </Flex>
          </Section>

          <Section>
            <SectionTitle title="Badges, Tags & Chips" align="left" />
            <Divider />
            <Flex gap="4" wrap="wrap">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </Flex>
            <Spacer size="sm" />
            <Flex gap="4" wrap="wrap">
              <Tag>Technology Tag</Tag>
              <Chip>Interactive Chip</Chip>
              <Pill>Rounded Pill</Pill>
            </Flex>
          </Section>

          <Section>
            <SectionTitle title="Feedback States" align="left" />
            <Divider />
            <Grid cols={3} gap="lg">
              <div className="p-4 border border-border rounded-lg flex flex-col items-center gap-4">
                <Heading level={5}>Spinner</Heading>
                <Spinner className="w-8 h-8 text-primary" />
              </div>
              <div className="p-4 border border-border rounded-lg flex flex-col items-center gap-4">
                <Heading level={5}>Skeleton</Heading>
                <Stack className="w-full">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </Stack>
              </div>
              <div className="p-4 border border-border rounded-lg">
                <Loading />
              </div>
            </Grid>
            <Spacer size="lg" />
            <Grid cols={2} gap="lg">
              <EmptyState
                title="No Guests Found"
                description="Try inviting someone to your wedding."
                icon={<Star size={32} />}
              />
              <ErrorState
                title="Failed to load gallery"
                error="Network timeout"
                onRetry={() => alert("Retrying...")}
              />
            </Grid>
          </Section>

          <Section>
            <SectionTitle title="Cards & Glassmorphism" align="left" />
            <Divider />
            <Grid cols={2} gap="lg">
              <GlassCard className="p-8 h-64 flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <Heading level={3}>Glass Card</Heading>
                <Paragraph className="text-center mt-2">
                  Beautiful frosted glass effect for premium wedding themes.
                </Paragraph>
              </GlassCard>
              <div className="p-8 border border-border rounded-2xl shadow-sm bg-card">
                <Heading level={3}>Standard Card</Heading>
                <Paragraph className="mt-2 text-muted-foreground">
                  Clean, accessible standard card utilizing CSS variables for theme consistency.
                </Paragraph>
              </div>
            </Grid>
          </Section>

          <Section>
            <SectionTitle title="Animations System" align="left" />
            <Divider />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <motion.div
                variants={fadeVariants}
                className="h-32 bg-primary/20 rounded-lg flex items-center justify-center font-bold"
              >
                Fade
              </motion.div>
              <motion.div
                variants={slideUpVariants}
                className="h-32 bg-secondary/20 rounded-lg flex items-center justify-center font-bold"
              >
                Slide Up
              </motion.div>
              <motion.div
                variants={scaleVariants}
                className="h-32 bg-accent/20 rounded-lg flex items-center justify-center font-bold"
              >
                Scale
              </motion.div>
              <motion.div
                variants={fadeVariants}
                className="h-32 bg-muted rounded-lg flex items-center justify-center font-bold"
              >
                Staggered
              </motion.div>
            </motion.div>
          </Section>
        </Container>
      </div>
    </div>
  );
}
