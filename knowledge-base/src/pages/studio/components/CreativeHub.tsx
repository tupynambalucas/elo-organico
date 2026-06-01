import React from 'react';

export default function CreativeHub() {
  return (
    <div>
      <h3>Centralized Creative Repository</h3>
      <p>The Studio workspace acts as the master vault for all creative assets of the Elo Orgânico brand. It centralizes master files from professional design and production suites, ensuring version-controlled visual evolution and eliminating fragmented asset management.</p>

      <h4>Design Tool Integration</h4>
      <p>The repository supports multi-tool workflows by maintaining raw source files that serve as the canonical origin for all production-ready assets.</p>
      <ul>
        <li><strong>Vector Graphics:</strong> Adobe Illustrator (<code>.ai</code>) master files for logotypes, typography exploration, and iconography.</li>
        <li><strong>Digital Imaging:</strong> Adobe Photoshop (<code>.psd</code>) sources for high-fidelity raster assets and marketing material.</li>
        <li><strong>3D Engineering:</strong> Blender (<code>.blend</code>) master files for platform components and spatial visualizations (e.g., <code>Avokado.blend</code>).</li>
        <li><strong>Post-Production:</strong> Adobe Premiere (<code>.prproj</code>) projects for community tutorials and marketing content.</li>
      </ul>

      <h4>Source Asset Management</h4>
      <p>All high-fidelity master files are strictly maintained within the <code>assets/sources/**</code> directory structure. This ensures that the entire history of the brand's visual identity is preserved and accessible within the monorepo context.</p>

      <h4>Production Pipeline</h4>
      <p>Master files transition to the application layers through an optimized pipeline:</p>
      <ul>
        <li><strong>Icons:</strong> Sources are processed into optimized SVGs in <code>src/icons/</code>.</li>
        <li><strong>3D Models:</strong> Blender master files are exported to GLB format for runtime rendering.</li>
        <li><strong>Tokens:</strong> Visual constants are exported as strongly-typed TypeScript definitions from <code>src/tokens/</code>.</li>
      </ul>

      <h4>Namespaced Workspace Exports</h4>
      <p>Internal packages access creative assets via strictly defined exports to ensure architectural isolation:</p>
      <ul>
        <li><code>@elo-organico/studio/icons</code>: Optimized SVG library and curated Icon component registry (forwardRef wrapper).</li>
        <li><code>@elo-organico/studio/logos</code>: Canonical brand logotypes.</li>
        <li><code>@elo-organico/studio/tokens</code>: Strongly-typed design constants for JS/TS logic.</li>
        <li><code>@elo-organico/studio/theme.css</code>: Zero-runtime Tailwind CSS v4 theme and global resets.</li>
      </ul>
    </div>
  );
}
