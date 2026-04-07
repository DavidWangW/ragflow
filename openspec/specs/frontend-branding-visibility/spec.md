# frontend-branding-visibility Specification

## Purpose
TBD - created by archiving change refine-branding-and-modernize-home-login-ui. Update Purpose after archive.
## Requirements
### Requirement: Corporate subtitle appears only in logo identity blocks
The frontend SHALL render the corporate subtitle only when it is part of a logo identity block that includes the product logo and product name.

#### Scenario: Home page content does not repeat the corporate subtitle
- **WHEN** the home page renders its hero banner and knowledge-base section header
- **THEN** the corporate subtitle is not shown as a standalone badge or supporting line in those content areas

#### Scenario: Logo areas preserve the corporate subtitle
- **WHEN** the main header, login logo block, or admin logo block renders
- **THEN** the corporate subtitle remains visible adjacent to the logo identity block

### Requirement: Home content sections omit redundant brand badges
The home page SHALL present section-level descriptors that are contextual to the content and SHALL NOT reuse the corporate subtitle or unrelated technology slogan above section icons.

#### Scenario: Knowledge-base section uses content-focused labeling
- **WHEN** the knowledge-base section header renders on the home page
- **THEN** the section shows a contextual descriptor or no badge, and does not display the corporate subtitle above the section title

#### Scenario: Application section removes the technology slogan badge
- **WHEN** the chat and application section header renders on the home page
- **THEN** the section does not display the technology slogan above the section title

