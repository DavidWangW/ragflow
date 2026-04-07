## Why

The current frontend exposes the corporate subtitle in multiple content areas, which dilutes the brand hierarchy and makes the home experience feel visually noisy. The home and login entry surfaces also use inconsistent spacing, badge placement, and decorative treatments, so the product does not yet present itself like a modern industrial knowledge platform.

## What Changes

- Limit the corporate subtitle display to logo-identifying areas such as the primary app header, login header, and admin header.
- Remove the company-name badge above the home knowledge-base section and remove the English technology label above the home chat/application section.
- Refresh the home hero, home feature sections, and login entry surfaces with cleaner hierarchy, more intentional spacing, and more professional enterprise styling.
- Tighten motion and hover behavior so decorative effects stay subtle and do not compete with core content.

## Capabilities

### New Capabilities
- `frontend-branding-visibility`: Define where the corporate subtitle may appear and require non-logo content sections to omit it.
- `frontend-home-login-visual-refresh`: Define the modernized presentation rules for the home hero, home content sections, and login entry screens.

### Modified Capabilities

None.

## Impact

- Affected code: `web/src/constants/branding.ts`, shared global surface styles, home page sections, login page shells, and admin branding layouts.
- APIs: none.
- Dependencies: none expected beyond existing frontend tooling and design tokens.
