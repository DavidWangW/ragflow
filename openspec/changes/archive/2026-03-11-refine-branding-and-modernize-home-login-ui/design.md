## Context

The frontend already has a branded shell, shared surface tokens, and distinct home and login entry pages, but brand content is duplicated across banners and section headers. The requested change is cross-cutting inside the React frontend because it touches shared branding constants, multiple home modules, login shells, and shared visual primitives such as surface cards and hover behavior.

## Goals / Non-Goals

**Goals:**
- Enforce a single brand hierarchy where the company subtitle only appears inside logo lockups.
- Modernize the home hero, home content sections, and login entry surfaces without changing routes, data flow, or existing APIs.
- Reuse existing theme variables and component primitives so the refresh stays compatible with light/dark themes and current design tokens.
- Reduce visual noise by replacing redundant brand badges with contextual section descriptors and subtler motion.

**Non-Goals:**
- Rebuild the overall information architecture of the application.
- Introduce new frontend dependencies, fonts, or a new design system.
- Change backend behavior, authentication flows, or page routing.

## Decisions

### Decision: Keep branding rules in-place and remove non-logo subtitle usage at render sites
The company subtitle is already modeled as `APP_SUBTITLE`, so the lowest-risk solution is to keep the source constant and stop rendering it anywhere outside logo-identifying blocks.

Alternatives considered:
- Renaming or deleting `APP_SUBTITLE`: rejected because the company name is still required in header and login logo areas.
- Building a new centralized branding component first: rejected for this iteration because the duplicated logo blocks are limited and the user requested a targeted refresh.

### Decision: Use existing theme tokens and shared surface classes for the refresh
The current frontend already exposes accent, text, border, and surface variables. The refresh will extend the existing visual language with cleaner spacing, contextual labels, and crisper card treatments instead of replacing the token system.

Alternatives considered:
- Adding a new font stack or third-party UI package: rejected to avoid unnecessary risk and scope growth.
- Styling each page independently with hard-coded colors: rejected because it would break visual consistency and make future theme maintenance harder.

### Decision: Refresh entry surfaces through composition, not structural rewrites
Home and login screens will be modernized by adjusting hero layout, section headers, content density, and motion behavior while keeping current data hooks and card components.

Alternatives considered:
- Rewriting the home page into a new layout framework: rejected because the existing composition already fits the product model.
- Leaving card and motion behavior untouched: rejected because click affordance and hover polish are part of the requested professional refresh.

## Risks / Trade-offs

- [Home and login spacing regressions on small screens] -> Keep the refresh responsive with stacked layouts and constrained max widths.
- [Visual drift from the rest of the app] -> Reuse existing surface and accent tokens instead of inventing a separate palette.
- [Animation or hover changes affecting accessibility] -> Keep transitions within 150-300ms and add `prefers-reduced-motion` handling for decorative motion.

## Migration Plan

No data migration is required. The change can be deployed as a normal frontend update and rolled back by reverting the affected frontend files and OpenSpec change if the refreshed presentation is not accepted.

## Open Questions

None at implementation time. The requested branding boundaries and affected sections are explicit enough to proceed.
