import React from 'react';
import styles from '../styles.module.css';

interface ColorSwatchProps {
  color: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ color }) => (
  <div 
    className={styles.colorSwatch} 
    style={{ backgroundColor: color }} 
  />
);

export default function BrandIdentity() {
  return (
    <div>
      <h3>Visual Strategy and Governance</h3>
      <p>The visual identity is grounded in the Everyman archetype, prioritizing accessibility, empathy, and realistic community orientation. Governance is maintained through a strictly tokenized design system engineered for WCAG AAA compliance.</p>
      
      <h4>Core Philosophy and Pillars</h4>
      <ul>
        <li><strong>Belonging:</strong> Fostering community ownership and collective participation.</li>
        <li><strong>Honest Simplicity:</strong> Transparent operations delivered through intuitive, functional interfaces.</li>
        <li><strong>Human Connection:</strong> Maintaining the social link in every digital transaction.</li>
        <li><strong>Concept:</strong> "From peer to peer, from soil to table."</li>
      </ul>

      <h4>Brand Slogans</h4>
      <table>
        <thead>
          <tr>
            <th>Context</th>
            <th>Slogan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary</td>
            <td>"Your community, our harvest."</td>
          </tr>
          <tr>
            <td>Functional</td>
            <td>"Organic sharing, easy as it should be."</td>
          </tr>
          <tr>
            <td>Marketing</td>
            <td>"As natural as our friendship."</td>
          </tr>
        </tbody>
      </table>

      <h4>Complete Color Palette Specification</h4>
      <p>The color identity evokes naturalness combined with community simplicity. All tokens are prioritized for accessibility and semantic flexibility.</p>

      <h5>Primary Identity (Brand Triad)</h5>
      <table>
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Token</th>
            <th>Hex</th>
            <th>Functional Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ColorSwatch color="#8EA637" /></td>
            <td>Olive Leaf</td>
            <td><code>#8EA637</code></td>
            <td>Primary brand identifier and interactive components.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#C9F2AC" /></td>
            <td>Sprout Green</td>
            <td><code>#C9F2AC</code></td>
            <td>Secondary support, highlights, and luminosity.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#022601" /></td>
            <td>Deep Forest</td>
            <td><code>#022601</code></td>
            <td>Solid bases, high-contrast text, and structural borders.</td>
          </tr>
        </tbody>
      </table>

      <h5>Background System (Surfaces)</h5>
      <table>
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Token</th>
            <th>Hex</th>
            <th>Suggested Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ColorSwatch color="#F2E8C9" /></td>
            <td>Natural Fiber</td>
            <td><code>#F2E8C9</code></td>
            <td>Light Background (Base). Warm cream.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#400101" /></td>
            <td>Coffee Soil</td>
            <td><code>#400101</code></td>
            <td>Dark Background (Base). Main background for Dark Mode.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#F1F8E9" /></td>
            <td>Mint Whisper</td>
            <td><code>#F1F8E9</code></td>
            <td>Light Background (Tint). Soft highlight surfaces.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#02590F" /></td>
            <td>Canopy Dark</td>
            <td><code>#02590F</code></td>
            <td>Dark Background (Shade). Modals and sidebars.</td>
          </tr>
        </tbody>
      </table>

      <h5>Structural Neutral Colors</h5>
      <table>
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Token</th>
            <th>Hex</th>
            <th>Suggested Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ColorSwatch color="#E6DCC3" /></td>
            <td>Raw Line</td>
            <td><code>#E6DCC3</code></td>
            <td>Light Background Borders.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#2C1A1A" /></td>
            <td>Night Line</td>
            <td><code>#2C1A1A</code></td>
            <td>Dark Background Borders.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#A89F91" /></td>
            <td>Disabled Gray</td>
            <td><code>#A89F91</code></td>
            <td>Disabled states. Warm gray.</td>
          </tr>
        </tbody>
      </table>

      <h5>Typographic System</h5>
      <table>
        <thead>
          <tr>
            <th>Swatch (L/D)</th>
            <th>Level</th>
            <th>Light HEX</th>
            <th>Dark HEX</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ColorSwatch color="#400101" /><ColorSwatch color="#F2E8C9" /></td>
            <td>Titles (H1-H3)</td>
            <td><code>#400101</code></td>
            <td><code>#F2E8C9</code></td>
          </tr>
          <tr>
            <td><ColorSwatch color="#5C4B3F" /><ColorSwatch color="#C9F2AC" /></td>
            <td>Subtitles (H4-H6)</td>
            <td><code>#5C4B3F</code></td>
            <td><code>#C9F2AC</code></td>
          </tr>
          <tr>
            <td><ColorSwatch color="#212121" /><ColorSwatch color="#FBF8F1" /></td>
            <td>Paragraphs</td>
            <td><code>#212121</code></td>
            <td><code>#FBF8F1</code></td>
          </tr>
          <tr>
            <td><ColorSwatch color="#6D6D6D" /><ColorSwatch color="#A89F91" /></td>
            <td>Captions</td>
            <td><code>#6D6D6D</code></td>
            <td><code>#A89F91</code></td>
          </tr>
        </tbody>
      </table>

      <h5>Highlight & Feedback</h5>
      <table>
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Token</th>
            <th>Hex</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ColorSwatch color="#F2622E" /></td>
            <td>Harvest Pumpkin</td>
            <td><code>#F2622E</code></td>
            <td>CTA / Primary Action.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#F2A341" /></td>
            <td>Sun Pollen</td>
            <td><code>#F2A341</code></td>
            <td>Highlights / Badges.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#2ECC71" /></td>
            <td>Emerald Fresh</td>
            <td><code>#2ECC71</code></td>
            <td>Success states.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#D9042B" /></td>
            <td>Clay Error</td>
            <td><code>#D9042B</code></td>
            <td>Critical alerts.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#F2C84B" /></td>
            <td>Ripe Warning</td>
            <td><code>#F2C84B</code></td>
            <td>Warnings and cautionary alerts.</td>
          </tr>
          <tr>
            <td><ColorSwatch color="#2F80ED" /></td>
            <td>Water Info</td>
            <td><code>#2F80ED</code></td>
            <td>Informational messages and tips.</td>
          </tr>
        </tbody>
      </table>

      <h4>Typography and Font Engineering</h4>
      <p>The system utilizes the Nunito font family (Rounded), managed as a centralized asset within the <code>@studio</code> workspace to ensure cross-package parity. Headlines are prioritized in Bold weights, while body text follows Regular weight specifications.</p>
      <ul>
        <li><strong>Distribution:</strong> Fonts are bundled via <code>@fontsource/nunito</code> and injected automatically into the global styles through the centralized <code>theme.css</code>.</li>
        <li><strong>Performance:</strong> Implementation utilizes <strong>Variable Fonts</strong> (<code>variable.css</code>) to provide the full weight spectrum (200-900) with a single HTTP request, optimizing Core Web Vitals.</li>
      </ul>

      <h4>Technical Implementation: Hybrid Token System</h4>
      <p>The design system employs a <strong>Hybrid Source of Truth (SSOT)</strong> model, bridging the gap between high-performance CSS and type-safe TypeScript engineering.</p>
      <table>
        <thead>
          <tr>
            <th>Layer</th>
            <th>File Path</th>
            <th>Technical Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Source of Truth (TS)</strong></td>
            <td><code>src/tokens/colors.ts</code></td>
            <td>Strongly-typed object (HEX) for React components, GSAP animations, and Three.js materials.</td>
          </tr>
          <tr>
            <td><strong>Distribution Layer (CSS)</strong></td>
            <td><code>src/tokens/theme.css</code></td>
            <td>Tailwind CSS v4 <code>@theme</code> block and base resets for zero-runtime browser delivery.</td>
          </tr>
          <tr>
            <td><strong>Icon Registry</strong></td>
            <td><code>src/icons/index.tsx</code></td>
            <td>Curated barrel of FontAwesome icons and a standardized <code>Icon</code> component wrapper (forwardRef).</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
