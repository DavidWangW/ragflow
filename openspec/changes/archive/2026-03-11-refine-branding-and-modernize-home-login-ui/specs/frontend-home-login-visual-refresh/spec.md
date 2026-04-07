## ADDED Requirements

### Requirement: Home hero uses a modern enterprise information hierarchy
The home page hero SHALL use a clear enterprise-style hierarchy with a contextual label, product name, supporting description, and structured supporting highlights.

#### Scenario: Home hero presents the product clearly
- **WHEN** the home page hero renders
- **THEN** it shows the product name as the primary heading and presents supporting information with cleaner spacing than the surrounding content cards

#### Scenario: Home hero supporting elements stay concise
- **WHEN** supporting chips, metrics, or descriptors are rendered in the hero
- **THEN** they summarize platform value without repeating the corporate subtitle

### Requirement: Home sections use consistent modern card framing
The home page knowledge-base and application sections SHALL share a more consistent section header treatment, spacing model, and card affordance.

#### Scenario: Section headers align visually
- **WHEN** the home knowledge-base and application sections render
- **THEN** each section uses consistent spacing, title hierarchy, and description styling

#### Scenario: Interactive cards show clear affordance
- **WHEN** a user hovers or focuses a clickable home card
- **THEN** the card provides visible, stable affordance without excessive motion

### Requirement: Login entry surfaces use refined visual polish with accessible motion
The login entry screen SHALL present the brand and product messaging with modernized spacing, supporting highlights, and subtle motion that respects reduced-motion preferences.

#### Scenario: Login page hero emphasizes the product
- **WHEN** the login page loads
- **THEN** the product name, supporting descriptor, and tagline are presented in a centered hero block that stays visually distinct from the form panel

#### Scenario: Reduced motion is respected
- **WHEN** the user has reduced-motion preferences enabled
- **THEN** decorative animation and transition effects are minimized or disabled on the refreshed entry surfaces
